// src/App.jsx
import React, { Suspense, useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import HiveColmenaInterior from './components/HiveColmenaInterior';
import HiveImmersionGroup from './components/HiveImmersionGroup';
import HiveSectionMotion from './components/HiveSectionMotion';
import HiveAtmosphere, { HiveFogBackground } from './components/HiveAtmosphere';
import CarbonParticles from './components/CarbonParticles';
import OverlayMenu from './components/OverlayMenu';
import './App.css';

function App() {
  const [section, setSection] = useState('inicio');

  const handleNavigate = useCallback((id) => {
    setSection(id);
  }, []);

  return (
    <div className="portfolio-container">
      <OverlayMenu activeId={section} onNavigate={handleNavigate} />

      <div className="canvas-wrapper" data-section={section}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{ powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <HiveFogBackground />
            <HiveSectionMotion section={section} />
            <HiveImmersionGroup>
              <HiveColmenaInterior section={section} />
              <CarbonParticles count={3000} />
            </HiveImmersionGroup>
            <HiveAtmosphere section={section} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
