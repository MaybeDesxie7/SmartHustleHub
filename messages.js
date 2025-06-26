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

  // GROUP CHAT
  const groupRoomSelect = document.getElementById("groupRoomSelect");
  const groupMessages = document.getElementById("groupMessages");
  const groupInput = document.getElementById("groupMessageInput");
  const sendGroupBtn = document.getElementById("sendGroupBtn");

  function loadGroupMessages() {
    const room = encodeURIComponent(groupRoomSelect.value);
    fetch(`messages-backend/get_chat_history.php?room=${room}`)
      .then(res => res.json())
      .then(data => {
        groupMessages.innerHTML = '';
        if (data.status === 'success') {
          data.messages.forEach(msg => {
            const div = document.createElement("div");
            div.className = "message user";
            div.textContent = `[${msg.room}] ${msg.sender}: ${msg.message}`;
            groupMessages.appendChild(div);
          });
          groupMessages.scrollTop = groupMessages.scrollHeight;
        }
      }).catch(console.error);
  }

  sendGroupBtn.addEventListener("click", () => {
    const msg = groupInput.value.trim();
    if (!msg) return;

    fetch("messages-backend/send_message.php", {
      method: "POST",
      body: JSON.stringify({
        sender: "You",
        message: msg,
        room: groupRoomSelect.value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          groupInput.value = "";
          loadGroupMessages();
        } else {
          alert("Failed to send message.");
        }
      })
      .catch(console.error);
  });

  groupRoomSelect.addEventListener("change", loadGroupMessages);
  loadGroupMessages();

  // SUPPORT CHAT
  const supportMessages = document.getElementById("supportMessages");
  const supportInput = document.getElementById("supportMessageInput");
  const sendSupportBtn = document.getElementById("sendSupportBtn");

  sendSupportBtn.addEventListener("click", () => {
    const msg = supportInput.value.trim();
    if (!msg) return;

    const userDiv = document.createElement("div");
    userDiv.className = "message user";
    userDiv.textContent = msg;
    supportMessages.appendChild(userDiv);
    supportInput.value = "";

    fetch("messages-backend/chat_with_agent.php", {
      method: "POST",
      body: JSON.stringify({ message: msg }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          const aiDiv = document.createElement("div");
          aiDiv.className = "message ai";
          aiDiv.textContent = data.reply;
          supportMessages.appendChild(aiDiv);
          supportMessages.scrollTop = supportMessages.scrollHeight;
        } else {
          alert("AI agent failed to respond.");
        }
      }).catch(console.error);
  });

  // PRIVATE CHAT
  const userSelect = document.getElementById("userSelect");
  const privateMessages = document.getElementById("privateMessages");
  const privateInput = document.getElementById("privateMessageInput");
  const sendPrivateBtn = document.getElementById("sendPrivateBtn");

  function loadPrivateMessages() {
    const user = encodeURIComponent(userSelect.value);
    fetch(`messages-backend/get_chat_history.php?sender=You&receiver=${user}`)
      .then(res => res.json())
      .then(data => {
        privateMessages.innerHTML = '';
        if (data.status === 'success') {
          data.messages.forEach(msg => {
            const div = document.createElement("div");
            div.className = msg.sender === "You" ? "message user sent" : "message user received";
            div.textContent = `${msg.sender} to ${msg.receiver}: ${msg.message}`;
            privateMessages.appendChild(div);
          });
          privateMessages.scrollTop = privateMessages.scrollHeight;
        }
      }).catch(console.error);
  }

  sendPrivateBtn.addEventListener("click", () => {
    const msg = privateInput.value.trim();
    if (!msg) return;

    const receiver = userSelect.value;
    fetch("messages-backend/send_message.php", {
      method: "POST",
      body: JSON.stringify({
        sender: "You",
        receiver: receiver,
        message: msg
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          privateInput.value = "";
          loadPrivateMessages();
        } else {
          alert("Failed to send private message.");
        }
      }).catch(console.error);
  });

  userSelect.addEventListener("change", loadPrivateMessages);
  loadPrivateMessages();

  // Optional: Auto refresh chats every 5 seconds
  setInterval(() => {
    if(document.querySelector(".tab.active").dataset.chat === "group") {
      loadGroupMessages();
    } else if(document.querySelector(".tab.active").dataset.chat === "private") {
      loadPrivateMessages();
    }
    // Support chat probably doesn't auto refresh here (could be added)
  }, 5000);
});
