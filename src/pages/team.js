import { TEAM } from "../config.js";
import { ARROW, pageHero, avatar, ctaBand, scrubText } from "../partials.js";
import { focusScene, setupFocus } from "../scenes.js";

export function setup(root) {
  setupFocus(root);
}

export const title = "Team";

const PROCESS = [
  { name: "Brief", desc: "Ngobrol soal tujuan, target audiens, referensi, dan budget project kamu." },
  { name: "Concept", desc: "Kami susun arah visual, struktur, dan timeline — kamu review sebelum produksi dimulai." },
  { name: "Production", desc: "Desain, coding, atau produksi video dikerjakan dengan update progres berkala." },
  { name: "Delivery", desc: "Revisi sesuai paket, file final diserahkan, dan project siap tayang." },
];

export function render() {
  return `
    ${pageHero({
      index: "(Team — 04)",
      lines: ["Two minds.", "~One lens."],
      desc: "Lensa 51 dijalankan dua co-founder dengan kemampuan yang setara. Keduanya memegang semua layanan — AI cinematic & UGC, website, sampai dokumen — dari brief sampai delivery, dengan standar kualitas yang sama.",
    })}

    ${focusScene(TEAM)}

    <section class="members">
      ${TEAM.map((m, i) => `
        <article class="member" data-card="${i}">
          ${avatar(m, "avatar--lg")}
          <div class="member__body">
            <span class="label member__role">${m.role} — ${m.focus}</span>
            <h2 class="member__name">${m.name}</h2>
            <p class="member__bio">${m.bio}</p>
            <ul class="member__skills">${m.skills.map((s) => `<li>${s}</li>`).join("")}</ul>
            <div class="member__foot">
              <a class="btn btn--outline" href="#/${m.slug}" data-route data-link>
                <span>Lihat profil lengkap</span>${ARROW}
              </a>
            </div>
          </div>
        </article>`).join("")}
    </section>

    <section class="intro intro--tight">
      <span class="label" data-fade>(Cara kami bekerja)</span>
      <h2 class="intro__text" data-scrub>
        ${scrubText("Every project gets *one* *owner* from brief to launch — backed by a *partner* who reviews every frame.")}
      </h2>
    </section>

    <section class="process">
      ${PROCESS.map((p, i) => `
        <div class="step" data-card="${i}">
          <div class="step__line"><i data-line></i><b></b></div>
          <span class="label">0${i + 1}</span>
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
        </div>`).join("")}
    </section>

    ${ctaBand()}
  `;
}
