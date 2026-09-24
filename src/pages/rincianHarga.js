import { VIDEO, WHATSAPP, FASTWORK_PROFILE, USD, idr, usd } from "../config.js";
import { OMNI, SEEDANCE } from "../videoPricing.js";
import { BTN, pageHero, pricing, costTable, orderCTA, usdNote } from "../partials.js";
import { setupSubnav } from "../subnav.js";

export const title = "Rincian Harga";

const notes = (list) => `
  <ol class="notes">
    ${list.map((n) => {
      const [q, ...rest] = n.split("? ");
      // one wrapper so title + text form a single grid item beside the number
      return `<li><p>${rest.length ? `<strong>${q}?</strong> ${rest.join("? ")}` : n}</p></li>`;
    }).join("")}
  </ol>`;

const faq = (list) => `
  <div class="faq">
    ${list.map(([q, a]) => `
      <details class="faq__item">
        <summary><span>${q}</span><i aria-hidden="true"></i></summary>
        <p>${a}</p>
      </details>`).join("")}
  </div>`;

const block = (label, title, body, hint = "") => `
  <div class="rblock">
    <div class="rblock__head">
      <span class="label" data-fade>${label}</span>
      ${title ? `<h3 class="rblock__title" data-fade>${title}</h3>` : ""}
      ${hint ? `<p class="rblock__hint" data-fade>${hint}</p>` : ""}
    </div>
    ${body}
  </div>`;

const TK_NOTE =
  "TK = tenaga kerja & operasional. Tools = porsi langganan tools AI pendukung (brainstorming, penyusunan prompt, editing), di luar credit generate.";

function durationTable(p) {
  return `
    <div class="ct" data-fade>
      <table>
        <thead>
          <tr><th>Durasi</th><th>Order langsung</th><th>Via Fastwork</th><th>Estimasi USD</th></tr>
        </thead>
        <tbody>
          ${p.durations.map((d) => `
            <tr>
              <th scope="row"><strong>${d.name}</strong>${d.note ? `<small>${d.note}</small>` : ""}</th>
              <td><span class="ct__v">${idr(d.price)}</span></td>
              <td><span class="ct__v">${idr(d.fastwork)}</span></td>
              <td><span class="ct__v ct__usd">${usd(d.price)}</span></td>
            </tr>`).join("")}
        </tbody>
      </table>
    </div>`;
}

function product(p, num) {
  const heads = p.packages.map((x) => idr(x.price));
  return `
    <section class="rproduct" id="${p.id}">
      <header class="rproduct__head">
        <span class="label" data-fade>${num} · AI Cinematic & UGC · ${p.name}</span>
        <h2 class="rproduct__title">
          <span class="line" data-reveal><span>Kenapa harganya</span></span>
          <span class="line line--alt" data-reveal="1"><span>${p.range}?</span></span>
        </h2>
        <p class="rproduct__intro" data-fade>${p.intro}</p>
      </header>

      ${pricing({
        label: "(Harga paket)",
        note: p.sameFastwork
          ? "Harga Omni Flash sama untuk semua jalur order: langsung maupun lewat Fastwork."
          : "Estimasi pengerjaan 4–5 hari kerja untuk paket 60 detik, tergantung kecepatan respon dan review klien.",
        packages: p.packages,
        cols: p.packages.length,
      })}

      ${block(
        "(Rincian biaya)",
        "Rincian per komponen",
        costTable({ columns: p.columns, heads, rows: p.components, subtotals: p.subtotals, totals: p.totals }) +
          `<p class="rblock__foot">${TK_NOTE}</p>`,
        "Geser tabel ke samping di HP untuk melihat semua paket."
      )}

      ${p.credits ? block(
        "(Credit generate)",
        "Rincian credit generate",
        costTable({ first: "Item", columns: p.columns, rows: p.credits.rows, totals: p.credits.total }) +
          `<p class="rblock__foot">${p.credits.note}</p>`,
        "Bagian terbesar biaya adalah credit generate. Ini cara menghitungnya."
      ) : ""}

      ${p.durations ? block(
        "(Harga per durasi)",
        "Order langsung vs Fastwork",
        durationTable(p) +
          `<p class="rblock__foot">Durasi di atas 60 detik dihitung kelipatan paket. Harga via Fastwork sudah termasuk potongan platform 11% yang dibebankan Fastwork ke penyedia jasa.</p>`
      ) : ""}

      ${block("(Catatan penting)", "", notes(p.notes))}
      ${block("(FAQ)", "Pertanyaan yang sering muncul", faq(p.faq))}
    </section>`;
}

export function render() {
  return `
    ${pageHero({
      index: "(Rincian Harga — AI Cinematic & UGC)",
      lines: ["Rincian", "~harga video AI."],
      desc: `Transparan dari credit AI sampai tenaga kerja. Semua harga dalam Rupiah — ${usdNote().charAt(0).toLowerCase()}${usdNote().slice(1)}`,
    })}

    <div class="subnav-scope">
      <nav class="subnav" data-subnav>
        <a href="#/rincian-harga/omni" data-route data-link data-sub="omni"><i>A</i>Omni Flash</a>
        <a href="#/rincian-harga/seedance" data-route data-link data-sub="seedance"><i>B</i>Seedance 2.5</a>
      </nav>
      ${product(OMNI, "A")}
      ${product(SEEDANCE, "B")}
    </div>

    <section class="rcontact" data-fade>
      <span class="label">(Ada pertanyaan soal rincian ini?)</span>
      <h2 class="rcontact__title">Hubungi admin lewat WhatsApp, atau order langsung di Fastwork.</h2>
      <div class="rcontact__rows">
        <div class="rcontact__row">
          <span class="label">WhatsApp</span>
          <strong>${WHATSAPP.name}</strong>
          <span class="rcontact__num">${WHATSAPP.number}</span>
          <button class="chip" data-copy="${WHATSAPP.number}" data-link>Salin</button>
        </div>
        <div class="rcontact__row">
          <span class="label">Fastwork</span>
          <a href="${FASTWORK_PROFILE}" target="_blank" rel="noopener" data-link><strong>Fahmy Zakky</strong></a>
        </div>
      </div>
      ${orderCTA([
        BTN.whatsapp("Halo Lensa 51, saya mau tanya soal rincian harga AI Cinematic & UGC."),
        BTN.fastwork(VIDEO.fastworkUrl, "Order di Fastwork"),
      ])}
      <p class="rcontact__fx label">Kurs acuan Rp${USD.rate.toLocaleString("id-ID")}/USD per ${USD.date}. Harga dalam Rupiah.</p>
    </section>
  `;
}

export function setup(root) {
  setupSubnav(root);
  const btn = root.querySelector("[data-copy]");
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = "Tersalin ✓";
    } catch {
      btn.textContent = btn.dataset.copy;
    }
    setTimeout(() => (btn.textContent = "Salin"), 2000);
  });
}
