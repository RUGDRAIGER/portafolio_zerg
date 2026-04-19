// components/CarbonParticles.jsx
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function CarbonParticles({ count = 2000 }) {
  const mesh = useRef();
  const { mouse, viewport } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    let seed = 9_021_733;
    const rnd = () => {
      seed = (seed * 1_103_515_245 + 12_345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    for (let i = 0; i < count; i++) {
      const t = rnd() * 100;
      const factor = 20 + rnd() * 100;
      const speed = 0.01 + rnd() / 200;
      const xFactor = -50 + rnd() * 100;
      const yFactor = -50 + rnd() * 100;
      const zFactor = -50 + rnd() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      // Reacción al ratón
      particle.mx += (mouse.x * viewport.width - particle.mx) * 0.01;
      particle.my += (mouse.y * viewport.height - particle.my) * 0.01;

      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (viewport.width / 2),
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (viewport.height / 2),
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor)
      );
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#7cf067" toneMapped={false} />
    </instancedMesh>
  );
}
