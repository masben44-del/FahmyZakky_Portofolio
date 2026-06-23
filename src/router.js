import gsap from "gsap";
import { setupReveals, killReveals } from "./reveal.js";

import * as home from "./pages/home.js";
import * as webDesign from "./pages/webDesign.js";
import * as videoAi from "./pages/videoAi.js";
import * as documents from "./pages/documents.js";
import * as contact from "./pages/contact.js";

const ROUTES = {
  "/": home,
  "/web-design": webDesign,
  "/video-ai": videoAi,
  "/documents": documents,
  "/contact": contact,
};

function pathFromHash() {
  const h = window.location.hash.replace(/^#/, "");
  return ROUTES[h] ? h : "/";
}

export function createRouter({ app, lenis, scene }) {
  const overlay = document.querySelector("[data-transition]");
  const label = document.querySelector("[data-transition-label]");
  let current = null;
  let animating = false;

  function setActiveNav(path) {
    document.querySelectorAll("[data-route]").forEach((a) => {
      const href = a.getAttribute("href").replace(/^#/, "");
      a.classList.toggle("is-active", href === path);
    });
  }

  function mount(path) {
    const page = ROUTES[path] || home;
    document.body.dataset.theme = page.theme || "home";
    app.innerHTML = page.render();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    if (scene && scene.setVisual) scene.setVisual(page.visual ?? 0);
    setActiveNav(path);
    setupReveals(app);
    current = path;
  }

  function go(path, { initial = false } = {}) {
    if (animating || (path === current && !initial)) return;
    const page = ROUTES[path] || home;

    if (initial) {
      mount(path);
      return;
    }

    animating = true;
    label.textContent = page.title || "";

    const tl = gsap.timeline({
      onComplete: () => {
        animating = false;
      },
    });
    tl.set(overlay, { yPercent: 100, display: "flex" })
      .to(overlay, { yPercent: 0, duration: 0.5, ease: "expo.inOut" })
      .add(() => {
        killReveals();
        mount(path);
      })
      .to(overlay, { yPercent: -100, duration: 0.6, ease: "expo.inOut" }, "+=0.05")
      .set(overlay, { yPercent: 100, display: "none" });
  }

  window.addEventListener("hashchange", () => go(pathFromHash()));

  // Intercept same-page nav clicks for instant feel
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-route]");
    if (!link) return;
    const path = link.getAttribute("href").replace(/^#/, "");
    if (ROUTES[path]) {
      e.preventDefault();
      if (path === current) {
        if (lenis) lenis.scrollTo(0);
        return;
      }
      window.location.hash = path; // triggers hashchange -> go()
    }
  });

  return {
    start() {
      go(pathFromHash(), { initial: true });
    },
  };
}
