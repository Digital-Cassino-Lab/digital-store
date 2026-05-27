const products = [
  {
    title: "Segnala City Lite",
    category: "app",
    icon: "🚨",
    price: "29€",
    tag: "WebApp",
    description: "Mini app per segnalazioni cittadine, condomini, gruppi locali e pagine Facebook.",
    link: "https://gumroad.com/"
  },
  {
    title: "Kit Social News Locali",
    category: "social",
    icon: "📰",
    price: "9€",
    tag: "ZIP",
    description: "Template post, copertine Facebook, titoli virali e grafiche per pagine news locali.",
    link: "https://gumroad.com/"
  },
  {
    title: "Reel Pack PRO",
    category: "video",
    icon: "🎬",
    price: "12€",
    tag: "Video",
    description: "Intro, overlay, titoli e idee per reel verticali pronti da personalizzare.",
    link: "https://gumroad.com/"
  },
  {
    title: "Template Mini Sito Attività",
    category: "template",
    icon: "🌐",
    price: "19€",
    tag: "HTML",
    description: "Sito vetrina pronto per bar, pizzerie, negozi, parrucchieri e piccole attività.",
    link: "https://gumroad.com/"
  }
];

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.querySelectorAll(".filter");

let currentCategory = "all";

function renderProducts() {
  const search = searchInput.value.toLowerCase();

  const filtered = products.filter(product => {
    const matchesCategory = currentCategory === "all" || product.category === currentCategory;
    const matchesSearch = product.title.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = filtered.map(product => `
    <article class="card">
      <div class="preview">
        <span>${product.icon}</span>
      </div>
      <div class="cardBody">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <div class="meta">
          <strong class="price">${product.price}</strong>
          <span class="tag">${product.tag}</span>
        </div>
        <a class="buy" href="${product.link}" target="_blank" rel="noopener">Acquista ora</a>
      </div>
    </article>
  `).join("");
}

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    currentCategory = button.dataset.category;
    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}

renderProducts();
