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

let cachedModels = null;
let cacheTime = 0;

async function getModels({ forceRefresh = false } = {}) {
  if (!forceRefresh && cachedModels && Date.now() - cacheTime < 10 * 60 * 1000) return cachedModels;
  const res = await fetch('https://openrouter.ai/api/v1/models', {
    headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` }
  });
  if (!res.ok) throw new Error(`Model list fetch failed: ${res.status}`);
  const data = await res.json();
  const free = data.data.filter((m) => m.id.endsWith(':free')).map((m) => m.id);
  if (free.length === 0) throw new Error('No free models returned');
  cachedModels = free;
  cacheTime = Date.now();
  console.log(`Loaded ${free.length} free models from OpenRouter`);
  return free;
}

async function tryModel(model, systemPrompt, userMessage) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

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
      const errMsg = data.error?.message || `HTTP ${response.status}`;
      // Log specific error types for debugging
      if (response.status === 429) console.warn(`Rate limited on ${model}`);
      if (response.status === 402) console.warn(`Quota exceeded on ${model}`);
      throw new Error(errMsg);
    }

    const raw = data.choices?.[0]?.message?.content || '';
    if (!raw || raw.toLowerCase().includes('provider returned error') || raw.toLowerCase().includes('no endpoints found')) {
      throw new Error('Bad provider response');
    }

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    return JSON.parse(jsonMatch[0]);
  } finally {
    clearTimeout(timeout);
  }
}

// Race a small batch of models to stay under OpenRouter's 20 req/min free limit.
// If the batch all fail, try the next batch sequentially until one succeeds.
async function raceModels(models, systemPrompt, userMessage) {
  const BATCH_SIZE = 5;

  for (let i = 0; i < models.length; i += BATCH_SIZE) {
    const batch = models.slice(i, i + BATCH_SIZE);
    try {
      const result = await new Promise((resolve, reject) => {
        let failures = 0;
        for (const model of batch) {
          tryModel(model, systemPrompt, userMessage)
            .then((result) => resolve(result))
            .catch((err) => {
              console.warn(`Model ${model} failed: ${err.message}`);
              failures++;
              if (failures === batch.length) reject(new Error(`Batch ${i / BATCH_SIZE + 1} failed`));
            });
        }
      });
      console.log(`Succeeded in batch ${i / BATCH_SIZE + 1}`);
      return result;
    } catch {
      console.warn(`Batch ${i / BATCH_SIZE + 1} exhausted, trying next batch...`);
    }
  }

  throw new Error('All models failed');
}

app.get('/api/debug', async (req, res) => {
  const keySet = !!process.env.OPENROUTER_API_KEY;
  const keyPrefix = keySet ? process.env.OPENROUTER_API_KEY.slice(0, 12) + '...' : 'NOT SET';
  let models = [];
  let modelError = null;
  try {
    models = await getModels();
  } catch (err) {
    modelError = err.message;
  }

  // Try one model and return the raw response for diagnosis
  let probeResult = null;
  if (models.length > 0) {
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 8000);
      const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
          'X-Title': 'Personality Matchmaker'
        },
        body: JSON.stringify({
          model: models[0],
          messages: [{ role: 'user', content: 'Say "ok"' }],
          max_tokens: 10
        })
      });
      clearTimeout(t);
      const data = await r.json();
      probeResult = { status: r.status, model: models[0], response: data };
    } catch (err) {
      probeResult = { error: err.message, model: models[0] };
    }
  }

  res.json({ keySet, keyPrefix, modelCount: models.length, modelError, firstFew: models.slice(0, 3), probeResult });
});

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

  let models;
  try {
    models = await getModels();
  } catch (err) {
    console.error('Failed to fetch model list:', err.message);
    return res.status(500).json({ error: 'Could not load AI models. Please try again.' });
  }

  try {
    const result = await raceModels(models, systemPrompt, userMessage);
    return res.json(result);
  } catch (err) {
    // All cached models failed — bust the cache and retry once with a fresh list
    console.warn('All cached models failed, refreshing model list and retrying...');
    try {
      const freshModels = await getModels({ forceRefresh: true });
      const result = await raceModels(freshModels, systemPrompt, userMessage);
      return res.json(result);
    } catch (retryErr) {
      console.error('All models failed after refresh:', retryErr.message);
      return res.status(500).json({ error: 'AI analysis failed. Please try again.' });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🔮 Personality Matchmaker running at http://localhost:${PORT}\n`);
});
