import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VIDEO } from "../config.js";
import { OMNI, SEEDANCE } from "../videoPricing.js";
import { ARROW, BTN, pageHero, pricing, orderCTA, usdNote, marquee, workCard, ctaBand } from "../partials.js";
import { setupSubnav } from "../subnav.js";
import { setupHorizontal } from "../horizontal.js";
import { setupMedia } from "../media.js";
import { EXPLORE } from "../explore.js";
import { closePlayer } from "../lightbox.js";
import { mediaCard, bindPlayers, setupMasonry } from "../gallery.js";
import { cineScene, setupCine } from "../scenes.js";

export const title = "AI Cinematic & UGC";

const DOC = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 3h7l5 5v13H7zM14 3v5h5M10 12h6M10 16h6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`;

const CHOICES = [
  {
    id: "omni", num: "A", name: "Omni Flash", badge: "Cepat & hemat", from: "Mulai Rp225rb",
    desc: "Pilih Omni Flash kalau butuh konten cepat dengan budget ringan — iklan produk, konten sosmed, sampai company profile. Jadi dalam 1–3 hari kerja.",
  },
  {
    id: "seedance", num: "B", name: "Seedance 2.5", badge: "Kualitas sekelas film Hollywood", from: "Mulai Rp2,9 jt",
    desc: "Pilih Seedance untuk hasil sinematik kelas film layar lebar — karakter & dunia custom, voice over lipsync, dan finishing lengkap. Cocok untuk campaign besar & music video.",
  },
];

function placeholder(style) {
  return `
    <div class="masonry-empty">
      ${[0, 1, 2].map((i) => `<span class="masonry-empty__ghost" style="--d:${i}"></span>`).join("")}
      <div class="masonry-empty__text">
        <span class="label">Style ${style}</span>
        <strong>Contoh video segera hadir</strong>
        <p>Sedang kami siapkan — sementara itu, tanya contoh lewat WhatsApp Admin.</p>
      </div>
    </div>`;
}

function gallery(model, styles) {
  const first = Math.max(0, styles.findIndex((s) => s.videos.length));
  return `
    <div class="gallery" data-gallery>
      <div class="gallery__head">
        <span class="label" data-fade>(Contoh video ${model} — per style)</span>
        <span class="label gallery__hint" data-fade>Klik untuk memutar</span>
      </div>
      <div class="gallery__tabs" role="tablist" data-fade>
        ${styles.map((s, i) => `
          <button class="chip ${i === first ? "is-active" : ""} ${s.videos.length ? "" : "chip--soon"}" role="tab" data-style-tab="${i}" data-link>
            ${s.name}<sup>${s.videos.length ? String(s.videos.length).padStart(2, "0") : "segera"}</sup>
          </button>`).join("")}
      </div>
      ${styles.map((s, i) => `
        <div class="gallery__panel ${i === first ? "" : "is-hidden"}" data-style-panel="${i}">
          ${s.videos.length ? `<div class="masonry">${s.videos.map(mediaCard).join("")}</div>` : placeholder(s.name)}
        </div>`).join("")}
    </div>`;
}

/* ---------- Product block: header → gallery → pricing ---------- */
function product(p, num, cols) {
  return `
    <section class="product" id="${p.id}">
      <header class="product__head">
        <span class="product__num" data-fade>${num}</span>
        <div>
          <span class="label" data-fade>AI Cinematic & UGC · ${p.range}</span>
          <h2 class="product__name"><span class="line" data-reveal><span>${p.name}</span></span></h2>
          <p class="product__lead" data-fade>${p.summary}</p>
          <a class="btn btn--outline product__detail" href="#/rincian-harga/${p.id}" data-route data-link data-fade>
            ${DOC}<span>Lihat rincian biaya ${p.name}</span>${ARROW}
          </a>
        </div>
      </header>

      ${gallery(p.name, EXPLORE[p.id])}

      ${pricing({
        label: `(Paket & harga — ${p.name})`,
        note: p.sameFastwork
          ? "Harga sama untuk order langsung maupun lewat Fastwork."
          : "Durasi di atas 60 detik dihitung kelipatan paket. Harga via Fastwork sudah termasuk potongan platform 11%.",
        packages: p.packages,
        cols,
      })}
    </section>`;
}

export function render() {
  return `
    ${pageHero({
      index: "(AI Cinematic & UGC — 01)",
      lines: ["AI Cinematic", "~& UGC."],
      desc: "Video iklan dan konten AI untuk brand, company, dan UMKM — tanpa kru, tanpa lokasi shooting. Ada dua jalur produksi, tinggal sesuaikan dengan kebutuhan dan budget.",
    })}

    ${cineScene("/videos/travel.mp4")}

    <section class="choose">
      ${CHOICES.map((c, i) => `
        <a class="choose__card ${i ? "choose__card--pro" : ""}" href="#/ai-cinematic/${c.id}" data-route data-link data-card="${i}">
          <div class="choose__top">
            <span class="choose__num">${c.num}</span>
            <span class="choose__badge">${c.badge}</span>
          </div>
          <h3 class="choose__name">${c.name}</h3>
          <p class="choose__desc">${c.desc}</p>
          <div class="choose__foot">
            <strong>${c.from}</strong>
            <span class="choose__go">Lihat contoh & harga ${ARROW}</span>
          </div>
        </a>`).join("")}
    </section>

    <section class="hwork hwork--video" data-hwork>
      <div class="hwork__stage">
        <div class="hwork__head">
          <span class="label">(Showreel & karya brand — ${String(VIDEO.works.length).padStart(2, "0")} video)</span>
          <span class="label hwork__hint">Scroll →</span>
        </div>
        <div class="hwork__track" data-htrack>
          <div class="hwork__intro">
            <h2 class="h2"><span>Selected</span><span class="alt">films</span></h2>
            <p>Iklan & konten AI yang sudah kami produksi. Video diputar tanpa suara — klik untuk membuka versi penuh.</p>
          </div>
          ${VIDEO.works.map((w, i) => workCard(w, i)).join("")}
          <a class="hwork__end" href="${VIDEO.driveUrl}" target="_blank" rel="noopener" data-link>
            <span class="label">Google Drive</span>
            <strong>All projects</strong>
            ${ARROW}
          </a>
        </div>
      </div>
    </section>

    <div class="tapes tapes--single">
      ${marquee(["Omni Flash", "Seedance 2.5", "Iklan Produk", "Music Video", "Lipsync VO"], { variant: "lime", tilt: -1.5 })}
    </div>

    <div class="subnav-scope">
      <nav class="subnav" data-subnav>
        <a href="#/ai-cinematic/omni" data-route data-link data-sub="omni"><i>A</i>Omni Flash</a>
        <a href="#/ai-cinematic/seedance" data-route data-link data-sub="seedance"><i>B</i>Seedance 2.5</a>
      </nav>
      ${product(OMNI, "A", 3)}
      ${product(SEEDANCE, "B", 2)}
    </div>

    <section class="section order-block" data-fade>
      <div>
        <span class="label">(Order AI Cinematic & UGC)</span>
        <h3 class="order-block__title">Ceritakan kebutuhanmu, kami bantu pilih paket yang pas.</h3>
        <p class="order-block__note">Chat langsung dengan Admin Lensa 51. ${usdNote()}</p>
      </div>
      ${orderCTA([
        BTN.whatsapp("Halo Lensa 51, saya mau order AI Cinematic & UGC. Paket yang saya minati: "),
        BTN.fastwork(VIDEO.fastworkUrl, "Order di Fastwork"),
      ])}
    </section>

    ${ctaBand()}
  `;
}

function setupGallery(root, lenis) {
  const offMasonry = setupMasonry(root);
  bindPlayers(root, lenis);

  root.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const tabs = [...gallery.querySelectorAll("[data-style-tab]")];
    const panels = [...gallery.querySelectorAll("[data-style-panel]")];
    tabs.forEach((tab) =>
      tab.addEventListener("click", () => {
        const i = tab.dataset.styleTab;
        tabs.forEach((t) => t.classList.toggle("is-active", t === tab));
        panels.forEach((p) => p.classList.toggle("is-hidden", p.dataset.stylePanel !== i));
        const shown = gallery.querySelectorAll(`[data-style-panel="${i}"] .yt, [data-style-panel="${i}"] .masonry-empty`);
        gsap.fromTo(shown, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.05 });
        ScrollTrigger.refresh();
      })
    );
  });
  return offMasonry;
}

export function setup(root, { lenis }) {
  setupCine(root);
  setupSubnav(root);
  const offG = setupGallery(root, lenis);
  const offH = setupHorizontal(root);
  const offM = setupMedia(root, { autoplay: true });
  return () => {
    offG();
    offH();
    offM();
    closePlayer();
  };
}
