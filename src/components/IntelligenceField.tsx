import { useEffect, useRef, useState } from "react";

type LatticeData = {
  lines: Float32Array;
  points: Float32Array;
  accents: Float32Array;
};

const createRandom = (seed = 132344254) => {
  let value = seed;

  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
};

const buildLattice = (): LatticeData => {
  const random = createRandom();
  const columns = 16;
  const rows = 9;
  const layers = 3;
  const width = 9.2;
  const height = 5.2;
  const depth = 2.6;
  const nodes: number[][] = [];

  for (let z = 0; z < layers; z += 1) {
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        const px = (x / (columns - 1) - 0.5) * width + (random() - 0.5) * 0.14;
        const py = (y / (rows - 1) - 0.5) * height + (random() - 0.5) * 0.14;
        const pz = (z / (layers - 1) - 0.5) * depth;
        nodes.push([px, py, pz]);
      }
    }
  }

  const index = (x: number, y: number, z: number) => z * rows * columns + y * columns + x;
  const lines: number[] = [];
  const points: number[] = [];
  const accents: number[] = [];

  for (let z = 0; z < layers; z += 1) {
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        const current = nodes[index(x, y, z)];

        if (x < columns - 1 && random() > 0.16) {
          lines.push(...current, ...nodes[index(x + 1, y, z)]);
        }

        if (y < rows - 1 && random() > 0.32) {
          lines.push(...current, ...nodes[index(x, y + 1, z)]);
        }

        if (z < layers - 1 && random() > 0.8) {
          lines.push(...current, ...nodes[index(x, y, z + 1)]);
        }

        if (random() < 0.035) {
          accents.push(...current);
        } else {
          points.push(...current);
        }
      }
    }
  }

  return {
    lines: new Float32Array(lines),
    points: new Float32Array(points),
    accents: new Float32Array(accents),
  };
};

const supportsWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
};

export default function IntelligenceField() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(true);
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canEnhance = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (reducedMotion || !canEnhance || !supportsWebGL()) {
      return;
    }

    let disposed = false;
    let disposeScene: (() => void) | undefined;

    const enhance = async () => {
      if (disposed || disposeScene) {
        return;
      }

      const THREE = await import("three");

      if (disposed) {
        return;
      }

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearAlpha(0);
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120);
      camera.position.set(0, 0, 8.4);

      const data = buildLattice();
      const group = new THREE.Group();
      group.rotation.set(-0.16, 0.34, 0);
      group.position.set(1.2, -0.05, 0);
      scene.add(group);

      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute("position", new THREE.BufferAttribute(data.lines, 3));
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x55769c,
        transparent: true,
        opacity: 0.78,
      });
      group.add(new THREE.LineSegments(lineGeometry, lineMaterial));

      const pointGeometry = new THREE.BufferGeometry();
      pointGeometry.setAttribute("position", new THREE.BufferAttribute(data.points, 3));
      const pointMaterial = new THREE.PointsMaterial({
        color: 0xc4d3e2,
        size: 0.064,
        sizeAttenuation: true,
        transparent: true,
        opacity: 1,
      });
      group.add(new THREE.Points(pointGeometry, pointMaterial));

      const accentGeometry = new THREE.BufferGeometry();
      accentGeometry.setAttribute("position", new THREE.BufferAttribute(data.accents, 3));
      const accentMaterial = new THREE.PointsMaterial({
        color: 0x32d69a,
        size: 0.13,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.95,
      });
      group.add(new THREE.Points(accentGeometry, accentMaterial));

      const resize = () => {
        const rect = host.getBoundingClientRect();
        const width = Math.max(1, rect.width);
        const height = Math.max(1, rect.height);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      const onPointerMove = (event: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        pointerRef.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        pointerRef.current.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
      };

      const visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          activeRef.current = entry.isIntersecting;
        },
        { threshold: 0.05 },
      );
      visibilityObserver.observe(host);

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      host.addEventListener("pointermove", onPointerMove);
      resize();
      setShowFallback(false);

      const clock = new THREE.Clock();
      let frame = 0;

      const render = () => {
        const elapsed = clock.getElapsedTime();

        if (activeRef.current) {
          const targetY = 0.34 + Math.sin(elapsed * 0.12) * 0.1 + pointerRef.current.x * 0.12;
          const targetX = -0.16 + Math.cos(elapsed * 0.1) * 0.05 - pointerRef.current.y * 0.08;
          group.rotation.y += (targetY - group.rotation.y) * 0.035;
          group.rotation.x += (targetX - group.rotation.x) * 0.035;
          lineMaterial.opacity = 0.7 + Math.sin(elapsed * 0.8) * 0.08;
          accentMaterial.size = 0.12 + Math.sin(elapsed * 1.2) * 0.018;
          renderer.render(scene, camera);
        }

        frame = requestAnimationFrame(render);
      };

      render();

      disposeScene = () => {
        cancelAnimationFrame(frame);
        visibilityObserver.disconnect();
        resizeObserver.disconnect();
        host.removeEventListener("pointermove", onPointerMove);
        lineGeometry.dispose();
        pointGeometry.dispose();
        accentGeometry.dispose();
        lineMaterial.dispose();
        pointMaterial.dispose();
        accentMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    const onFirstInteraction = () => {
      void enhance();
    };

    host.addEventListener("pointerenter", onFirstInteraction, { once: true });
    host.addEventListener("pointermove", onFirstInteraction, { once: true });

    return () => {
      disposed = true;
      host.removeEventListener("pointerenter", onFirstInteraction);
      host.removeEventListener("pointermove", onFirstInteraction);
      disposeScene?.();
    };
  }, []);

  return (
    <div className="intelligence-field hero-lattice-field" ref={hostRef} aria-hidden="true">
      {showFallback ? (
        <svg viewBox="0 0 420 320" preserveAspectRatio="xMidYMid slice">
          <g stroke="currentColor" strokeWidth="0.6" opacity="0.52">
            {Array.from({ length: 11 }).map((_, index) => (
              <line key={`v${index}`} x1={20 + index * 38} y1="24" x2={20 + index * 38} y2="296" />
            ))}
            {Array.from({ length: 8 }).map((_, index) => (
              <line key={`h${index}`} x1="20" y1={24 + index * 39} x2="400" y2={24 + index * 39} />
            ))}
          </g>
          <g fill="currentColor" opacity="0.76">
            {Array.from({ length: 11 }).map((_, column) =>
              Array.from({ length: 8 }).map((__, row) => (
                <circle key={`n${column}-${row}`} cx={20 + column * 38} cy={24 + row * 39} r="1.5" />
              )),
            )}
          </g>
        </svg>
      ) : null}
    </div>
  );
}
