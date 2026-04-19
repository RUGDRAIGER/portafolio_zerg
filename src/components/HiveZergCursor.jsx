import React, { useCallback, useEffect, useMemo, useState } from 'react';

/** Cursor estilo garra / espora sobre el área del canvas (pointer-events none). */
export default function HiveZergCursor({ active }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  const reduceMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  const coarsePointer = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
    [],
  );

  const onMove = useCallback((e) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (!active || reduceMotion || coarsePointer) return;
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [active, coarsePointer, onMove, reduceMotion]);

  if (!active || reduceMotion || coarsePointer) return null;

  return (
    <div
      className="hive-zerg-cursor"
      style={{ left: pos.x, top: pos.y }}
      aria-hidden
    >
      <svg viewBox="0 0 32 32" width="26" height="26" role="presentation">
        <defs>
          <linearGradient id="zerg-claw-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9ffb8" />
            <stop offset="100%" stopColor="#6b3d9e" />
          </linearGradient>
        </defs>
        <path
          fill="url(#zerg-claw-grad)"
          opacity="0.95"
          d="M16 4 L20 14 L28 12 L22 18 L30 22 L20 20 L18 28 L16 22 L14 28 L12 20 L2 22 L10 18 L4 12 L12 14 Z"
        />
        <circle cx="16" cy="16" r="2.2" fill="#0a0a0c" opacity="0.85" />
      </svg>
    </div>
  );
}
