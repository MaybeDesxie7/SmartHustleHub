const offers = [
  {
    title: "50% Off Canva Pro - Limited Offer!",
    description: "Upgrade your design game with Canva Pro. Offer valid for a short time.",
    deadline: "2025-06-05T23:59:59",
    url: "https://your-affiliate-link.com/canva"
  },
  {
    title: "AI Hustler Bundle - $200 Worth for $29!",
    description: "Includes Jasper, Notion templates, ChatGPT prompts and more. Grab it now.",
    deadline: "2025-06-02T23:59:59",
    url: "https://your-affiliate-link.com/aihustle"
  },
  {
    title: "Start Freelancing with 80% Off Fiverr Learn",
    description: "Courses on branding, copywriting, freelancing and more for cheap.",
    deadline: "2025-06-04T12:00:00",
    url: "https://your-affiliate-link.com/fiverrlearn"
  }
];

function createCountdown(endDate, element) {
  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = new Date(endDate).getTime() - now;

    if (distance < 0) {
      element.textContent = "⛔ Deal expired";
      element.style.color = "red";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);

    element.textContent = `⏳ ${days}d ${hrs}h ${mins}m ${secs}s left`;
    setTimeout(updateTimer, 1000);
  };
  updateTimer();
}

function renderOffers() {
  const container = document.getElementById("offersContainer");

  offers.forEach((offer, index) => {
    const card = document.createElement("div");
    card.className = "offer-card";
    card.innerHTML = `
      <h3>${offer.title}</h3>
      <p>${offer.description}</p>
      <div class="countdown" id="countdown-${index}">Loading...</div>
      <a href="${offer.url}" target="_blank" class="redeem-btn" onclick="trackRedeem('${offer.title}')">Redeem</a>
    `;
    container.appendChild(card);
    const countdownEl = document.getElementById(`countdown-${index}`);
    createCountdown(offer.deadline, countdownEl);
  });
}

function trackRedeem(title) {
  console.log(`✅ User clicked redeem on: ${title}`);
  // Optional: send to analytics or backend
}

renderOffers();
