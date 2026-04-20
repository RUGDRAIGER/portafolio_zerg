import React, { useState } from 'react';
import HorizontalBackgroundGallery from './components/HorizontalBackgroundGallery';
import OverlayMenu from './components/OverlayMenu';
import CarbonParticles from './components/CarbonParticles';
import { Canvas } from '@react-three/fiber';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('inicio');

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
  };

  const sectionToIndex = {
    'inicio': 0,
    'proyectos': 1,
    'sobre': 2,
    'contacto': 3,
  };

  return (
    <div className="portfolio-container">
      {/* Capa Base Z-0: Galería horizontal de fondos - DEBE SER LA PRIMERA */}
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

      {/* Capa de Menú Z-40: Tu overlay configurado - DEBE SER LA ÚLTIMA */}
      <OverlayMenu 
        activeId={activeSection} 
        onNavigate={handleNavigate} 
      />
    </div>
  );
}

export default App;
