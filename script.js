const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Example newsletter form submission handler
document.querySelectorAll('.subscribe-btn').forEach(button => {
  button.addEventListener('click', () => {
    const input = button.previousElementSibling;
    if (input && input.value.includes('@')) {
      alert('Thank you for subscribing!');
      input.value = '';
    } else {
      alert('Please enter a valid email address.');
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("testimonialTrack");

  if (track) {
    track.addEventListener("mouseover", () => {
      track.style.animationPlayState = "paused";
    });

    track.addEventListener("mouseout", () => {
      track.style.animationPlayState = "running";
    });
  }
});
// Review form handling
const form = document.getElementById("reviewForm");
const message = document.getElementById("reviewMessage");

if (form && message) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    message.classList.remove("hidden");
    form.reset();
  });
}
const subscribeForm = document.querySelector(".subscribe-form");

if (subscribeForm) {
  subscribeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for subscribing!");
    subscribeForm.reset();
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupFormMain");
  const loginForm = document.getElementById("loginFormMain");

  const handleFormSubmit = (form, action) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      formData.append("action", action); // Ensure action is set

      // Validate email confirmation on signup
      if (action === "signup") {
        const email = formData.get("email");
        const confirm = formData.get("confirm_email");

        if (email !== confirm) {
          alert("Email confirmation does not match.");
          return;
        }
      }

      fetch("login.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            window.location.href = "dashboard.html";
          } else {
            alert(data.message || "Something went wrong.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Network error. Please try again.");
        });
    });
  };

  if (signupForm) handleFormSubmit(signupForm, "signup");
  if (loginForm) handleFormSubmit(loginForm, "login");
});
