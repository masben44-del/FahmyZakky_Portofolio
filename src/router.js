import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupReveals } from "./reveal.js";

import * as home from "./pages/home.js";
import * as webDesign from "./pages/webDesign.js";
import * as videoAi from "./pages/videoAi.js";
import * as documents from "./pages/documents.js";
import * as rincianHarga from "./pages/rincianHarga.js";
import * as team from "./pages/team.js";
import * as contact from "./pages/contact.js";
import { createProfile } from "./pages/profile.js";
import { TEAM } from "./config.js";

const ROUTES = {
  "": home,
  "ai-cinematic": videoAi,
  "vibe-code": webDesign,
  documents,
  "rincian-harga": rincianHarga,
  team,
  contact,
  ...Object.fromEntries(TEAM.map((m) => [m.slug, createProfile(m.slug)])),
};

function parseHash() {
  const [key = "", sub] = window.location.hash.replace(/^#\/?/, "").split("/");
  return ROUTES[key] ? { key, sub } : { key: "", sub: undefined };
}

export function createRouter({ app, lenis, shutter, closeMenu }) {
  let current = null;
  let ctx = null;
  let animating = false;
  let pending = null;

  function setActiveNav(key) {
    document.querySelectorAll("[data-route]").forEach((a) => {
      const k = a.getAttribute("href").replace(/^#\/?/, "").split("/")[0];
      a.classList.toggle("is-active", k === key && key !== "");
    });
  }

  function scrollToSub(sub) {
    if (!sub) return;
    const target = app.querySelector(`#${CSS.escape(sub)}`);
    if (target) lenis.scrollTo(target, { offset: -90, duration: 1.4 });
  }

  function mount({ key }) {
    ctx?.revert();
    ctx = null;
    const page = ROUTES[key];
    app.innerHTML = page.render();
    lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    document.title = page.title ? `${page.title} — Lensa 51` : "Lensa 51 — Creative Studio";
    setActiveNav(page.nav || key);
    current = key;
  }

  function play({ key, sub }) {
    const page = ROUTES[key];
    ctx = gsap.context(() => {
      setupReveals(app);
      return page.setup?.(app, { lenis });
    }, app);
    ScrollTrigger.refresh();
    if (sub) gsap.delayedCall(0.5, () => scrollToSub(sub));
  }

  function go(route) {
    closeMenu();
    if (animating) {
      pending = route;
      return;
    }
    if (route.key === current) {
      if (route.sub) scrollToSub(route.sub);
      else lenis.scrollTo(0);
      return;
    }

    animating = true;
    shutter.label.textContent = ROUTES[route.key].title || "Home";
    shutter.root.classList.add("is-active");

    gsap.timeline({
      onComplete: () => {
        animating = false;
        shutter.root.classList.remove("is-active");
        if (pending) {
          const next = pending;
          pending = null;
          go(next);
        }
      },
    })
      .set(shutter.center, { opacity: 0, scale: 0.9 })
      .to(shutter.state, { open: 0, duration: 0.7, ease: "power3.inOut", onUpdate: shutter.apply })
      .to(shutter.center, { opacity: 1, scale: 1, duration: 0.4, ease: "expo.out" }, "-=0.15")
      .add(() => mount(route))
      .to(shutter.center, { opacity: 0, scale: 1.06, duration: 0.3, ease: "power2.in" }, "+=0.2")
      .add(() => play(route))
      .to(shutter.state, { open: 1, duration: 0.95, ease: "expo.out", onUpdate: shutter.apply }, "-=0.1");
  }

  window.addEventListener("hashchange", () => go(parseHash()));

  // Clicking a link to the hash we're already on fires no hashchange
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-route]");
    if (link && link.getAttribute("href") === (window.location.hash || "#/")) {
      e.preventDefault();
      go(parseHash());
    }
  });

  let initial = null;
  return {
    start({ hold = false } = {}) {
      initial = parseHash();
      mount(initial);
      if (!hold) play(initial);
    },
    release() {
      play(initial);
    },
  };
}
