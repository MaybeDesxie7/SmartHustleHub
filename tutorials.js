// Set the current date
document.getElementById("time").textContent = new Date().toDateString();

function watchVideo(url) {
  window.open(url, "_blank");
}

function downloadPDF(filename) {
  const link = document.createElement("a");
  link.href = `tutorials/${filename}`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
