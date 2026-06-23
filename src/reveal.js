import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Wire up scroll/entrance reveals for the currently-mounted page.
 * Scoped to `root`; call killReveals() before swapping pages.
 */
export function setupReveals(root = document) {
  const q = (sel) => Array.from(root.querySelectorAll(sel));

  // Block reveals (text inside overflow-hidden lines)
  const lines = root.querySelectorAll("[data-reveal] > span, [data-reveal] > em");
  gsap.set(lines, { yPercent: 110 });
  gsap.to(lines, {
    yPercent: 0,
    duration: 1.1,
    ease: "expo.out",
    stagger: 0.09,
    delay: 0.15,
  });

  // Fades
  q("[data-fade]").forEach((el) => {
    gsap.set(el, { y: 26, opacity: 0 });
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  // Entrance word stagger — only for wraps that are NOT scrub blocks
  q("[data-word-wrap]:not([data-scrub])").forEach((wrap) => {
    const words = wrap.querySelectorAll("[data-word]");
    gsap.set(words, { yPercent: 110, opacity: 0 });
    gsap.to(words, {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      ease: "expo.out",
      stagger: 0.045,
      scrollTrigger: { trigger: wrap, start: "top 80%" },
    });
  });

  // Scroll-scrubbed text fill — words brighten as you scroll through (Lusion-ish)
  q("[data-scrub]").forEach((block) => {
    const words = block.querySelectorAll("[data-word]");
    gsap.set(words, { opacity: 0.16 });
    gsap.to(words, {
      opacity: 1,
      ease: "none",
      stagger: 0.6,
      scrollTrigger: {
        trigger: block,
        start: "top 78%",
        end: "bottom 55%",
        scrub: true,
      },
    });
  });

  // Cards
  q("[data-reveal-card]").forEach((card) => {
    gsap.from(card, {
      y: 70,
      opacity: 0,
      duration: 1.1,
      ease: "expo.out",
      scrollTrigger: { trigger: card, start: "top 92%" },
    });
  });

  // Marquee drift
  q("[data-marquee]").forEach((track) => {
    gsap.to(track, {
      xPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: track.closest(".marquee") || track,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  });

  // Animated drawn lines (scaleX 0 -> 1 on enter)
  q("[data-line]").forEach((el) => {
    gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 92%" },
      }
    );
  });

  // Statement divider draw (CSS ::before width via class)
  q(".statement").forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => el.classList.add("is-drawn"),
    });
  });

  // Parallax drift
  q("[data-parallax]").forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.2;
    gsap.to(el, {
      yPercent: -speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el.closest("section") || el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  ScrollTrigger.refresh();
}

export function killReveals() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.killTweensOf("*");
}
