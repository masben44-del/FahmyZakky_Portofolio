/* Video player overlay for YouTube embeds and the site's own mp4s. The player
   only exists while open, so nothing loads until a visitor presses play. */
let box = null;
let lenis = null;

function close() {
  if (!box?.classList.contains("is-open")) return;
  box.classList.remove("is-open");
  box.querySelector(".lightbox__frame").innerHTML = "";
  lenis?.start();
}

function ensureBox() {
  if (box) return box;
  box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = `
    <div class="lightbox__backdrop" data-close></div>
    <div class="lightbox__frame"></div>
    <button class="lightbox__close" data-close data-link aria-label="Tutup video">
      <span></span><span></span>
    </button>`;
  document.body.append(box);
  box.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  return box;
}

const esc = (s) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

/** media: result of mediaOf() — { type: "youtube"|"video", id|src, playerRatio } */
export function openPlayer(media, { title = "", smooth } = {}) {
  ensureBox();
  lenis = smooth;
  const frame = box.querySelector(".lightbox__frame");
  frame.style.setProperty("--r", media.playerRatio);
  frame.innerHTML =
    media.type === "youtube"
      ? `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(media.id)}?autoplay=1&rel=0&playsinline=1"
           title="${esc(title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`
      : `<video src="${media.src}" controls autoplay playsinline></video>`;
  box.classList.add("is-open");
  lenis?.stop();
}

export { close as closePlayer };
