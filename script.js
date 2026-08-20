// ==========================================
// 1. GLOBAL STATES & DATA
// ==========================================

let currentStep = 1;
const onboardingData = {
  name: '', age: '', gender: '', goal: '', pattern: '', triggers: [], riskTime: '', targetDays: ''
};

const defaultLogo = "https://i.ibb.co/1tpcH1Rg/html-render-1.png";

// Updated Ranks with your exact specific benefits
const ranks = [
  { min: 0, name: "Wood League", logoUrl: "https://i.ibb.co/1tpcH1Rg/html-render-1.png", next: "3 Days", benefits: ["The Start – journey begins"] },
  { min: 3, name: "Bronze League", logoUrl: "https://i.ibb.co/0pXyYrqB/1787144222633.png", next: "7 Days", benefits: ["The Start – cravings & doubt begin", "Withdrawals Hit – urges, mood swings, brain fog"] },
  { min: 7, name: "Silver League", logoUrl: "https://i.ibb.co/PGYLFGC6/1787149414212.png", next: "10 Days", benefits: ["Withdrawals Hit", "Clearer Mind – slight focus boost, less guilt", "Small Win – willpower rising"] },
  { min: 10, name: "Gold League", logoUrl: "https://i.ibb.co/Y7T2Md1T/1787149453207.png", next: "14 Days", benefits: ["Energy Boost – feel more alive & alert"] },
  { min: 14, name: "Platinum League", logoUrl: "https://i.ibb.co/mC9TC9z2/1787149488344.png", next: "21 Days", benefits: ["Better Control – urges reduce, discipline builds", "Sleep Improves – deeper, restful sleep begins"] },
  { min: 21, name: "Diamond League", logoUrl: "https://i.ibb.co/gb4knVNw/1787164361213.png", next: "30 Days", benefits: ["Mood Balances – less anxious, more stable", "Skin Glows – brighter skin & eyes"] },
  { min: 30, name: "Master League", logoUrl: "https://i.ibb.co/NRMcNyy/1787163001657.png", next: "60 Days", benefits: ["Confidence Up – better eye contact & posture", "1 Month Done – stronger, focused, consistent"] },
  { min: 60, name: "Grandmaster League", logoUrl: "https://i.ibb.co/p67r29g6/1787163062978.png", next: "100 Days", benefits: ["Driven – goals matter more than urges", "Memory Boost – learn & recall faster", "Noticed More – people are drawn to your energy", "No Cravings – less addiction to screens"] },
  { min: 100, name: "Titan League", logoUrl: "https://i.ibb.co/4nGpPkTB/1787163120591.png", next: "365 Days", benefits: ["Body Improves – muscle tone & stamina rise", "Calm Mind – better emotional control", "Hyper Focus – work/tasks feel easier", "New You – confident, sharp & unstoppable"] },
  { min: 365, name: "Legend League", logoUrl: "https://i.ibb.co/WvG42K78/1787163182723.png", next: "Max Rank", benefits: ["All previous milestones + Long-term transformation / New You"] }
];

// ==========================================
// 2. TIMELINE & LEAGUE DETAILS NAVIGATION
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
      <div style="color:#f59e0b;">&gt;</div>
    `;

    rankCard.onclick = () => openLeagueDetailsPage(index);
    timelineContainer.appendChild(rankCard);
  });
}

function openLeagueDetailsPage(index) {
  let rank = ranks[index];
  
  // Find or Create Details Page
  let detailsPage = document.getElementById("page-league-detail");
  if (!detailsPage) {
    detailsPage = document.createElement("div");
    detailsPage.id = "page-league-detail";
    detailsPage.className = "page";
    document.querySelector(".app-container").appendChild(detailsPage);
  }

  // Create Benefits HTML
  let benefitsItems = rank.benefits.map(b => `
    <div style="margin-bottom:10px; padding:12px; background:#1e293b; border-left:4px solid #f59e0b; border-radius:5px; font-size:13px; color:#e2e8f0;">
      ${b}
    </div>
  `).join("");

  detailsPage.innerHTML = `
    <div style="padding:20px;">
      <button onclick="closeLeagueDetailsPage()" style="background:none; border:none; color:#f59e0b; font-weight:bold; cursor:pointer; margin-bottom:20px;">← Back to Timeline</button>
      
      <div style="text-align:center;">
        <img src="${rank.logoUrl}" style="width:100px; height:100px; border-radius:50%; border:3px solid #f59e0b; margin-bottom:15px;">
        <h2 style="margin:0;">${rank.name}</h2>
        <p style="color:#64748b; font-size:14px; margin-bottom:20px;">Unlocked at ${rank.min} Days</p>
      </div>

      <h3 style="color:#f59e0b; border-bottom:1px solid #334155; padding-bottom:5px;">Benefits</h3>
      <div style="margin-top:15px;">${benefitsItems}</div>
    </div>
  `;

  // Hide others, Show this
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  detailsPage.classList.add('active');
  // Hide Navbar
  document.querySelector('.navbar').style.display = 'none';
}

function closeLeagueDetailsPage() {
  document.querySelector('.navbar').style.display = 'flex';
  showPage('page-timeline');
}

// ... Rest of your existing logic (Onboarding, Timer, Notes) stays here ...

// Initialize
checkOnboardingStatus();
renderTimeline();
setInterval(updateTimer, 1000);
updateTimer();
