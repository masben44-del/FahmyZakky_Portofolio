/* Signature scroll scenes for the inner pages, all in the lens/camera language:
   cine  — letterbox opens + rack focus        (AI Cinematic & UGC)
   stack — isometric site stack deploys to grid (Vibe Code Web Design)
   fan   — document deck fans out and spreads   (Documents)
   focus — focus pulls from one portrait to the other (Team) */
import { pinProgress, playInView, seg, lerp, ease } from "./pinned.js";
import { VF } from "./partials.js";

/* ============================ CINE ============================ */
const STEPS = [
  ["Konsep & storyboard", "Brief jadi alur cerita dan shot list."],
  ["Generate & direction", "Tiap shot di-generate, dipilih, dan diarahkan."],
  ["Edit, color & sound", "Finishing sampai siap tayang."],
];
const FOCUS = ["0.5m", "0.7m", "1m", "1.5m", "2m", "3m", "5m", "10m", "∞"];

export function cineScene(src) {
  return `
    <section class="pin pin--cine" data-cine>
      <div class="pin__stage cine">
        <video class="cine__video" src="${src}" muted loop playsinline preload="auto" data-cine-video></video>
        <div class="cine__bar cine__bar--t" data-cine-bar>
          <div class="cine__hud label"><span><span class="rec"></span>REC · 24 FPS · 2.39:1</span><span>Focus <b data-cine-focus>0.5m</b></span></div>
        </div>
        <div class="cine__bar cine__bar--b" data-cine-bar>
          <ol class="cine__steps" data-cine-steps>
            ${STEPS.map(([t, d], i) => `<li><span class="label">0${i + 1}</span><strong>${t}</strong><p>${d}</p></li>`).join("")}
          </ol>
        </div>
        <h2 class="cine__title" data-cine-title><span>Pull</span><em>focus.</em></h2>
      </div>
    </section>`;
}

export function setupCine(root) {
  const section = root.querySelector("[data-cine]");
  if (!section) return;
  const video = section.querySelector("[data-cine-video]");
  const [top, bottom] = section.querySelectorAll("[data-cine-bar]");
  const title = section.querySelector("[data-cine-title]");
  const focus = section.querySelector("[data-cine-focus]");
  const steps = [...section.querySelectorAll("[data-cine-steps] li")];
  const stepsBox = section.querySelector("[data-cine-steps]");

  pinProgress(section, (p) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const aspect = vw < 700 ? 0.9 : 2.39;
    const bar = Math.max(vw < 700 ? 90 : 110, (vh - vw / aspect) / 2);
    const open = ease(seg(p, 0.02, 0.3));
    const h = lerp(vh / 2 + 1, bar, open);
    top.style.height = bottom.style.height = `${h}px`;

    const t = seg(p, 0.04, 0.24);
    title.style.opacity = 1 - t;
    title.style.filter = `blur(${t * 14}px)`;
    title.style.transform = `translate(-50%, -50%) scale(${1 + t * 0.12})`;

    const f = ease(seg(p, 0.2, 0.58));
    // drop the filter entirely once in focus — a blurred full-screen video is costly
    video.style.filter = f > 0.99 ? "none" : `blur(${(1 - f) * 14}px) brightness(${0.5 + f * 0.5})`;
    video.style.transform = `scale(${lerp(1.18, 1, seg(p, 0, 1))})`;
    focus.textContent = FOCUS[Math.round(f * (FOCUS.length - 1))];

    stepsBox.style.opacity = seg(p, 0.36, 0.46);
    const active = p < 0.46 ? -1 : p < 0.64 ? 0 : p < 0.82 ? 1 : 2;
    steps.forEach((li, i) => li.classList.toggle("is-on", i === active));
  });
  playInView(section, video);
}

/* ============================ STACK ============================ */
export function stackScene(projects) {
  return `
    <section class="pin pin--stack" data-stack>
      <div class="pin__stage stack">
        <div class="stack__head">
          <h2 class="h2"><span>Six sites.</span><span class="alt">One stack.</span></h2>
          <span class="label stack__count">Deployed <b data-stack-count>00</b>/${String(projects.length).padStart(2, "0")}</span>
        </div>
        <div class="stack__scene">
          <div class="stack__deck" data-stack-deck>
            ${projects.map((p) => `
              <figure class="bframe" data-bframe>
                <div class="bframe__bar"><i></i><i></i><i></i><span>${p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span></div>
                <img src="${p.img}" alt="${p.name}" loading="lazy" />
              </figure>`).join("")}
          </div>
        </div>
        <ol class="stack__term label" data-stack-term>
          ${projects.map((p) => `<li>&gt; vibe build ${p.name.toLowerCase()} <b>✓ live</b></li>`).join("")}
        </ol>
      </div>
    </section>`;
}

export function setupStack(root) {
  const section = root.querySelector("[data-stack]");
  if (!section) return;
  const deck = section.querySelector("[data-stack-deck]");
  const cards = [...section.querySelectorAll("[data-bframe]")];
  const lines = [...section.querySelectorAll("[data-stack-term] li")];
  const count = section.querySelector("[data-stack-count]");
  const n = cards.length;

  const head = section.querySelector(".stack__head");
  const term = section.querySelector("[data-stack-term]");

  pinProgress(section, (p) => {
    const vw = window.innerWidth;
    const vh = section.querySelector(".pin__stage").clientHeight;
    const cols = vw < 760 ? 2 : 3;
    const rows = Math.ceil(n / cols);
    const gap = cols === 3 ? 22 : 12;
    // the final grid must fit between the headline and the status line
    const top = head.offsetTop + head.offsetHeight + 20;
    const bottom = term.offsetTop - 16;
    const fitW = ((bottom - top - gap * (rows - 1)) / rows - 22) / 0.625;
    const w = Math.max(120, Math.min(cols === 3 ? Math.min(vw * 0.22, 340) : vw * 0.42, fitW));
    const h = w * 0.625 + 22;
    deck.style.setProperty("--bw", `${w}px`);
    const shift = (top + bottom) / 2 - vh / 2;

    const unfold = ease(seg(p, 0.1, 0.78));
    deck.style.transform = `translateY(${shift}px) rotateX(${lerp(58, 0, unfold)}deg) rotateZ(${lerp(-38, 0, unfold)}deg)`;

    let landed = 0;
    cards.forEach((card, i) => {
      const t = ease(seg(p, 0.1 + i * 0.06, 0.48 + i * 0.06));
      const col = i % cols;
      const row = Math.floor(i / cols);
      const gx = (col - (cols - 1) / 2) * (w + gap);
      const gy = (row - (rows - 1) / 2) * (h + gap);
      const z = (i - (n - 1) / 2) * 46;
      card.style.transform = `translate3d(${lerp(0, gx, t)}px, ${lerp(0, gy, t)}px, ${lerp(z, 0, t)}px)`;
      card.classList.toggle("is-live", t > 0.96);
      if (t > 0.96) landed++;
    });
    count.textContent = String(landed).padStart(2, "0");
    // single status line: the site being built now, or the last one deployed
    const current = Math.min(landed, n - 1);
    lines.forEach((li, i) => {
      li.classList.toggle("is-on", i < landed);
      li.classList.toggle("is-current", i === current);
    });
  });
}

/* ============================ FAN ============================ */
const DOCS = [
  { id: "ppt", name: "Presentation", body: `<div class="md__slide"><i class="md__t"></i><div class="md__bars"><b style="--h:40%"></b><b style="--h:65%"></b><b style="--h:50%"></b><b style="--h:85%"></b></div></div><i class="md__l"></i><i class="md__l md__l--s"></i>` },
  { id: "word", name: "Word", body: `<i class="md__t"></i>${'<i class="md__l"></i>'.repeat(3)}<i class="md__l md__l--s"></i><i class="md__gap"></i>${'<i class="md__l"></i>'.repeat(3)}<i class="md__l md__l--s"></i>` },
  { id: "excel", name: "Excel", body: `<i class="md__t"></i><div class="md__grid">${"<i></i>".repeat(24)}</div><svg class="md__spark" viewBox="0 0 100 30"><path d="M0 24 L18 18 L34 20 L52 10 L70 14 L100 3"/></svg>` },
  { id: "pdf", name: "PDF", body: `<span class="md__badge">PDF</span><div class="md__img"></div><i class="md__t"></i><i class="md__l"></i><i class="md__l"></i><i class="md__l md__l--s"></i>` },
];

export function fanScene() {
  return `
    <section class="pin pin--fan" data-fan>
      <div class="pin__stage fan">
        <div class="fan__head">
          <span class="label">(Empat format)</span>
          <h2 class="h2"><span>Four formats.</span><span class="alt">One standard.</span></h2>
        </div>
        <div class="fan__deck" data-fan-deck>
          ${DOCS.map((d) => `
            <figure class="mdoc mdoc--${d.id}" data-mdoc>
              <div class="mdoc__page">${d.body}</div>
              <figcaption class="label">${d.name}</figcaption>
            </figure>`).join("")}
        </div>
      </div>
    </section>`;
}

export function setupFan(root) {
  const section = root.querySelector("[data-fan]");
  if (!section) return;
  const deck = section.querySelector("[data-fan-deck]");
  const docs = [...section.querySelectorAll("[data-mdoc]")];
  const n = docs.length;
  const head = section.querySelector(".fan__head");
  const stage = section.querySelector(".pin__stage");
  const CAPTION = 40;

  pinProgress(section, (p) => {
    const vw = window.innerWidth;
    const narrow = vw < 760;
    const gap = narrow ? 14 : 28;
    // cards (and their captions) must fit between the headline and the bottom edge
    const top = head.offsetTop + head.offsetHeight + 24;
    const bottom = stage.clientHeight - 24;
    const rows = narrow ? 2 : 1;
    const fitW = ((bottom - top) / rows - (rows - 1) * gap - CAPTION) / 1.3;
    const w = Math.max(90, Math.min(narrow ? vw * 0.4 : Math.min(vw * 0.19, 280), fitW));
    const hgt = w * 1.3;
    deck.style.setProperty("--dw", `${w}px`);
    deck.style.top = `${(top + bottom) / 2 - CAPTION / 2}px`;

    const toFan = ease(seg(p, 0.06, 0.4));
    const toRow = ease(seg(p, 0.46, 0.82));
    docs.forEach((doc, i) => {
      const c = i - (n - 1) / 2;
      // stacked → fanned like a hand of cards
      const sx = i * 4, sy = -i * 4, sr = c * 2;
      const fx = c * w * (narrow ? 0.18 : 0.3), fy = Math.abs(c) * 8, fr = c * (narrow ? 7 : 11);
      // fanned → laid out (a row, or 2×2 on phones)
      const rx = narrow ? ((i % 2) - 0.5) * (w + gap) : c * (w + gap);
      const ry = narrow ? (Math.floor(i / 2) - 0.5) * (hgt + gap + 20) : 0;
      const x = lerp(lerp(sx, fx, toFan), rx, toRow);
      const y = lerp(lerp(sy, fy, toFan), ry, toRow);
      const r = lerp(lerp(sr, fr, toFan), 0, toRow);
      // shrink a touch while fanned so the outer cards' corners stay on screen
      const s = 1 - 0.12 * toFan * (1 - toRow);
      doc.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg) scale(${s})`;
      doc.style.zIndex = toRow > 0.5 ? n - i : i;
    });
    deck.classList.toggle("is-laid", toRow > 0.9);
  });
}

/* ============================ FOCUS ============================ */
export function focusScene(team) {
  return `
    <section class="pin pin--focus" data-focus>
      <div class="pin__stage focus">
        <div class="focus__hud label">Focus → <b data-focus-name>${team[0].name}</b></div>
        <div class="focus__pair">
          ${team.map((m) => `
            <figure class="focus__p" data-focus-p data-name="${m.name}">
              <div class="focus__img"><img src="${m.photo}" alt="${m.name}" />${VF}</div>
              <figcaption><span class="label">${m.role}</span><strong>${m.name}</strong></figcaption>
            </figure>`).join("")}
        </div>
        <h2 class="focus__line" data-focus-line>Two minds, <em>one lens.</em></h2>
      </div>
    </section>`;
}

export function setupFocus(root) {
  const section = root.querySelector("[data-focus]");
  if (!section) return;
  const [a, b] = section.querySelectorAll("[data-focus-p]");
  const name = section.querySelector("[data-focus-name]");
  const line = section.querySelector("[data-focus-line]");

  const apply = (el, sharp) => {
    el.style.setProperty("--blur", `${(1 - sharp) * 12}px`);
    el.style.setProperty("--dim", 0.45 + sharp * 0.55);
    el.style.setProperty("--tint", 1 - sharp);
    el.style.transform = `scale(${0.93 + sharp * 0.07})`;
    el.querySelector(".focus__img").classList.toggle("is-framed", sharp > 0.9);
  };

  pinProgress(section, (p) => {
    const pull = ease(seg(p, 0.28, 0.56));
    const both = ease(seg(p, 0.7, 0.9));
    const sa = Math.max(1 - pull, both);
    const sb = Math.max(pull, both);
    apply(a, sa);
    apply(b, sb);
    name.textContent = both > 0.5 ? "Lensa 51" : pull < 0.5 ? a.dataset.name : b.dataset.name;
    line.style.opacity = both;
    line.style.transform = `translateY(${(1 - both) * 30}px)`;
  });
}
