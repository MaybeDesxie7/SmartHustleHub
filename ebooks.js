// Show current date
document.getElementById("time").textContent = new Date().toDateString();

function viewEbook(filename) {
  window.open(`ebooks/${filename}`, "_blank");
}

function downloadEbook(filename) {
  const link = document.createElement("a");
  link.href = `ebooks/${filename}`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function subscribeNow() {
  alert("This is a premium eBook. Please subscribe to access it.");
  // Optionally redirect to a subscription page
  // window.location.href = "subscribe.html";
}
