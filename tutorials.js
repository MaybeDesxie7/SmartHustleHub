const tutorials = [
  {
    title: "How to Use ChatGPT for Freelancing",
    summary: "Learn how to use AI to brainstorm ideas, write proposals, and communicate with clients.",
    videoUrl: "https://www.youtube.com/embed/LJZsNWlEcBs",
    tags: ["ai", "freelancing"]
  },
  {
    title: "Affiliate Marketing Basics (2024)",
    summary: "A beginner-friendly walkthrough of affiliate networks and link promotion.",
    videoUrl: "https://www.youtube.com/embed/8gcNTtMB-RM",
    tags: ["affiliate"]
  },
  {
    title: "Top AI Tools for Hustlers",
    summary: "A quick tour of AI tools for writing, marketing, and design.",
    videoUrl: "https://www.youtube.com/embed/tvfMCzqUedA",
    tags: ["ai", "tools"]
  },
  {
    title: "Using Canva for Your Side Hustle",
    summary: "Learn how to use Canva to create social media posts, flyers, and pitch decks.",
    videoUrl: "https://www.youtube.com/embed/V8IcDkVjVpo",
    tags: ["apps", "tools"]
  },
  {
    title: "Setup a Freelance Profile That Gets Jobs",
    summary: "Tips on optimizing your Upwork and Fiverr profile.",
    videoUrl: "https://www.youtube.com/embed/0ZRIiN-M2aU",
    tags: ["freelancing"]
  }
];

const tutorialsContainer = document.getElementById("tutorialsContainer");
const tutorialFilter = document.getElementById("tutorialFilter");

function renderTutorials() {
  tutorialsContainer.innerHTML = "";
  const selectedTopic = tutorialFilter.value;

  const filtered = selectedTopic === "all"
    ? tutorials
    : tutorials.filter(t => t.tags.includes(selectedTopic));

  filtered.forEach(tutorial => {
    const card = document.createElement("div");
    card.className = "tutorial-card";
    card.innerHTML = `
      <iframe src="${tutorial.videoUrl}" allowfullscreen></iframe>
      <h3>${tutorial.title}</h3>
      <p>${tutorial.summary}</p>
      <div class="tutorial-tags">
        ${tutorial.tags.map(tag => `<span class="tutorial-tag">${tag}</span>`).join("")}
      </div>
    `;
    tutorialsContainer.appendChild(card);
  });
}

tutorialFilter.addEventListener("change", renderTutorials);

// Initial render
renderTutorials();
