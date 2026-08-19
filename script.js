const ranks = [
  { min: 0, max: 2, name: "Beginner 🥉", next: "3 Days" },
  { min: 3, max: 6, name: "1. Bronze 🥉", next: "7 Days" },
  { min: 7, max: 9, name: "2. Silver 🥈", next: "10 Days" },
  { min: 10, max: 13, name: "3. Fighter 🥊", next: "14 Days" },
  { min: 14, max: 20, name: "4. Warrior ⚔️", next: "21 Days" },
  { min: 21, max: 29, name: "5. Gold 🥇", next: "30 Days" },
  { min: 30, max: 59, name: "6. Platinum 🏆", next: "60 Days" },
  { min: 60, max: 99, name: "7. Diamond 💎", next: "100 Days" },
  { min: 100, max: 189, name: "8. Titan 🛡️", next: "190 Days" },
  { min: 190, max: 359, name: "9. Grandmaster ⚡", next: "360 Days" },
  { min: 360, max: 9999, name: "10. Legend 👑", next: "Max Rank" }
];

const quotes = [
  '"The struggle you\'re in today is developing the strength you need for tomorrow."',
  '"Your future self will thank you for not giving up today."',
  '"Control your mind, or it will control you."',
  '"Small daily improvements over time lead to stunning results."',
  '"Urges are temporary, but glory is forever."'
];

function startStreak() {
  localStorage.setItem("nofap_start_date", new Date().toISOString());
  updateTimer();
}

function updateTimer() {
  let startDate = localStorage.getItem("nofap_start_date");

  if (!startDate) {
    document.getElementById("startBtn").style.display = "block";
    document.getElementById("resetBtn").style.display = "none";
    document.getElementById("statusText").innerText = "Press Start to Begin Your Journey";
    return;
  }

  document.getElementById("startBtn").style.display = "none";
  document.getElementById("resetBtn").style.display = "block";
  document.getElementById("statusText").innerText = "Streak Active - Stay Strong!";

  let diffTime = Math.abs(new Date() - new Date(startDate));
  
  let days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
  let mins = Math.floor((diffTime / (1000 * 60)) % 60);
  let secs = Math.floor((diffTime / 1000) % 60);

  document.getElementById("daysCount").innerText = days;
  document.getElementById("hoursCount").innerText = hours < 10 ? "0" + hours : hours;
  document.getElementById("minsCount").innerText = mins < 10 ? "0" + mins : mins;
  document.getElementById("secsCount").innerText = secs < 10 ? "0" + secs : secs;

  let points = days * 10;
  document.getElementById("userPoints").innerText = points + " PTS";

  let currentRank = ranks.find(r => days >= r.min && days <= r.max);
  document.getElementById("userRank").innerText = currentRank ? currentRank.name : "Legend 👑";
  document.getElementById("nextRank").innerText = currentRank ? currentRank.next : "Max Rank";
}

function resetStreak() {
  if (confirm("Resetting will bring your streak back to 0. Are you sure?")) {
    localStorage.removeItem("nofap_start_date");
    document.getElementById("daysCount").innerText = "0";
    document.getElementById("hoursCount").innerText = "00";
    document.getElementById("minsCount").innerText = "00";
    document.getElementById("secsCount").innerText = "00";
    updateTimer();
  }
}

function nextQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById("quoteText").innerText = quotes[randomIndex];
}

function saveNote() {
  let note = document.getElementById("noteInput").value;
  localStorage.setItem("user_nofap_note", note);
  alert("Note saved successfully!");
}

// Load saved note on launch
let savedNote = localStorage.getItem("user_nofap_note");
if (savedNote) {
  document.getElementById("noteInput").value = savedNote;
}

// Update live time every second
setInterval(updateTimer, 1000);
updateTimer();
