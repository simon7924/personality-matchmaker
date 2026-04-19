require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const MODE_PROMPTS = {
  personality: `You are an insightful personality analyst for a fun quiz game.
A player has answered a series of personality questions. Analyze their responses and create a vivid, personalized personality profile.

Your response MUST be valid JSON with exactly this structure:
{
  "emoji": "<one emoji that represents this personality>",
  "title": "<creative archetype title, e.g. 'The Quiet Architect' or 'The Magnetic Spark'>",
  "subtitle": "<short punchy tagline, max 10 words>",
  "description": "<3-4 sentences describing their personality, written warmly and directly to them using 'you'>",
  "traits": ["<trait 1>", "<trait 2>", "<trait 3>", "<trait 4>"],
  "bestMatch": "<which type of person they match best with and why, 2 sentences>",
  "insight": "<one surprising or deep insight about them based on their answers, 1-2 sentences>"
}`,

  friend: `You are a social dynamics expert for a fun quiz game.
A player has answered questions about their friendship style. Analyze their responses and reveal what kind of friend they are.

Your response MUST be valid JSON with exactly this structure:
{
  "emoji": "<one emoji that represents their friend style>",
  "title": "<creative friend archetype, e.g. 'The Anchor Friend' or 'The Adventure Instigator'>",
  "subtitle": "<short punchy tagline about their friendship style, max 10 words>",
  "description": "<3-4 sentences describing how they show up for their friends, written warmly and directly to them using 'you'>",
  "traits": ["<friendship trait 1>", "<friendship trait 2>", "<friendship trait 3>", "<friendship trait 4>"],
  "bestMatch": "<what kind of friend complements them best and why, 2 sentences>",
  "insight": "<one honest and warm insight about their friendship patterns, 1-2 sentences>"
}`,

  team: `You are a team dynamics coach for a fun quiz game.
A player has answered questions about how they work with others. Analyze their responses and reveal their team role.

Your response MUST be valid JSON with exactly this structure:
{
  "emoji": "<one emoji that represents their team role>",
  "title": "<creative team role title, e.g. 'The Visionary Catalyst' or 'The Steady Engine'>",
  "subtitle": "<short punchy tagline about their team role, max 10 words>",
  "description": "<3-4 sentences describing how they contribute in teams, written warmly and directly to them using 'you'>",
  "traits": ["<team trait 1>", "<team trait 2>", "<team trait 3>", "<team trait 4>"],
  "bestMatch": "<what team role or type of colleague balances them best and why, 2 sentences>",
  "insight": "<one sharp insight about how they can maximize their team impact, 1-2 sentences>"
}`
};

// Fallback list — used if live model fetch fails
const FALLBACK_MODELS = [
  'google/gemma-4-26b-a4b-it:free',
  'openai/gpt-oss-20b:free',
  'openai/gpt-oss-120b:free',
  'google/gemma-4-31b-it:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'google/gemma-3-27b-it:free',
  'google/gemma-3-12b-it:free',
  'nousresearch/hermes-3-llama-3.1-405b:free',
  'meta-llama/llama-3.2-3b-instruct:free',
  'qwen/qwen3-coder:free'
];

let cachedModels = null;
let cacheTime = 0;

async function getModels() {
  // Refresh model list every 10 minutes
  if (cachedModels && Date.now() - cacheTime < 10 * 60 * 1000) return cachedModels;
  try {
    const res = await fetch('https://openrouter.ai/api/v1/models', {
      headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` }
    });
    if (!res.ok) throw new Error('Model list fetch failed');
    const data = await res.json();
    const free = data.data.filter((m) => m.id.endsWith(':free')).map((m) => m.id);
    if (free.length > 0) {
      // Put fallback models first (known good), then append any extras from live list
      const extras = free.filter((id) => !FALLBACK_MODELS.includes(id));
      cachedModels = [...FALLBACK_MODELS.filter((id) => free.includes(id)), ...extras];
      cacheTime = Date.now();
      console.log(`Loaded ${cachedModels.length} free models from OpenRouter`);
      return cachedModels;
    }
  } catch (err) {
    console.warn('Could not fetch live model list, using fallback:', err.message);
  }
  return FALLBACK_MODELS;
}

async function tryModel(model, systemPrompt, userMessage) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
        'X-Title': 'Personality Matchmaker'
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 1024
      })
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error?.message || `HTTP ${response.status}`);
    }

    const raw = data.choices?.[0]?.message?.content || '';

    if (
      !raw ||
      raw.toLowerCase().includes('provider returned error') ||
      raw.toLowerCase().includes('no endpoints found')
    ) {
      throw new Error('Bad provider response');
    }

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    return JSON.parse(jsonMatch[0]);
  } finally {
    clearTimeout(timeout);
  }
}

app.post('/api/analyze', async (req, res) => {
  const { mode, playerName, answers } = req.body;

  if (!mode || !answers || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: 'Invalid request: mode and answers are required.' });
  }

  const systemPrompt = MODE_PROMPTS[mode];
  if (!systemPrompt) {
    return res.status(400).json({ error: 'Invalid mode.' });
  }

  const name = playerName && playerName.trim() ? playerName.trim() : 'the player';
  const answerBlock = answers
    .map((a, i) => `Q${i + 1}: ${a.question}\nAnswer: ${a.answer}`)
    .join('\n\n');
  const userMessage = `Player name: ${name}\n\nHere are their quiz answers:\n\n${answerBlock}\n\nPlease analyze these responses and return the JSON profile.`;

  for (const model of MODELS) {
    try {
      console.log(`Trying model: ${model}`);
      const result = await tryModel(model, systemPrompt, userMessage);
      console.log(`Success with model: ${model}`);
      return res.json(result);
    } catch (err) {
      console.warn(`Model ${model} failed: ${err.message}`);
    }
  }

  console.error('All models failed.');
  res.status(500).json({ error: 'AI analysis failed. Please try again.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🔮 Personality Matchmaker running at http://localhost:${PORT}\n`);
});
