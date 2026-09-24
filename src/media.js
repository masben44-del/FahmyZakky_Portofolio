/* Work videos play on hover — or, with autoplay (and always on touch screens),
   while they're visible, pausing as they leave the viewport. */
export function setupMedia(root, { autoplay = false } = {}) {
  const videos = [...root.querySelectorAll("[data-hover-play]")];
  if (autoplay || window.matchMedia("(hover: none)").matches) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause())),
      { threshold: 0.4 }
    );
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }
  videos.forEach((v) => {
    const card = v.closest(".wcard");
    card.addEventListener("mouseenter", () => v.play().catch(() => {}));
    card.addEventListener("mouseleave", () => v.pause());
  });
  return () => {};
}
