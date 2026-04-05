require('dotenv').config();
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }]
    });

    const raw = message.content[0].text;

    // Extract JSON from the response (handles markdown code fences if present)
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in response:', raw);
      return res.status(500).json({ error: 'AI returned an unexpected format.' });
    }

    const result = JSON.parse(jsonMatch[0]);
    res.json(result);

  } catch (err) {
    console.error('API error:', err.message);
    if (err.status === 401) {
      return res.status(500).json({ error: 'Invalid API key. Check your .env file.' });
    }
    res.status(500).json({ error: 'Failed to get AI analysis. Please try again.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🔮 Personality Matchmaker running at http://localhost:${PORT}\n`);
});
