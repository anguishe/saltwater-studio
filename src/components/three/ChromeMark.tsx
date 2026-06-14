"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

export default function ChromeMark() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.12;
    meshRef.current.rotation.x += delta * 0.04;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={1.2}>
        <torusKnotGeometry args={[0.7, 0.25, 128, 16, 2, 3]} />
        <MeshDistortMaterial
          color="#8A949B"
          metalness={0.95}
          roughness={0.05}
          distort={0.15}
          speed={1.5}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  );
}
