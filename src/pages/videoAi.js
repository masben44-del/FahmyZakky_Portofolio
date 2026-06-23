import { VIDEO_CINEMATIC, VIDEO_UGC, VIDEO_REEL, VIDEO_PROJECTS_URL } from "../config.js";
import { marquee, contactBand, pricing } from "../partials.js";

function videoCard(v) {
  return `
    <div class="vplayer ${v.big ? "" : "vplayer--small"}" data-reveal-card>
      <video class="vplayer__video" src="${v.src}"
             ${v.big ? "autoplay muted loop" : "muted loop"}
             playsinline preload="metadata" controls></video>
      ${v.label ? `<span class="vplayer__tag">${v.label}</span>` : ""}
    </div>`;
}

export const title = "Video AI";
export const theme = "video";
export const visual = 2; // particles

export function render() {
  return `
    <section class="page-hero">
      <p class="page-hero__index" data-fade>(Video AI — 02)</p>
      <h1 class="page-hero__title">
        <span class="line" data-reveal><span>AI VIDEO</span></span>
        <span class="line line--serif" data-reveal><span><em>that converts</em></span></span>
      </h1>
      <p class="page-hero__desc" data-fade>
        Dua arah, satu standar kualitas: <strong>Cinematic</strong> untuk company
        profile & storytelling, dan <strong>UGC</strong> untuk konten produk
        viral-ready. Dibuat dengan AI — tanpa ribet shooting.
      </p>
    </section>

    <section class="vshowcase">
      <div class="vshowcase__head">
        <p class="vshowcase__index" data-fade>(Showreel)</p>
        <a class="vshowcase__cta" href="${VIDEO_PROJECTS_URL}" target="_blank" rel="noopener" data-link>
          <span>Lihat semua project</span>
          <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 19L19 5M19 5H9M19 5v10" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </a>
      </div>
      <div class="vshowcase__grid">
        ${VIDEO_REEL.map(videoCard).join("")}
      </div>
    </section>

    ${marquee(["Cinematic", "UGC", "Company Profile", "TikTok & Reels", "E-Commerce"])}

    <section class="statement">
      <h2 class="statement__text" data-scrub data-word-wrap>
        <span data-word>Cinema-grade</span> <span data-word>visuals.</span>
        <span data-word>Zero</span> <span data-word>film</span>
        <span data-word>crew.</span> <span data-word>From</span>
        <span data-word>prompt</span> <span data-word>to</span>
        <span data-word>post.</span>
      </h2>
    </section>

    <!-- Sub-service A: Cinematic -->
    <div class="vsplit" id="cinematic">
      <div class="vsplit__head">
        <span class="vsplit__tag">Layanan A</span>
        <h2 class="vsplit__title" data-reveal><span>Cinematic</span></h2>
        <p class="vsplit__desc" data-fade>${VIDEO_CINEMATIC.tagline}</p>
      </div>
      ${pricing({
        index: "(Paket — Cinematic)",
        title: "",
        packages: VIDEO_CINEMATIC.packages,
        fastwork: VIDEO_CINEMATIC.fastwork,
      })}
    </div>

    <!-- Sub-service B: UGC -->
    <div class="vsplit" id="ugc">
      <div class="vsplit__head">
        <span class="vsplit__tag">Layanan B</span>
        <h2 class="vsplit__title" data-reveal><span>UGC</span></h2>
        <p class="vsplit__desc" data-fade>${VIDEO_UGC.tagline}</p>
      </div>
      ${pricing({
        index: "(Paket — UGC)",
        title: "",
        packages: VIDEO_UGC.packages,
        fastwork: VIDEO_UGC.fastwork,
      })}
    </div>

    ${contactBand()}
  `;
}
