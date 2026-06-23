import { marquee, contactBand } from "../partials.js";

export const title = "Home";
export const theme = "home";
export const visual = 0; // chrome

export function render() {
  return `
    <section class="hero" id="hero">
      <div class="hero__inner">
        <p class="hero__eyebrow" data-fade>
          <span></span> Web · AI Video · Documents
        </p>
        <h1 class="hero__title">
          <span class="line" data-reveal><span>FAHMY</span></span>
          <span class="line line--serif" data-reveal><span><em>Zakky</em></span></span>
        </h1>
        <div class="hero__bottom">
          <p class="hero__desc" data-fade>
            Creative studio of one — immersive websites, AI-powered video, and
            polished documents that make brands impossible to ignore.
          </p>
          <a href="#/web-design" class="hero__scroll" data-route data-link>
            <span>Explore work</span>
            <svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 4v16m0 0l-6-6m6 6l6-6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
          </a>
        </div>
      </div>
    </section>

    ${marquee(["Web Design", "AI Video", "Documents", "Motion & 3D"])}

    <section class="intro">
      <p class="intro__index" data-fade>(About)</p>
      <h2 class="intro__text" data-scrub data-word-wrap>
        <span data-word>Crafting</span> <span data-word>digital</span>
        <span data-word>experiences</span> <span data-word>that</span>
        <span data-word>move.</span> <span data-word>From</span>
        <span data-word>immersive</span> <span data-word>websites</span>
        <span data-word>to</span> <span data-word>AI</span>
        <span data-word>video</span> <span data-word>&</span>
        <span data-word>documents,</span> <span data-word>built</span>
        <span data-word>with</span> <span data-word>intention.</span>
      </h2>
    </section>

    <section class="services">
      <p class="services__index" data-fade>(What I do)</p>
      <a class="service-row" href="#/web-design" data-route data-link data-reveal-card>
        <span class="service-row__num">01</span>
        <span class="service-row__name">Web Design</span>
        <span class="service-row__desc">Immersive, motion-first websites & custom code.</span>
        <span class="service-row__arrow">↗</span>
      </a>
      <a class="service-row" href="#/video-ai" data-route data-link data-reveal-card>
        <span class="service-row__num">02</span>
        <span class="service-row__name">Video AI</span>
        <span class="service-row__desc">Cinematic & UGC AI video that converts.</span>
        <span class="service-row__arrow">↗</span>
      </a>
      <a class="service-row" href="#/documents" data-route data-link data-reveal-card>
        <span class="service-row__num">03</span>
        <span class="service-row__name">Documents</span>
        <span class="service-row__desc">PPT, Word, Excel & PDF profesional dengan AI.</span>
        <span class="service-row__arrow">↗</span>
      </a>
    </section>

    ${contactBand()}
  `;
}
