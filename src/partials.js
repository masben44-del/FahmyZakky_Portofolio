import { EMAIL, WHATSAPP, SOCIALS, USD, idr, usd } from "./config.js";
import { ICONS } from "./icons.js";

/** Logo + name links (WhatsApp, Email, Instagram, …). */
export function socialList(cls = "", { arrow = false } = {}) {
  return `
    <ul class="socials ${cls}">
      ${SOCIALS.map((s) => `
        <li>
          <a href="${s.href}" ${s.href.startsWith("mailto:") ? "" : 'target="_blank" rel="noopener"'} data-link>
            ${ICONS[s.id] || ""}<span>${s.name}</span>${arrow ? ARROW : ""}
          </a>
        </li>`).join("")}
    </ul>`;
}

export const ARROW = `<svg class="arrow" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 18L18 6M18 6H8M18 6v10" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;
const WA_ICON = `<svg class="wa" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0012.04 2zm5.8 14.13c-.24.68-1.42 1.3-1.95 1.35-.5.05-.97.23-3.27-.68-2.77-1.09-4.52-3.92-4.66-4.1-.13-.18-1.1-1.47-1.1-2.8 0-1.33.7-1.99.95-2.26.24-.27.53-.34.71-.34l.51.01c.16 0 .38-.06.6.46.23.54.77 1.87.84 2 .07.14.11.3.02.48-.09.18-.14.3-.27.46l-.41.48c-.14.13-.28.28-.12.55.16.27.7 1.16 1.51 1.88 1.04.93 1.91 1.21 2.18 1.35.27.14.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.23.61-.14.25.09 1.58.75 1.85.88.27.14.45.2.52.32.06.11.06.66-.18 1.33z"/></svg>`;

/** Viewfinder corner brackets; parent needs data-frame to animate in. */
export const VF = `<span class="vf" aria-hidden="true"><i></i><i></i><i></i><i></i></span>`;

/** Scroll-lit statement. Wrap a word in *asterisks* to highlight it in lime. */
export function scrubText(text) {
  return text
    .split(/\s+/)
    .map((w) =>
      w.startsWith("*") ? `<span data-word class="hl">${w.replace(/\*/g, "")}</span>` : `<span data-word>${w}</span>`
    )
    .join(" ");
}

export function marquee(words, { variant = "lime", dir = 1, tilt = 0 } = {}) {
  const items = [...words, ...words, ...words, ...words]
    .map((w) => `<span>${w}</span><img src="/logo.png" alt="" width="34" height="34" />`)
    .join("");
  return `
    <div class="marquee marquee--${variant}" style="--tilt:${tilt}deg" aria-hidden="true">
      <div class="marquee__track" data-marquee="${dir}">${items}</div>
    </div>`;
}

export function pageHero({ index, lines, desc }) {
  return `
    <section class="phero">
      <div class="phero__meta">
        <span class="label" data-fade>${index}</span>
        <span class="label phero__rec" data-fade><span class="rec"></span>REC</span>
      </div>
      <h1 class="phero__title">
        ${lines.map((l, i) => `<span class="line ${l.startsWith("~") ? "line--alt" : ""}" data-reveal="${i}"><span>${l.replace(/^~/, "")}</span></span>`).join("")}
      </h1>
      ${desc ? `<p class="phero__desc" data-fade="0.3">${desc}</p>` : ""}
    </section>`;
}

/* ---------- Order buttons ---------- */
export const BTN = {
  whatsapp: (text) => ({ href: WHATSAPP.link(text), label: `WhatsApp ${WHATSAPP.admin}`, icon: WA_ICON, primary: true }),
  fastwork: (href, label = "Order via Fastwork") => ({ href, label }),
  email: () => ({ href: `mailto:${EMAIL}`, label: "Email kami", self: true }),
};

export function orderCTA(buttons) {
  return `
    <div class="order">
      ${buttons.map((b, i) => `
        <a class="btn ${b.primary || (i === 0 && !buttons.some((x) => x.primary)) ? "btn--lime" : "btn--ghost"}"
           href="${b.href}" ${b.self ? "" : 'target="_blank" rel="noopener"'} data-link>
          ${b.icon || ""}<span>${b.label}</span>${ARROW}
        </a>`).join("")}
    </div>`;
}

/* ---------- Pricing ---------- */
function packageCard(p, i) {
  const price = typeof p.price === "number" ? idr(p.price) : p.price;
  return `
    <div class="pkg ${p.featured ? "pkg--featured" : ""}" data-card="${i}">
      <div class="pkg__top">
        <h3 class="pkg__name">${p.name}${p.tier ? ` · <b>${p.tier}</b>` : ""}</h3>
        ${p.featured ? '<span class="pkg__badge">Popular</span>' : ""}
      </div>
      <div class="pkg__price">${price}${p.unit ? `<span>${p.unit}</span>` : ""}</div>
      ${typeof p.price === "number" ? `<p class="pkg__usd">${usd(p.price)}</p>` : ""}
      ${p.fastwork ? `<p class="pkg__meta">Via Fastwork ${idr(p.fastwork)}</p>` : ""}
      ${p.meta ? `<p class="pkg__meta">${p.meta}</p>` : ""}
      <ul class="pkg__points">
        ${p.points.map((pt) => `<li>${pt}</li>`).join("")}
      </ul>
    </div>`;
}

export function usdNote() {
  return `Estimasi USD memakai kurs Rp${USD.rate.toLocaleString("id-ID")}/USD per ${USD.date} — dapat berubah.`;
}

export function pricing({ label, title, note, packages, buttons, cols = 3 }) {
  return `
    <div class="pricing">
      <div class="pricing__head">
        <span class="label" data-fade>${label}</span>
        ${title || note ? `
          <div class="pricing__row">
            ${title ? `<h3 class="pricing__title" data-fade>${title}</h3>` : ""}
            ${note ? `<p class="pricing__note" data-fade>${note}</p>` : ""}
          </div>` : ""}
      </div>
      <div class="pricing__grid pricing__grid--${cols}">${packages.map(packageCard).join("")}</div>
      ${buttons ? orderCTA(buttons) : ""}
    </div>`;
}

/** Cost breakdown table. rows: [{name, desc, cells:[[value, sub?], ...]}] */
export function costTable({ columns, heads, rows, subtotals = [], totals, first = "Komponen" }) {
  const cell = ([v, sub]) => `<td><span class="ct__v">${v}</span>${sub ? `<small>${sub}</small>` : ""}</td>`;
  return `
    <div class="ct" data-fade>
      <table>
        <thead>
          <tr>
            <th>${first}</th>
            ${columns.map((c, i) => `<th>${c}${heads?.[i] ? `<b>${heads[i]}</b>` : ""}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${rows.map((r) => `
            <tr>
              <th scope="row"><strong>${r.name}</strong>${r.desc ? `<small>${r.desc}</small>` : ""}</th>
              ${r.cells.map(cell).join("")}
            </tr>`).join("")}
          ${subtotals.map(([name, vals]) => `
            <tr class="ct__sub">
              <th scope="row"><strong>${name}</strong><small>Subtotal</small></th>
              ${vals.map((v) => cell([v])).join("")}
            </tr>`).join("")}
          ${totals ? `
            <tr class="ct__total">
              <th scope="row"><strong>Total</strong></th>
              ${totals.map((v) => cell([v])).join("")}
            </tr>` : ""}
        </tbody>
      </table>
    </div>`;
}

/** A work tile: web items show a site screenshot, video items a hover-play clip. */
export function workCard(item, i = 0, { wide = false } = {}) {
  const isVideo = Boolean(item.src);
  const media = isVideo
    ? `<video class="wcard__video" src="${item.src}" muted loop playsinline preload="metadata" data-hover-play></video>`
    : `<img class="wcard__site" src="${item.img}" alt="${item.name} — ${item.tag} website" loading="lazy" width="1440" height="900" />`;
  return `
    <a class="wcard ${isVideo ? "wcard--video" : "wcard--web"} ${wide ? "wcard--wide" : ""}" href="${isVideo ? item.src : item.url}"
       target="_blank" rel="noopener" data-link data-card="${i % 2}" ${item.ratio ? `style="--r:${item.ratio}"` : ""}>
      <div class="wcard__media" data-frame>
        ${media}
        ${VF}
        <span class="wcard__view">${isVideo ? "Play" : "Visit"}</span>
      </div>
      <div class="wcard__meta">
        <span class="wcard__name">${item.name}</span>
        <span class="wcard__tag">${item.tag}</span>
        ${item.year ? `<span class="wcard__year">${item.year}</span>` : ""}
      </div>
    </a>`;
}

export function avatar(m, size = "") {
  const inner = m.photo
    ? `<img src="${m.photo}" alt="${m.name}" loading="lazy" width="640" height="640" />`
    : `<span class="avatar__initials">${m.initials}</span>`;
  return `
    <div class="avatar ${size}">
      <svg class="avatar__ring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48"/></svg>
      <div class="avatar__photo">${inner}</div>
    </div>`;
}

export function ctaBand() {
  return `
    <section class="cta">
      <span class="label cta__label" data-fade>(Punya project?)</span>
      <a href="#/contact" class="cta__big" data-route data-link>
        <span class="line" data-reveal><span>Let's frame</span></span>
        <span class="line" data-reveal="1"><span>your brand ${ARROW}</span></span>
      </a>
      <div class="cta__row" data-fade>
        <a href="${WHATSAPP.link()}" target="_blank" rel="noopener" data-link>WhatsApp ${WHATSAPP.admin} · ${WHATSAPP.number}</a>
        <a href="mailto:${EMAIL}" data-link>${EMAIL}</a>
      </div>
    </section>`;
}
