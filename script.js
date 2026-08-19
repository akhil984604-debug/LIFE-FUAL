// Default logo (Wood League)
const defaultLogo = "https://i.ibb.co/1tpcH1Rg/html-render-1.png";

// 10 Leagues with Direct Image Links & Short Professional Benefits
const ranks = [
  { 
    min: 0, 
    max: 2, 
    name: "Wood League", 
    logoUrl: "https://i.ibb.co/1tpcH1Rg/html-render-1.png", 
    next: "3 Days",
    benefits: [
      "Journey Begins"
    ]
  },
  { 
    min: 3, 
    max: 6, 
    name: "Bronze League", 
    logoUrl: "https://i.ibb.co/0pXyYrqB/1787144222633.png", 
    next: "7 Days",
    benefits: [
      "Cravings Begin",
      "Brain Fog"
    ]
  },
  { 
    min: 7, 
    max: 9, 
    name: "Silver League", 
    logoUrl: "https://i.ibb.co/PGYLFGC6/1787149414212.png", 
    next: "10 Days",
    benefits: [
      "Clearer Mind",
      "Willpower Up"
    ]
  },
  { 
    min: 10, 
    max: 13, 
    name: "Gold League", 
    logoUrl: "https://i.ibb.co/Y7T2Md1T/1787149453207.png", 
    next: "14 Days",
    benefits: [
      "Energy Boost"
    ]
  },
  { 
    min: 14, 
    max: 20, 
    name: "Platinum League", 
    logoUrl: "https://i.ibb.co/mC9TC9z2/1787149488344.png", 
    next: "21 Days",
    benefits: [
      "Better Control",
      "Better Sleep"
    ]
  },
  { 
    min: 21, 
    max: 29, 
    name: "Diamond League", 
    logoUrl: "https://i.ibb.co/gb4knVNw/1787164361213.png", 
    next: "30 Days",
    benefits: [
      "Stable Mood",
      "Skin Glow"
    ]
  },
  { 
    min: 30, 
    max: 59, 
    name: "Master League", 
    logoUrl: "https://i.ibb.co/NRMcNyy/1787163001657.png", 
    next: "60 Days",
    benefits: [
      "Confidence Up",
      "Stronger Focus"
    ]
  },
  { 
    min: 60, 
    max: 99, 
    name: "Grandmaster League", 
    logoUrl: "https://i.ibb.co/p67r29g6/1787163062978.png", 
    next: "100 Days",
    benefits: [
      "Driven Mind",
      "Better Memory"
    ]
  },
  { 
    min: 100, 
    max: 364, 
    name: "Titan League", 
    logoUrl: "https://i.ibb.co/4nGpPkTB/1787163120591.png", 
    next: "365 Days",
    benefits: [
      "Better Body",
      "Calm Mind",
      "Hyper Focus"
    ]
  },
  { 
    min: 365, 
    max: 9999, 
    name: "Legend League", 
    logoUrl: "https://i.ibb.co/WvG42K78/1787163182723.png", 
    next: "Max Rank",
    benefits: [
      "Long-Term Transformation"
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
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
  
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
    rankCard.style.cursor = "pointer";
    
    let daysText = rank.min === 365 ? "365 Days (3650 Pts)" : `${rank.min} Days (${rank.min * 10} Pts)`;
    
    rankCard.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <img src="${rank.logoUrl}" style="width:28px; height:28px; border-radius:50%; object-fit:cover;">
        <span>${rank.name}</span>
      </div>
      <b>${daysText}</b>
    `;

    // Click event to open dedicated League Details Page
    rankCard.onclick = () => openLeagueDetailsPage(index);
    
    timelineContainer.appendChild(rankCard);
  });
}

/* --- OPEN SEPARATE LEAGUE DETAILS PAGE --- */
function openLeagueDetailsPage(index) {
  let rank = ranks[index];
  
  let detailsPage = document.getElementById("page-league-detail");
  if (!detailsPage) {
    // Create separate page container dynamically if missing
    detailsPage = document.createElement("div");
    detailsPage.id = "page-league-detail";
    detailsPage.className = "page";
    
    const container = document.querySelector(".app-container");
    const navbar = document.querySelector(".navbar");
    container.insertBefore(detailsPage, navbar);
  }

  let benefitsItems = rank.benefits.map(b => `
    <li style="margin-bottom:12px; display:flex; align-items:center; gap:10px; font-size:13px; color:#e2e8f0; background:rgba(255,255,255,0.03); padding:10px 14px; border-radius:10px; border-left:3px solid #f59e0b;">
      <span>⚡</span> <span><b>${b}</b></span>
    </li>
  `).join("");

  detailsPage.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">
      <button onclick="closeLeagueDetailsPage()" style="background:#181b26; color:#f59e0b; border:1px solid rgba(245,158,11,0.3); padding:6px 14px; border-radius:8px; font-weight:bold; cursor:pointer; font-size:12px;">← Back</button>
      <span style="font-size:11px; color:#888; font-weight:600; letter-spacing:1px;">LEAGUE INFO</span>
    </div>

    <div style="text-align:center; padding:10px 0;">
      <div style="position:relative; width:90px; height:90px; margin:0 auto 12px auto;">
        <img src="${rank.logoUrl}" style="width:100%; height:100%; border-radius:50%; object-fit:cover; border:2px solid #f59e0b; box-shadow: 0 0 15px rgba(245,158,11,0.3);">
      </div>
      <h2 style="font-size:20px; color:#fff; font-weight:800; margin-bottom:4px;">${rank.name}</h2>
      <span style="background:rgba(245,158,11,0.15); color:#f59e0b; padding:4px 12px; border-radius:20px; font-size:11px; font-weight:600; display:inline-block; margin-bottom:20px;">
        Target: ${rank.min} Days (${rank.min * 10} PTS)
      </span>
    </div>

    <div style="background:#181b26; border-radius:16px; padding:16px; border:1px solid rgba(255,255,255,0.05);">
      <h4 style="color:#f59e0b; font-size:12px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; margin-bottom:12px;">🏆 Benefits & Unlockables</h4>
      <ul style="list-style:none; padding:0; margin:0;">
        ${benefitsItems}
      </ul>
    </div>
  `;

  showPage("page-league-detail");
}

function closeLeagueDetailsPage() {
  showPage("page-timeline");
  
  // Highlight Timeline button in navbar
  document.querySelectorAll('.nav-btn').forEach((b, idx) => {
    if (idx === 1) b.classList.add('active');
    else b.classList.remove('active');
  });
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
