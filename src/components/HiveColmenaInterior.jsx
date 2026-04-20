import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

const DURATION = 1.35;
const BASE = '/img/interior_de_la_colmena';

const SECTION_TO_FONDO = {
  inicio: 1,
  proyectos: 2,
  sobre: 3,
  contacto: 4,
};

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

export default function HiveColmenaInterior({ section }) {
  const targetFondo = SECTION_TO_FONDO[section] ?? 1;

  const urls = useMemo(() => [1, 2, 3, 4, 5, 6, 7].map((n) => `${BASE}/fondo${n}.png`), []);
  const textures = useTexture(urls);

  const meshOut = useRef();
  const meshIn = useRef();

  /** Fondo estable al terminar una transición (también origen de la siguiente). */
  const displayedFondo = useRef(1);
  const transition = useRef(null);

  useLayoutEffect(() => {
    if (transition.current && transition.current.to === targetFondo) return;
    if (!transition.current && targetFondo === displayedFondo.current) return;

    transition.current = {
      from: displayedFondo.current,
      to: targetFondo,
      start: null,
      dir: targetFondo > displayedFondo.current ? 1 : -1,
    };
  }, [targetFondo]);

  useFrame((state) => {
    const clock = state.clock;
    const tr = transition.current;
    const out = meshOut.current;
    const inn = meshIn.current;
    if (!out || !inn) return;

    const applyTint = (mat) => {
      if (mat?.color) mat.color.set('#4a3848');
    };

    if (!tr) {
      inn.visible = false;
      out.visible = true;
      const map = textures[displayedFondo.current - 1];
      if (out.material.map !== map) out.material.map = map;
      out.material.opacity = 0.92;
      out.material.needsUpdate = true;
      applyTint(out.material);
      const t = clock.getElapsedTime();
      const s = 1.05 + Math.sin(t * 0.4) * 0.02;
      out.scale.set(s, s, 1);
      return;
    }

    if (tr.start === null) tr.start = clock.getElapsedTime();

    const raw = (clock.getElapsedTime() - tr.start) / DURATION;
    const t = Math.min(1, raw);
    const e = easeInOutCubic(t);

    inn.visible = true;
    out.visible = true;

    out.material.map = textures[tr.from - 1];
    inn.material.map = textures[tr.to - 1];
    applyTint(out.material);
    applyTint(inn.material);
    out.material.needsUpdate = true;
    inn.material.needsUpdate = true;

    if (tr.dir > 0) {
      const outS = 1.05 + 0.14 * e;
      out.scale.set(outS, outS, 1);
      out.material.opacity = 0.92 * (1 - e);
      const inS = 0.78 + 0.27 * e;
      inn.scale.set(inS, inS, 1);
      inn.material.opacity = 0.92 * e;
    } else {
      const outS = 1.05 - 0.1 * e;
      out.scale.set(Math.max(0.88, outS), Math.max(0.88, outS), 1);
      out.material.opacity = 0.92 * (1 - e);
      const inS = 1.14 - 0.09 * e;
      inn.scale.set(inS, inS, 1);
      inn.material.opacity = 0.92 * e;
    }

    if (t >= 1) {
      displayedFondo.current = tr.to;
      transition.current = null;
      out.material.map = textures[tr.to - 1];
      out.material.opacity = 0.92;
      const t2 = clock.getElapsedTime();
      const s = 1.05 + Math.sin(t2 * 0.4) * 0.02;
      out.scale.set(s, s, 1);
      inn.visible = false;
      inn.material.opacity = 0;
    }
  });

  return (
    <group>
      <mesh ref={meshOut} position={[0, 0, -2]}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial transparent toneMapped={false} depthWrite={false} />
      </mesh>
      <mesh ref={meshIn} position={[0, 0, -1.992]} renderOrder={1}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial transparent toneMapped={false} depthWrite={false} />
      </mesh>
    </group>
  );
}
