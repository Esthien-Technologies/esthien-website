import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  attribute float aSize;
  attribute float aPhase;
  varying float vDepth;

  void main() {
    vec3 p = position;
    float wave = sin((p.x * 0.82) + (p.y * 0.34) + uTime + aPhase) * 0.15;
    float pull = distance(p.xy, uMouse) * 0.03;
    p.z += wave - pull;
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * (310.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vDepth = smoothstep(-4.0, 4.0, p.z);
  }
`;

const fragmentShader = `
  varying float vDepth;

  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float alpha = 1.0 - smoothstep(0.18, 0.5, length(c));
    vec3 cold = vec3(0.298, 0.788, 0.941);
    vec3 warm = vec3(0.784, 0.663, 0.416);
    vec3 color = mix(cold, warm, vDepth * 0.42);
    gl_FragColor = vec4(color, alpha * 0.88);
  }
`;

export default function IntelligenceField() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 120);
    camera.position.set(0, 0, 16);

    const group = new THREE.Group();
    group.rotation.x = -0.54;
    group.rotation.z = -0.22;
    scene.add(group);

    const count = window.innerWidth < 720 ? 840 : 1680;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      const ratio = i / count;
      const angle = ratio * Math.PI * 28;
      const band = (i % 34) / 34;
      const radius = 1.8 + band * 6.2 + Math.sin(ratio * Math.PI * 8) * 0.36;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.72;
      positions[i * 3 + 2] = (band - 0.5) * 4.6 + Math.sin(angle * 0.6) * 0.72;
      sizes[i] = 0.065 + (1 - band) * 0.048;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
    });

    const points = new THREE.Points(geometry, material);
    group.add(points);

    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0x4cc9f0,
      transparent: true,
      opacity: 0.18,
    });

    const rings: THREE.LineLoop[] = [];
    for (let i = 0; i < 4; i += 1) {
      const ringGeometry = new THREE.BufferGeometry();
      const ringPositions: number[] = [];
      const segments = 180;
      const radius = 2.6 + i * 1.42;

      for (let j = 0; j < segments; j += 1) {
        const angle = (j / segments) * Math.PI * 2;
        ringPositions.push(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.72, i * 0.28);
      }

      ringGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(ringPositions, 3),
      );
      const ring = new THREE.LineLoop(ringGeometry, ringMaterial.clone());
      ring.rotation.z = i * 0.38;
      group.add(ring);
      rings.push(ring);
    }

    const resize = () => {
      const rect = host.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = -((event.clientY - rect.top) / rect.height - 0.5) * 4;
      mouseRef.current.set(x, y);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    host.addEventListener("pointermove", onPointerMove);
    resize();

    const clock = new THREE.Clock();
    let frame = 0;

    const render = () => {
      const elapsed = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsed * 0.56;
      material.uniforms.uMouse.value.lerp(mouseRef.current, 0.04);
      group.rotation.y = Math.sin(elapsed * 0.12) * 0.16;
      group.rotation.z = -0.22 + Math.sin(elapsed * 0.1) * 0.04;

      rings.forEach((ring, index) => {
        ring.rotation.z += 0.0016 + index * 0.0006;
        const lineMaterial = ring.material as THREE.LineBasicMaterial;
        lineMaterial.opacity = 0.08 + Math.sin(elapsed * 0.7 + index) * 0.035;
      });

      renderer.render(scene, camera);

      if (!reducedMotion) {
        frame = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      rings.forEach((ring) => {
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });
      ringMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="intelligence-field" ref={hostRef} aria-hidden="true" />;
}
