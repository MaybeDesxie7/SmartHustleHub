// Set current date
document.getElementById("time").textContent = new Date().toDateString();

// Load messages
const messages = [
  {
    name: "John Doe",
    email: "john@example.com",
    subject: "Quote Request",
    message: "I need a landing page. Please get in touch."
  },
  {
    name: "Jane Smith",
    email: "jane@smith.com",
    subject: "Website Redesign",
    message: "Can you modernize my website?"
  }
];

const messageList = document.getElementById("messageList");

messages.forEach((msg) => {
  const li = document.createElement("li");
  li.className = "message-item";
  li.innerHTML = `
    <div class="message-header">${msg.subject}</div>
    <small>From: ${msg.name} (${msg.email})</small>
    <p class="message-body">${msg.message}</p>
    <div class="message-actions">
      <button onclick="deleteMessage(this)">Delete</button>
      <button onclick="alert('Archive not implemented')">Archive</button>
    </div>
  `;
  messageList.appendChild(li);
});

function deleteMessage(button) {
  if (confirm("Delete this message?")) {
    button.closest("li").remove();
  }
}

// Tab switching
document.querySelectorAll(".tab-button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));

    btn.classList.add("active");
    const tabId = btn.dataset.tab;
    document.getElementById(tabId).classList.add("active");
  });
});
