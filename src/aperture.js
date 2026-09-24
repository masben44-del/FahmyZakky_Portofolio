/* Camera-iris generator. Blades are the regions between the extended edges
   of a hexagonal opening, so they tile the lens with no overlap at any size. */

const TAU = Math.PI * 2;
const N = 6;
const R = 100;
let uid = 0;

function bladePaths(open, rot) {
  const r = Math.min(Math.max(open, 0.002), 0.999) * R;
  const V = Array.from({ length: N }, (_, i) => {
    const a = rot + (i * TAU) / N;
    return [r * Math.cos(a), r * Math.sin(a)];
  });
  // P[i]: where the line through V[i] -> V[i+1] exits the lens
  const P = V.map((A, i) => {
    const B = V[(i + 1) % N];
    let dx = B[0] - A[0];
    let dy = B[1] - A[1];
    const len = Math.hypot(dx, dy);
    dx /= len;
    dy /= len;
    const b = B[0] * dx + B[1] * dy;
    const c = B[0] * B[0] + B[1] * B[1] - R * R;
    const t = -b + Math.sqrt(Math.max(0, b * b - c));
    return [B[0] + t * dx, B[1] + t * dy];
  });
  const f = (p) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
  return V.map((A, i) => {
    const prev = P[(i - 1 + N) % N];
    const B = V[(i + 1) % N];
    return `M${f(A)}L${f(prev)}A${R} ${R} 0 0 1 ${f(P[i])}L${f(B)}Z`;
  });
}

export function irisMarkup({ rim = true, glint = true, cls = "" } = {}) {
  const id = `iris${uid++}`;
  return `
    <svg class="iris ${cls}" viewBox="-108 -108 216 216" aria-hidden="true">
      <defs>
        <clipPath id="${id}c"><circle r="${R}"/></clipPath>
        <radialGradient id="${id}g" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="${R}">
          <stop offset="0" stop-color="#262a12"/>
          <stop offset="0.55" stop-color="#3b4020"/>
          <stop offset="1" stop-color="#4f5629"/>
        </radialGradient>
      </defs>
      <g clip-path="url(#${id}c)" fill="url(#${id}g)" class="iris__blades" data-iris-blades>
        ${"<path/>".repeat(N)}
      </g>
      ${rim ? `<circle r="${R + 1.5}" class="iris__rim"/><circle r="${R + 5.5}" class="iris__ring"/>` : ""}
      ${glint ? `<path class="iris__glint" data-iris-glint d="M-72 -34A80 80 0 0 1 -34 -72"/>` : ""}
    </svg>`;
}

/** Returns set(open 0..1, rotation radians) for a rendered iris <svg>. */
export function bindIris(svg) {
  const paths = svg.querySelectorAll("[data-iris-blades] path");
  return (open, rot = open * 0.9) => {
    const d = bladePaths(open, rot);
    for (let i = 0; i < N; i++) paths[i].setAttribute("d", d[i]);
  };
}

/** Full-screen shutter used by the loader and page transitions. */
export function createShutter(root) {
  root.innerHTML = `
    <div class="shutter__iris">${irisMarkup({ rim: false, glint: false })}</div>
    <div class="shutter__center">
      <img src="/logo.png" alt="" class="shutter__logo" width="120" height="120" />
      <span class="shutter__label" data-shutter-label></span>
    </div>`;
  const set = bindIris(root.querySelector("svg"));
  const state = { open: 0 };
  const apply = () => set(state.open, state.open * 1.1);
  apply();
  root.classList.remove("is-boot");
  return {
    state,
    apply,
    label: root.querySelector("[data-shutter-label]"),
    center: root.querySelector(".shutter__center"),
  };
}
