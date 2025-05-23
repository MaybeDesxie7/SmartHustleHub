document.getElementById("time").textContent = new Date().toDateString();

document.getElementById("logout").addEventListener("click", function(e) {
  e.preventDefault();
  alert("You have been logged out!");
  window.location.href = "index.html";
});
