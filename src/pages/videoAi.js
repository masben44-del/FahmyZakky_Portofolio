import { VIDEO_COMMERCIAL, VIDEO_PROFILE, VIDEO_REEL, VIDEO_PROJECTS_URL } from "../config.js";
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
        Dua arah, satu standar kualitas: <strong>Commercial</strong> untuk video
        ads brand & produk, dan <strong>Company Profile</strong> untuk storytelling
        sinematik. Dibuat dengan AI — tanpa ribet shooting.
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

    ${marquee(["Commercial Ads", "Company Profile", "Cinematic AI", "TikTok & Reels", "Brand Story"])}

    <section class="statement">
      <h2 class="statement__text" data-scrub data-word-wrap>
        <span data-word>Cinema-grade</span> <span data-word>visuals.</span>
        <span data-word>Zero</span> <span data-word>film</span>
        <span data-word>crew.</span> <span data-word>From</span>
        <span data-word>prompt</span> <span data-word>to</span>
        <span data-word>post.</span>
      </h2>
    </section>

    <!-- Sub-service A: Commercial / Video Ads -->
    <div class="vsplit" id="commercial">
      <div class="vsplit__head">
        <span class="vsplit__tag">Layanan A</span>
        <h2 class="vsplit__title" data-reveal><span>Commercial</span></h2>
        <p class="vsplit__desc" data-fade>${VIDEO_COMMERCIAL.tagline}</p>
      </div>
      ${pricing({
        index: "(Paket — Commercial)",
        title: "",
        packages: VIDEO_COMMERCIAL.packages,
        orderUrl: VIDEO_COMMERCIAL.fiverr,
        orderLabel: "Order via Fiverr",
      })}
    </div>

    <!-- Sub-service B: Company Profile / Cinematic -->
    <div class="vsplit" id="company-profile">
      <div class="vsplit__head">
        <span class="vsplit__tag">Layanan B</span>
        <h2 class="vsplit__title" data-reveal><span>Company Profile</span></h2>
        <p class="vsplit__desc" data-fade>${VIDEO_PROFILE.tagline}</p>
      </div>
      ${pricing({
        index: "(Paket — Company Profile)",
        title: "",
        packages: VIDEO_PROFILE.packages,
        orderUrl: VIDEO_PROFILE.fiverr,
        orderLabel: "Order via Fiverr",
      })}
    </div>

    ${contactBand()}
  `;
}
