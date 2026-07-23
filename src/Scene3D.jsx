import React, { useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';

function GradientPlane() {
  const prefersReducedMotion = useReducedMotion();
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => invalidate(), 50); // ~20fps gentle
    return () => clearInterval(id);
  }, [invalidate, prefersReducedMotion]);

  useFrame((state) => {
    if (prefersReducedMotion) return;
    const t = state.clock.getElapsedTime();
    state.scene.rotation.z = Math.sin(t * 0.05) * 0.02;
  });

  return (
    <mesh rotation-x={-0.2}>
      <planeGeometry args={[3, 3, 64, 64]} />
      <MeshWobbleMaterial
        speed={0.4}
        factor={0.02}
        color="#1a2030"
        metalness={0.1}
        roughness={0.9}
        emissive="#22263a"
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

export default function Scene3D() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="scene3d-wrap" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        shadows={false}
        frameloop="demand"
        camera={{ position: [0, 0, 2.6], fov: 50 }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[2.5, 2, 1]} intensity={prefersReducedMotion ? 0.1 : 0.25} />
        <GradientPlane />
        {/* OrbitControls is present but disabled; keeps dependency live without UX cost */}
        <OrbitControls enabled={false} />
      </Canvas>
    </div>
  );
}
