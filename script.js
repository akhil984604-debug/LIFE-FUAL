// Default logo (Wood League)
const defaultLogo = "https://i.ibb.co/1tpcH1Rg/html-render-1.png";

// 10 Leagues with ImgBB Direct Image Links & Benefits
const ranks = [
  { 
    min: 0, 
    max: 2, 
    name: "Wood League", 
    logoUrl: "https://i.ibb.co/1tpcH1Rg/html-render-1.png", 
    next: "3 Days",
    benefits: [
      "The Start – Journey begins"
    ]
  },
  { 
    min: 3, 
    max: 6, 
    name: "Bronze League", 
    logoUrl: "https://i.ibb.co/0pXyYrqB/1787144222633.png", 
    next: "7 Days",
    benefits: [
      "The Start – Cravings & doubt begin",
      "Withdrawals Hit – Urges, mood swings, brain fog"
    ]
  },
  { 
    min: 7, 
    max: 9, 
    name: "Silver League", 
    logoUrl: "https://i.ibb.co/PGYLFGC6/1787149414212.png", 
    next: "10 Days",
    benefits: [
      "Withdrawals Hit",
      "Clearer Mind – Slight focus boost, less guilt",
      "Small Win – Willpower rising"
    ]
  },
  { 
    min: 10, 
    max: 13, 
    name: "Gold League", 
    logoUrl: "https://i.ibb.co/Y7T2Md1T/1787149453207.png", 
    next: "14 Days",
    benefits: [
      "Energy Boost – Feel more alive & alert"
    ]
  },
  { 
    min: 14, 
    max: 20, 
    name: "Platinum League", 
    logoUrl: "https://i.ibb.co/mC9TC9z2/1787149488344.png", 
    next: "21 Days",
    benefits: [
      "Better Control – Urges reduce, discipline builds",
      "Sleep Improves – Deeper, restful sleep begins"
    ]
  },
  { 
    min: 21, 
    max: 29, 
    name: "Diamond League", 
    logoUrl: "https://i.ibb.co/gb4knVNw/1787164361213.png", 
    next: "30 Days",
    benefits: [
      "Mood Balances – Less anxious, more stable",
      "Skin Glows – Brighter skin & eyes"
    ]
  },
  { 
    min: 30, 
    max: 59, 
    name: "Master League", 
    logoUrl: "https://i.ibb.co/NRMcNyy/1787163001657.png", 
    next: "60 Days",
    benefits: [
      "Confidence Up – Better eye contact & posture",
      "1 Month Done – Stronger, focused, consistent"
    ]
  },
  { 
    min: 60, 
    max: 99, 
    name: "Grandmaster League", 
    logoUrl: "https://i.ibb.co/p67r29g6/1787163062978.png", 
    next: "100 Days",
    benefits: [
      "Driven – Goals matter more than urges",
      "Memory Boost – Learn & recall faster",
      "Noticed More – People are drawn to your energy",
      "No Cravings – Less addiction to screens"
    ]
  },
  { 
    min: 100, 
    max: 364, 
    name: "Titan League", 
    logoUrl: "https://i.ibb.co/4nGpPkTB/1787163120591.png", 
    next: "365 Days",
    benefits: [
      "Body Improves – Muscle tone & stamina rise",
      "Calm Mind – Better emotional control",
      "Hyper Focus – Work/tasks feel easier",
      "New You – Confident, sharp & unstoppable"
    ]
  },
  { 
    min: 365, 
    max: 9999, 
    name: "Legend League", 
    logoUrl: "https://i.ibb.co/WvG42K78/1787163182723.png", 
    next: "Max Rank",
    benefits: [
      "All previous milestones + Long-term transformation / New You"
    ]
  }
];

// Motivation Quotes
const quotes = [
  '"The struggle you\'re in today is developing the strength you need for tomorrow."',
  '"Your future self will thank you for not giving up today."',
  '"Control your mind, or it will control you."',
  '"Urges are temporary, but glory is forever."',
  '"He who conquers himself is the mightiest warrior."',
  '"Don\'t trade what you want most for what you want now."',
  '"Pain is temporary. Quitting lasts forever."',
  '"Discipline is choosing between what you want now and what you want most."',
  '"A year from now you may wish you had started today."',
  '"Every time you resist an urge, you build a stronger mind."',
  '"Greatness is built in the moments when no one is watching."',
  '"Master your emotions before they master you."',
  '"Success is not given. It is earned through self-control."',
  '"Small daily victories lead to massive life changes."',
  '"The pain of discipline is far less than the pain of regret."'
];

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  
  document.getElementById(pageId).classList.add('active');
  
  if (window.event && window.event.currentTarget) {
    window.event.currentTarget.classList.add('active');
  }
}

function startStreak() {
  localStorage.setItem("nofap_start_date", new Date().toISOString());
  updateTimer();
}

function updateTimer() {
  let startDate = localStorage.getItem("nofap_start_date");

  if (!startDate) {
    document.getElementById("startBtn").style.display = "block";
    document.getElementById("resetBtn").style.display = "none";
    document.getElementById("leagueIcon").src = defaultLogo;
    return;
  }

  document.getElementById("startBtn").style.display = "none";
  document.getElementById("resetBtn").style.display = "block";

  let diffTime = Math.abs(new Date() - new Date(startDate));
  
  let days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
  let mins = Math.floor((diffTime / (1000 * 60)) % 60);
  let secs = Math.floor((diffTime / 1000) % 60);

  document.getElementById("daysCount").innerText = days;
  document.getElementById("hoursCount").innerText = hours < 10 ? "0" + hours : hours;
  document.getElementById("minsCount").innerText = mins < 10 ? "0" + mins : mins;
  document.getElementById("secsCount").innerText = secs < 10 ? "0" + secs : secs;

  document.getElementById("userPoints").innerText = (days * 10) + " PTS";

  let currentRank = ranks.find(r => days >= r.min && days <= r.max);
  if (currentRank) {
    document.getElementById("leagueTitle").innerText = currentRank.name;
    document.getElementById("leagueIcon").src = currentRank.logoUrl || defaultLogo;
    document.getElementById("nextRank").innerText = currentRank.next;
  }
}

function resetStreak() {
  if (confirm("Are you sure you want to reset your streak?")) {
    localStorage.removeItem("nofap_start_date");
    document.getElementById("daysCount").innerText = "0";
    document.getElementById("hoursCount").innerText = "00";
    document.getElementById("minsCount").innerText = "00";
    document.getElementById("secsCount").innerText = "00";
    document.getElementById("leagueTitle").innerText = "Wood League";
    document.getElementById("leagueIcon").src = defaultLogo;
    updateTimer();
  }
}

/* --- URGE ALERT MODAL --- */
function openUrgeModal() {
  document.getElementById("urgeModal").classList.add("active");
}

function closeUrgeModal() {
  document.getElementById("urgeModal").classList.remove("active");
}

function nextQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById("quoteText").innerText = quotes[randomIndex];
}

/* --- RENDER TIMELINE WITH CLICKABLE LEAGUES --- */
function renderTimeline() {
  let timelineContainer = document.getElementById("timelineList");
  if (!timelineContainer) return;
  
  timelineContainer.innerHTML = "";
  ranks.forEach((rank, index) => {
    let rankCard = document.createElement("div");
    rankCard.className = "rank-card";
    rankCard.style.cursor = "pointer"; // Clickable style
    
    let daysText = rank.min === 365 ? "365 Days (3650 Pts)" : `${rank.min} Days (${rank.min * 10} Pts)`;
    
    rankCard.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <img src="${rank.logoUrl}" style="width:28px; height:28px; border-radius:50%; object-fit:cover;">
        <span>${rank.name}</span>
      </div>
      <b>${daysText}</b>
    `;

    // Click event to open League Benefits Modal
    rankCard.onclick = () => showLeagueDetails(index);
    
    timelineContainer.appendChild(rankCard);
  });
}

/* --- SHOW LEAGUE DETAILS MODAL --- */
function showLeagueDetails(index) {
  let rank = ranks[index];
  
  let modal = document.getElementById("leagueDetailModal");
  if (!modal) {
    // Dynamically create modal if it doesn't exist in HTML
    modal = document.createElement("div");
    modal.id = "leagueDetailModal";
    modal.className = "modal";
    document.body.appendChild(modal);
  }

  let benefitsList = rank.benefits.map(b => `<li style="margin-bottom:8px; text-align:left;">✨ ${b}</li>`).join("");

  modal.innerHTML = `
    <div class="modal-content" style="text-align:center; padding:20px; max-width:320px; margin:auto;">
      <img src="${rank.logoUrl}" style="width:70px; height:70px; border-radius:50%; margin-bottom:10px; object-fit:cover;">
      <h2 style="margin:5px 0;">${rank.name}</h2>
      <p style="color:#888; font-size:13px; margin-bottom:15px;">Target: ${rank.min} Days</p>
      
      <div style="background:#111; padding:12px; border-radius:8px; border:1px solid #333; margin-bottom:15px;">
        <h4 style="margin-top:0; color:#fff; text-align:left; border-bottom:1px solid #222; padding-bottom:5px;">Benefits & Milestones:</h4>
        <ul style="padding-left:15px; margin:0; font-size:12px; color:#ccc;">
          ${benefitsList}
        </ul>
      </div>

      <button onclick="closeLeagueModal()" style="padding:8px 20px; background:#444; color:#fff; border:none; border-radius:5px; cursor:pointer;">Close</button>
    </div>
  `;

  modal.classList.add("active");
}

function closeLeagueModal() {
  let modal = document.getElementById("leagueDetailModal");
  if (modal) modal.classList.remove("active");
}

/* --- MULTIPLE NOTES SYSTEM --- */
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
    notesContainer.innerHTML = "<p style='font-size:11px; color:#555; text-align:center; margin-top:10px;'>No notes saved yet.</p>";
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
  let noteText = document.getElementById("noteInput").value.trim();
  if (!noteText) {
    alert("Please write something before saving!");
    return;
  }

  let notes = getStoredNotes();
  let newNote = {
    text: noteText,
    date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  };

  notes.unshift(newNote);
  localStorage.setItem("user_nofap_notes_list", JSON.stringify(notes));
  
  document.getElementById("noteInput").value = "";
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

// Initial Calls
renderTimeline();
renderNotes();
setInterval(updateTimer, 1000);
updateTimer();
      
