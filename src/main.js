import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { createShutter } from "./aperture.js";
import { createRouter } from "./router.js";
import { initMailLinks } from "./mail.js";
import { socialList } from "./partials.js";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- Focus-reticle cursor ---------------- */
function initCursor() {
  const cur = document.querySelector("[data-cursor]");
  if (!cur || window.matchMedia("(hover: none)").matches) return;

  let mx = -100, my = -100, x = mx, y = my;
  window.addEventListener("pointermove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });
  gsap.ticker.add(() => {
    x += (mx - x) * 0.22;
    y += (my - y) * 0.22;
    cur.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  });
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("[data-link]")) cur.classList.add("is-hover");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("[data-link]")) cur.classList.remove("is-hover");
  });
}

/* ---------------- Smooth scroll + progress bar ---------------- */
function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  const bar = document.querySelector("[data-progress]");
  const nav = document.querySelector("[data-nav]");

  lenis.on("scroll", (e) => {
    ScrollTrigger.update();
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? e.scroll / max : 0})`;
    nav.classList.toggle("is-scrolled", e.scroll > 40);
  });
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  document.querySelector("[data-top]")?.addEventListener("click", () => lenis.scrollTo(0));
  if (import.meta.env.DEV) window.__lenis = lenis;
  return lenis;
}

/* ---------------- Mobile menu ---------------- */
function initMenu() {
  const btn = document.querySelector("[data-burger]");
  const close = () => {
    document.body.classList.remove("menu-open");
    btn.setAttribute("aria-expanded", "false");
  };
  btn.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    btn.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll("[data-menu] a").forEach((a) => a.addEventListener("click", close));
  return close;
}

/* ---------------- Loader: iris opens after counting to 51 ---------------- */
function runLoader(shutter, onDone) {
  const el = shutter.root;
  el.classList.add("is-active");
  shutter.state.open = 0;
  shutter.apply();
  const n = { v: 0 };

  gsap.timeline()
    .fromTo(shutter.center, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" })
    .to(n, {
      v: 51,
      duration: 1.3,
      ease: "power2.inOut",
      onUpdate: () => (shutter.label.textContent = `f/${String(Math.round(n.v)).padStart(2, "0")}`),
    }, 0)
    .to(shutter.center, { opacity: 0, scale: 1.08, duration: 0.4, ease: "power2.in" }, "+=0.15")
    .add(onDone, "-=0.1")
    .to(shutter.state, { open: 1, duration: 1.2, ease: "expo.inOut", onUpdate: shutter.apply }, "-=0.15")
    .add(() => el.classList.remove("is-active"));
}

/* ---------------- Boot ---------------- */
function boot() {
  history.scrollRestoration = "manual";
  const shutterRoot = document.querySelector("[data-shutter]");
  const shutter = { ...createShutter(shutterRoot), root: shutterRoot };

  document.querySelector("[data-socials]").outerHTML = socialList("socials--footer");
  initCursor();
  initMailLinks();
  const lenis = initSmoothScroll();
  const closeMenu = initMenu();

  const router = createRouter({ app: document.querySelector("[data-app]"), lenis, shutter, closeMenu });
  router.start({ hold: true });
  runLoader(shutter, () => router.release());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
