import React, { useState } from 'react';
import HorizontalBackgroundGallery from './components/HorizontalBackgroundGallery';
import OverlayMenu from './components/OverlayMenu';
import CarbonParticles from './components/CarbonParticles';
import { Canvas } from '@react-three/fiber';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('nexo');

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
  };

  const sectionToIndex = {
    'nexo': 0,
    'embrion': 1,
    'larva': 2,
    'crisalida': 3,
    'zangano': 4,
    'hidraliscos': 5,
    'reina': 6,
  };

  return (
    <div className="portfolio-container">
      {/* Capa Base Z-0: Galería con transiciones de video */}
      <HorizontalBackgroundGallery activeSection={sectionToIndex[activeSection] || 0} />

      {/* Capa de Partículas Z-20: Luciernagas flotantes */}
      <Canvas
        className="particle-canvas"
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ 
          powerPreference: 'high-performance',
          alpha: true,
          antialias: true,
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <CarbonParticles count={11600} />
      </Canvas>

      {/* Capa de Menú Z-40: Tu overlay configurado */}
      <OverlayMenu 
        activeId={activeSection} 
        onNavigate={handleNavigate} 
      />
    </div>
  );
}

export default App;
