import React, { useCallback, useEffect, useRef, useState } from 'react';

const ITEMS = [
  { id: 'inicio', label: 'INICIO' },
  { id: 'proyectos', label: 'PROYECTOS' },
  { id: 'sobre', label: 'SOBRE MÍ' },
  { id: 'contacto', label: 'CONTACTO' },
];

const RETRACT_MS = 480;

/**
 * Menú lateral con overlay.png; franjas verdes = títulos.
 * Tras un breve hover se retrae a la izquierda; pestaña o salir al lienzo lo restaura.
 */
export default function OverlayMenu({ activeId, onNavigate }) {
  const [retracted, setRetracted] = useState(false);
  const retractTimer = useRef(null);

  const clearRetractTimer = useCallback(() => {
    if (retractTimer.current != null) {
      window.clearTimeout(retractTimer.current);
      retractTimer.current = null;
    }
  }, []);

  useEffect(() => () => clearRetractTimer(), [clearRetractTimer]);

  const handleSelect = useCallback(
    (id) => {
      onNavigate?.(id);
    },
    [onNavigate],
  );

  const scheduleRetract = useCallback(() => {
    clearRetractTimer();
    retractTimer.current = window.setTimeout(() => setRetracted(true), RETRACT_MS);
  }, [clearRetractTimer]);

  return (
    <div className="overlay-menu-root">
      {retracted ? (
        <button
          type="button"
          className="overlay-menu-handle"
          aria-label="Mostrar menú de navegación"
          onPointerEnter={() => {
            setRetracted(false);
            clearRetractTimer();
          }}
        />
      ) : null}

      <nav
        className={`overlay-menu${retracted ? ' overlay-menu--retracted' : ''}`}
        aria-label="Navegación principal"
        onPointerEnter={scheduleRetract}
        onPointerLeave={(e) => {
          clearRetractTimer();
          const next = e.relatedTarget;
          if (next instanceof Node && e.currentTarget.contains(next)) return;
          setRetracted(false);
        }}
      >
        <img
          className="overlay-menu__img"
          src="/img/overlay/overlay.png"
          alt=""
          decoding="async"
        />
        <ul className="overlay-menu__list">
          {ITEMS.map((item) => (
            <li key={item.id} className="overlay-menu__item">
              <button
                type="button"
                className={`overlay-menu__btn${item.id === activeId ? ' overlay-menu__btn--active' : ''}`}
                onClick={() => handleSelect(item.id)}
                aria-current={item.id === activeId ? 'page' : undefined}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
