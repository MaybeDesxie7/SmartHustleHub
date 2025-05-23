// Set current date
const timeElement = document.getElementById("time");
if (timeElement) {
  timeElement.textContent = new Date().toDateString();
}

// Tab switching
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(tab => tab.classList.remove("active"));

    button.classList.add("active");
    const targetTab = document.getElementById(button.dataset.tab);
    if (targetTab) {
      targetTab.classList.add("active");
    }
  });
});

// Profile image preview
const uploadInput = document.getElementById("uploadInput");
const profilePic = document.getElementById("profilePic");

if (uploadInput && profilePic) {
  uploadInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePic.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}

// Prevent profile form submission (demo)
const profileForm = document.querySelector(".edit-profile-form");
if (profileForm) {
  profileForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Profile updated successfully (simulation).");
  });
}
