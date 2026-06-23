import { PROJECTS, WEB } from "../config.js";
import { contactBand, pricing } from "../partials.js";

export const title = "Web Design";
export const theme = "web";
export const visual = 1; // lines

function card(p) {
  return `
    <a class="project" href="${p.url}" target="_blank" rel="noopener" data-link data-reveal-card>
      <div class="project__frame">
        <iframe class="project__preview" src="${p.url}" loading="lazy" tabindex="-1"
                scrolling="no" title="${p.name} preview"></iframe>
        <span class="project__view">View<br/>site</span>
      </div>
      <div class="project__meta">
        <span class="project__name"><span class="project__num">${p.num}</span> ${p.name}</span>
        <span class="project__tag">${p.tag} · ${p.year}</span>
      </div>
      <div class="project__bar"></div>
    </a>`;
}

export function render() {
  return `
    <section class="page-hero">
      <p class="page-hero__index" data-fade>(Web Design — 01)</p>
      <h1 class="page-hero__title">
        <span class="line" data-reveal><span>Six brands.</span></span>
        <span class="line line--serif" data-reveal><span><em>Six worlds.</em></span></span>
      </h1>
      <p class="page-hero__desc" data-fade>
        Landing page & website modern dengan custom code — responsive, cepat,
        dan penuh motion. Hover untuk preview, klik untuk masuk.
      </p>
    </section>

    <section class="work">
      <div class="projects">
        ${PROJECTS.map(card).join("")}
      </div>
    </section>

    <section class="statement">
      <h2 class="statement__text" data-scrub data-word-wrap>
        <span data-word>Websites</span> <span data-word>that</span>
        <span data-word>feel</span> <span data-word>less</span>
        <span data-word>like</span> <span data-word>pages</span>
        <span data-word>—</span> <span data-word>and</span>
        <span data-word>more</span> <span data-word>like</span>
        <span data-word>experiences.</span>
      </h2>
    </section>

    ${pricing({
      index: "(Paket — Web Design)",
      title: "Pilih paket<br/>website kamu.",
      note: "Harga sesuai Fastwork. Custom code, bukan template.",
      packages: WEB.packages,
      fastwork: WEB.fastwork,
    })}

    ${contactBand()}
  `;
}
