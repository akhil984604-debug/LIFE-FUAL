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
// 4. PREMIUM CARD MODAL LEAGUE DETAILS
// ==========================================

function renderTimeline() {
  let timelineContainer = document.getElementById("timelineList");
  if (!timelineContainer) return;
  
  timelineContainer.innerHTML = "";
  
  ranks.forEach((rank, index) => {
    let rankCard = document.createElement("div");
    rankCard.className = "rank-card";
    rankCard.style.cursor = "pointer";
    
    rankCard.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <img src="${rank.logoUrl}" style="width:35px; height:35px; border-radius:50%; object-fit:cover;">
        <div>
           <div style="font-weight:bold;">${rank.name}</div>
           <div style="font-size:11px; color:#64748b;">Target: ${rank.min} Days</div>
        </div>
      </div>
      <div style="color:#f59e0b; font-weight:bold;">&gt;</div>
    `;

    rankCard.onclick = () => openLeagueDetailsPage(index);
    timelineContainer.appendChild(rankCard);
  });
}

function openLeagueDetailsPage(index) {
  let rank = ranks[index];
  
  let modalOverlay = document.getElementById("leagueModalOverlay");
  if (!modalOverlay) {
    modalOverlay = document.createElement("div");
    modalOverlay.id = "leagueModalOverlay";
    document.body.appendChild(modalOverlay);
  }

  let benefitsItems = rank.benefits.map(b => `
    <div style="padding:10px 12px; background:rgba(255, 255, 255, 0.03); border:1px solid rgba(245, 158, 11, 0.2); border-radius:10px; font-size:12px; color:#e2e8f0; line-height:1.4; display:flex; align-items:center; gap:8px;">
      <span style="color:#f59e0b; font-size:14px;">⚡</span>
      <span>${b}</span>
    </div>
  `).join("");

  // Glassmorphic Premium Modal Card Styling
  modalOverlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(10, 15, 29, 0.82); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;
  `;

  modalOverlay.innerHTML = `
    <div style="width:100%; max-width:340px; background:linear-gradient(145deg, #1e293b, #0f172a); border:1px solid rgba(245, 158, 11, 0.3); border-radius:20px; padding:20px; box-shadow:0 20px 40px rgba(0,0,0,0.6); display:flex; flex-direction:column; gap:16px; position:relative; box-sizing:border-box;">
      
      <button onclick="closeLeagueDetailsPage()" style="position:absolute; top:14px; right:14px; background:rgba(255,255,255,0.06); border:none; color:#94a3b8; font-size:16px; width:30px; height:30px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center;">✕</button>

      <div style="text-align:center;">
        <div style="position:relative; width:70px; height:70px; margin:0 auto 10px;">
          <img src="${rank.logoUrl}" style="width:100%; height:100%; border-radius:50%; object-fit:cover; border:2px solid #f59e0b; box-shadow:0 0 15px rgba(245, 158, 11, 0.3);">
        </div>
        <h2 style="margin:0; font-size:19px; font-weight:700; color:#fff; tracking-tight">${rank.name}</h2>
        <span style="display:inline-block; margin-top:4px; padding:3px 10px; background:rgba(245, 158, 11, 0.15); color:#f59e0b; font-size:11px; font-weight:600; border-radius:12px;">Unlocked at ${rank.min} Days</span>
      </div>

      <div style="display:flex; flex-direction:column; gap:8px;">
        <div style="font-size:11px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.8px;">League Benefits</div>
        ${benefitsItems}
      </div>

      <button onclick="closeLeagueDetailsPage()" style="width:100%; padding:11px; background:linear-gradient(135deg, #f59e0b, #d97706); border:none; border-radius:12px; color:#0f172a; font-weight:700; font-size:13px; cursor:pointer; box-shadow:0 4px 12px rgba(245, 158, 11, 0.25);">Got it</button>

    </div>
  `;

  modalOverlay.style.display = "flex";
}

function closeLeagueDetailsPage() {
  const modalOverlay = document.getElementById("leagueModalOverlay");
  if (modalOverlay) {
    modalOverlay.style.display = "none";
    modalOverlay.innerHTML = "";
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
      <div class="note-footer">
        <span>${item.date}</span>
        <button onclick="deleteNote(${index})" class="btn-delete-note">🗑️ Delete</button>
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
      
