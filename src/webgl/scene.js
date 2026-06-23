import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { createChrome } from "./visuals/chrome.js";
import { createLines } from "./visuals/lines.js";
import { createParticles } from "./visuals/particles.js";
import { createGlass } from "./visuals/glass.js";

/**
 * WebGL manager. Holds one renderer/camera and four swappable visuals:
 *   0 chrome (home) · 1 lines (web design) · 2 particles (video) · 3 glass (documents)
 * Each page calls setVisual(index). Only the active visual renders.
 */
export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 6);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;

  const visuals = [
    createChrome(env),
    createLines(),
    createParticles(),
    createGlass(env),
  ];
  visuals.forEach((v, i) => {
    v.group.visible = i === 0;
    scene.add(v.group);
  });
  let active = 0;

  function setVisual(index) {
    const i = Math.max(0, Math.min(index, visuals.length - 1));
    if (i === active) return;
    visuals[active].group.visible = false;
    active = i;
    visuals[active].group.visible = true;
  }

  // ---- Interaction state ----
  const mouse = new THREE.Vector2(0, 0);
  const tgt = new THREE.Vector2(0, 0);
  let mouseStrength = 0;
  let scrollY = 0;
  let maxScroll = 1;
  let progress = 0;

  function measure() {
    maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );
  }
  measure();

  window.addEventListener("pointermove", (e) => {
    tgt.x = (e.clientX / window.innerWidth - 0.5) * 2;
    tgt.y = (e.clientY / window.innerHeight - 0.5) * 2;
    mouseStrength = Math.min(mouseStrength + 0.04, 1);
  });

  function setScroll(y) {
    scrollY = y;
    measure();
  }

  const clock = new THREE.Clock();
  let elapsed = 0;

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    measure();
  }
  window.addEventListener("resize", resize);

  function tick() {
    const dt = Math.min(clock.getDelta(), 0.05);
    elapsed += dt;

    mouse.x += (tgt.x - mouse.x) * 0.05;
    mouse.y += (tgt.y - mouse.y) * 0.05;
    mouseStrength *= 0.96;

    const targetP = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    progress += (targetP - progress) * 0.08;

    visuals[active].update(dt, elapsed, progress, mouse, mouseStrength);
    renderer.render(scene, camera);
  }

  // kept for backwards-compat; visual is chosen per route now
  function setMood() {}

  return { tick, setScroll, setVisual, setMood, resize, renderer };
}
