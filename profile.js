document.addEventListener("DOMContentLoaded", () => {
  const toggleMenuBtn = document.getElementById("toggleMenuBtn");
  const sidebar = document.getElementById("sidebar");
  const toggleModeBtn = document.getElementById("toggleModeBtn");
  const body = document.body;

  const avatarInput = document.getElementById("avatarUpload");
  const avatarImage = document.getElementById("avatarPreview");
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const phoneInput = document.getElementById("phoneInput");
  const addressInput = document.getElementById("addressInput");
  const saveBtn = document.getElementById("saveProfileBtn");

  // Toggle sidebar
  toggleMenuBtn?.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  // Toggle light/dark mode
  toggleModeBtn?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");
  });

  // Preview avatar before upload
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

  // Load profile data
  fetch("get_profile.php")
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        nameInput.value = data.name || "";
        emailInput.value = data.email || "";
        phoneInput.value = data.phone || "";
        addressInput.value = data.address || "";

        if (data.avatar && data.avatar !== "") {
          avatarImage.src = "uploads/" + data.avatar;
        } else {
          avatarImage.src = "https://i.pravatar.cc/150?img=3"; // Default image
        }
      } else {
        console.warn("Profile load error:", data.error);
      }
    })
    .catch((err) => {
      console.error("Failed to load profile:", err);
    });

  // Save profile data
  saveBtn?.addEventListener("click", (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", nameInput.value.trim());
    formData.append("email", emailInput.value.trim());
    formData.append("phone", phoneInput.value.trim());
    formData.append("address", addressInput.value.trim());

    if (avatarInput.files.length > 0) {
      formData.append("avatar", avatarInput.files[0]);
    }

    fetch("php/update_profile.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message) {
          alert(response.message);
          setTimeout(() => location.reload(), 1000);
        } else {
          alert("Error: " + response.error);
        }
      })
      .catch((err) => {
        console.error("Error saving profile:", err);
        alert("Failed to save profile.");
      });
  });
});
