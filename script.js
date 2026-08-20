// ==========================================
// 1. GLOBAL STATES & DATA
// ==========================================

let currentStep = 1;
const onboardingData = {
  name: '', age: '', gender: '', goal: '', pattern: '', triggers: [], riskTime: '', targetDays: ''
};

const defaultLogo = "https://i.ibb.co/1tpcH1Rg/html-render-1.png";

// Ranks with specific benefits
const ranks = [
  { min: 0, max: 2, name: "Wood League", logoUrl: "https://i.ibb.co/1tpcH1Rg/html-render-1.png", next: "3 Days", benefits: ["The Start – journey begins"] },
  { min: 3, max: 6, name: "Bronze League", logoUrl: "https://i.ibb.co/0pXyYrqB/1787144222633.png", next: "7 Days", benefits: ["The Start – cravings & doubt begin", "Withdrawals Hit – urges, mood swings, brain fog"] },
  { min: 7, max: 9, name: "Silver League", logoUrl: "https://i.ibb.co/PGYLFGC6/1787149414212.png", next: "10 Days", benefits: ["Withdrawals Hit", "Clearer Mind – slight focus boost, less guilt", "Small Win – willpower rising"] },
  { min: 10, max: 13, name: "Gold League", logoUrl: "https://i.ibb.co/Y7T2Md1T/1787149453207.png", next: "14 Days", benefits: ["Energy Boost – feel more alive & alert"] },
  { min: 14, max: 20, name: "Platinum League", logoUrl: "https://i.ibb.co/mC9TC9z2/1787149488344.png", next: "21 Days", benefits: ["Better Control – urges reduce, discipline builds", "Sleep Improves – deeper, restful sleep begins"] },
  { min: 21, max: 29, name: "Diamond League", logoUrl: "https://i.ibb.co/gb4knVNw/1787164361213.png", next: "30 Days", benefits: ["Mood Balances – less anxious, more stable", "Skin Glows – brighter skin & eyes"] },
  { min: 30, max: 59, name: "Master League", logoUrl: "https://i.ibb.co/NRMcNyy/1787163001657.png", next: "60 Days", benefits: ["Confidence Up – better eye contact & posture", "1 Month Done – stronger, focused, consistent"] },
  { min: 60, max: 99, name: "Grandmaster League", logoUrl: "https://i.ibb.co/p67r29g6/1787163062978.png", next: "100 Days", benefits: ["Driven – goals matter more than urges", "Memory Boost – learn & recall faster", "Noticed More – people are drawn to your energy", "No Cravings – less addiction to screens"] },
  { min: 100, max: 364, name: "Titan League", logoUrl: "https://i.ibb.co/4nGpPkTB/1787163120591.png", next: "365 Days", benefits: ["Body Improves – muscle tone & stamina rise", "Calm Mind – better emotional control", "Hyper Focus – work/tasks feel easier", "New You – confident, sharp & unstoppable"] },
  { min: 365, max: 9999, name: "Legend League", logoUrl: "https://i.ibb.co/WvG42K78/1787163182723.png", next: "Max Rank", benefits: ["All previous milestones + Long-term transformation / New You"] }
];

const quotes = [
  '"The struggle you\'re in today is developing the strength you need for tomorrow."',
  '"Your future self will thank you for not giving up today."',
  '"Control your mind, or it will control you."',
  '"Urges are temporary, but glory is forever."',
  '"He who conquers himself is the mightiest warrior."'
];

// ==========================================
// 2. ONBOARDING & SINGLE-TIME CHECK LOGIC
// ==========================================

function updateOnboardingProgress() {
  const stepElem = document.getElementById('obStepIndicator');
  const barElem = document.getElementById('obProgressBar');
  if (stepElem) stepElem.innerText = `${currentStep} of 8`;
  if (barElem) barElem.style.width = `${(currentStep / 8) * 100}%`;
  
  document.querySelectorAll('.ob-screen').forEach((screen, index) => {
    screen.classList.toggle('active', index + 1 === currentStep);
  });

  const backBtn = document.getElementById('obBackBtn');
  if (backBtn) {
    backBtn.style.visibility = (currentStep === 1 || currentStep === 7 || currentStep === 8) ? 'hidden' : 'visible';
  }

  const obHeader = document.getElementById('onboardHeader');
  if (obHeader) {
    obHeader.style.display = (currentStep === 7 || currentStep === 8) ? 'none' : 'flex';
  }
}

function nextOnboardingStep() {
  if (currentStep === 1) {
    const nameInput = document.getElementById('obName');
    const name = nameInput ? nameInput.value.trim() : '';
    if (!name) {
      alert("Please enter your name to proceed.");
      return;
    }
    onboardingData.name = name;
    
    const ageInput = document.getElementById('obAge');
    const genderInput = document.getElementById('obGender');
    if (ageInput) onboardingData.age = ageInput.value;
    if (genderInput) onboardingData.gender = genderInput.value;
  }

  if (currentStep < 8) {
    currentStep++;
    updateOnboardingProgress();
  }
}

function prevOnboardingStep() {
  if (currentStep > 1) {
    currentStep--;
    updateOnboardingProgress();
  }
}

function selectSingleOption(field, value, element) {
  onboardingData[field] = value;
  const parent = element.parentElement;
  if (parent) {
    parent.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
  }
  element.classList.add('selected');
}

function toggleMultiOption(field, value, element) {
  element.classList.toggle('selected');
  if (element.classList.contains('selected')) {
    if (!onboardingData[field].includes(value)) onboardingData[field].push(value);
  } else {
    onboardingData[field] = onboardingData[field].filter(item => item !== value);
  }
}

function runPersonalizationAnimation() {
  nextOnboardingStep();
  
  const statusElem = document.getElementById('obAnimStatus');
  const statuses = [
    "Analyzing your goals...",
    "Identifying your triggers...",
    "Setting your milestones...",
    "Creating your plan..."
  ];

  let index = 0;
  const interval = setInterval(() => {
    index++;
    if (index < statuses.length) {
      if (statusElem) statusElem.innerText = statuses[index];
    } else {
      clearInterval(interval);
      populateResults();
      nextOnboardingStep();
    }
  }, 700);
}

function populateResults() {
  const nameElem = document.getElementById('planUserName');
  const goalElem = document.getElementById('resGoal');
  const targetElem = document.getElementById('resTarget');
  const triggerElem = document.getElementById('resTrigger');

  if (nameElem) nameElem.innerText = `Welcome, ${onboardingData.name}!`;
  if (goalElem) goalElem.innerText = onboardingData.goal || 'Quit Habit';
  if (targetElem) targetElem.innerText = onboardingData.targetDays || '90 Days';
  if (triggerElem) triggerElem.innerText = onboardingData.triggers[0] || onboardingData.riskTime || 'Late Night';
}

function completeOnboarding() {
  localStorage.setItem('user_onboarding_data', JSON.stringify(onboardingData));
  localStorage.setItem('has_completed_onboarding', 'true');
  
  const obContainer = document.getElementById('onboarding-container');
  const mainApp = document.getElementById('main-app-interface');
  
  if (obContainer) obContainer.style.display = 'none';
  if (mainApp) mainApp.style.display = 'block';
  
  if (!localStorage.getItem("nofap_start_date")) {
    startStreak();
  }
}

function checkOnboardingStatus() {
  const hasFinished = localStorage.getItem('has_completed_onboarding');
  const obContainer = document.getElementById('onboarding-container');
  const mainApp = document.getElementById('main-app-interface');

  if (hasFinished === 'true') {
    if (obContainer) obContainer.style.display = 'none';
    if (mainApp) mainApp.style.display = 'block';
  } else {
    if (obContainer) obContainer.style.display = 'flex';
    if (mainApp) mainApp.style.display = 'none';
  }
}

// ==========================================
// 3. MAIN DASHBOARD & TIMER
// ==========================================

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) targetPage.classList.add('active');
  
  if (window.event && window.event.currentTarget && window.event.currentTarget.classList.contains('nav-btn')) {
    window.event.currentTarget.classList.add('active');
  }
}

function startStreak() {
  localStorage.setItem("nofap_start_date", new Date().toISOString());
  updateTimer();
}

function updateTimer() {
  let startDate = localStorage.getItem("nofap_start_date");

  const startBtn = document.getElementById("startBtn");
  const resetBtn = document.getElementById("resetBtn");
  const leagueIcon = document.getElementById("leagueIcon");

  if (!startDate) {
    if (startBtn) startBtn.style.display = "block";
    if (resetBtn) resetBtn.style.display = "none";
    if (leagueIcon) leagueIcon.src = defaultLogo;
    return;
  }

  if (startBtn) startBtn.style.display = "none";
  if (resetBtn) resetBtn.style.display = "block";

  let diffTime = Math.abs(new Date() - new Date(startDate));
  
  let days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
  let mins = Math.floor((diffTime / (1000 * 60)) % 60);
  let secs = Math.floor((diffTime / 1000) % 60);

  const daysCount = document.getElementById("daysCount");
  const hoursCount = document.getElementById("hoursCount");
  const minsCount = document.getElementById("minsCount");
  const secsCount = document.getElementById("secsCount");
  const userPoints = document.getElementById("userPoints");

  if (daysCount) daysCount.innerText = days;
  if (hoursCount) hoursCount.innerText = hours < 10 ? "0" + hours : hours;
  if (minsCount) minsCount.innerText = mins < 10 ? "0" + mins : mins;
  if (secsCount) secsCount.innerText = secs < 10 ? "0" + secs : secs;
  if (userPoints) userPoints.innerText = (days * 10) + " PTS";

  let currentRank = ranks.find(r => days >= r.min && days <= r.max);
  if (currentRank) {
    const leagueTitle = document.getElementById("leagueTitle");
    const nextRank = document.getElementById("nextRank");
    
    if (leagueTitle) leagueTitle.innerText = currentRank.name;
    if (leagueIcon) leagueIcon.src = currentRank.logoUrl || defaultLogo;
    if (nextRank) nextRank.innerText = currentRank.next;
  }
}

function resetStreak() {
  if (confirm("Are you sure you want to reset your streak?")) {
    localStorage.removeItem("nofap_start_date");
    updateTimer();
  }
}

// ==========================================
// 4. TIMELINE & IN-APP LEAGUE DETAILS MODAL
// ==========================================

function renderTimeline() {
  let timelineContainer = document.getElementById("timelineList");
  if (!timelineContainer) return;
  
  timelineContainer.innerHTML = "";
  
  ranks.forEach((rank, index) => {
    let rankCard = document.createElement("div");
    rankCard.className = "timeline-card";
    
    rankCard.innerHTML = `
      <div class="tl-left">
        <img src="${rank.logoUrl}" class="tl-logo" alt="${rank.name}">
        <div class="tl-info">
           <h4>${rank.name}</h4>
           <p>Target: ${rank.min} Days</p>
        </div>
      </div>
      <div class="tl-badge">&gt;</div>
    `;

    rankCard.onclick = () => openLeagueModal(index);
    timelineContainer.appendChild(rankCard);
  });
}

function openLeagueModal(index) {
  let rank = ranks[index];
  let modal = document.getElementById("leagueDetailModal");
  if (!modal) return;

  document.getElementById("detailLeagueIcon").src = rank.logoUrl || defaultLogo;
  document.getElementById("detailLeagueTitle").innerText = rank.name;
  document.getElementById("detailLeagueTime").innerText = `Timeline: ${rank.min} - ${rank.max} Days`;
  document.getElementById("detailLeaguePoints").innerText = `⭐ ${rank.min * 10} Points Required`;

  let benefitsList = document.getElementById("detailBenefitsList");
  benefitsList.innerHTML = rank.benefits.map(b => `<li>⚡ ${b}</li>`).join("");

  modal.classList.add("active");
}

function closeLeagueModal() {
  let modal = document.getElementById("leagueDetailModal");
  if (modal) {
    modal.classList.remove("active");
  }
}

// ==========================================
// 5. URGE ALERT & NOTES SYSTEM
// ==========================================

function openUrgeModal() {
  const modal = document.getElementById("urgeModal");
  if (modal) modal.classList.add("active");
}

function closeUrgeModal() {
  const modal = document.getElementById("urgeModal");
  if (modal) modal.classList.remove("active");
}

function nextQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteElem = document.getElementById("quoteText");
  if (quoteElem) quoteElem.innerText = quotes[randomIndex];
}

function getStoredNotes() {
  let notes = localStorage.getItem("user_nofap_notes_list");
  return notes ? JSON.parse(notes) : [];
}

function renderNotes() {
  let notes = getStoredNotes();
  let notesContainer = document.getElementById("notesList");
  if (!notesContainer) return;
  
  notesContainer.innerHTML = "";

  if (notes.length === 0) {
    notesContainer.innerHTML = "<p style='font-size:12px; color:#64748b; text-align:center; margin-top:10px;'>No notes saved yet.</p>";
    return;
  }

  notes.forEach((item, index) => {
    let noteCard = document.createElement("div");
    noteCard.className = "note-card";
    noteCard.innerHTML = `
      <p>${item.text}</p>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
        <span class="note-time">${item.date}</span>
        <button onclick="deleteNote(${index})" style="background:none; border:none; color:#ef4444; font-size:10px; cursor:pointer;">🗑️ Delete</button>
      </div>
    `;
    notesContainer.appendChild(noteCard);
  });
}

function addNote() {
  let noteInput = document.getElementById("noteInput");
  if (!noteInput) return;
  
  let noteText = noteInput.value.trim();
  if (!noteText) {
    alert("Please write something before saving!");
    return;
  }

  let notes = getStoredNotes();
  notes.unshift({
    text: noteText,
    date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  });

  localStorage.setItem("user_nofap_notes_list", JSON.stringify(notes));
  noteInput.value = "";
  renderNotes();
}

function deleteNote(index) {
  if (confirm("Delete this note?")) {
    let notes = getStoredNotes();
    notes.splice(index, 1);
    localStorage.setItem("user_nofap_notes_list", JSON.stringify(notes));
    renderNotes();
  }
}

// ==========================================
// 6. INITIALIZATION CALLS
// ==========================================

checkOnboardingStatus();
renderTimeline();
renderNotes();
setInterval(updateTimer, 1000);
updateTimer();
                  
// Ranks with distinct benefits for each league
const ranks = [
  { 
    min: 0, max: 2, 
    name: "Wood League", 
    logoUrl: "https://i.ibb.co/1tpcH1Rg/html-render-1.png", 
    next: "3 Days", 
    benefits: [
      "The Beginning – Clean slate & fresh mindset",
      "Dopamine Reset Begins – Brain starts healing",
      "Decision Made – Taking control of your focus"
    ] 
  },
  { 
    min: 3, max: 6, 
    name: "Bronze League", 
    logoUrl: "https://i.ibb.co/0pXyYrqB/1787144222633.png", 
    next: "7 Days", 
    benefits: [
      "Testosterone Peak – Surge in natural energy",
      "Withdrawal Phase – Cravings & mood swings appear",
      "Initial Resistance – Building baseline willpower"
    ] 
  },
  { 
    min: 7, max: 9, 
    name: "Silver League", 
    logoUrl: "https://i.ibb.co/PGYLFGC6/1787149414212.png", 
    next: "10 Days", 
    benefits: [
      "Clearer Mind – Reduced brain fog & better focus",
      "Less Guilt – Emotional stability improving",
      "Small Win – Self-confidence starts building"
    ] 
  },
  { 
    min: 10, max: 13, 
    name: "Gold League", 
    logoUrl: "https://i.ibb.co/Y7T2Md1T/1787149453207.png", 
    next: "14 Days", 
    benefits: [
      "Energy Surge – Feeling more alert & active",
      "Better Gym/Workout Power – Physical stamina boost",
      "Sharper Instincts – Quick response & alertness"
    ] 
  },
  { 
    min: 14, max: 20, 
    name: "Platinum League", 
    logoUrl: "https://i.ibb.co/mC9TC9z2/1787149488344.png", 
    next: "21 Days", 
    benefits: [
      "Urges Drop – Urges become easier to manage",
      "Deeper Sleep – Improved REM & restful sleep",
      "Stronger Self-Discipline – Habit loop fading"
    ] 
  },
  { 
    min: 21, max: 29, 
    name: "Diamond League", 
    logoUrl: "https://i.ibb.co/gb4knVNw/1787164361213.png", 
    next: "30 Days", 
    benefits: [
      "Mood Balance – Lower anxiety & emotional balance",
      "Skin & Eye Glow – Brighter face & clearer eyes",
      "Dopamine Sensitivity – Enjoying daily simple things"
    ] 
  },
  { 
    min: 30, max: 59, 
    name: "Master League", 
    logoUrl: "https://i.ibb.co/NRMcNyy/1787163001657.png", 
    next: "60 Days", 
    benefits: [
      "High Self-Assurance – Better posture & eye contact",
      "1 Month Milestone – Mind rebooted & consistent",
      "Deeper Voice Projection – Stronger vocal presence"
    ] 
  },
  { 
    min: 60, max: 99, 
    name: "Grandmaster League", 
    logoUrl: "https://i.ibb.co/p67r29g6/1787163062978.png", 
    next: "100 Days", 
    benefits: [
      "Goal-Driven Mindset – Passion moves to real work",
      "Memory & Focus Boost – Fast learning & retention",
      "Magnetism – People sense your strong presence",
      "Zero Cravings – Screen & cheap dopamine addiction gone"
    ] 
  },
  { 
    min: 100, max: 364, 
    name: "Titan League", 
    logoUrl: "https://i.ibb.co/4nGpPkTB/1787163120591.png", 
    next: "365 Days", 
    benefits: [
      "Physical Transformation – Higher muscle tone & energy",
      "Calm & Fearless Mind – Complete emotional composure",
      "Unshakable Focus – Complex tasks feel smooth",
      "Lifestyle Evolution – Disciplined, sharp & steady"
    ] 
  },
  { 
    min: 365, max: 9999, 
    name: "Legend League", 
    logoUrl: "https://i.ibb.co/WvG42K78/1787163182723.png", 
    next: "Max Rank", 
    benefits: [
      "Full Neural Rewiring – Complete identity rebirth",
      "Unstoppable Willpower – Total mastery over mind",
      "Lifetime Discipline – Peak mental & physical state"
    ] 
  }
];
    
