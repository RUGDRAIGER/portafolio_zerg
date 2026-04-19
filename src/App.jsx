// src/App.jsx
import React, { Suspense, useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import HiveBackground from './components/HiveBackground';
import HiveImmersionGroup from './components/HiveImmersionGroup';
import HiveSectionMotion from './components/HiveSectionMotion';
import HiveAtmosphere, { HiveFogBackground } from './components/HiveAtmosphere';
import CarbonParticles from './components/CarbonParticles';
import HiveZergCursor from './components/HiveZergCursor';
import SidebarUI from './components/SidebarUI';
import './App.css';

function App() {
  const [section, setSection] = useState('inicio');
  const [canvasHover, setCanvasHover] = useState(false);

  const handleNavigate = useCallback((id) => {
    setSection(id);
  }, []);

  return (
    <div className="portfolio-container">
      <SidebarUI onNavigate={handleNavigate} />

      <div
        className={`canvas-wrapper${canvasHover ? ' canvas-wrapper--zerg-cursor' : ''}`}
        data-section={section}
        onPointerEnter={() => setCanvasHover(true)}
        onPointerLeave={() => setCanvasHover(false)}
      >
        <HiveZergCursor active={canvasHover} />
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{ powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <HiveFogBackground />
            <HiveSectionMotion section={section} />
            <HiveImmersionGroup>
              <HiveBackground />
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
