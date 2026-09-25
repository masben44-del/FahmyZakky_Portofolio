import { FASTWORK_PROFILE, FASTWORK_STATS, REVIEWS } from "./config.js";
import { ARROW } from "./partials.js";

const STAR = `<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>`;

/* Ulasan Fastwork punya tanggal + rating; testimoni langsung punya `role` sebagai gantinya. */
function review(r, i) {
  const anon = /anonim/i.test(r.name);
  const name = anon && !r.role ? "Akun anonim" : r.name;
  return `
    <figure class="review" data-card="${i % 3}">
      <div class="review__head">
        <span class="review__avatar">${anon ? "?" : r.name.charAt(0).toUpperCase()}</span>
        <div class="review__who">
          <strong>${name}</strong>
          <span class="label">${r.role || r.date}</span>
        </div>
        ${r.rating ? `<span class="review__rating">${STAR}${r.rating}</span>` : ""}
      </div>
      <blockquote>${r.paraphrase ? r.text : `“${r.text}”`}</blockquote>
      <figcaption class="label">
        ${r.role ? "Testimoni klien" : "Ulasan Fastwork"}${r.repeat ? ` · <b>${r.repeat}× order</b>` : ""}
      </figcaption>
    </figure>`;
}

// Kartu default: statistik Fastwork (@fahmy22)
const FASTWORK_CARD = {
  href: FASTWORK_PROFILE,
  top: "Fastwork · @fahmy22",
  badge: `${FASTWORK_STATS.badge} ✓`,
  big: FASTWORK_STATS.rating,
  stars: true,
  bigLabel: "Rating rata-rata",
  stats: [
    [FASTWORK_STATS.orders, "Order"],
    [FASTWORK_STATS.customers, "Pelanggan"],
    [FASTWORK_STATS.repeat, "Order ulang"],
  ],
  list: FASTWORK_STATS.top.map((t) => [t.name, `${t.sold} terjual · ★ ${t.rating}`]),
  go: "Lihat profil Fastwork",
};

export function proofSection({ index = "(Testimoni)", card = FASTWORK_CARD, reviews = REVIEWS } = {}) {
  const c = card;
  return `
    <section class="proof">
      <div class="proof__head">
        <span class="label" data-fade>${index}</span>
        <h2 class="h2">
          <span class="line" data-reveal><span>Bukan kata kami —</span></span>
          <span class="line line--alt" data-reveal="1"><span>kata klien kami.</span></span>
        </h2>
      </div>

      <div class="proof__body">
        <a class="proof__fw" href="${c.href}" target="_blank" rel="noopener" data-link data-card="0">
          <div class="proof__fw-top">
            <span class="label">${c.top}</span>
            <span class="proof__badge">${c.badge}</span>
          </div>
          <div class="proof__rating">
            <b>${c.big}</b>
            ${c.stars ? `<span class="proof__stars">${STAR.repeat(5)}</span>` : ""}
            <small class="label">${c.bigLabel}</small>
          </div>
          <dl class="proof__stats">
            ${c.stats.map(([v, l]) => `<div><dt>${v}</dt><dd>${l}</dd></div>`).join("")}
          </dl>
          ${c.list?.length ? `
          <ul class="proof__top">
            ${c.list.map(([a, b]) => `<li><span>${a}</span><span>${b}</span></li>`).join("")}
          </ul>` : ""}
          <span class="proof__go">${c.go} ${ARROW}</span>
        </a>

        <div class="proof__reviews">
          <div class="proof__track" data-reviews>
            ${reviews.map(review).join("")}
          </div>
          <div class="proof__nav">
            <button class="proof__btn" data-rev="-1" data-link aria-label="Ulasan sebelumnya">${ARROW}</button>
            <button class="proof__btn" data-rev="1" data-link aria-label="Ulasan berikutnya">${ARROW}</button>
            <span class="label">Geser untuk lihat ulasan lainnya</span>
          </div>
        </div>
      </div>
    </section>`;
}

export function setupProof(root) {
  root.querySelectorAll("[data-reviews]").forEach((track) => {
    const nav = track.parentElement.querySelectorAll("[data-rev]");
    nav.forEach((btn) =>
      btn.addEventListener("click", () => {
        const card = track.querySelector(".review");
        const step = card ? card.getBoundingClientRect().width + 16 : track.clientWidth * 0.8;
        track.scrollBy({ left: step * Number(btn.dataset.rev), behavior: "smooth" });
      })
    );
  });
}
