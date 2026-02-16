
/* =========================
   SELECT ELEMENTS
========================= */

const cards = Array.from(document.querySelectorAll(".card"));
const filterButtons = document.querySelectorAll(".filters button");

const downloadBtn = document.getElementById("downloadBtn");

const searchInput = document.getElementById("searchinput");
const clearIcon = document.querySelector(".clearicon");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;
let visibleCards = [...cards];

/* =========================
   FILTER BUTTONS
========================= */
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      if (filter === "All" || card.dataset.category === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });

    updateVisibleCards();
  });
});


/* =========================
   SEARCH FUNCTION
========================= */
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const category = card.dataset.category.toLowerCase();
    card.classList.toggle("hidden", !category.includes(value));
  });

  updateVisibleCards();
});

/* =========================
   CLEAR SEARCH (❌ ICON)
========================= */
clearIcon.addEventListener("click", () => {
  searchInput.value = "";

  cards.forEach(card => card.classList.remove("hidden"));

  filterButtons.forEach(b => b.classList.remove("active"));
  filterButtons[0].classList.add("active");

  updateVisibleCards();
});

/* =========================
   LIGHTBOX OPEN
========================= */
cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    updateVisibleCards();
    currentIndex = visibleCards.indexOf(card);
    openLightbox();
  });
});

function openLightbox() {
  if (!visibleCards.length) return;
  lightboxImg.src = visibleCards[currentIndex].querySelector("img").src;
  lightbox.classList.add("active");
}

/* =========================
   LIGHTBOX CONTROLS
========================= */
closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % visibleCards.length;
  openLightbox();
});

prevBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + visibleCards.length) % visibleCards.length;
  openLightbox();
});

/* =========================
   CLICK OUTSIDE IMAGE
========================= */
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) lightbox.classList.remove("active");
});

/* =========================
   KEYBOARD CONTROLS
========================= */
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") lightbox.classList.remove("active");
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "ArrowLeft") prevBtn.click();
});

/* =========================
   UPDATE VISIBLE CARDS
========================= */
function updateVisibleCards() {
  visibleCards = cards.filter(card => !card.classList.contains("hidden"));
}

function openLightbox() {
  if (!visibleCards.length) return;

  const imgSrc = visibleCards[currentIndex].querySelector("img").src;
  lightboxImg.src = imgSrc;

  // SET DOWNLOAD LINK
  downloadBtn.href = imgSrc;

  lightbox.classList.add("active");
}

