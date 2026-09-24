import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mediaOf } from "./explore.js";
import { openPlayer } from "./lightbox.js";

const PLAY = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>`;

/** Thumbnail card for a YouTube link or a local mp4; opens the player on click. */
export function mediaCard(v, i = 0) {
  const m = mediaOf(v);
  if (!m) return "";
  const title = [v.client, v.category].filter(Boolean).join(" — ");
  const data =
    m.type === "youtube"
      ? `data-play="youtube" data-id="${m.id}" data-shorts="${m.shorts ? 1 : ""}"`
      : `data-play="video" data-src="${m.src}" data-r="${m.playerRatio}"`;
  return `
    <a class="yt" href="${v.url || v.src}" target="_blank" rel="noopener" ${data}
       data-title="${title}" style="--ar:${m.ratio}" data-link data-card="${i % 3}">
      <img src="${m.thumb}" alt="${title}" loading="lazy" />
      ${m.type === "video" ? `<video class="yt__preview" src="${m.src}" muted loop playsinline preload="none"></video>` : ""}
      <span class="yt__play">${PLAY}</span>
      <span class="yt__badge label">${m.type === "youtube" ? (m.shorts ? "Shorts" : "YouTube") : "Play"}</span>
      <span class="yt__meta">
        ${v.client ? `<strong>${v.client}</strong>` : ""}
        ${v.category ? `<span class="label">${v.category}</span>` : ""}
      </span>
    </a>`;
}

/** Wires every [data-play] card in root: thumbnail fallback, hover preview, player. */
export function bindPlayers(root, lenis) {
  const hover = window.matchMedia("(hover: hover)").matches;
  root.querySelectorAll("[data-play]").forEach((card) => {
    const img = card.querySelector("img");
    img.addEventListener("error", () => (img.src = img.src.replace("maxresdefault", "hqdefault")), { once: true });

    const preview = card.querySelector(".yt__preview");
    if (preview && hover) {
      card.addEventListener("mouseenter", () => {
        card.classList.add("is-previewing");
        preview.play().catch(() => {});
      });
      card.addEventListener("mouseleave", () => {
        card.classList.remove("is-previewing");
        preview.pause();
      });
    }

    card.addEventListener("click", (e) => {
      e.preventDefault();
      preview?.pause();
      const d = card.dataset;
      const media =
        d.play === "youtube"
          ? { type: "youtube", id: d.id, playerRatio: d.shorts ? 9 / 16 : 16 / 9 }
          : { type: "video", src: d.src, playerRatio: Number(d.r) };
      openPlayer(media, { title: d.title, smooth: lenis });
    });
  });
}

/* ---------- Masonry: shortest-column placement on a grid of 4px rows ---------- */
const ROW = 4;

function layoutMasonry(grid) {
  const cards = grid.querySelectorAll(".yt");
  // clear old placement first, or a stale column 3 creates an implicit track
  cards.forEach((c) => (c.style.gridColumn = c.style.gridRow = ""));
  const style = getComputedStyle(grid);
  const cols = style.gridTemplateColumns.split(" ").length;
  const gap = parseFloat(style.columnGap) || 0;
  const colW = (grid.clientWidth - gap * (cols - 1)) / cols;
  if (colW <= 0) return;
  const heights = new Array(cols).fill(0);
  cards.forEach((card) => {
    const [w, h] = card.style.getPropertyValue("--ar").split("/").map(Number);
    const span = Math.ceil((colW * (h / w) + gap) / ROW);
    const col = heights.indexOf(Math.min(...heights));
    card.style.gridColumn = String(col + 1);
    card.style.gridRow = `${heights[col] + 1} / span ${span}`;
    heights[col] += span;
  });
}

export function setupMasonry(root) {
  // layout changes the grid's height, so run it next frame to avoid an RO loop
  let frame = 0;
  const ro = new ResizeObserver((entries) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      entries.forEach((e) => layoutMasonry(e.target));
      ScrollTrigger.refresh();
    });
  });
  root.querySelectorAll(".masonry").forEach((g) => ro.observe(g));
  return () => ro.disconnect();
}
