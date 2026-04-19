// components/HiveBackground.jsx
import React, { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HiveBackground() {
  const meshRef = useRef();
  // Forzamos la carga de la textura
  const texture = useTexture('/colmena_zerg2.jpg');
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Respiración orgánica
    if (meshRef.current) {
      meshRef.current.scale.set(
        1.05 + Math.sin(t * 0.4) * 0.02,
        1.05 + Math.cos(t * 0.4) * 0.02,
        1
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[20, 10]} />
      {/* Usamos BasicMaterial para que se vea sin depender de luces externas por ahora */}
      <meshBasicMaterial map={texture} transparent opacity={0.8} color="#222" />
    </mesh>
  );
}