// Global State Data
let currentStep = 1;
const totalSteps = 8;
let userPlanData = {
  name: '',
  age: '',
  gender: '',
  goal: '',
  pattern: '',
  triggers: [],
  riskTime: '',
  targetDays: ''
};

// Streak State Variables
let streakStartTime = null;
let timerInterval = null;

// Quotes Collection
const quotes = [
  "\"The struggle you're in today is developing the strength you need for tomorrow.\"",
  "\"Don't swap what you want most for what you want now.\"",
  "\"Greatness is born from self-control.\"",
  "\"Your future self will thank you for the choices you make today.\"",
  "\"Mastering yourself is true power.\""
];
let currentQuoteIdx = 0;

// ALL 10 LEAGUES DATA WITH DIRECT IMAGE LINKS
const leaguesData = [
  {
    name: "Wood League",
    minDays: 0,
    maxDays: 3,
    points: 0,
    icon: "https://i.ibb.co/1tpcH1Rg/html-render-1.png",
    timelineText: "Day 0 – Day 3",
    benefits: [
      "Initial detox phase begins",
      "Brain starts breaking instant gratification loops",
      "Improved initial awareness of mental triggers",
      "Unlock MindShield Daily Check-in Shield"
    ]
  },
  {
    name: "Bronze League",
    minDays: 3,
    maxDays: 7,
    points: 100,
    icon: "https://i.ibb.co/0pXyYrqB/1787144222633.png",
    timelineText: "Day 3 – Day 7",
    benefits: [
      "Energy levels begin to stabilize",
      "Reduction in brain fog and lethargy",
      "Dopamine receptors start resetting",
      "Unlock Bronze Warrior Badge"
    ]
  },
  {
    name: "Silver League",
    minDays: 7,
    maxDays: 14,
    points: 300,
    icon: "https://i.ibb.co/PGYLFGC6/1787149414212.png",
    timelineText: "Day 7 – Day 14",
    benefits: [
      "Noticeable boost in self-confidence",
      "Enhanced focus & mental clarity during daily tasks",
      "Lowered anxiety & better eye contact",
      "Unlock Silver Mindset Notebook Insights"
    ]
  },
  {
    name: "Gold League",
    minDays: 14,
    maxDays: 30,
    points: 700,
    icon: "https://i.ibb.co/Y7T2Md1T/1787149453207.png",
    timelineText: "Day 14 – Day 30",
    benefits: [
      "Deeper sleep quality and faster physical recovery",
      "Strong motivation to pursue physical fitness & hobbies",
      "Significant mastery over immediate urges",
      "Unlock Gold Guardian Title"
    ]
  },
  {
    name: "Platinum League",
    minDays: 30,
    maxDays: 60,
    points: 1500,
    icon: "https://i.ibb.co/mC9TC9z2/1787149488344.png",
    timelineText: "Day 30 – Day 60",
    benefits: [
      "Major neuroplastic rewiring of reward pathways",
      "High emotional stability & stress resistance",
      "Naturally increased willpower in all life areas",
      "Unlock Platinum Conqueror Status"
    ]
  },
  {
    name: "Diamond League",
    minDays: 60,
    maxDays: 90,
    points: 3000,
    icon: "https://i.ibb.co/gb4knVNw/1787164361213.png",
    timelineText: "Day 60 – Day 90",
    benefits: [
      "Complete habit transformation achieved",
      "Unshakable self-discipline & high productivity",
      "Natural aura, confidence, and posture overhaul",
      "Unlock Diamond Elite Badge"
    ]
  },
  {
    name: "Master League",
    minDays: 90,
    maxDays: 120,
    points: 5000,
    icon: "https://i.ibb.co/NRMcNyy/1787163001657.png",
    timelineText: "Day 90 – Day 120",
    benefits: [
      "Mastery over mind and impulses",
      "Peak focus and elevated baseline mood",
      "Strong inner calm under extreme pressure",
      "Unlock Master League Identity"
    ]
  },
  {
    name: "Grandmaster League",
    minDays: 120,
    maxDays: 180,
    points: 8000,
    icon: "https://i.ibb.co/p67r29g6/1787163062978.png",
    timelineText: "Day 120 – Day 180",
    benefits: [
      "Total mental purity & sharp cognitive edge",
      "High level charisma and leadership presence",
      "Complete elimination of old toxic dependency",
      "Unlock Grandmaster Insignia"
    ]
  },
  {
    name: "Titan League",
    minDays: 180,
    maxDays: 365,
    points: 12000,
    icon: "https://i.ibb.co/4nGpPkTB/1787163120591.png",
    timelineText: "Day 180 – Day 365",
    benefits: [
      "Immense physical & mental drive",
      "Massive success in long-term personal goals",
      "Virtually immune to weak temporary triggers",
      "Unlock Titan Shield Crest"
    ]
  },
  {
    name: "Legend League",
    minDays: 365,
    maxDays: 1000,
    points: 25000,
    icon: "https://i.ibb.co/WvG42K78/1787163182723.png",
    timelineText: "1 Year & Above",
    benefits: [
      "Ultimate personal freedom achieved",
      "Lifetime mastery of self-control",
      "An inspiration for others starting the path",
      "Unlock Legend Supreme Status"
    ]
  }
];

// Onboarding Logic
function updateOnboardingUI() {
  document.querySelectorAll('.ob-screen').forEach((el, index) => {
    el.classList.toggle('active', index + 1 === currentStep);
  });

  const progressBar = document.getElementById('obProgressBar');
  const stepIndicator = document.getElementById('obStepIndicator');

  if (progressBar) progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;
  if (stepIndicator) stepIndicator.textContent = `${currentStep} of ${totalSteps}`;
}

function nextOnboardingStep() {
  if (currentStep === 1) {
    const name = document.getElementById('obName').value.trim();
    if (!name) {
      alert("Please enter your name to proceed.");
      return;
    }
    userPlanData.name = name;
    userPlanData.age = document.getElementById('obAge').value;
    userPlanData.gender = document.getElementById('obGender').value;
  }

  if (currentStep < totalSteps) {
    currentStep++;
    updateOnboardingUI();
  }
}

function prevOnboardingStep() {
  if (currentStep > 1) {
    currentStep--;
    updateOnboardingUI();
  }
}

function selectSingleOption(key, value, element) {
  userPlanData[key] = value;
  const parent = element.parentElement;
  parent.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
  element.classList.add('selected');
}

function toggleMultiOption(key, value, element) {
  element.classList.toggle('selected');
  if (element.classList.contains('selected')) {
    if (!userPlanData[key].includes(value)) userPlanData[key].push(value);
  } else {
    userPlanData[key] = userPlanData[key].filter(v => v !== value);
  }
}

function runPersonalizationAnimation() {
  currentStep = 7;
  updateOnboardingUI();

  const statusText = document.getElementById('obAnimStatus');
  const statuses = [
    "Analyzing your goals...",
    "Mapping high-risk windows...",
    "Creating personalized milestones...",
    "Finalizing MindShield Plan..."
  ];

  let idx = 0;
  const interval = setInterval(() => {
    idx++;
    if (idx < statuses.length) {
      statusText.textContent = statuses[idx];
    } else {
      clearInterval(interval);
      populateResultsScreen();
      currentStep = 8;
      updateOnboardingUI();
    }
  }, 700);
}

function populateResultsScreen() {
  document.getElementById('planUserName').textContent = `Welcome, ${userPlanData.name || 'Warrior'}!`;
  document.getElementById('resGoal').textContent = userPlanData.goal || 'Quit Both';
  document.getElementById('resTarget').textContent = userPlanData.targetDays || '90 Days';
  document.getElementById('resTrigger').textContent = userPlanData.triggers.length ? userPlanData.triggers[0] : 'Late Night';
  document.getElementById('resLevel').textContent = 'Wood League';
  document.getElementById('resMilestone').textContent = '3 Days';
}

function completeOnboarding() {
  document.getElementById('onboarding-container').style.display = 'none';
  document.getElementById('main-app-interface').style.display = 'flex';
  renderTimeline();
  loadSavedStreak();
}

// Bottom Navigation Switching
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  document.getElementById(pageId).classList.add('active');
  
  const navBtns = document.querySelectorAll('.nav-btn');
  if(pageId === 'page-home') navBtns[0].classList.add('active');
  if(pageId === 'page-timeline') navBtns[1].classList.add('active');
  if(pageId === 'page-motivation') navBtns[2].classList.add('active');
  if(pageId === 'page-notes') navBtns[3].classList.add('active');
}

// Streak Timer & Mechanics
function startStreak() {
  streakStartTime = Date.now();
  localStorage.setItem('mindshield_streak_start', streakStartTime);
  document.getElementById('startBtn').style.display = 'none';
  document.getElementById('resetBtn').style.display = 'block';
  runTimer();
}

function resetStreak() {
  if (confirm("Are you sure you want to reset your streak? Stay strong!")) {
    streakStartTime = null;
    localStorage.removeItem('mindshield_streak_start');
    clearInterval(timerInterval);
    
    document.getElementById('daysCount').textContent = '0';
    document.getElementById('hoursCount').textContent = '00';
    document.getElementById('minsCount').textContent = '00';
    document.getElementById('secsCount').textContent = '00';
    
    document.getElementById('userPoints').textContent = '0 PTS';
    document.getElementById('leagueTitle').textContent = 'Wood League';
    document.getElementById('leagueIcon').src = leaguesData[0].icon;
    
    document.getElementById('startBtn').style.display = 'block';
    document.getElementById('resetBtn').style.display = 'none';
  }
}

function loadSavedStreak() {
  const saved = localStorage.getItem('mindshield_streak_start');
  if (saved) {
    streakStartTime = parseInt(saved, 10);
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'block';
    runTimer();
  }
}

function runTimer() {
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (!streakStartTime) return;

    const now = Date.now();
    const diff = now - streakStartTime;

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    document.getElementById('daysCount').textContent = days;
    document.getElementById('hoursCount').textContent = hours < 10 ? '0' + hours : hours;
    document.getElementById('minsCount').textContent = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('secsCount').textContent = seconds < 10 ? '0' + seconds : seconds;

    // Points calculation (50 pts per day, 2 pts per hour)
    const calculatedPoints = (days * 50) + (hours * 2);
    document.getElementById('userPoints').textContent = `${calculatedPoints} PTS`;

    updateLeagueStatus(days);
  }, 1000);
}

function updateLeagueStatus(days) {
  let currentLeague = leaguesData[0];
  let nextTarget = "3 Days";

  for (let i = 0; i < leaguesData.length; i++) {
    if (days >= leaguesData[i].minDays) {
      currentLeague = leaguesData[i];
      nextTarget = leaguesData[i + 1] ? `${leaguesData[i + 1].minDays} Days` : "Max Rank";
    }
  }

  document.getElementById('leagueTitle').textContent = currentLeague.name;
  document.getElementById('leagueIcon').src = currentLeague.icon;
  document.getElementById('nextRank').textContent = nextTarget;
}

// Timeline Rendering & Modal System
function renderTimeline() {
  const timelineList = document.getElementById('timelineList');
  if (!timelineList) return;

  timelineList.innerHTML = '';
  
  leaguesData.forEach((league, index) => {
    const card = document.createElement('div');
    card.className = 'timeline-card';
    card.onclick = () => openLeagueModal(index);

    card.innerHTML = `
      <div class="tl-left">
        <img src="${league.icon}" class="tl-logo" alt="${league.name}">
        <div class="tl-info">
          <h4>${league.name}</h4>
          <p>${league.timelineText} • ⭐ ${league.points} PTS</p>
        </div>
      </div>
      <div class="tl-badge">View Benefits</div>
    `;

    timelineList.appendChild(card);
  });
}

function openLeagueModal(index) {
  const league = leaguesData[index];
  
  document.getElementById('detailLeagueIcon').src = league.icon;
  document.getElementById('detailLeagueTitle').textContent = league.name;
  document.getElementById('detailLeagueTime').textContent = `Timeline: ${league.timelineText}`;
  document.getElementById('detailLeaguePoints').textContent = `⭐ ${league.points} Points Required`;

  const benefitsList = document.getElementById('detailBenefitsList');
  benefitsList.innerHTML = '';
  
  league.benefits.forEach(benefit => {
    const li = document.createElement('li');
    li.textContent = benefit;
    benefitsList.appendChild(li);
  });

  document.getElementById('leagueDetailModal').classList.add('active');
}

function closeLeagueModal() {
  document.getElementById('leagueDetailModal').classList.remove('active');
}

// Urge Modal Logic
function openUrgeModal() {
  document.getElementById('urgeModal').classList.add('active');
}

function closeUrgeModal() {
  document.getElementById('urgeModal').classList.remove('active');
}

// Quotes Logic
function nextQuote() {
  currentQuoteIdx = (currentQuoteIdx + 1) % quotes.length;
  document.getElementById('quoteText').textContent = quotes[currentQuoteIdx];
}

// Notebook Logic
function addNote() {
  const input = document.getElementById('noteInput');
  const text = input.value.trim();
  if (!text) return;

  const notesList = document.getElementById('notesList');
  const card = document.createElement('div');
  card.className = 'note-card';

  const timeStr = new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' });
  card.innerHTML = `
    <p>${text}</p>
    <div class="note-time">${timeStr}</div>
  `;

  notesList.prepend(card);
  input.value = '';
      }
    
