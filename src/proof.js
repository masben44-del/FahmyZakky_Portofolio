import { FASTWORK_PROFILE, FASTWORK_STATS, REVIEWS } from "./config.js";
import { ARROW } from "./partials.js";

const STAR = `<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>`;

function review(r, i) {
  const anon = /anonim/i.test(r.name);
  return `
    <figure class="review" data-card="${i % 3}">
      <div class="review__head">
        <span class="review__avatar">${anon ? "?" : r.name.charAt(0).toUpperCase()}</span>
        <div class="review__who">
          <strong>${anon ? "Akun anonim" : r.name}</strong>
          <span class="label">${r.date}</span>
        </div>
        <span class="review__rating">${STAR}${r.rating}</span>
      </div>
      <blockquote>“${r.text}”</blockquote>
      <figcaption class="label">
        Ulasan Fastwork${r.repeat ? ` · <b>${r.repeat}× order</b>` : ""}
      </figcaption>
    </figure>`;
}

export function proofSection({ index = "(Testimoni)" } = {}) {
  const s = FASTWORK_STATS;
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
        <a class="proof__fw" href="${FASTWORK_PROFILE}" target="_blank" rel="noopener" data-link data-card="0">
          <div class="proof__fw-top">
            <span class="label">Fastwork · @fahmy22</span>
            <span class="proof__badge">${s.badge} ✓</span>
          </div>
          <div class="proof__rating">
            <b>${s.rating}</b>
            <span class="proof__stars">${STAR.repeat(5)}</span>
            <small class="label">Rating rata-rata</small>
          </div>
          <dl class="proof__stats">
            <div><dt>${s.orders}</dt><dd>Order</dd></div>
            <div><dt>${s.customers}</dt><dd>Pelanggan</dd></div>
            <div><dt>${s.repeat}</dt><dd>Order ulang</dd></div>
          </dl>
          <ul class="proof__top">
            ${s.top.map((t) => `<li><span>${t.name}</span><span>${t.sold} terjual · ★ ${t.rating}</span></li>`).join("")}
          </ul>
          <span class="proof__go">Lihat profil Fastwork ${ARROW}</span>
        </a>

        <div class="proof__reviews">
          <div class="proof__track" data-reviews>
            ${REVIEWS.map(review).join("")}
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
