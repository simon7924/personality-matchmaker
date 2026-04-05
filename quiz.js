// ===== QUIZ QUESTIONS BY MODE =====

const QUESTIONS = {
  personality: [
    {
      type: 'mc',
      question: "It's Saturday morning. No plans. What do you actually do?",
      options: [
        "Dive into a project or hobby I've been putting off",
        "Text friends and make something happen",
        "Enjoy the quiet — read, relax, recharge",
        "Let the day unfold and see where it goes"
      ]
    },
    {
      type: 'mc',
      question: "A friend is upset about something. Your instinct is to...",
      options: [
        "Help them break it down and find a solution",
        "Be there, listen, and make them feel heard",
        "Tell them honestly what I really think",
        "Distract them — get them laughing or out of the house"
      ]
    },
    {
      type: 'text',
      question: "Describe a moment when you felt completely in your element. What were you doing?"
    },
    {
      type: 'mc',
      question: "When you walk into a room full of strangers, you typically...",
      options: [
        "Scan for interesting people and make my way over",
        "Hang back and observe before engaging",
        "Find one person to talk to deeply",
        "Look for someone I might know"
      ]
    },
    {
      type: 'mc',
      question: "Which of these bothers you most?",
      options: [
        "Wasted potential",
        "Broken trust",
        "Unnecessary conflict",
        "Boredom and repetition"
      ]
    },
    {
      type: 'text',
      question: "If you could master any skill overnight, what would it be and why?"
    },
    {
      type: 'mc',
      question: "How do you make most of your important decisions?",
      options: [
        "I research, weigh options, and decide logically",
        "I go with my gut — it usually knows",
        "I talk it through with people I trust",
        "I sit with it until something feels right"
      ]
    }
  ],

  friend: [
    {
      type: 'mc',
      question: "Your friend just got some huge news — good or bad. Your first move is...",
      options: [
        "Call them immediately, no text",
        "Show up in person with food or something comforting",
        "Send a long heartfelt message",
        "Ask what they need before doing anything"
      ]
    },
    {
      type: 'mc',
      question: "In your friend group, you're usually the one who...",
      options: [
        "Plans the hangouts and makes things happen",
        "Keeps the peace when there's drama",
        "Remembers everyone's birthdays and milestones",
        "Brings the fun and energy"
      ]
    },
    {
      type: 'text',
      question: "Tell me about your longest friendship. What's kept it going?"
    },
    {
      type: 'mc',
      question: "A friend cancels plans last minute for the third time. You...",
      options: [
        "Let it go — they probably have a good reason",
        "Bring it up gently — it's starting to bother me",
        "Feel hurt but say nothing",
        "Match their energy going forward"
      ]
    },
    {
      type: 'mc',
      question: "What do you value most in a friendship?",
      options: [
        "Loyalty — I know they always have my back",
        "Honesty — they'll tell me the truth",
        "Fun — we always have a good time",
        "Depth — we can talk about anything"
      ]
    },
    {
      type: 'text',
      question: "What's something you do for friends that they probably don't realize how much it means to them?"
    },
    {
      type: 'mc',
      question: "How many truly close friends do you have?",
      options: [
        "1-2. I go deep, not wide.",
        "3-5. A tight crew is perfect.",
        "6-10. I have a big circle of close people.",
        "Honestly, I'm not sure — it's hard to define 'close'."
      ]
    }
  ],

  team: [
    {
      type: 'mc',
      question: "Your team has a big project due in two weeks. You naturally start by...",
      options: [
        "Mapping out the full plan and assigning tasks",
        "Jumping into execution — I'll figure it out as I go",
        "Making sure everyone's aligned and motivated",
        "Identifying the biggest risks and unknowns first"
      ]
    },
    {
      type: 'mc',
      question: "In a meeting where ideas are flying around, you're usually...",
      options: [
        "The one who introduces bold, unexpected ideas",
        "The one who asks the hard questions",
        "The one who synthesizes and finds the common thread",
        "The one who takes notes and spots what's missing"
      ]
    },
    {
      type: 'text',
      question: "Describe a team project you're proud of. What was your role in making it work?"
    },
    {
      type: 'mc',
      question: "A teammate is underperforming and dragging the project. You...",
      options: [
        "Have a direct one-on-one conversation with them",
        "Try to understand what's going on before reacting",
        "Pick up the slack quietly and keep things moving",
        "Bring it up with the group to address it collectively"
      ]
    },
    {
      type: 'mc',
      question: "When your team disagrees, your instinct is to...",
      options: [
        "Push hard for what I believe is right",
        "Find a compromise everyone can live with",
        "Defer to whoever has the most relevant expertise",
        "Reframe the problem so the disagreement dissolves"
      ]
    },
    {
      type: 'text',
      question: "What's a way you contribute to a team that's hard to measure but really matters?"
    },
    {
      type: 'mc',
      question: "You do your best work when...",
      options: [
        "I have a clear goal and autonomy to reach it",
        "I'm collaborating closely with a trusted team",
        "I'm under pressure with a tight deadline",
        "I have time to think deeply and get things right"
      ]
    }
  ]
};

// ===== OPENROUTER CONFIG =====
const OPENROUTER_API_KEY = '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';
const OPENROUTER_MODEL = 'meta-llama/llama-3.3-8b-instruct:free';

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

// ===== STATE =====
let currentMode = 'personality';
let playerName = '';
let currentQuestion = 0;
let answers = [];
let selectedOption = null;

// ===== ELEMENTS =====
const screens = {
  welcome: document.getElementById('screen-welcome'),
  quiz: document.getElementById('screen-quiz'),
  loading: document.getElementById('screen-loading'),
  results: document.getElementById('screen-results')
};

// ===== SCREEN TRANSITIONS =====
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ===== MODE SELECTION =====
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    currentMode = btn.dataset.mode;
  });
});

// ===== START QUIZ =====
document.getElementById('start-btn').addEventListener('click', () => {
  playerName = document.getElementById('player-name').value.trim();
  currentQuestion = 0;
  answers = [];
  loadQuestion();
  showScreen('quiz');
});

// ===== LOAD QUESTION =====
function loadQuestion() {
  const questions = QUESTIONS[currentMode];
  const q = questions[currentQuestion];
  selectedOption = null;

  const total = questions.length;
  const progress = ((currentQuestion) / total) * 100;

  document.getElementById('progress-bar').style.width = progress + '%';
  document.getElementById('question-counter').textContent = `Question ${currentQuestion + 1} of ${total}`;
  document.getElementById('question-text').textContent = q.question;

  const answerArea = document.getElementById('answer-area');
  answerArea.innerHTML = '';
  answerArea.className = 'answer-area';

  const nextBtn = document.getElementById('next-btn');
  nextBtn.disabled = true;
  nextBtn.textContent = currentQuestion === total - 1 ? 'See My Results ✨' : 'Next →';

  if (q.type === 'mc') {
    answerArea.classList.add('mc');
    q.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedOption = opt;
        nextBtn.disabled = false;
      });
      answerArea.appendChild(btn);
    });
  } else if (q.type === 'text') {
    answerArea.classList.add('text-input');
    const ta = document.createElement('textarea');
    ta.placeholder = 'Write your answer here...';
    ta.maxLength = 300;

    const counter = document.createElement('div');
    counter.className = 'char-count';
    counter.textContent = '0 / 300';

    ta.addEventListener('input', () => {
      const len = ta.value.trim().length;
      counter.textContent = `${ta.value.length} / 300`;
      nextBtn.disabled = len < 5;
      selectedOption = ta.value.trim();
    });

    answerArea.appendChild(ta);
    answerArea.appendChild(counter);
    ta.focus();
  }
}

// ===== NEXT BUTTON =====
document.getElementById('next-btn').addEventListener('click', () => {
  const questions = QUESTIONS[currentMode];
  const q = questions[currentQuestion];

  answers.push({
    question: q.question,
    answer: selectedOption || ''
  });

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    runAnalysis();
  }
});

// ===== LOADING MESSAGES =====
const loadingMessages = [
  'Analyzing your responses...',
  'Detecting personality patterns...',
  'Consulting the cosmic algorithm...',
  'Cross-referencing 10,000 profiles...',
  'Almost there...'
];

function cycleLoadingMessages() {
  let i = 0;
  const el = document.getElementById('loading-msg');
  return setInterval(() => {
    i = (i + 1) % loadingMessages.length;
    el.textContent = loadingMessages[i];
  }, 1800);
}

// ===== AI ANALYSIS =====
async function runAnalysis() {
  showScreen('loading');
  const interval = cycleLoadingMessages();

  const name = playerName || 'the player';
  const answerBlock = answers
    .map((a, i) => `Q${i + 1}: ${a.question}\nAnswer: ${a.answer}`)
    .join('\n\n');

  const userMessage = `Player name: ${name}\n\nHere are their quiz answers:\n\n${answerBlock}\n\nPlease analyze these responses and return the JSON profile.`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.href,
        'X-Title': 'Personality Matchmaker'
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          { role: 'system', content: MODE_PROMPTS[currentMode] },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 1024
      })
    });

    clearInterval(interval);

    if (!response.ok) {
      const err = await response.json();
      showError(err.error?.message || 'AI request failed.');
      return;
    }

    const data = await response.json();
    const raw = data.choices[0].message.content;

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      showError('AI returned an unexpected format. Please try again.');
      return;
    }

    const result = JSON.parse(jsonMatch[0]);
    showResults(result);

  } catch (err) {
    clearInterval(interval);
    showError('Could not reach the AI. Check your connection and try again.');
  }
}

// ===== SHOW RESULTS =====
function showResults(data) {
  document.getElementById('result-emoji').textContent = data.emoji || '✨';
  document.getElementById('result-title').textContent = data.title || 'Your Profile';
  document.getElementById('result-subtitle').textContent = data.subtitle || '';
  document.getElementById('result-body').textContent = data.description || '';

  const traitsEl = document.getElementById('result-traits');
  traitsEl.innerHTML = '';
  if (Array.isArray(data.traits)) {
    data.traits.forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'trait-tag';
      tag.textContent = t;
      traitsEl.appendChild(tag);
    });
  }

  const matchEl = document.getElementById('result-match');
  matchEl.innerHTML = '';
  if (data.bestMatch || data.insight) {
    if (data.bestMatch) {
      const p = document.createElement('p');
      p.innerHTML = `<strong>Best match</strong>${data.bestMatch}`;
      matchEl.appendChild(p);
    }
    if (data.insight) {
      const p = document.createElement('p');
      p.style.marginTop = data.bestMatch ? '10px' : '0';
      p.innerHTML = `<strong>A deeper look</strong>${data.insight}`;
      matchEl.appendChild(p);
    }
  }

  showScreen('results');
}

// ===== ERROR HANDLING =====
function showError(msg) {
  showScreen('results');
  document.getElementById('result-emoji').textContent = '⚠️';
  document.getElementById('result-title').textContent = 'Oops!';
  document.getElementById('result-subtitle').textContent = '';
  document.getElementById('result-body').textContent = msg;
  document.getElementById('result-traits').innerHTML = '';
  document.getElementById('result-match').innerHTML = '';
}

// ===== RESTART =====
document.getElementById('restart-btn').addEventListener('click', () => {
  document.getElementById('player-name').value = '';
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('selected'));
  document.querySelector('.mode-btn[data-mode="personality"]').classList.add('selected');
  currentMode = 'personality';
  showScreen('welcome');
});
