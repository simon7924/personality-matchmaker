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
    q.options.forEach((opt, i) => {
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

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: currentMode,
        playerName,
        answers
      })
    });

    clearInterval(interval);

    if (!response.ok) {
      const err = await response.json();
      showError(err.error || 'Something went wrong.');
      return;
    }

    const result = await response.json();
    showResults(result);

  } catch (err) {
    clearInterval(interval);
    showError('Could not connect to the server. Is it running?');
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
