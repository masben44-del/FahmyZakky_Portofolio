import * as THREE from "three";
import { SNOISE } from "../noise.js";

/** Web Design — a breathing wireframe sphere of glowing lines. */
export function createLines() {
  const group = new THREE.Group();

  const base = new THREE.IcosahedronGeometry(1.6, 16);
  const geometry = new THREE.WireframeGeometry(base);
  base.dispose();

  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: 0 },
    uFreq: { value: 1.15 },
    uDistort: { value: 0.5 },
    uColor: { value: new THREE.Color(0x14534a) },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
    vertexShader: `
      uniform float uTime; uniform float uMouse; uniform float uFreq; uniform float uDistort;
      varying float vDepth;
      ${SNOISE}
      void main(){
        vec3 p = position;
        vec3 dir = normalize(p);
        float t = uTime * 0.3;
        float n  = snoise(p * uFreq + vec3(t));
        float n2 = snoise(p * uFreq * 2.0 - vec3(t * 0.5)) * 0.4;
        p += dir * (n + n2) * uDistort * (1.0 + uMouse * 0.6);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vDepth;
      void main(){
        float fade = smoothstep(9.0, 2.5, vDepth);
        gl_FragColor = vec4(uColor, 0.18 + fade * 0.6);
      }
    `,
  });

  const mesh = new THREE.LineSegments(geometry, material);
  group.add(mesh);

  // a second, larger ghost shell rotating opposite (shares material)
  const mesh2 = new THREE.LineSegments(geometry, material);
  mesh2.scale.setScalar(1.35);
  group.add(mesh2);

  function update(dt, t, p, mouse, ms) {
    uniforms.uTime.value = t;
    uniforms.uMouse.value = ms;

    const sway = Math.cos(p * Math.PI * 2.5) * 1.0;
    mesh.rotation.y += dt * 0.18 + mouse.x * 0.012;
    mesh.rotation.x = mouse.y * 0.3 + p * 0.5;
    mesh2.rotation.y -= dt * 0.1;
    mesh2.rotation.z += dt * 0.05;

    group.position.x = mouse.x * 0.3 + 1.4 + sway;
    group.position.y = -mouse.y * 0.25 + 0.1 + Math.sin(p * Math.PI * 2) * 0.7;
    group.scale.setScalar(1 - Math.sin(p * Math.PI) * 0.25);
  }

  return { group, update };
}
