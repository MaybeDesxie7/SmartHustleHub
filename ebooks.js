const ebooks = [
  {
    title: "Mastering Freelancing",
    preview: "Discover the secrets to building a six-figure freelancing business.",
    rating: 4.7,
    popularity: 92,
    tags: ["freelancing", "business"],
    isPaid: true,
    link: "#"
  },
  {
    title: "The Digital Marketing Blueprint",
    preview: "Step-by-step guide to digital marketing success for beginners.",
    rating: 4.9,
    popularity: 98,
    tags: ["marketing", "strategy"],
    isPaid: true,
    link: "#"
  },
  {
    title: "Freelancing Freedom Guide",
    preview: "Master the skills of online freelancing and scale your hustle.",
    rating: 4.6,
    popularity: 88,
    tags: ["freelancing", "remote work", "skills"],
    isPaid: false,
    link: "https://example.com/freelancing-guide-free"
  },
  {
    title: "Instagram Marketing Secrets",
    preview: "Learn how to build and grow your business on Instagram.",
    rating: 4.8,
    popularity: 94,
    tags: ["marketing", "social media"],
    isPaid: true,
    link: "https://example.com/instagram-marketing-paid"
  },
  {
    title: "AI Tools for Productivity",
    preview: "Unlock next-level performance with these AI tools.",
    rating: 4.5,
    popularity: 90,
    tags: ["ai", "productivity", "automation"],
    isPaid: false,
    link: "https://example.com/ai-productivity-free"
  }
];

const container = document.getElementById("ebooksContainer");
const sortSelect = document.getElementById("sortOptions");
const filter = document.getElementById("ebookFilter");
const suggestBtn = document.getElementById("suggestBtn");
const paginationContainer = document.getElementById("paginationControls");

let currentPage = 1;
const itemsPerPage = 4;

function renderEbooks() {
  container.innerHTML = "";

  // Filter
  const filterValue = filter.value;
  let filtered = ebooks;
  if (filterValue !== "all") {
    filtered = ebooks.filter(book => book.tags.includes(filterValue));
  }

  // Sort
  const sortValue = sortSelect.value;
  if (sortValue === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortValue === "popularity") {
    filtered.sort((a, b) => b.popularity - a.popularity);
  }

  // Paginate
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  paginated.forEach(book => {
    const card = document.createElement("div");
    card.className = "ebook-card";
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.preview}</p>
      <div class="ebook-tags">
        ${book.tags.map(tag => `<span class="ebook-tag">${tag}</span>`).join("")}
      </div>
      <div class="rating">⭐ ${book.rating}</div>
      <div class="popularity">🔥 ${book.popularity}%</div>
      <a href="${book.link}" target="_blank">${book.isPaid ? "Purchase" : "Download"}</a>
    `;
    container.appendChild(card);
  });

  renderPagination(filtered.length);
}

function renderPagination(totalItems) {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.toggle("active", i === currentPage);
    btn.addEventListener("click", () => {
      currentPage = i;
      renderEbooks();
    });
    paginationContainer.appendChild(btn);
  }
}

// Suggest top ebook
suggestBtn.addEventListener("click", () => {
  const top = ebooks.reduce((top, ebook) => ebook.rating > top.rating ? ebook : top, ebooks[0]);
  alert(`We recommend: "${top.title}"`);
});

// Event Listeners
sortSelect.addEventListener("change", () => {
  currentPage = 1;
  renderEbooks();
});

filter.addEventListener("change", () => {
  currentPage = 1;
  renderEbooks();
});

// Initial render
renderEbooks();
