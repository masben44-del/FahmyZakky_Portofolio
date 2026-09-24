import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Scroll/entrance animations for the mounted page. Call inside a gsap.context
   so everything created here is reverted on the next page change. */
export function setupReveals(root) {
  const q = (sel) => Array.from(root.querySelectorAll(sel));
  // Elements already on screen animate on load; the rest wait for scroll.
  const onScroll = (el, start) =>
    el.getBoundingClientRect().top < window.innerHeight ? undefined : { trigger: el, start };

  // Headline lines slide up out of overflow-hidden masks
  q("[data-reveal]").forEach((line) => {
    const st = onScroll(line, "top 90%");
    // page titles "pull focus" in: blurred → sharp as they rise
    const focusIn = Boolean(line.closest(".phero, .prof-hero"));
    gsap.fromTo(line.children, { yPercent: 115, filter: focusIn ? "blur(14px)" : "none" }, {
      yPercent: 0,
      filter: focusIn ? "blur(0px)" : "none",
      duration: focusIn ? 1.5 : 1.2,
      ease: "expo.out",
      delay: st ? 0 : 0.1 + (Number(line.dataset.reveal) || 0) * 0.1,
      scrollTrigger: st,
      clearProps: focusIn ? "filter" : undefined,
    });
  });

  q("[data-fade]").forEach((el) => {
    const st = onScroll(el, "top 92%");
    gsap.fromTo(el, { y: 30, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: "expo.out",
      delay: st ? 0 : Number(el.dataset.fade) || 0.2,
      scrollTrigger: st,
    });
  });

  // Words light up as you scroll through the block
  q("[data-scrub]").forEach((block) => {
    gsap.fromTo(block.querySelectorAll("[data-word]"), { opacity: 0.14 }, {
      opacity: 1,
      ease: "none",
      stagger: 0.5,
      scrollTrigger: { trigger: block, start: "top 80%", end: "bottom 50%", scrub: true },
    });
  });

  q("[data-card]").forEach((card) => {
    gsap.fromTo(card, { y: 80, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "expo.out",
      delay: (Number(card.dataset.card) || 0) * 0.08,
      scrollTrigger: { trigger: card, start: "top 94%" },
    });
  });

  // Media wipes open from the bottom, like a shutter curtain
  q("[data-clip]").forEach((el) => {
    gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.4,
      ease: "expo.inOut",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  q("[data-line]").forEach((el) => {
    gsap.fromTo(el, { scaleX: 0 }, {
      scaleX: 1,
      duration: 1.4,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 94%" },
    });
  });

  q("[data-count]").forEach((el) => {
    const n = { v: 0 };
    const to = Number(el.dataset.count);
    const pad = el.dataset.count.length;
    gsap.to(n, {
      v: to,
      duration: 1.8,
      ease: "power3.out",
      onUpdate: () => (el.textContent = String(Math.round(n.v)).padStart(pad, "0")),
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  q("[data-marquee]").forEach((track) => {
    const dir = Number(track.dataset.marquee) || 1;
    gsap.fromTo(track, { xPercent: dir > 0 ? 0 : -50 }, {
      xPercent: dir > 0 ? -50 : 0,
      ease: "none",
      scrollTrigger: {
        trigger: track.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  });

  q("[data-parallax]").forEach((el) => {
    const speed = Number(el.dataset.parallax) || 0.15;
    gsap.fromTo(el, { yPercent: speed * 100 }, {
      yPercent: -speed * 100,
      ease: "none",
      scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  // Viewfinder frames: corner brackets close in on enter
  q("[data-frame]").forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => el.classList.add("is-framed"),
    });
  });
}
