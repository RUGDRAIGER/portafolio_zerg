// components/SidebarUI.jsx
import React from 'react';

export default function SidebarUI() {
  const items = [
    'INICIO',
    'PROYECTOS',
    'SOBRE MÍ',
    'CONTACTO'
  ];

  return (
    <div className="sidebar-container">
      {items.map((item, idx) => (
        <div key={idx} className="menu-item">
          {item}
        </div>
      ))}
    </div>
  );
}
