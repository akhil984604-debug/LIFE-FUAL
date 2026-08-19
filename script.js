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

function updateStreak() {
  let startDate = localStorage.getItem("nofap_start_date");
  
  if (!startDate) {
    startDate = new Date().toISOString();
    localStorage.setItem("nofap_start_date", startDate);
  }

  let diffTime = Math.abs(new Date() - new Date(startDate));
  let days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  let points = days * 10;

  let currentRank = ranks.find(r => days >= r.min && days <= r.max);

  document.getElementById("daysCount").innerText = days;
  document.getElementById("userPoints").innerText = points;
  document.getElementById("userRank").innerText = currentRank ? currentRank.name : "Legend 👑";
  document.getElementById("nextRank").innerText = currentRank ? currentRank.next : "Max Rank";
}

function resetStreak() {
  if (confirm("Resetting will bring your streak back to Day 0. Are you sure?")) {
    localStorage.setItem("nofap_start_date", new Date().toISOString());
    updateStreak();
  }
}

updateStreak();
