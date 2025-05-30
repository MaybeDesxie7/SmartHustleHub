document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const chatBoxes = document.querySelectorAll(".chat-box");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      chatBoxes.forEach(box => box.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(`${tab.dataset.chat}ChatBox`).classList.add("active");
    });
  });

  // Group chat handling
  const groupRoomSelect = document.getElementById("groupRoomSelect");
  const groupMessages = document.getElementById("groupMessages");
  const groupInput = document.getElementById("groupMessageInput");
  const sendGroupBtn = document.getElementById("sendGroupBtn");

  sendGroupBtn.addEventListener("click", () => {
    const msg = groupInput.value.trim();
    if (msg) {
      const div = document.createElement("div");
      div.className = "message user";
      div.textContent = `[${groupRoomSelect.value}] ${msg}`;
      groupMessages.appendChild(div);
      groupInput.value = "";
      groupMessages.scrollTop = groupMessages.scrollHeight;
    }
  });

  // Support chat (simulated AI response)
  const supportMessages = document.getElementById("supportMessages");
  const supportInput = document.getElementById("supportMessageInput");
  const sendSupportBtn = document.getElementById("sendSupportBtn");

  sendSupportBtn.addEventListener("click", () => {
    const msg = supportInput.value.trim();
    if (msg) {
      const userDiv = document.createElement("div");
      userDiv.className = "message user";
      userDiv.textContent = msg;
      supportMessages.appendChild(userDiv);
      supportInput.value = "";

      setTimeout(() => {
        const aiDiv = document.createElement("div");
        aiDiv.className = "message ai";
        aiDiv.textContent = `You said: ${msg}`;
        supportMessages.appendChild(aiDiv);
        supportMessages.scrollTop = supportMessages.scrollHeight;
      }, 1000);
    }
  });

  // Private chat handling
  const userSelect = document.getElementById("userSelect");
  const privateMessages = document.getElementById("privateMessages");
  const privateInput = document.getElementById("privateMessageInput");
  const sendPrivateBtn = document.getElementById("sendPrivateBtn");

  sendPrivateBtn.addEventListener("click", () => {
    const msg = privateInput.value.trim();
    if (msg) {
      const div = document.createElement("div");
      div.className = "message user";
      div.textContent = `To ${userSelect.value}: ${msg}`;
      privateMessages.appendChild(div);
      privateInput.value = "";
      privateMessages.scrollTop = privateMessages.scrollHeight;
    }
  });
});
// ========== Room Switching ==========
const roomTabs = document.querySelectorAll('.room-tab');
const chatBoxes = document.querySelectorAll('.chat-box');

roomTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    roomTabs.forEach(t => t.classList.remove('active'));
    chatBoxes.forEach(box => box.classList.remove('active'));
    tab.classList.add('active');
    chatBoxes[index].classList.add('active');
  });
});

// ========== Inbox Chat Switching ==========
const inboxUsers = document.querySelectorAll('.inbox-user');
const chatMessagesContainer = document.querySelector('.inbox-chat .chat-messages');

const chatHistory = {
  'John Doe': [
    { from: 'user', text: 'Hey John!' },
    { from: 'ai', text: 'Hey! How can I help?' }
  ],
  'Alice': [
    { from: 'user', text: 'Hi Alice!' },
    { from: 'ai', text: 'Hey there!' }
  ],
  'Support': [
    { from: 'user', text: 'Need assistance.' },
    { from: 'ai', text: 'Sure, what seems to be the issue?' }
  ]
};

function loadChat(user) {
  chatMessagesContainer.innerHTML = '';
  const history = chatHistory[user] || [];
  history.forEach(msg => {
    const div = document.createElement('div');
    div.className = `chat-message ${msg.from}`;
    div.textContent = msg.text;
    chatMessagesContainer.appendChild(div);
  });
}

inboxUsers.forEach(userEl => {
  userEl.addEventListener('click', () => {
    inboxUsers.forEach(u => u.classList.remove('active'));
    userEl.classList.add('active');
    const user = userEl.textContent.trim();
    loadChat(user);
    // Mark as read
    userEl.removeAttribute('data-unread');
    updateUnreadBadges();
  });
});

// ========== Typing Indicator ==========
const chatInput = document.querySelector('.inbox-chat .chat-input input');
const typingIndicator = document.createElement('div');
typingIndicator.className = 'chat-message ai';
typingIndicator.textContent = 'Typing...';
let typingTimeout;

chatInput.addEventListener('input', () => {
  const activeUser = document.querySelector('.inbox-user.active')?.textContent.trim();
  if (!activeUser) return;

  if (!chatMessagesContainer.contains(typingIndicator)) {
    chatMessagesContainer.appendChild(typingIndicator);
  }

  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    if (chatMessagesContainer.contains(typingIndicator)) {
      chatMessagesContainer.removeChild(typingIndicator);
    }
  }, 2000);
});

// ========== Unread Message Count ==========
function setUnread(user, count) {
  const userEl = [...inboxUsers].find(u => u.textContent.trim() === user);
  if (userEl && !userEl.classList.contains('active')) {
    userEl.setAttribute('data-unread', count);
    updateUnreadBadges();
  }
}

function updateUnreadBadges() {
  inboxUsers.forEach(userEl => {
    const unread = userEl.getAttribute('data-unread');
    userEl.querySelector('.unread-badge')?.remove();
    if (unread) {
      const badge = document.createElement('span');
      badge.className = 'unread-badge';
      badge.textContent = unread;
      userEl.appendChild(badge);
    }
  });
}

// Example usage: simulate new messages
setTimeout(() => setUnread('Alice', 2), 3000);
setTimeout(() => setUnread('Support', 1), 5000);
