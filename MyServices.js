// DOM Elements
const serviceForm = document.getElementById("serviceForm");
const servicesList = document.getElementById("servicesList");

// Load existing services from localStorage
let services = JSON.parse(localStorage.getItem("myServices")) || [];

// Render all services on page load
window.addEventListener("DOMContentLoaded", () => {
  services.forEach(service => renderService(service));
});

// Form submission
serviceForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = serviceForm.title.value.trim();
  const description = serviceForm.description.value.trim();
  const price = serviceForm.price.value.trim();
  const category = serviceForm.category.value;

  if (!title || !description || !price || !category) {
    alert("Please fill in all fields.");
    return;
  }

  const newService = {
    id: Date.now(),
    title,
    description,
    price,
    category,
  };

  services.push(newService);
  localStorage.setItem("myServices", JSON.stringify(services));
  renderService(newService);

  serviceForm.reset();
});

// Render a single service
function renderService(service) {
  const card = document.createElement("div");
  card.className = "service-card";
  card.innerHTML = `
    <h3>${service.title}</h3>
    <p class="service-meta">Category: ${service.category} | Price: $${service.price}</p>
    <p>${service.description}</p>
    <button onclick="deleteService(${service.id})">Delete</button>
  `;

  servicesList.prepend(card);
}

// Delete a service
function deleteService(id) {
  if (!confirm("Are you sure you want to delete this service?")) return;

  services = services.filter(service => service.id !== id);
  localStorage.setItem("myServices", JSON.stringify(services));
  renderAllServices();
}

// Re-render all services
function renderAllServices() {
  servicesList.innerHTML = "";
  services.forEach(service => renderService(service));
}
