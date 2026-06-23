import { VIDEO_CINEMATIC, VIDEO_UGC } from "../config.js";
import { marquee, contactBand, pricing } from "../partials.js";

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
      <div class="vshowcase__grid">
        <div class="vplayer" data-reveal-card>
          <span class="vplayer__tag">Showreel</span>
          <span class="vplayer__play">▶</span>
          <span class="vplayer__note">Contoh video segera tayang</span>
        </div>
        <div class="vplayer vplayer--small" data-reveal-card>
          <span class="vplayer__play">▶</span>
        </div>
        <div class="vplayer vplayer--small" data-reveal-card>
          <span class="vplayer__play">▶</span>
        </div>
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
