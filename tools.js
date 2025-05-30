document.addEventListener('DOMContentLoaded', () => {
  const toolFilter = document.getElementById('toolFilter');
  const toolsContainer = document.getElementById('toolsContainer');

  const tools = [
    {
      name: "Canva",
      description: "Design stunning graphics for social media, ads, and more.",
      category: "design",
      link: "https://affiliate-link.com/canva"
    },
    {
      name: "Grammarly",
      description: "Improve your writing and grammar in real time.",
      category: "productivity",
      link: "https://affiliate-link.com/grammarly"
    },
    {
      name: "Jasper AI",
      description: "AI copywriting assistant to boost your marketing content.",
      category: "ai",
      link: "https://affiliate-link.com/jasper"
    },
    {
      name: "ConvertKit",
      description: "Email marketing made simple for creators and entrepreneurs.",
      category: "marketing",
      link: "https://affiliate-link.com/convertkit"
    },
    {
      name: "ClickFunnels",
      description: "Create sales funnels and landing pages with ease.",
      category: "marketing",
      link: "https://affiliate-link.com/clickfunnels"
    }
  ];

  function renderTools(filter) {
    toolsContainer.innerHTML = '';
    const filteredTools = filter === 'all' ? tools : tools.filter(tool => tool.category === filter);
    filteredTools.forEach(tool => {
      const card = document.createElement('div');
      card.className = 'tool-card';
      card.innerHTML = `
        <h3>${tool.name}</h3>
        <p>${tool.description}</p>
        <a href="${tool.link}" target="_blank" class="visit-btn">Visit Tool</a>
      `;
      toolsContainer.appendChild(card);
    });
  }

  toolFilter.addEventListener('change', (e) => {
    renderTools(e.target.value);
  });

  renderTools('all');
});
