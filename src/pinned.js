import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Scroll-driven "pinned" scenes: a tall .pin section with a sticky .pin__stage;
   render(p) receives 0→1 as the section scrolls through the viewport. */

export const clamp01 = (v) => Math.min(1, Math.max(0, v));
export const seg = (p, a, b) => clamp01((p - a) / (b - a));
export const lerp = (a, b, t) => a + (b - a) * t;
export const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function pinProgress(section, render) {
  let p = 0;
  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => render((p = self.progress)),
    onRefresh: () => render(p),
  });
  render(0);
}

/** Plays a video only while its section is on screen. */
export function playInView(section, video) {
  ScrollTrigger.create({
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => (self.isActive ? video.play().catch(() => {}) : video.pause()),
  });
}
