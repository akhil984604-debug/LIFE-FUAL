const defaultBronzeLogo = "https://i.ibb.co/0pXyYrqB/1787144222633.png";

const ranks = [
  { min: 0, max: 2, name: "Bronze League", logoUrl: defaultBronzeLogo, next: "3 Days" },
  { min: 3, max: 6, name: "Bronze League", logoUrl: defaultBronzeLogo, next: "7 Days" },
  { min: 7, max: 9, name: "Silver League", logoUrl: defaultBronzeLogo, next: "10 Days" },
  { min: 10, max: 13, name: "Fighter League", logoUrl: defaultBronzeLogo, next: "14 Days" },
  { min: 14, max: 20, name: "Warrior League", logoUrl: defaultBronzeLogo, next: "21 Days" },
  { min: 21, max: 29, name: "Gold League", logoUrl: defaultBronzeLogo, next: "30 Days" },
  { min: 30, max: 59, name: "Platinum League", logoUrl: defaultBronzeLogo, next: "60 Days" },
  { min: 60, max: 99, name: "Diamond League", logoUrl: defaultBronzeLogo, next: "100 Days" },
  { min: 100, max: 189, name: "Titan League", logoUrl: defaultBronzeLogo, next: "190 Days" },
  { min: 190, max: 359, name: "Grandmaster League", logoUrl: defaultBronzeLogo, next: "360 Days" },
  { min: 360, max: 9999, name: "Legend League", logoUrl: defaultBronzeLogo, next: "Max Rank" }
];

const quotes = [
  '"The struggle you\'re in today is developing the strength you need for tomorrow."',
  '"Your future self will thank you for not giving up today."',
  '"Control your mind, or it will control you."',
  '"Urges are temporary, but glory is forever."'
];

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  
  document.getElementById(pageId).classList.add('active');
  if (window.event && window.event.target) {
    window.event.target.classList.add('active');
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
    document.getElementById("leagueIcon").src = defaultBronzeLogo;
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
    document.getElementById("leagueIcon").src = currentRank.logoUrl;
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
    document.getElementById("leagueTitle").innerText = "Bronze League";
    document.getElementById("leagueIcon").src = defaultBronzeLogo;
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
  alert("Saved!");
}

let savedNote = localStorage.getItem("user_nofap_note");
if (savedNote) document.getElementById("noteInput").value = savedNote;

setInterval(updateTimer, 1000);
updateTimer();
