document.getElementById("time").textContent = new Date().toDateString();

document.getElementById("logout").addEventListener("click", function(e) {
  e.preventDefault();
  alert("You have been logged out!");
  window.location.href = "index.html";
});

document.getElementById("settingsForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Settings saved successfully!");
  // Optional: Send data to PHP/DB here
});
