import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Vertical scroll drives a horizontal track: each [data-hwork] section is made
   as tall as its track is wide, and its sticky stage slides the track sideways. */
export function setupHorizontal(root) {
  const cleanups = [...root.querySelectorAll("[data-hwork]")].map((section) => {
    const track = section.querySelector("[data-htrack]");
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const setHeight = () => (section.style.height = `${distance() + window.innerHeight}px`);
    setHeight();
    ScrollTrigger.addEventListener("refreshInit", setHeight);

    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        invalidateOnRefresh: true,
      },
    });
    return () => ScrollTrigger.removeEventListener("refreshInit", setHeight);
  });
  return () => cleanups.forEach((fn) => fn());
}
