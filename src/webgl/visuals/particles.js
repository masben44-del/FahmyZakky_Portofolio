import * as THREE from "three";
import { SNOISE } from "../noise.js";

/** Video AI — a flowing field of particles (cinematic, on dark theme). */
export function createParticles() {
  const group = new THREE.Group();

  const W = 16, H = 10, COLS = 200, ROWS = 130;
  const positions = new Float32Array(COLS * ROWS * 3);
  let i = 0;
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      positions[i++] = (x / (COLS - 1) - 0.5) * W;
      positions[i++] = (y / (ROWS - 1) - 0.5) * H;
      positions[i++] = 0;
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: 0 },
    uSize: { value: 26.0 },
    uColorA: { value: new THREE.Color(0x6a5cff) },
    uColorB: { value: new THREE.Color(0xff5fae) },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      uniform float uTime; uniform float uMouse; uniform float uSize;
      varying float vMix;
      ${SNOISE}
      void main(){
        vec3 p = position;
        float t = uTime * 0.22;
        float n  = snoise(vec3(p.xy * 0.32, t));
        float n2 = snoise(vec3(p.xy * 0.85 + 12.0, t * 1.4)) * 0.45;
        p.z += (n + n2) * (1.3 + uMouse * 0.9);
        vMix = clamp((p.z + 1.6) / 3.2, 0.0, 1.0);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = uSize * (6.0 / -mv.z) * (0.6 + vMix * 0.7);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3 uColorA; uniform vec3 uColorB;
      varying float vMix;
      void main(){
        float d = smoothstep(0.5, 0.0, length(gl_PointCoord - 0.5));
        if (d <= 0.0) discard;
        vec3 col = mix(uColorA, uColorB, vMix);
        gl_FragColor = vec4(col, d * (0.55 + vMix * 0.45));
      }
    `,
  });

  const points = new THREE.Points(geometry, material);
  points.rotation.x = -0.65;
  group.add(points);

  function update(dt, t, p, mouse, ms) {
    uniforms.uTime.value = t;
    uniforms.uMouse.value = ms;

    points.rotation.z += dt * 0.02;
    points.rotation.x = -0.65 + mouse.y * 0.15;
    group.rotation.y = mouse.x * 0.2;

    group.position.x = mouse.x * 0.3 + 1.6 + Math.sin(p * Math.PI * 2) * 1.0;
    group.position.y = -mouse.y * 0.2 + 0.2 + Math.cos(p * Math.PI * 2) * 0.8;
    group.scale.setScalar(1 - Math.sin(p * Math.PI) * 0.2);
  }

  return { group, update };
}
