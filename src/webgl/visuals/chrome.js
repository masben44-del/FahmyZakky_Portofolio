import * as THREE from "three";
import { SNOISE } from "../noise.js";

/** Home — molten aluminium / chrome blob. */
export function createChrome(env) {
  const group = new THREE.Group();

  const key = new THREE.DirectionalLight(0xfff1e0, 2.2);
  key.position.set(4, 5, 4);
  const rim = new THREE.DirectionalLight(0xd9542b, 1.4);
  rim.position.set(-6, -2, 2);
  group.add(key, rim, new THREE.AmbientLight(0xb9b3a4, 0.4));

  const geometry = new THREE.IcosahedronGeometry(1.45, 160);
  const uniforms = {
    uTime: { value: 0 },
    uDistort: { value: 0.42 },
    uFreq: { value: 1.35 },
    uMouse: { value: 0 },
  };

  const material = new THREE.MeshStandardMaterial({
    color: 0xb9bdc4,
    metalness: 1.0,
    roughness: 0.18,
    envMap: env,
    envMapIntensity: 1.25,
  });

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
        uniform float uTime; uniform float uDistort; uniform float uFreq; uniform float uMouse;
        ${SNOISE}
        float displace(vec3 p){
          float t = uTime * 0.35;
          float n  = snoise(p * uFreq + vec3(t));
          float n2 = snoise(p * (uFreq * 2.1) - vec3(t * 0.6)) * 0.45;
          return (n + n2) * uDistort * (1.0 + uMouse * 0.8);
        }
        vec3 orthogonal(vec3 v){
          return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0) : vec3(0.0, -v.z, v.y));
        }`
      )
      .replace(
        "#include <beginnormal_vertex>",
        `vec3 displacedNormal = normal;
        {
          float e = 0.04;
          vec3 tangent = orthogonal(normal);
          vec3 bitangent = normalize(cross(normal, tangent));
          vec3 p0 = position + normal * displace(position);
          vec3 pA = position + tangent * e + normal * displace(position + tangent * e);
          vec3 pB = position + bitangent * e + normal * displace(position + bitangent * e);
          displacedNormal = normalize(cross(pA - p0, pB - p0));
        }
        vec3 objectNormal = displacedNormal;`
      )
      .replace(
        "#include <begin_vertex>",
        `vec3 transformed = position + normal * displace(position);`
      );
  };

  const blob = new THREE.Mesh(geometry, material);
  group.add(blob);

  function update(dt, t, p, mouse, ms) {
    uniforms.uTime.value = t;
    uniforms.uMouse.value = ms;

    const sway = Math.sin(p * Math.PI * 3) * 1.15;
    const lift = Math.cos(p * Math.PI * 2) * 0.7;
    blob.rotation.y += dt * 0.12 + mouse.x * 0.01 + p * 0.004;
    blob.rotation.x = mouse.y * 0.25 + p * 0.6;
    blob.position.x = mouse.x * 0.35 + 1.5 + sway;
    blob.position.y = -mouse.y * 0.25 + 0.2 + lift;
    blob.scale.setScalar(1 - Math.sin(p * Math.PI) * 0.32);
    uniforms.uDistort.value = 0.42 + Math.sin(p * Math.PI) * 0.12;
  }

  return { group, update };
}
