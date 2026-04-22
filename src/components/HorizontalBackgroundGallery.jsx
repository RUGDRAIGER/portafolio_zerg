import React, { useEffect, useRef, useState } from 'react';

/**
 * Galería de fondos con transiciones de video entre cada cambio.
 * Reproduce videos en secuencia (normal o reversa) según la dirección.
 */
export default function HorizontalBackgroundGallery({ activeSection = 0 }) {
  const galleryRef = useRef(null);
  const videoRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [transitionQueue, setTransitionQueue] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  // Base URL para GitHub Pages
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  const backgrounds = [1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    if (activeSection === currentSection) return;

    const from = currentSection;
    const to = activeSection;
    const direction = to > from ? 1 : -1; // 1 = avanzar, -1 = retroceder
    
    // Calcular qué videos de transición reproducir
    const videos = [];
    if (direction > 0) {
      // Avanzar: reproducir videos normales del from al to
      for (let i = from; i < to; i++) {
        videos.push({ num: i + 1, reversed: false }); // transicion1.mp4, transicion2.mp4, etc.
      }
    } else {
      // Retroceder: reproducir videos invertidos del from al to
      for (let i = from; i > to; i--) {
        videos.push({ num: i, reversed: true }); // transicion6.mp4 (reversed), etc.
      }
    }

    setTransitionQueue(videos);
    setCurrentVideoIndex(0);
    setIsTransitioning(true);
  }, [activeSection, currentSection]);

  useEffect(() => {
    if (!isTransitioning || transitionQueue.length === 0) return;

    const video = videoRef.current;
    if (!video) return;

    const currentVideo = transitionQueue[currentVideoIndex];
    if (!currentVideo) {
      // Terminaron todos los videos
      handleAllTransitionsEnd();
      return;
    }

    // Configurar y reproducir el video actual
    const videoSrc = currentVideo.reversed 
      ? `${baseUrl}img/transicion/transicion${currentVideo.num}_reverse.mp4`
      : `${baseUrl}img/transicion/transicion${currentVideo.num}.mp4`;
    
    video.src = videoSrc;
    video.playbackRate = transitionQueue.length > 1 ? 2.5 : 1; // 2.5x para saltos múltiples
    video.currentTime = 0;
    video.play().catch(err => {
      console.error('Error reproduciendo video:', err);
      handleVideoEnd();
    });
  }, [isTransitioning, currentVideoIndex, transitionQueue]);

  const handleVideoEnd = () => {
    if (currentVideoIndex < transitionQueue.length - 1) {
      // Hay más videos en la cola
      setCurrentVideoIndex(prev => prev + 1);
    } else {
      // Ya terminaron todos los videos
      handleAllTransitionsEnd();
    }
  };

  const handleAllTransitionsEnd = () => {
    setIsTransitioning(false);
    setTransitionQueue([]);
    setCurrentVideoIndex(0);
    
    // Scroll al nuevo fondo
    if (galleryRef.current) {
      const targetScroll = activeSection * window.innerWidth;
      galleryRef.current.scrollTo({
        left: targetScroll,
        behavior: 'instant'
      });
      setCurrentSection(activeSection);
    }
  };

  return (
    <>
      <div ref={galleryRef} className="horizontal-gallery">
        {backgrounds.map((num) => (
          <div
            key={num}
            className="gallery-slide"
            style={{
              backgroundImage: `url(${baseUrl}img/interior_de_la_colmena/fondo${num}.png)`,
            }}
          />
        ))}
      </div>

      {/* Video de transición */}
      {isTransitioning && (
        <div className="transition-video-overlay">
          <video
            ref={videoRef}
            className="transition-video"
            playsInline
            onEnded={handleVideoEnd}
          />
        </div>
      )}
    </>
  );
}
