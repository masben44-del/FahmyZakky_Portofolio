import * as THREE from "three";
import { SNOISE } from "../noise.js";

/** Documents — a slowly morphing translucent glass crystal. */
export function createGlass(env) {
  const group = new THREE.Group();

  const key = new THREE.DirectionalLight(0xfff4e2, 2.0);
  key.position.set(3, 4, 5);
  const fill = new THREE.DirectionalLight(0xb6862f, 1.2);
  fill.position.set(-5, -1, 2);
  group.add(key, fill, new THREE.AmbientLight(0xcabfa6, 0.5));

  const geometry = new THREE.IcosahedronGeometry(1.5, 96);
  const uniforms = {
    uTime: { value: 0 },
    uDistort: { value: 0.28 },
    uFreq: { value: 1.1 },
    uMouse: { value: 0 },
  };

  const material = new THREE.MeshPhysicalMaterial({
    color: 0xf3e9d2,
    metalness: 0.0,
    roughness: 0.06,
    transmission: 0.92,
    thickness: 1.3,
    ior: 1.45,
    clearcoat: 1.0,
    clearcoatRoughness: 0.12,
    iridescence: 0.6,
    iridescenceIOR: 1.3,
    attenuationColor: new THREE.Color(0xb6862f),
    attenuationDistance: 1.6,
    envMap: env,
    envMapIntensity: 1.4,
    transparent: true,
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
          float t = uTime * 0.28;
          float n  = snoise(p * uFreq + vec3(t));
          float n2 = snoise(p * uFreq * 2.0 - vec3(t * 0.5)) * 0.4;
          return (n + n2) * uDistort * (1.0 + uMouse * 0.6);
        }
        vec3 orthogonal(vec3 v){
          return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0) : vec3(0.0, -v.z, v.y));
        }`
      )
      .replace(
        "#include <beginnormal_vertex>",
        `vec3 displacedNormal = normal;
        {
          float e = 0.05;
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

  const crystal = new THREE.Mesh(geometry, material);
  group.add(crystal);

  function update(dt, t, p, mouse, ms) {
    uniforms.uTime.value = t;
    uniforms.uMouse.value = ms;

    const sway = Math.sin(p * Math.PI * 2.5) * 1.05;
    crystal.rotation.y += dt * 0.1 + mouse.x * 0.01;
    crystal.rotation.x = mouse.y * 0.25 + p * 0.5;
    group.position.x = mouse.x * 0.32 + 1.45 + sway;
    group.position.y = -mouse.y * 0.25 + 0.15 + Math.sin(p * Math.PI * 2) * 0.7;
    group.scale.setScalar(1 - Math.sin(p * Math.PI) * 0.24);
  }

  return { group, update };
}
