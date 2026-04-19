import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

/**
 * Parallax suave del contenido 3D (fondo + partículas) según el ratón.
 * No mueve la cámara de sección — solo el grupo para sensación de profundidad.
 */
export default function HiveImmersionGroup({ children }) {
  const group = useRef();
  const { mouse } = useThree();

  const reduceMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  useFrame(() => {
    const g = group.current;
    if (!g) return;

    if (reduceMotion) {
      g.position.set(0, 0, 0);
      g.rotation.set(0, 0, 0);
      return;
    }

    const tx = mouse.x * 0.52;
    const ty = mouse.y * 0.34;
    g.position.x += (tx - g.position.x) * 0.062;
    g.position.y += (ty - g.position.y) * 0.062;

    const targetRx = mouse.y * 0.028;
    const targetRy = mouse.x * 0.036;
    g.rotation.x += (targetRx - g.rotation.x) * 0.045;
    g.rotation.y += (targetRy - g.rotation.y) * 0.045;
  });

  return <group ref={group}>{children}</group>;
}
