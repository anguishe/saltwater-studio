"use client";

import { Canvas } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import ChromeMark from "./ChromeMark";
import Particles from "./Particles";

export default function DeepScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "-10%" });

  // Pause canvas rendering when off-screen
  const paused = !inView;

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        frameloop={paused ? "never" : "always"}
      >
        <color attach="background" args={["#02090C"]} />
        <ambientLight intensity={0.15} />
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#2FC6B6" />
        <pointLight position={[-3, -2, 2]} intensity={0.8} color="#5FF2E0" />

        <ChromeMark />
        <Particles count={2500} />
      </Canvas>
    </div>
  );
}
