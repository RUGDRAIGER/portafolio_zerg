/* Animación R3F: lerps sobre camera y FogExp2 en useFrame (patrón estándar Three.js). */
/* eslint-disable react-hooks/immutability */
import { useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/** Metas por sección: “entrar” más en la colmena = acercar cámara y espesar niebla. */
const PRESETS = {
  inicio: { pos: [0, 0, 10], fov: 50, fog: 0.012 },
  proyectos: { pos: [0.45, -0.14, 7.45], fov: 47.5, fog: 0.019 },
  sobre: { pos: [-0.38, 0.12, 8.05], fov: 48.5, fog: 0.016 },
  contacto: { pos: [0.14, 0.08, 6.85], fov: 46, fog: 0.022 },
};

const LERP_CAM = 0.042;
const LERP_FOG = 0.048;
const LERP_FOV = 0.055;

export default function HiveSectionMotion({ section }) {
  const { camera } = useThree();
  const fog = useMemo(() => new THREE.FogExp2('#140a1c', PRESETS.inicio.fog), []);

  const targetPos = useRef(new THREE.Vector3(...PRESETS.inicio.pos));
  const targetFov = useRef(PRESETS.inicio.fov);
  const targetFog = useRef(PRESETS.inicio.fog);

  useLayoutEffect(() => {
    const cfg = PRESETS[section] ?? PRESETS.inicio;
    targetPos.current.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
    targetFov.current = cfg.fov;
    targetFog.current = cfg.fog;
  }, [section]);

  useFrame(() => {
    camera.position.lerp(targetPos.current, LERP_CAM);

    fog.density = THREE.MathUtils.lerp(fog.density, targetFog.current, LERP_FOG);

    if (camera.isPerspectiveCamera) {
      const nextFov = THREE.MathUtils.lerp(camera.fov, targetFov.current, LERP_FOV);
      if (Math.abs(nextFov - camera.fov) > 0.002) {
        camera.fov = nextFov;
        camera.updateProjectionMatrix();
      }
    }
  });

  return <primitive object={fog} attach="fog" />;
}
