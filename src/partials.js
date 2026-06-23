import { FASTWORK_PROFILE, EMAIL } from "./config.js";

export function marquee(words) {
  const items = [...words, ...words]
    .map((w) => `<span>${w}</span><span class="dot">●</span>`)
    .join("");
  return `
    <section class="marquee" aria-hidden="true">
      <div class="marquee__track" data-marquee>${items}</div>
    </section>`;
}

/** Two-button order block. Pass the specific Fastwork service URL. */
export function orderCTA(fastworkUrl = FASTWORK_PROFILE, label = "Order via Fastwork") {
  return `
    <div class="order">
      <a class="order__btn order__btn--primary" href="${fastworkUrl}" target="_blank" rel="noopener" data-link>
        <span>${label}</span>
        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 19L19 5M19 5H9M19 5v10" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
      </a>
      <a class="order__btn" href="mailto:${EMAIL}" data-link>
        <span>Email langsung</span>
        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M3 7l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>
      </a>
    </div>`;
}

function packageCard(p) {
  return `
    <div class="pkg ${p.featured ? "pkg--featured" : ""}" data-reveal-card>
      ${p.featured ? '<span class="pkg__badge">Popular</span>' : ""}
      <h3 class="pkg__name">${p.name}</h3>
      <div class="pkg__price">${p.price}<span>${p.unit}</span></div>
      ${p.meta ? `<p class="pkg__meta">${p.meta}</p>` : ""}
      <ul class="pkg__points">
        ${p.points.map((pt) => `<li>${pt}</li>`).join("")}
      </ul>
    </div>`;
}

/** A full pricing block: heading + package cards + order buttons. */
export function pricing({ index, title, note, packages, fastwork }) {
  return `
    <section class="packages">
      <div class="packages__head">
        <p class="packages__index" data-fade>${index}</p>
        <h2 class="packages__title" data-fade>${title}</h2>
        ${note ? `<p class="packages__note" data-fade>${note}</p>` : ""}
      </div>
      <div class="packages__grid">
        ${packages.map(packageCard).join("")}
      </div>
      ${orderCTA(fastwork)}
    </section>`;
}

/** Compact contact band reused at the bottom of inner pages */
export function contactBand() {
  return `
    <section class="cta-band">
      <p class="cta-band__index" data-fade>(Punya project?)</p>
      <h2 class="cta-band__title" data-reveal><span>Let's build it.</span></h2>
      ${orderCTA()}
    </section>`;
}
