import React, { useCallback, useEffect, useMemo, useState } from 'react';

const ITEMS = [
  { id: 'nexo', label: 'NEXO CENTRAL', top: '20%' },
  { id: 'embrion', label: 'EMBRIÓN', top: '32%' },
  { id: 'larva', label: 'LARVA', top: '44%' },
  { id: 'crisalida', label: 'CRISÁLIDA', top: '56%' },
  { id: 'zangano', label: 'ZÁNGANO', top: '68%' },
  { id: 'hidraliscos', label: 'HIDRALISCO', top: '80%' },
  { id: 'reina', label: 'REINA', top: '92%' },
];

function ElectricidadMorada({ active }) {
  const arcs = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        delay: index * 0.035,
        left: 4 + (index * 5.2) % 92,
        top: 38 + (index % 5) * 6,
        drift: (index % 5) * 0.5 - 0.8, /* Convertido a vw (antes era * 7 - 12 en px) */
        rotate: (index % 7) * 25 - 50,
      })),
    [],
  );

  if (!active) return null;

  return (
    <span className="overlay-menu__electricidad" aria-hidden>
      {arcs.map((arc) => (
        <span
          key={arc.id}
          className="overlay-menu__arc"
          style={{
            left: `${arc.left}%`,
            top: `${arc.top}%`,
            animationDelay: `${arc.delay}s`,
            '--arc-drift': `${arc.drift}vw`, /* Ahora usa vw */
            '--arc-rotate': `${arc.rotate}deg`,
          }}
        />
      ))}
    </span>
  );
}

function ExplosionVerde({ burstId }) {
  if (!burstId) return null;

  return (
    <span key={burstId} className="overlay-menu__burst" aria-hidden>
      {Array.from({ length: 30 }, (_, index) => (
        <span
          key={index}
          className="overlay-menu__burst-particle"
          style={{
            '--burst-rotate': `${index * 12}deg`,
            '--burst-delay': `${index * 0.008}s`,
            '--burst-dist': `${1.8 + (index % 4) * 0.3}vw`, /* Convertido a vw (antes era 26 + (index % 4) * 4 en px) */
          }}
        />
      ))}
      <span className="overlay-menu__burst-dust" />
    </span>
  );
}

export default function OverlayMenu({ activeId, onNavigate }) {
  const [hoverId, setHoverId] = useState(null);
  const [burstId, setBurstId] = useState(null);

  useEffect(() => {
    if (!burstId) return undefined;
    const timer = window.setTimeout(() => setBurstId(null), 520);
    return () => window.clearTimeout(timer);
  }, [burstId]);

  const handleSelect = useCallback(
    (id) => {
      setBurstId(`${id}-${Date.now()}`);
      onNavigate?.(id);
    },
    [onNavigate],
  );

  return (
    <div className="overlay-menu-root">
      <nav className="overlay-menu" aria-label="Navegación principal">
        <img
          className="overlay-menu__img"
          src="/img/overlay/overlay2.png"
          alt=""
          decoding="async"
        />
        <ul className="overlay-menu__list">
          {ITEMS.map((item) => {
            const hot = hoverId === item.id;
            const active = activeId === item.id;

            return (
              <li
                key={item.id}
                className="overlay-menu__item"
                style={{ top: item.top }}
              >
                <button
                  type="button"
                  className={`overlay-menu__btn${active ? ' overlay-menu__btn--active' : ''}`}
                  onClick={() => handleSelect(item.id)}
                  onPointerEnter={() => setHoverId(item.id)}
                  onPointerLeave={() => setHoverId((current) => (current === item.id ? null : current))}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className="overlay-menu__label">{item.label}</span>
                  <ElectricidadMorada active={hot} />
                  <ExplosionVerde burstId={burstId && burstId.startsWith(item.id) ? burstId : null} />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
