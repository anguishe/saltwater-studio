"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Environment, Lightformer } from "@react-three/drei";
import type { Mesh, Points } from "three";
import ChromeMark from "./ChromeMark";
import Particles from "./Particles";

/**
 * The deep scene. ONE R3F scene, ONE authored useFrame (here), instanced points
 * ≤3k, dpr [1,2]. Caustic/volumetric light is faked with a procedural drei
 * <Environment> built from <Lightformer> rects (zero HDR download) plus a handful
 * of raking lights, so the chrome reflects turquoise rays + a warm-gold seam.
 *
 * `active` (the hero's useInView state) drives `frameloop`: "never" when off-screen
 * pauses the loop entirely. Declarative geometry/materials → R3F disposes on unmount.
 */
function Scene() {
  const chromeRef = useRef<Mesh>(null);
  const particlesRef = useRef<Points>(null);

  // The single authored loop: slow chrome spin + gentle particle drift.
  useFrame((_, delta) => {
    // Clamp so resuming after a pause (large delta) doesn't snap the rotation.
    const d = Math.min(delta, 0.05);
    if (chromeRef.current) {
      chromeRef.current.rotation.y += d * 0.12;
      chromeRef.current.rotation.x += d * 0.04;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += d * 0.015;
      particlesRef.current.rotation.x += d * 0.005;
    }
  });

  return (
    <>
      <color attach="background" args={["#02090C"]} />
      <fog attach="fog" args={["#02090C", 6, 15]} />

      <ambientLight intensity={0.12} />
      {/* turquoise rake (caustic key) */}
      <pointLight position={[4, 5, 3]} intensity={2} color="#2FC6B6" />
      {/* bioluminescent rim */}
      <pointLight position={[-4, -2, -3]} intensity={1.2} color="#5FF2E0" />
      {/* warm-gold seam accent */}
      <pointLight position={[2, -3, 2]} intensity={0.9} color="#C9A227" />

      <Environment frames={1} resolution={256}>
        <color attach="background" args={["#02090C"]} />
        {/* surface caustics raking down */}
        <Lightformer
          form="rect"
          intensity={2.2}
          color="#5FF2E0"
          position={[0, 5, 1]}
          scale={[6, 3, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.6}
          color="#2FC6B6"
          position={[-5, 1, -2]}
          scale={[3, 6, 1]}
        />
        {/* warm molten seam */}
        <Lightformer
          form="rect"
          intensity={1.1}
          color="#C9A227"
          position={[4, -3, 2]}
          scale={[3, 3, 1]}
        />
        <Lightformer
          form="ring"
          intensity={1.3}
          color="#5FF2E0"
          position={[3, 2, -4]}
          scale={2.5}
        />
      </Environment>

      <ChromeMark ref={chromeRef} />
      <Particles ref={particlesRef} count={2500} />
    </>
  );
}

export default function DeepScene({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        frameloop={active ? "always" : "never"}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
