import { EMAIL, FASTWORK_PROFILE } from "../config.js";
import { orderCTA } from "../partials.js";

export const title = "Contact";
export const theme = "contact";
export const visual = 0; // chrome

export function render() {
  return `
    <section class="contact" id="contact">
      <p class="contact__index" data-fade>(Let's build something)</p>
      <a href="${FASTWORK_PROFILE}" target="_blank" rel="noopener" class="contact__mail" data-link>
        <span class="contact__mail-text" data-reveal><span>Start a project</span></span>
        <svg viewBox="0 0 24 24" width="40" height="40"><path d="M5 19L19 5M19 5H9M19 5v10" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>
      </a>

      <div class="contact__order">
        ${orderCTA(FASTWORK_PROFILE, "Lihat semua jasa di Fastwork")}
      </div>

      <div class="contact__details">
        <div class="contact__item" data-fade>
          <span class="contact__label">Email</span>
          <a href="mailto:${EMAIL}" class="contact__value" data-link>${EMAIL}</a>
        </div>
        <div class="contact__item" data-fade>
          <span class="contact__label">Freelance</span>
          <a href="${FASTWORK_PROFILE}" target="_blank" rel="noopener" class="contact__value" data-link>Fastwork · fahmy22 ↗</a>
        </div>
        <div class="contact__item" data-fade>
          <span class="contact__label">Based in</span>
          <span class="contact__value">Indonesia · Worldwide</span>
        </div>
      </div>
    </section>
  `;
}
