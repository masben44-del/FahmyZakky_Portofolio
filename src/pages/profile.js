import { TEAM, EMAIL, WHATSAPP } from "../config.js";
import { PROFILES } from "../profiles.js";
import { ARROW, avatar, ctaBand } from "../partials.js";
import { mediaCard, bindPlayers } from "../gallery.js";
import { closePlayer } from "../lightbox.js";
import { proofSection, setupProof } from "../proof.js";

const soon = (what) => `
  <div class="prof-soon" data-fade>
    <span class="label">Segera diperbarui</span>
    <p>${what} sedang kami lengkapi.</p>
  </div>`;

function block(label, title, body) {
  return `
    <section class="prof-block">
      <div class="prof-block__side">
        <span class="label" data-fade>${label}</span>
        <h2 class="prof-block__title" data-fade>${title}</h2>
      </div>
      <div class="prof-block__body">${body}</div>
    </section>`;
}

/** Builds a page module for one team member (#/<slug>). */
export function createProfile(slug) {
  const m = TEAM.find((t) => t.slug === slug);
  const p = PROFILES[slug] || {};
  const first = m.name.split(" ")[0];
  const [nameA, ...nameB] = m.name.split(" ");

  const contactBtn = p.contact?.whatsapp
    ? { href: WHATSAPP.link(`Halo Lensa 51, saya mau diskusi project dengan ${first}.`), label: p.contact.label }
    : p.contact;

  function render() {
    return `
      <section class="prof-hero">
        <a class="prof-back label" href="#/team" data-route data-link>← Kembali ke Team</a>
        <div class="prof-hero__grid">
          <div class="prof-hero__photo" data-fade>${avatar(m, "avatar--xl")}</div>
          <div class="prof-hero__info">
            <span class="label prof-hero__role" data-fade>${m.role} — Lensa 51</span>
            <h1 class="prof-hero__name">
              <span class="line" data-reveal="0"><span>${nameA}</span></span>
              ${nameB.length ? `<span class="line line--alt" data-reveal="1"><span>${nameB.join(" ")}</span></span>` : ""}
            </h1>
            <p class="prof-hero__title" data-fade>${p.title || m.focus}</p>
            <ul class="prof-hero__meta" data-fade>
              <li>${p.location || "Indonesia"}</li>
            </ul>
            <div class="order" data-fade>
              ${contactBtn ? `<a class="btn btn--lime" href="${contactBtn.href}" target="_blank" rel="noopener" data-link><span>${contactBtn.label}</span>${ARROW}</a>` : ""}
              <a class="btn btn--ghost" href="mailto:${EMAIL}" data-link><span>Email</span>${ARROW}</a>
              ${(p.links || []).map((l) => `<a class="btn btn--ghost" href="${l.href}" target="_blank" rel="noopener" data-link><span>${l.label}</span>${ARROW}</a>`).join("")}
            </div>
          </div>
        </div>
      </section>

      ${p.stats?.length ? `
        <section class="stats prof-stats">
          ${p.stats.map(([v, l], i) => `<div class="stat ${i === 1 ? "stat--lime" : ""}" data-card="${i}"><b>${v}</b><span class="label">${l}</span></div>`).join("")}
        </section>` : ""}

      ${block("(Profil)", "Tentang", p.about ? `<p class="prof-about" data-fade>${p.about}</p>` : soon(`Profil ${first}`))}

      ${block("(Layanan)", "Yang bisa dipegang", `
        <p class="prof-note" data-fade>Seperti semua anggota Lensa 51, ${first} menangani semua layanan kami:</p>
        <ul class="incl" data-fade>${m.skills.map((s) => `<li>${s}</li>`).join("")}</ul>`)}

      ${block("(Keahlian)", "Skill & tools", p.skills?.length ? `
        <div class="prof-skills">
          ${p.skills.map((g, i) => `
            <div class="prof-skill" data-card="${i % 3}">
              <span class="label">${g.group}</span>
              <ul>${g.items.map((it) => `<li>${it}</li>`).join("")}</ul>
            </div>`).join("")}
        </div>` : soon("Daftar skill & tools"))}

      ${block("(Pengalaman)", "Perjalanan", p.experience?.length ? `
        <ol class="prof-exp">
          ${p.experience.map((x, i) => `
            <li class="prof-exp__item" data-card="${i}">
              <span class="prof-exp__dot"></span>
              <span class="label">${x.meta}</span>
              <h3>${x.role}</h3>
              <p class="prof-exp__org">${x.org}</p>
              <ul>${x.points.map((pt) => `<li>${pt}</li>`).join("")}</ul>
            </li>`).join("")}
        </ol>` : soon("Riwayat pengalaman"))}

      ${block("(Klien)", "Pernah dipercaya", p.clients?.length ? `
        <ul class="prof-clients" data-fade>${p.clients.map((c) => `<li>${c}</li>`).join("")}</ul>` : soon("Daftar klien"))}

      ${block("(Karya)", "Karya pribadi", p.works?.length ? `
        <div class="prof-works">${p.works.map(mediaCard).join("")}</div>
        ${p.worksNote ? `<p class="prof-note" data-fade>${p.worksNote}</p>` : ""}` : soon("Karya pilihan"))}

      ${p.languages?.length ? block("(Bahasa)", "Bahasa", `<ul class="prof-clients" data-fade>${p.languages.map((l) => `<li>${l}</li>`).join("")}</ul>`) : ""}

      ${p.reviews ? proofSection({ index: `(Testimoni klien ${first})` }) : ""}

      ${ctaBand()}
    `;
  }

  function setup(root, { lenis }) {
    bindPlayers(root, lenis);
    setupProof(root);
    return () => closePlayer();
  }

  return { title: m.name, nav: "team", render, setup };
}
