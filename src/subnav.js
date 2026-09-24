import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Highlights the sticky sub-nav pill for the section currently in view. */
export function setupSubnav(root) {
  const links = [...root.querySelectorAll("[data-sub]")];
  links.forEach((link) => {
    const section = root.querySelector(`#${CSS.escape(link.dataset.sub)}`);
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: "top 50%",
      end: "bottom 50%",
      onToggle: (self) => {
        if (self.isActive) links.forEach((a) => a.classList.toggle("is-current", a === link));
      },
    });
  });
}
