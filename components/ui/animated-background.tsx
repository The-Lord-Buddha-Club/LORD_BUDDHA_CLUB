"use client";

import { Canvas, RootState } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import * as THREE from "three";

function Stars() {
  const ref = useRef<THREE.Points | null>(null);
  
  // Reduced particle count from 5000 to 3000 for performance
  const sphere = random.inSphere(new Float32Array(3000), { radius: 5.0 }) as Float32Array;

  useFrame((_state: RootState, delta: number) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  useEffect(() => {
    if (ref.current) {
      const colors = new Float32Array(sphere.length);
      for (let i = 0; i < colors.length; i += 3) {
        colors[i] = Math.random();     // Red
        colors[i + 1] = Math.random(); // Green
        colors[i + 2] = Math.random(); // Blue
      }
      ref.current.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const material = ref.current.material as THREE.PointsMaterial;
      material.vertexColors = true;
      material.blending = THREE.AdditiveBlending;
      material.needsUpdate = true;
    }
  }, [sphere]);

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.009}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

interface AnimatedBackgroundProps {
  className?: string;
}

export function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  const containerClassName = `absolute inset-0 z-[-1] pointer-events-none ${className}`.trim();

  return (
    <div className={containerClassName}>
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 5], fov: 60 }}
      >
        <Stars />
      </Canvas>
    </div>
  );
}

