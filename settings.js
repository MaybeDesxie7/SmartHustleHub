// Load saved preferences if needed (localStorage optional)

document.getElementById("emailToggle").addEventListener("change", function () {
  const status = this.checked;
  console.log("Email notifications:", status);
  // Save preference to DB or localStorage
});

document.getElementById("languageSelect").addEventListener("change", function () {
  const lang = this.value;
  console.log("Preferred language set to:", lang);
  // Save language preference
});

function changePassword() {
  const current = document.getElementById("currentPassword").value;
  const newPass = document.getElementById("newPassword").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (!current || !newPass || !confirm) {
    alert("Please fill out all password fields.");
    return;
  }

  if (newPass !== confirm) {
    alert("New passwords do not match.");
    return;
  }

  console.log("Changing password...");
  // Implement backend call here
  alert("Password changed successfully.");
}

function deleteAccount() {
  const confirmDelete = confirm("⚠️ Are you sure you want to delete your account? This cannot be undone.");
  if (confirmDelete) {
    console.log("Deleting account...");
    // Call backend deletion
    alert("Account deleted. Sorry to see you go.");
    // Redirect or logout
  }
}
