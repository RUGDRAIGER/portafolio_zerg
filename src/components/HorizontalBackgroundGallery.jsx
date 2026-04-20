import React, { useEffect, useRef } from 'react';

/**
 * Galería horizontal de fondos panorámicos de la colmena.
 * Respeta colores y brillo originales de las imágenes.
 */
export default function HorizontalBackgroundGallery({ activeSection = 0 }) {
  const galleryRef = useRef(null);
  const backgrounds = [1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    if (!galleryRef.current) return;

    // Scroll suave hacia la sección activa
    const targetScroll = activeSection * window.innerWidth;
    
    galleryRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  }, [activeSection]);

  return (
    <div ref={galleryRef} className="horizontal-gallery">
      {backgrounds.map((num) => (
        <div
          key={num}
          className="gallery-slide"
          style={{
            backgroundImage: `url(/img/interior_de_la_colmena/fondo${num}.png)`,
          }}
        />
      ))}
    </div>
  );
}
