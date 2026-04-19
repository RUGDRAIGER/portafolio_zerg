// src/App.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import HiveBackground from './components/HiveBackground';
import CarbonParticles from './components/CarbonParticles';
import './App.css';

function App() {
  return (
    <div className="portfolio-container">
      {/* Menú UI */}
      <div className="sidebar-container">
        <h2 className="menu-item">INICIO</h2>
        <h2 className="menu-item">PROYECTOS</h2>
        <h2 className="menu-item">SOBRE MÍ</h2>
        <h2 className="menu-item">CONTACTO</h2>
      </div>

      <div className="canvas-wrapper">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <Suspense fallback={null}>
            <HiveBackground />
            <CarbonParticles count={3000} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
