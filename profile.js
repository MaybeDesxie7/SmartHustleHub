// profile.js

document.addEventListener("DOMContentLoaded", () => {
  const toggleMenuBtn = document.getElementById("toggleMenuBtn");
  const sidebar = document.getElementById("sidebar");
  const toggleModeBtn = document.getElementById("toggleModeBtn");
  const body = document.body;

  // Toggle sidebar visibility
  toggleMenuBtn?.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  // Toggle dark/light mode
  toggleModeBtn?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
  });

  // Avatar preview logic
  const avatarInput = document.getElementById("avatarInput");
  const avatarImage = document.getElementById("avatarImage");

  avatarInput?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        avatarImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Save button functionality
  const saveProfileBtn = document.getElementById("saveProfileBtn");
  saveProfileBtn?.addEventListener("click", () => {
    const profileData = {
      name: document.getElementById("nameInput").value,
      email: document.getElementById("emailInput").value,
      phone: document.getElementById("phoneInput").value,
      address: document.getElementById("addressInput").value,
    };

    console.log("Profile saved:", profileData);
    alert("Profile saved successfully!");
  });
});
