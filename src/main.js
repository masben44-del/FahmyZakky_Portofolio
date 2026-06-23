import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { createScene } from "./webgl/scene.js";
import { createRouter } from "./router.js";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- Custom cursor ---------------- */
function initCursor() {
  const ring = document.querySelector("[data-cursor]");
  const dot = document.querySelector("[data-cursor-dot]");
  if (!ring || window.matchMedia("(hover: none)").matches) return;

  let mx = window.innerWidth / 2,
    my = window.innerHeight / 2;
  let rx = mx,
    ry = my;

  window.addEventListener("pointermove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });

  gsap.ticker.add(() => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
  });

  // delegated hover (works for dynamically-swapped page content)
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("[data-link]")) ring.classList.add("is-hover");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("[data-link]")) ring.classList.remove("is-hover");
  });
}

/* ---------------- Smooth scroll ---------------- */
function initSmoothScroll(scene) {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on("scroll", (e) => {
    ScrollTrigger.update();
    scene.setScroll(e.scroll);
  });

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  const top = document.querySelector("[data-top]");
  if (top) top.addEventListener("click", () => lenis.scrollTo(0));

  if (import.meta.env.DEV) window.__lenis = lenis;
  return lenis;
}

/* ---------------- Preloader (runs once) ---------------- */
function runLoader(onDone) {
  const loader = document.querySelector("[data-loader]");
  const count = document.querySelector("[data-loader-count]");
  const obj = { v: 0 };

  gsap.to(obj, {
    v: 100,
    duration: 1.6,
    ease: "power2.inOut",
    onUpdate: () => (count.textContent = Math.round(obj.v)),
    onComplete: () => {
      gsap.to(loader, {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut",
        onComplete: () => {
          loader.style.display = "none";
          onDone();
        },
      });
    },
  });
}

/* ---------------- Boot ---------------- */
function boot() {
  const canvas = document.querySelector("[data-webgl]");
  let scene = { tick() {}, setScroll() {}, resize() {}, setVisual() {} };
  try {
    scene = createScene(canvas);
  } catch (err) {
    console.warn("WebGL unavailable:", err);
    canvas.style.display = "none";
  }
  gsap.ticker.add(scene.tick);

  initCursor();
  const lenis = initSmoothScroll(scene);

  const app = document.querySelector("[data-app]");
  const router = createRouter({ app, lenis, scene });
  router.start();

  runLoader(() => ScrollTrigger.refresh());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
