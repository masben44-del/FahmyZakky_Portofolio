import { DOCUMENTS } from "../config.js";
import { marquee, contactBand, pricing } from "../partials.js";

export const title = "Documents";
export const theme = "docs";
export const visual = 3; // glass

const DOCS = [
  { num: "01", name: "Presentation", desc: "Pitch deck, company profile, materi training — PPT yang clean & meyakinkan." },
  { num: "02", name: "Word", desc: "Proposal, SOP, surat & CV profesional yang rapi dan siap kirim." },
  { num: "03", name: "Excel", desc: "Dashboard, proyeksi keuangan & spreadsheet otomatis yang gampang dibaca." },
  { num: "04", name: "PDF", desc: "Dokumen final siap cetak / kirim, layout konsisten dan profesional." },
];

export function render() {
  return `
    <section class="page-hero">
      <p class="page-hero__index" data-fade>(Documents — 03)</p>
      <h1 class="page-hero__title">
        <span class="line" data-reveal><span>Documents</span></span>
        <span class="line line--serif" data-reveal><span><em>done right</em></span></span>
      </h1>
      <p class="page-hero__desc" data-fade>
        Dokumen profesional dengan AI + sentuhan desain: PPT, Word, Excel & PDF
        siap pakai. Cepat, rapi, dan bikin kamu kelihatan kredibel.
      </p>
    </section>

    ${marquee(["Presentation", "Word", "Excel", "PDF", "Pitch Deck", "Company Profile"])}

    <section class="vservices">
      <div class="vservices__head">
        <p class="vservices__index" data-fade>(Yang bisa dibuat)</p>
        <h2 class="vservices__title" data-fade>Empat format,<br/>satu standar rapi.</h2>
      </div>
      <div class="vservices__grid vservices__grid--4">
        ${DOCS.map(
          (d) => `
          <div class="vservice" data-reveal-card>
            <span class="vservice__num">${d.num}</span>
            <h3 class="vservice__name">${d.name}</h3>
            <p class="vservice__desc">${d.desc}</p>
          </div>`
        ).join("")}
      </div>
    </section>

    <section class="statement">
      <h2 class="statement__text" data-scrub data-word-wrap>
        <span data-word>First</span> <span data-word>impressions</span>
        <span data-word>are</span> <span data-word>made</span>
        <span data-word>on</span> <span data-word>a</span>
        <span data-word>slide.</span> <span data-word>Make</span>
        <span data-word>yours</span> <span data-word>count.</span>
      </h2>
    </section>

    ${pricing({
      index: "(Paket — Documents)",
      title: "Mulai dari<br/>Rp50.000.",
      note: "Semua paket: 1 hari pengerjaan, 3x revisi, diskusi unlimited.",
      packages: DOCUMENTS.packages,
      orderUrl: DOCUMENTS.fastwork,
    })}

    ${contactBand()}
  `;
}
