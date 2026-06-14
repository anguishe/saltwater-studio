"use client";

import { forwardRef, useMemo } from "react";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import type { Mesh } from "three";

/**
 * The molten-chrome studio mark: a fluid "S" swept along a Catmull-Rom curve
 * (BRAND §7 — a single fluid 'S' that bends from surface light into deep shadow).
 *
 * Presentational only — it forwards its mesh ref so the ONE authored useFrame in
 * DeepScene drives the slow rotation. drei <Float> adds the gentle suspended bob
 * (its internal frame is the single sanctioned exception). Geometry + material are
 * declarative, so R3F disposes them on unmount.
 */
const ChromeMark = forwardRef<Mesh>(function ChromeMark(_props, ref) {
  // Built once. Centered on the origin; slight Z weave gives the tube depth so the
  // raking turquoise/gold lights read as a rim + warm seam as it turns.
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(-0.7, 1.45, 0.12),
          new THREE.Vector3(0.72, 1.0, -0.12),
          new THREE.Vector3(0.62, 0.25, 0.12),
          new THREE.Vector3(-0.62, -0.25, -0.12),
          new THREE.Vector3(-0.72, -1.0, 0.12),
          new THREE.Vector3(0.7, -1.45, -0.12),
        ],
        false,
        "catmullrom",
        0.5,
      ),
    [],
  );

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.5}>
      <mesh ref={ref} scale={1}>
        <tubeGeometry args={[curve, 220, 0.22, 24, false]} />
        <meshStandardMaterial
          color="#8A949B"
          metalness={1}
          roughness={0.12}
          envMapIntensity={1.6}
        />
      </mesh>
    </Float>
  );
});

export default ChromeMark;
