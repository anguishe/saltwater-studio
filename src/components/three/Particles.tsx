"use client";

import { forwardRef, useMemo } from "react";
import type { Points } from "three";
import * as THREE from "three";

interface ParticlesProps {
  count?: number;
}

/**
 * A single instanced points field of sparse bioluminescent motes (≤3k).
 * Presentational — its gentle drift is driven by the ONE authored useFrame in
 * DeepScene via the forwarded ref. Geometry is declarative (auto-disposed).
 */
const Particles = forwardRef<Points, ParticlesProps>(function Particles(
  { count = 2500 },
  ref,
) {
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const biolumi = new THREE.Color("#5FF2E0"); // --glow
    const shoal = new THREE.Color("#2FC6B6"); // --shoal

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;

      const mix = Math.random();
      const c = biolumi.clone().lerp(shoal, mix);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return [positions, colors];
  }, [count]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
});

export default Particles;
