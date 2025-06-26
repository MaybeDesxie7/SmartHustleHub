const serviceForm = document.getElementById("serviceForm");
const servicesList = document.getElementById("servicesList");

let services = [];
let editMode = false;
let editServiceId = null;

function fetchServices() {
  fetch("php/get_services.php", {
    method: "GET",
    credentials: "include"
  })
    .then((res) => res.json())
    .then((data) => {
      services = data;
      renderAllServices();
    })
    .catch((err) => {
      console.error("Failed to load services:", err);
      alert("Could not load services.");
    });
}

function renderAllServices() {
  servicesList.innerHTML = "";
  services.forEach(renderService);
}

function renderService(service) {
  const card = document.createElement("div");
  card.className = "service-card";

  card.innerHTML = `
    <h3>${service.title}</h3>
    <p class="service-meta">Category: ${service.category} | Price: $${service.price}</p>
    <p>${service.description}</p>
    ${service.owned ? `
      <button onclick="editService(${service.id})">Edit</button>
      <button onclick="deleteService(${service.id})" style="background:red;color:white;">Delete</button>
    ` : ""}
  `;

  servicesList.appendChild(card);
}

function editService(id) {
  const service = services.find(s => s.id === id);
  if (!service) return;

  document.getElementById("serviceTitle").value = service.title;
  document.getElementById("serviceDescription").value = service.description;
  document.getElementById("servicePrice").value = service.price;
  document.getElementById("serviceCategory").value = service.category;

  editMode = true;
  editServiceId = id;

  document.querySelector(".save-btn").textContent = "Update Service";
  serviceForm.scrollIntoView({ behavior: "smooth" });
}

function deleteService(id) {
  if (!confirm("Are you sure you want to delete this service?")) return;

  fetch("php/delete_service.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ id })
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message || response.error);
      fetchServices();
    })
    .catch((err) => {
      console.error("Delete failed:", err);
      alert("Failed to delete service.");
    });
}

// Form submission
serviceForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("serviceTitle").value.trim();
  const description = document.getElementById("serviceDescription").value.trim();
  const price = document.getElementById("servicePrice").value.trim();
  const category = document.getElementById("serviceCategory").value.trim();

  if (!title || !description || !price || !category) {
    alert("Please fill in all fields.");
    return;
  }

  const payload = {
    title,
    description,
    price,
    category
  };

  const url = editMode ? "php/update_service.php" : "php/create_service.php";

  if (editMode) {
    payload.id = editServiceId;
  }

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload)
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message || response.error);
      resetForm();
      fetchServices();
    })
    .catch((err) => {
      console.error("Failed to save service:", err);
      alert("An error occurred.");
    });
});

function resetForm() {
  serviceForm.reset();
  editMode = false;
  editServiceId = null;
  document.querySelector(".save-btn").textContent = "Add Service";
}

document.addEventListener("DOMContentLoaded", fetchServices);
S