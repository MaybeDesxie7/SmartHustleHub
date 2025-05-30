// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
  // Animate tool cards
  const toolCards = document.querySelectorAll('.tool-card');
  toolCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
    });
  });

  // Optional future interactivity (e.g., fetch stats, messages, notifications)
  // Example:
  // fetch('/api/user/data').then(res => res.json()).then(data => {
  //   document.querySelector('.earnings p').textContent = `$${data.earnings}`;
  // });
});
// dashboard.js

// dashboard.js

// Toggle dark/light mode
document.getElementById("toggleModeBtn").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

// Toggle sidebar menu for mobile
document.getElementById("toggleMenuBtn").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("show");
});

// Animate tool cards on hover
document.addEventListener('DOMContentLoaded', () => {
  const toolCards = document.querySelectorAll('.tool-card');
  toolCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
    });
  });
});

// Activity chart using Chart.js
const ctx = document.getElementById("activityChart").getContext("2d");
const activityChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "Activity",
      data: [12, 19, 3, 5, 2, 3, 7],
      borderColor: "limegreen",
      backgroundColor: "rgba(50, 205, 50, 0.1)",
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
