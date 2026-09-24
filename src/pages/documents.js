import { DOCUMENTS } from "../config.js";
import { ARROW, BTN, pageHero, pricing, scrubText, marquee, ctaBand } from "../partials.js";
import { fanScene, setupFan } from "../scenes.js";

export function setup(root) {
  setupFan(root);
}

export const title = "Documents";

export function render() {
  return `
    ${pageHero({
      index: "(Documents — 03)",
      lines: ["Documents", "~done right."],
      desc: "Dokumen profesional dengan bantuan AI plus sentuhan desain — rapi, konsisten, dan siap dipakai untuk presentasi, proposal, atau laporan.",
    })}

    ${fanScene()}

    <section class="section">
      <div class="section__head">
        <span class="label" data-fade>(Yang bisa kami buat)</span>
        <a class="textlink" href="${DOCUMENTS.orderUrl}" target="_blank" rel="noopener" data-link data-fade>
          Lihat contoh di Fastwork ${ARROW}
        </a>
      </div>
      <div class="dtypes">
        ${DOCUMENTS.types.map((d, i) => `
          <div class="dtype" data-card="${i}">
            <span class="label">0${i + 1}</span>
            <h3>${d.name}</h3>
            <p>${d.desc}</p>
          </div>`).join("")}
      </div>
    </section>

    <div class="tapes tapes--single">
      ${marquee(["Pitch Deck", "Proposal", "Company Profile", "Dashboard", "Laporan"], { variant: "olive", tilt: -1.5 })}
    </div>

    <section class="intro intro--tight">
      <span class="label" data-fade>(Kenapa penting)</span>
      <h2 class="intro__text" data-scrub>
        ${scrubText("First impressions are made on a *slide.* Make yours *count.*")}
      </h2>
    </section>

    <section class="section" id="harga">
      ${pricing({
        label: "(Paket — Documents)",
        title: "Mulai dari Rp50 ribu.",
        note: "Semua paket: 1 hari pengerjaan, 3x revisi, diskusi unlimited.",
        packages: DOCUMENTS.packages,
        buttons: [
          BTN.fastwork(DOCUMENTS.orderUrl, DOCUMENTS.orderLabel),
          BTN.whatsapp("Halo Lensa 51, saya mau tanya soal jasa pembuatan dokumen."),
          BTN.email(),
        ],
      })}
    </section>

    ${ctaBand()}
  `;
}
