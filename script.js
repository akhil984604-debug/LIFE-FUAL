// Default logo (Wood League)
const defaultLogo = "https://kommodo.ai/i/lrM8LoXIL9NaVOJeP0JV";

// 10 Leagues with custom images and 365 days Legend target
const ranks = [
  { min: 0, max: 2, name: "Wood League", logoUrl: "https://kommodo.ai/i/lrM8LoXIL9NaVOJeP0JV", next: "3 Days" },
  { min: 3, max: 6, name: "Bronze League", logoUrl: "https://kommodo.ai/i/sX3VhEJingINWn2hA1W7", next: "7 Days" },
  { min: 7, max: 9, name: "Silver League", logoUrl: "https://kommodo.ai/i/3ARXgE2ped3pM6zt3hSL", next: "10 Days" },
  { min: 10, max: 13, name: "Gold League", logoUrl: "https://kommodo.ai/i/uQQLCAytBhzBI2UJyc6K", next: "14 Days" },
  { min: 14, max: 20, name: "Platinum League", logoUrl: "https://kommodo.ai/i/tnDSnviPYu1wyaPHMERw", next: "21 Days" },
  { min: 21, max: 29, name: "Diamond League", logoUrl: "https://kommodo.ai/i/YGTIwGt7zciYYYzsfdGX", next: "30 Days" },
  { min: 30, max: 59, name: "Master League", logoUrl: "https://kommodo.ai/i/sjRod069Rtf5d9wc9i9A", next: "60 Days" },
  { min: 60, max: 99, name: "Grandmaster League", logoUrl: "https://kommodo.ai/i/IX9mtsoHaBTb0k33ajd4", next: "100 Days" },
  { min: 100, max: 364, name: "Titan League", logoUrl: "https://kommodo.ai/i/qoKOVRI5lepL48JtcDza", next: "365 Days" },
  { min: 365, max: 9999, name: "Legend League", logoUrl: "https://kommodo.ai/i/Q5vCDHgSyxnGZeTdfLoE", next: "Max Rank" }
];

// 15 Motivation Quotes
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

/* --- RENDER TIMELINE WITH CUSTOM LOGOS --- */
function renderTimeline() {
  let timelineContainer = document.getElementById("timelineList");
  if (!timelineContainer) return;
  
  timelineContainer.innerHTML = "";
  ranks.forEach(rank => {
    let rankCard = document.createElement("div");
    rankCard.className = "rank-card";
    
    let daysText = rank.min === 365 ? "365 Days (3650 Pts)" : `${rank.min} Days (${rank.min * 10} Pts)`;
    
    rankCard.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <img src="${rank.logoUrl}" style="width:24px; height:24px; border-radius:50%; object-fit:cover;">
        <span>${rank.name}</span>
      </div>
      <b>${daysText}</b>
    `;
    timelineContainer.appendChild(rankCard);
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
    
