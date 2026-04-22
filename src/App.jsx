import React, { useState, useEffect } from 'react';
import HorizontalBackgroundGallery from './components/HorizontalBackgroundGallery';
// import OverlayMenu from './components/OverlayMenu'; // Menú antiguo
import BootstrapOverlayMenu from './components/BootstrapOverlayMenu'; // Nuevo menú con 3 capas
import CarbonParticles from './components/CarbonParticles';
import { Canvas } from '@react-three/fiber';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('nexo');
  const [particleCount, setParticleCount] = useState(11600);

  // Hook para detectar tamaño de pantalla y ajustar partículas
  useEffect(() => {
    const updateParticleCount = () => {
      const width = window.innerWidth;
      
      if (width <= 375) {
        setParticleCount(2000); // Móviles muy pequeños
      } else if (width <= 480) {
        setParticleCount(3000); // Móviles pequeños
      } else if (width <= 768) {
        setParticleCount(5000); // Móviles/tablets
      } else if (width <= 1024) {
        setParticleCount(7000); // Tablets
      } else if (width <= 1440) {
        setParticleCount(9000); // Desktop
      } else if (width <= 2560) {
        setParticleCount(11600); // Desktop grande
      } else {
        setParticleCount(14000); // 4K/UltraWide
      }
    };

    updateParticleCount();
    window.addEventListener('resize', updateParticleCount);
    
    return () => window.removeEventListener('resize', updateParticleCount);
  }, []);

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
        <CarbonParticles count={particleCount} />
      </Canvas>

      {/* Capa de Menú Z-40: Nuevo menú con 3 capas apiladas (Bootstrap) */}
      <BootstrapOverlayMenu 
        activeId={activeSection} 
        onNavigate={handleNavigate} 
      />
      {/* Menú antiguo (comentado):
      <OverlayMenu 
        activeId={activeSection} 
        onNavigate={handleNavigate} 
      />
      */}
    </div>
  );
}

export default App;
