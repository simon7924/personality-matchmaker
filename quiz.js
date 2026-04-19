// ===== QUIZ QUESTIONS BY MODE =====

const QUESTIONS = {
  personality: [
    {
      type: 'mc',
      question: "It's Saturday morning. No plans. What do you actually do?",
      options: [
        "Dive into a project or hobby I've been putting off",
        "Text friends and make something happen",
        "Enjoy the quiet - read, relax, recharge",
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
        "Distract them - get them laughing or out of the house"
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
        "I go with my gut - it usually knows",
        "I talk it through with people I trust",
        "I sit with it until something feels right"
      ]
    },
    {
      type: 'mc',
      question: "When you're working on something, you prefer to...",
      options: [
        "Have a clear plan before starting",
        "Jump in and figure it out as I go",
        "Collaborate and brainstorm with others",
        "Research deeply before touching anything"
      ]
    },
    {
      type: 'mc',
      question: "What energizes you most?",
      options: [
        "Creating or building something from scratch",
        "Connecting with people and hearing their stories",
        "Solving a tricky problem or puzzle",
        "Learning something completely new"
      ]
    },
    {
      type: 'scale',
      question: "On a scale of 1 to 10, how strongly do you trust your gut when making big decisions?",
      minLabel: 'Mostly logic',
      maxLabel: 'Mostly intuition'
    },
    {
      type: 'text',
      question: "What's a belief or value you hold that most people around you don't share?"
    },
    {
      type: 'mc',
      question: "How do you usually handle criticism?",
      options: [
        "Analyze it objectively - is it valid?",
        "It stings, but I reflect on it later",
        "I want to understand the person's perspective first",
        "I brush it off and keep moving"
      ]
    },
    {
      type: 'mc',
      question: "Your idea of a perfect evening is...",
      options: [
        "Deep conversation with one or two close people",
        "A lively gathering with lots of different people",
        "Alone time doing something I love",
        "Something spontaneous - I'll know it when I see it"
      ]
    },
    {
      type: 'mc',
      question: "When things go wrong, you tend to...",
      options: [
        "Find the lesson and move forward",
        "Sit with it and process my feelings",
        "Talk to someone I trust",
        "Take action immediately to fix it"
      ]
    },
    {
      type: 'text',
      question: "What do people consistently come to you for help with?"
    },
    {
      type: 'mc',
      question: "Which word feels most like you?",
      options: [
        "Driven",
        "Empathetic",
        "Curious",
        "Spontaneous"
      ]
    },
    {
      type: 'mc',
      question: "When you disagree with someone, you typically...",
      options: [
        "Speak up directly and make my case",
        "Ask questions to understand their view first",
        "Let it go unless it really matters",
        "Find a way to see both sides"
      ]
    },
    {
      type: 'mc',
      question: "Your relationship with routine is...",
      options: [
        "I love it - structure helps me thrive",
        "Some routine is good, but I need variety",
        "I resist it - I prefer to stay flexible",
        "It depends entirely on the area of my life"
      ]
    },
    {
      type: 'text',
      question: "Describe your ideal version of yourself five years from now."
    },
    {
      type: 'mc',
      question: "When starting something new, what holds you back most?",
      options: [
        "Fear of doing it wrong",
        "Not knowing where to begin",
        "Worrying what others will think",
        "Honestly - not much stops me"
      ]
    },
    {
      type: 'mc',
      question: "Which feels most rewarding to you?",
      options: [
        "Finishing a long, complex project",
        "Making someone's day better",
        "Having a breakthrough insight",
        "Trying something I've never done before"
      ]
    }
  ],

  friend: [
    {
      type: 'mc',
      question: "Your friend just got some huge news - good or bad. Your first move is...",
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
        "Let it go - they probably have a good reason",
        "Bring it up gently - it's starting to bother me",
        "Feel hurt but say nothing",
        "Match their energy going forward"
      ]
    },
    {
      type: 'mc',
      question: "What do you value most in a friendship?",
      options: [
        "Loyalty - I know they always have my back",
        "Honesty - they'll tell me the truth",
        "Fun - we always have a good time",
        "Depth - we can talk about anything"
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
        "Honestly, I'm not sure - it's hard to define 'close'."
      ]
    },
    {
      type: 'mc',
      question: "When a friend is going through a hard time, you...",
      options: [
        "Check in on them constantly until they're okay",
        "Give them space but let them know I'm here",
        "Try to cheer them up and get their mind off it",
        "Help them make a plan to fix the situation"
      ]
    },
    {
      type: 'mc',
      question: "What does a typical catch-up with a close friend look like for you?",
      options: [
        "Long dinner or walk - we could talk for hours",
        "Quick coffee, but we make it count",
        "Group hangout - I like everyone together",
        "Whatever - I'm easy, I just enjoy the time"
      ]
    },
    {
      type: 'scale',
      question: "On a scale of 1 to 10, how quickly do you open up emotionally in a new friendship?",
      minLabel: 'Very slowly',
      maxLabel: 'Very quickly'
    },
    {
      type: 'text',
      question: "Has a friendship ever changed you in a meaningful way? How?"
    },
    {
      type: 'mc',
      question: "If a friend did something that hurt you, you'd most likely...",
      options: [
        "Tell them directly how I feel",
        "Wait and see if it happens again before saying anything",
        "Distance myself quietly",
        "Try to understand why they did it first"
      ]
    },
    {
      type: 'mc',
      question: "How do you make new friends as an adult?",
      options: [
        "Through shared activities or interests",
        "Organically through existing friends",
        "I put myself out there - I'll talk to anyone",
        "It's rare - I'm selective about who I let in"
      ]
    },
    {
      type: 'mc',
      question: "Your friend is making a big mistake. You...",
      options: [
        "Tell them honestly, even if it's uncomfortable",
        "Support them - it's their life to live",
        "Ask questions to help them think it through",
        "Wait for them to ask my opinion"
      ]
    },
    {
      type: 'text',
      question: "What kind of friend do you wish you had more of in your life?"
    },
    {
      type: 'mc',
      question: "How do you show love to the people you care about?",
      options: [
        "I do things for them - acts of service",
        "I spend quality time with them",
        "I tell them how much they mean to me",
        "I give thoughtful gifts or gestures"
      ]
    },
    {
      type: 'mc',
      question: "When your friend group has a conflict, you...",
      options: [
        "Step in to mediate and help resolve it",
        "Stay neutral and avoid taking sides",
        "Support whoever I think is right",
        "Step back - group drama isn't my thing"
      ]
    },
    {
      type: 'mc',
      question: "What's your friendship dealbreaker?",
      options: [
        "Disloyalty or betrayal",
        "Constant negativity or complaining",
        "One-sided effort - I give more than I get",
        "Dishonesty, even small lies"
      ]
    },
    {
      type: 'text',
      question: "What's the most meaningful thing a friend has ever done for you?"
    },
    {
      type: 'mc',
      question: "When you're going through something hard, you...",
      options: [
        "Open up to close friends right away",
        "Process alone first, then share when ready",
        "Downplay it - I don't want to burden people",
        "Lean on whoever is available"
      ]
    },
    {
      type: 'mc',
      question: "Which best describes your friendship style?",
      options: [
        "I'm the glue - I keep everyone connected",
        "I'm the listener - people come to me",
        "I'm the spark - I bring the energy",
        "I'm the rock - steady and always there"
      ]
    }
  ],

  team: [
    {
      type: 'mc',
      question: "Your team has a big project due in two weeks. You naturally start by...",
      options: [
        "Mapping out the full plan and assigning tasks",
        "Jumping into execution - I'll figure it out as I go",
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
    },
    {
      type: 'mc',
      question: "How do you handle it when a project changes direction mid-way?",
      options: [
        "Adapt quickly - change is part of the process",
        "Feel frustrated, but get on board once I understand why",
        "Push back if I think the new direction is wrong",
        "Focus on what stays the same and build from there"
      ]
    },
    {
      type: 'mc',
      question: "When you get feedback on your work, you...",
      options: [
        "Appreciate it - it helps me improve",
        "Take it seriously but filter for what's actually useful",
        "Prefer to receive it privately, not in front of others",
        "Want specific examples so I can act on it"
      ]
    },
    {
      type: 'scale',
      question: "On a scale of 1 to 10, how comfortable are you taking the lead when a team needs direction?",
      minLabel: 'Prefer to support',
      maxLabel: 'Naturally lead'
    },
    {
      type: 'text',
      question: "Tell me about a time you had to work with someone very different from you. How did it go?"
    },
    {
      type: 'mc',
      question: "What role do you naturally fall into on a leaderless team?",
      options: [
        "I step up and start directing",
        "I focus on doing my part exceptionally well",
        "I make sure everyone feels heard and included",
        "I keep track of progress and flag problems early"
      ]
    },
    {
      type: 'mc',
      question: "What's your biggest strength on a team?",
      options: [
        "I get things done - fast and reliably",
        "I keep the team's morale high",
        "I bring creative or unconventional thinking",
        "I catch problems before they become crises"
      ]
    },
    {
      type: 'mc',
      question: "What frustrates you most in a team environment?",
      options: [
        "Lack of clear direction or ownership",
        "People not pulling their weight",
        "Too many meetings, not enough action",
        "Ideas being dismissed without a fair hearing"
      ]
    },
    {
      type: 'text',
      question: "What does your ideal team look like? Describe the people and the dynamic."
    },
    {
      type: 'mc',
      question: "When a deadline is at risk, you...",
      options: [
        "Escalate early so everyone can course-correct",
        "Buckle down and put in whatever hours it takes",
        "Identify what can be cut without killing quality",
        "Rally the team and boost energy to push through"
      ]
    },
    {
      type: 'mc',
      question: "How do you prefer to communicate with your team?",
      options: [
        "Async messages - I like to think before I respond",
        "Quick calls - it's faster than back-and-forth texts",
        "In-person or video - I want to read the room",
        "Whatever works for the team - I'm flexible"
      ]
    },
    {
      type: 'mc',
      question: "After a project wraps up, you typically...",
      options: [
        "Do a debrief - what worked, what didn't?",
        "Celebrate with the team - we earned it",
        "Move straight on to the next thing",
        "Reflect quietly on what I'd do differently"
      ]
    },
    {
      type: 'text',
      question: "What's something you've learned about yourself from working in teams?"
    },
    {
      type: 'mc',
      question: "Which of these matters most to you in a team?",
      options: [
        "A shared clear goal everyone believes in",
        "Mutual respect and psychological safety",
        "High standards and accountability",
        "Room for creativity and independent thinking"
      ]
    },
    {
      type: 'mc',
      question: "When you're given a vague or unclear task, you...",
      options: [
        "Ask clarifying questions before starting",
        "Make reasonable assumptions and get going",
        "Sketch out a few interpretations and check in",
        "Feel uneasy - I need clarity to do my best work"
      ]
    }
  ]
};

// ===== OPENROUTER CONFIG =====
let OPENROUTER_API_KEY = '';

async function getAvailableModels() {
  try {
    const res = await fetch('https://openrouter.ai/api/v1/models', {
      headers: { Authorization: `Bearer ${OPENROUTER_API_KEY}` }
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    const freeModels = data.data
      .filter((m) => m.id.endsWith(':free'))
      .map((m) => m.id);
    if (freeModels.length > 0) return freeModels;
  } catch {}

  return [
    'meta-llama/llama-3.3-8b-instruct:free',
    'mistralai/mistral-7b-instruct:free',
    'google/gemma-3-27b-it:free',
    'deepseek/deepseek-r1-distill-llama-70b:free',
    'qwen/qwen-2-7b-instruct:free'
  ];
}

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
let quizLength = 10;
let activeQuestions = [];
let hasChosenMode = false;
let currentResultData = null;

// ===== ELEMENTS =====
const screens = {
  welcome: document.getElementById('screen-welcome'),
  quiz: document.getElementById('screen-quiz'),
  loading: document.getElementById('screen-loading'),
  results: document.getElementById('screen-results')
};

const startBtn = document.getElementById('start-btn');
const lengthSlider = document.getElementById('quiz-length');
const lengthValue = document.getElementById('quiz-length-value');
const lengthPicker = document.getElementById('quiz-length-picker');
const resultsCard = document.getElementById('results-card');
const shareStatus = document.getElementById('share-status');

// ===== SCREEN TRANSITIONS =====
function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove('active'));
  screens[name].classList.add('active');
}

// ===== QUIZ SETUP UI =====
function updateLengthLabel() {
  lengthValue.textContent = `${quizLength} questions`;
}

function revealQuizSetup(mode) {
  const modeName = document.querySelector(`.mode-btn[data-mode="${mode}"] .mode-name`)?.textContent || 'Quiz';
  hasChosenMode = true;
  lengthPicker.classList.add('visible');
  startBtn.disabled = false;
  startBtn.textContent = `Start ${modeName} ->`;
}

// ===== MODE SELECTION =====
document.querySelectorAll('.mode-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach((button) => button.classList.remove('selected'));
    btn.classList.add('selected');
    currentMode = btn.dataset.mode;
    revealQuizSetup(currentMode);
  });
});

// ===== QUIZ LENGTH SLIDER =====
lengthSlider.addEventListener('input', () => {
  quizLength = parseInt(lengthSlider.value, 10);
  updateLengthLabel();
});

// ===== SHUFFLE HELPER =====
function shuffleArray(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function setShareStatus(message) {
  shareStatus.textContent = message;
}

function buildShareText() {
  if (!currentResultData) return '';

  const lines = [
    `${currentResultData.emoji || '✨'} ${currentResultData.title || 'My Personality Matchmaker Result'}`,
    currentResultData.subtitle || '',
    '',
    currentResultData.description || ''
  ];

  if (Array.isArray(currentResultData.traits) && currentResultData.traits.length) {
    lines.push('', `Traits: ${currentResultData.traits.join(', ')}`);
  }

  if (currentResultData.bestMatch) {
    lines.push('', `Best match: ${currentResultData.bestMatch}`);
  }

  if (currentResultData.insight) {
    lines.push('', `A deeper look: ${currentResultData.insight}`);
  }

  lines.push('', `Take the quiz: ${window.location.href}`);
  return lines.filter((line, index, arr) => !(line === '' && arr[index - 1] === '')).join('\n');
}

async function copyResultToClipboard() {
  const shareText = buildShareText();
  if (!shareText) {
    setShareStatus('Nothing to copy yet.');
    return;
  }

  try {
    await navigator.clipboard.writeText(shareText);
    setShareStatus('Result copied to clipboard.');
  } catch (err) {
    const helper = document.createElement('textarea');
    helper.value = shareText;
    helper.setAttribute('readonly', '');
    helper.style.position = 'absolute';
    helper.style.left = '-9999px';
    document.body.appendChild(helper);
    helper.select();
    document.execCommand('copy');
    document.body.removeChild(helper);
    setShareStatus('Result copied to clipboard.');
  }
}

async function downloadResultImage() {
  if (!window.html2canvas || !currentResultData) {
    setShareStatus('Image capture is not ready yet.');
    return;
  }

  setShareStatus('Preparing image...');
  resultsCard.classList.add('is-capturing');

  try {
    const canvas = await window.html2canvas(resultsCard, {
      backgroundColor: null,
      scale: 2,
      useCORS: true
    });

    const link = document.createElement('a');
    const safeTitle = (currentResultData.title || 'quiz-result')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    link.download = `${safeTitle || 'quiz-result'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setShareStatus('Image downloaded.');
  } catch (err) {
    setShareStatus('Could not capture the result image.');
  } finally {
    resultsCard.classList.remove('is-capturing');
  }
}

// ===== START QUIZ =====
startBtn.addEventListener('click', () => {
  if (!hasChosenMode) return;

  const keyInput = document.getElementById('api-key').value.trim();
  if (!keyInput) {
    alert('Please enter your OpenRouter API key.');
    return;
  }

  OPENROUTER_API_KEY = keyInput;
  playerName = document.getElementById('player-name').value.trim();
  currentQuestion = 0;
  answers = [];
  activeQuestions = shuffleArray(QUESTIONS[currentMode]).slice(0, quizLength);
  loadQuestion();
  showScreen('quiz');
});

// ===== LOAD QUESTION =====
function loadQuestion() {
  const q = activeQuestions[currentQuestion];
  selectedOption = null;

  const total = activeQuestions.length;
  const progress = (currentQuestion / total) * 100;

  document.getElementById('progress-bar').style.width = `${progress}%`;
  document.getElementById('question-counter').textContent = `Question ${currentQuestion + 1} of ${total}`;
  document.getElementById('question-text').textContent = q.question;

  const answerArea = document.getElementById('answer-area');
  answerArea.innerHTML = '';
  answerArea.className = 'answer-area';

  const nextBtn = document.getElementById('next-btn');
  nextBtn.disabled = true;
  nextBtn.textContent = currentQuestion === total - 1 ? 'See My Results ✨' : 'Next ->';

  if (q.type === 'mc') {
    answerArea.classList.add('mc');
    q.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.option-btn').forEach((button) => button.classList.remove('selected'));
        btn.classList.add('selected');
        selectedOption = opt;
        nextBtn.disabled = false;
      });
      answerArea.appendChild(btn);
    });
    return;
  }

  if (q.type === 'scale') {
    answerArea.classList.add('scale-input');

    const labels = document.createElement('div');
    labels.className = 'scale-labels';
    labels.innerHTML = `<span>${q.minLabel || 'Low'}</span><span>${q.maxLabel || 'High'}</span>`;

    const scaleGrid = document.createElement('div');
    scaleGrid.className = 'scale-grid';

    for (let value = 1; value <= 10; value += 1) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'scale-btn';
      btn.textContent = String(value);
      btn.setAttribute('aria-label', `${value} out of 10`);
      btn.addEventListener('click', () => {
        scaleGrid.querySelectorAll('.scale-btn').forEach((button) => button.classList.remove('selected'));
        btn.classList.add('selected');
        selectedOption = `${value}/10`;
        nextBtn.disabled = false;
      });
      scaleGrid.appendChild(btn);
    }

    answerArea.appendChild(labels);
    answerArea.appendChild(scaleGrid);
    return;
  }

  answerArea.classList.add('text-input');
  const ta = document.createElement('textarea');
  ta.placeholder = 'Write your answer here...';
  ta.maxLength = 300;

  const counter = document.createElement('div');
  counter.className = 'char-count';
  counter.textContent = '0 / 300';

  ta.addEventListener('input', () => {
    const trimmedValue = ta.value.trim();
    counter.textContent = `${ta.value.length} / 300`;
    nextBtn.disabled = trimmedValue.length < 5;
    selectedOption = trimmedValue;
  });

  answerArea.appendChild(ta);
  answerArea.appendChild(counter);
  ta.focus();
}

// ===== NEXT BUTTON =====
document.getElementById('next-btn').addEventListener('click', () => {
  const q = activeQuestions[currentQuestion];

  answers.push({
    question: q.question,
    answer: selectedOption || ''
  });

  currentQuestion += 1;

  if (currentQuestion < activeQuestions.length) {
    loadQuestion();
    return;
  }

  runAnalysis();
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

  const models = await getAvailableModels();
  let lastError = 'AI request failed.';
  for (const model of models) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.href,
          'X-Title': 'Personality Matchmaker'
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: MODE_PROMPTS[currentMode] },
            { role: 'user', content: userMessage }
          ],
          max_tokens: 1024
        })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        lastError = data.error?.message || 'AI request failed.';
        console.warn(`Model ${model} failed:`, lastError);
        continue;
      }

      const raw = data.choices?.[0]?.message?.content;
      if (!raw) {
        lastError = 'AI returned an empty response.';
        console.warn(`Model ${model} returned no content.`);
        continue;
      }

      if (raw.toLowerCase().includes('provider returned error') || raw.toLowerCase().includes('no endpoints found')) {
        lastError = 'Provider error.';
        console.warn(`Model ${model} returned provider error in body.`);
        continue;
      }

      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        lastError = 'AI returned an unexpected format.';
        console.warn(`Model ${model} returned non-JSON:`, raw.slice(0, 100));
        continue;
      }

      clearInterval(interval);
      const result = JSON.parse(jsonMatch[0]);
      showResults(result);
      return;
    } catch (err) {
      lastError = 'Could not reach the AI. Check your connection and try again.';
    }
  }

  clearInterval(interval);
  showError(lastError);
}

// ===== SHAREABLE URL =====
function encodeResultToHash(data) {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  } catch {
    return null;
  }
}

function decodeResultFromHash(hash) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(hash))));
  } catch {
    return null;
  }
}

async function copyShareLink() {
  const hash = encodeResultToHash(currentResultData);
  if (!hash) { setShareStatus('Could not generate link.'); return; }
  const url = `${window.location.origin}${window.location.pathname}#${hash}`;
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = url;
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  setShareStatus('Link copied to clipboard!');
}

// ===== SHOW RESULTS =====
function showResults(data) {
  currentResultData = data;
  setShareStatus('');
  const hash = encodeResultToHash(data);
  if (hash) history.replaceState(null, '', `#${hash}`);
  document.getElementById('result-emoji').textContent = data.emoji || '✨';
  document.getElementById('result-title').textContent = data.title || 'Your Profile';
  document.getElementById('result-subtitle').textContent = data.subtitle || '';
  document.getElementById('result-body').textContent = data.description || '';

  const traitsEl = document.getElementById('result-traits');
  traitsEl.innerHTML = '';
  if (Array.isArray(data.traits)) {
    data.traits.forEach((trait) => {
      const tag = document.createElement('span');
      tag.className = 'trait-tag';
      tag.textContent = trait;
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
  currentResultData = null;
  setShareStatus('');
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
  document.querySelectorAll('.mode-btn').forEach((button) => button.classList.remove('selected'));
  currentMode = 'personality';
  currentQuestion = 0;
  answers = [];
  activeQuestions = [];
  hasChosenMode = false;
  currentResultData = null;
  quizLength = 10;
  lengthSlider.value = '10';
  updateLengthLabel();
  lengthPicker.classList.remove('visible');
  startBtn.disabled = true;
  startBtn.textContent = 'Choose a Quiz First ->';
  setShareStatus('');
  history.replaceState(null, '', window.location.pathname);
  showScreen('welcome');
});

document.getElementById('share-link-btn').addEventListener('click', copyShareLink);
document.getElementById('copy-result-btn').addEventListener('click', copyResultToClipboard);
document.getElementById('download-result-btn').addEventListener('click', downloadResultImage);

updateLengthLabel();

// ===== LOAD FROM SHARED URL =====
(function checkSharedResult() {
  const hash = window.location.hash.slice(1);
  if (!hash) return;
  const data = decodeResultFromHash(hash);
  if (data && data.title) showResults(data);
})();
