import { useMemo } from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

/** Color de cielo; la niebla la anima `HiveSectionMotion`. */
export function HiveFogBackground() {
  return <color attach="background" args={['#0a0612']} />;
}

const SECTION_POST = {
  inicio: { intensity: 1.02, luminanceThreshold: 0.38, radius: 0.68 },
  proyectos: { intensity: 1.22, luminanceThreshold: 0.3, radius: 0.78 },
  sobre: { intensity: 0.95, luminanceThreshold: 0.4, radius: 0.62 },
  contacto: { intensity: 1.14, luminanceThreshold: 0.32, radius: 0.74 },
};

export default function HiveAtmosphere({ section = 'inicio' }) {
  const p = useMemo(() => SECTION_POST[section] ?? SECTION_POST.inicio, [section]);

  return (
    <EffectComposer multisampling={4} renderPriority={1}>
      <Bloom
        intensity={p.intensity}
        luminanceThreshold={p.luminanceThreshold}
        luminanceSmoothing={0.38}
        mipmapBlur
        radius={p.radius}
        levels={7}
      />
    </EffectComposer>
  );
}
