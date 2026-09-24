import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES, COMING_SOON, TEAM, WEB, VIDEO, WHATSAPP } from "../config.js";
import { ARROW, VF, scrubText, marquee, workCard, avatar, ctaBand } from "../partials.js";
import { irisMarkup, bindIris } from "../aperture.js";
import { setupMedia } from "../media.js";
import { setupHorizontal } from "../horizontal.js";
import { proofSection, setupProof } from "../proof.js";

export const title = "";

const FEATURED = WEB.projects.slice(0, 5);
const F_STOPS = ["22", "16", "11", "8", "5.6", "4", "2.8", "2", "1.4"];

export function render() {
  return `
    <section class="hero" data-frame>
      ${VF}
      <div class="hero__hud hero__hud--l label" data-fade="0.5">[ Lensa 51 — Creative Studio ]</div>
      <div class="hero__hud hero__hud--r label" data-fade="0.5"><span class="rec"></span>REC <span data-timecode>00:00:00:00</span></div>

      <h1 class="hero__title">
        <span class="line" data-reveal="0"><span>We frame</span></span>
        <span class="line" data-reveal="1"><span><img class="hero__lens" src="/logo.png" alt="" width="200" height="200" />brands</span></span>
        <span class="line line--alt" data-reveal="2"><span>in motion.</span></span>
      </h1>

      <div class="hero__bottom">
        <p class="hero__desc" data-fade="0.4">
          Studio kreatif AI dari Indonesia. Kami membuat video AI sinematik & UGC,
          website vibe code, dan dokumen profesional yang bikin brand kamu susah dilupakan.
        </p>
        <p class="hero__exif label" data-fade="0.5">ISO 400 &nbsp;·&nbsp; 1/125 &nbsp;·&nbsp; f/5.1 &nbsp;·&nbsp; 35mm</p>
        <a href="#/ai-cinematic" class="hero__scroll label" data-route data-link data-fade="0.6">
          <span>Lihat karya</span>${ARROW}
        </a>
      </div>
    </section>

    <div class="tapes">
      ${marquee(["AI Cinematic", "UGC", "Vibe Code", "Documents", "Branding"], { variant: "lime", tilt: -2.5 })}
      ${marquee(["Commercials", "Websites", "Company Profile", "Pitch Deck"], { variant: "olive", dir: -1, tilt: 2 })}
    </div>

    <section class="intro">
      <span class="label" data-fade>(01 — Studio)</span>
      <h2 class="intro__text" data-scrub>
        ${scrubText("Two creators. *One* *lens.* We frame brands through *AI* *cinematic* *video,* *vibe-coded* *websites* and *documents* — crafted with detail, delivered with focus.")}
      </h2>
    </section>

    <section class="reel" data-reel>
      <div class="reel__stage">
        <video class="reel__video" src="${VIDEO.showreel}" muted loop playsinline preload="auto" data-reel-video></video>
        <div class="reel__shade" data-reel-shade></div>
        <span class="reel__word reel__word--l" data-reel-l>Look</span>
        <span class="reel__word reel__word--r" data-reel-r>Closer</span>
        <div class="reel__lens" data-reel-lens>${irisMarkup()}</div>

        <div class="reel__hud reel__hud--tl label">(02 — Showreel)</div>
        <div class="reel__hud reel__hud--tr label">Aperture <b data-fnum>f/22</b></div>
        <div class="reel__hud reel__hud--bl" data-reel-end>
          <span class="label">Showreel ${new Date().getFullYear()}</span>
          <strong>AI Cinematic by Lensa 51</strong>
        </div>
        <a class="reel__hud reel__hud--br btn btn--lime" href="#/ai-cinematic" data-route data-link data-reel-end>
          <span>Paket AI Cinematic & UGC</span>${ARROW}
        </a>
        <div class="reel__scale label" aria-hidden="true">
          <span>∞</span><span>10</span><span>5</span><span>3</span><span>2</span><span>1.5</span><span>1m</span>
          <i data-reel-marker></i>
        </div>
      </div>
    </section>

    <section class="svc">
      <div class="svc__head">
        <span class="label" data-fade>(03 — Services)</span>
        <h2 class="h2">
          <span class="line" data-reveal><span>What we bring</span></span>
          <span class="line line--alt" data-reveal="1"><span>into focus</span></span>
        </h2>
      </div>
      <div class="svc__list">
        ${SERVICES.map((s) => `
          <a class="svc__row" href="#/${s.id}" data-route data-link data-card>
            <span class="svc__num label">${s.num}</span>
            <span class="svc__name">${s.name}</span>
            <span class="svc__short">${s.short}</span>
            <span class="svc__tags">${s.tags.map((t) => `<i>${t}</i>`).join("")}</span>
            <span class="svc__arrow">${ARROW}</span>
          </a>`).join("")}
      </div>

      <div class="soon">
        <div class="soon__head">
          <span class="label" data-fade>(Coming soon — ${String(COMING_SOON.length).padStart(2, "0")} layanan AI berikutnya)</span>
          <p data-fade>Layanan yang sedang kami siapkan untuk kebutuhan yang lebih spesifik.</p>
        </div>
        <div class="soon__grid">
          ${COMING_SOON.map((c, i) => `
            <div class="soon__card" data-card="${i % 4}">
              <div class="soon__top">
                <span class="label">${String(SERVICES.length + i + 1).padStart(2, "0")}</span>
                <span class="soon__badge">Coming soon</span>
              </div>
              <h3 class="soon__name">${c.name}</h3>
              <p class="soon__desc">${c.desc}</p>
              <span class="soon__for label">${c.for}</span>
            </div>`).join("")}
          <a class="soon__card soon__card--cta" href="${WHATSAPP.link("Halo Lensa 51, saya tertarik dengan layanan AI yang akan datang: ")}"
             target="_blank" rel="noopener" data-link data-card="3">
            <span class="label">Butuh salah satunya?</span>
            <h3 class="soon__name">Chat kami ${ARROW}</h3>
            <p class="soon__desc">Ceritakan kebutuhanmu lewat WhatsApp.</p>
          </a>
        </div>
      </div>
    </section>

    <section class="hwork" data-hwork>
      <div class="hwork__stage">
        <div class="hwork__head">
          <span class="label">(04 — Vibe Code Web Design)</span>
          <span class="label hwork__hint">Scroll →</span>
        </div>
        <div class="hwork__track" data-htrack>
          <div class="hwork__intro">
            <h2 class="h2"><span>Selected</span><span class="alt">websites</span></h2>
            <p>Website live dengan custom code yang sudah kami bangun untuk berbagai brand.</p>
          </div>
          ${FEATURED.map((w, i) => workCard(w, i)).join("")}
          <a class="hwork__end" href="#/vibe-code" data-route data-link>
            <span class="label">Portofolio & harga</span>
            <strong>Vibe Code</strong>
            ${ARROW}
          </a>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="stat" data-card="0"><b data-count="06">00</b><span class="label">Website live</span></div>
      <div class="stat" data-card="1"><b data-count="03">00</b><span class="label">Layanan aktif, ${COMING_SOON.length} segera</span></div>
      <div class="stat" data-card="2"><b data-count="02">00</b><span class="label">Partner, satu tim</span></div>
      <div class="stat stat--lime" data-card="3"><b data-count="51">00</b><span class="label">Satu lensa, satu fokus</span></div>
    </section>

    ${proofSection({ index: "(05 — Testimoni)" })}

    <section class="tteaser">
      <div class="tteaser__avatars" data-fade>
        ${TEAM.map((m) => avatar(m)).join("")}
      </div>
      <div class="tteaser__copy">
        <span class="label" data-fade>(06 — Team)</span>
        <h2 class="h2">
          <span class="line" data-reveal><span>Two minds,</span></span>
          <span class="line line--alt" data-reveal="1"><span>one lens.</span></span>
        </h2>
        <p data-fade>
          ${TEAM.map((m) => m.name.split(" ")[0]).join(" & ")} — dua partner yang sama-sama
          bisa pegang semua layanan. Setiap project selalu punya orang yang fokus menanganinya.
        </p>
        <a href="#/team" class="btn btn--ghost" data-route data-link data-fade><span>Kenalan dengan tim</span>${ARROW}</a>
      </div>
    </section>

    ${ctaBand()}
  `;
}

const clamp = (v) => Math.min(1, Math.max(0, v));

function setupReel(root) {
  const reel = root.querySelector("[data-reel]");
  const video = reel.querySelector("[data-reel-video]");
  const lens = reel.querySelector("[data-reel-lens]");
  const svg = lens.querySelector("svg");
  const setIris = bindIris(svg);
  const fnum = reel.querySelector("[data-fnum]");
  const wl = reel.querySelector("[data-reel-l]");
  const wr = reel.querySelector("[data-reel-r]");
  const shade = reel.querySelector("[data-reel-shade]");
  const marker = reel.querySelector("[data-reel-marker]");
  const ends = reel.querySelectorAll("[data-reel-end]");
  const ease = gsap.parseEase("power2.inOut");

  const render = (p) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const base = Math.min(vw, vh) * (vw < 700 ? 0.34 : 0.27);
    const full = Math.hypot(vw, vh) / 2 + 40;
    const openP = clamp((p - 0.06) / 0.44);
    const growP = ease(clamp((p - 0.46) / 0.42));
    const radius = base + (full - base) * growP;

    setIris(0.02 + 0.98 * ease(openP), openP * 1.2);
    const size = radius * 2 * (216 / 200);
    lens.style.width = lens.style.height = `${size}px`;
    svg.style.opacity = 1 - clamp((p - 0.5) / 0.14);
    video.style.clipPath = `circle(${radius}px at 50% 50%)`;

    const gap = radius + Math.min(vw, vh) * 0.05;
    const wordFade = 1 - clamp(growP * 2.2);
    const stacked = vw < 700;
    wl.style.transform = stacked
      ? `translate(-50%, calc(-100% - ${gap}px))`
      : `translate(calc(-100% - ${gap}px), -50%)`;
    wr.style.transform = stacked ? `translate(-50%, ${gap}px)` : `translate(${gap}px, -50%)`;
    wl.style.opacity = wr.style.opacity = wordFade;

    fnum.textContent = `f/${F_STOPS[Math.round(openP * (F_STOPS.length - 1))]}`;
    marker.style.left = `${clamp(p / 0.9) * 100}%`;
    const endP = clamp((p - 0.86) / 0.1);
    shade.style.opacity = endP;
    ends.forEach((el) => {
      el.style.opacity = endP;
      el.style.pointerEvents = endP > 0.5 ? "auto" : "none";
    });
  };

  let progress = 0;
  ScrollTrigger.create({
    trigger: reel,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => render((progress = self.progress)),
    onRefresh: () => render(progress),
  });
  // only decode video while the section is on screen
  ScrollTrigger.create({
    trigger: reel,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => (self.isActive ? video.play().catch(() => {}) : video.pause()),
  });
  render(0);
}

function setupTimecode(root) {
  const el = root.querySelector("[data-timecode]");
  const t0 = performance.now();
  const pad = (n) => String(n).padStart(2, "0");
  const tick = () => {
    const f = Math.floor(((performance.now() - t0) / 1000) * 24);
    el.textContent = `${pad(Math.floor(f / 86400))}:${pad(Math.floor(f / 1440) % 60)}:${pad(Math.floor(f / 24) % 60)}:${pad(f % 24)}`;
  };
  gsap.ticker.add(tick);
  return () => gsap.ticker.remove(tick);
}

export function setup(root) {
  setupReel(root);
  setupProof(root);
  const offH = setupHorizontal(root);
  const offT = setupTimecode(root);
  const offM = setupMedia(root);
  return () => {
    offH();
    offT();
    offM();
  };
}
