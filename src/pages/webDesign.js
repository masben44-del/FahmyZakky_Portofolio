import { WEB } from "../config.js";
import { BTN, pageHero, workCard, pricing, scrubText, ctaBand } from "../partials.js";
import { setupMedia } from "../media.js";
import { stackScene, setupStack } from "../scenes.js";

export const title = "Vibe Code Web Design";

export function render() {
  return `
    ${pageHero({
      index: "(Vibe Code Web Design — 02)",
      lines: ["Vibe code", "~web design."],
      desc: "Landing page dan website perusahaan yang dibangun lewat vibe coding — desain + AI menghasilkan custom code, bukan template. Cepat, responsive, dan penuh motion supaya brand kamu terasa hidup.",
    })}

    ${stackScene(WEB.projects)}

    <section class="section">
      <div class="section__head">
        <span class="label" data-fade>(Portofolio — ${String(WEB.projects.length).padStart(2, "0")} website live)</span>
        <p class="section__note" data-fade>Klik untuk membuka website aslinya.</p>
      </div>
      <div class="grid2">
        ${WEB.projects.map((p, i) => workCard(p, i)).join("")}
      </div>
    </section>

    <section class="intro intro--tight">
      <span class="label" data-fade>(Pendekatan kami)</span>
      <h2 class="intro__text" data-scrub>
        ${scrubText("Websites that feel less like *pages* — and more like *experiences.* Custom code, fast load, motion that *means* something.")}
      </h2>
    </section>

    <section class="section" id="harga">
      <ul class="incl" data-fade>
        ${["Landing page", "Company website", "Custom code", "Mobile responsive", "Animasi & interaksi"].map((x) => `<li>${x}</li>`).join("")}
      </ul>
      ${pricing({
        label: "(Paket — Vibe Code Web Design)",
        title: "Mulai dari Rp1 juta.",
        note: "Harga sesuai Fastwork. Semua paket custom code, bukan template.",
        packages: WEB.packages,
        buttons: [
          BTN.fastwork(WEB.orderUrl, WEB.orderLabel),
          BTN.whatsapp("Halo Lensa 51, saya mau tanya soal pembuatan website."),
          BTN.email(),
        ],
      })}
    </section>

    ${ctaBand()}
  `;
}

export function setup(root) {
  setupStack(root);
  return setupMedia(root);
}
