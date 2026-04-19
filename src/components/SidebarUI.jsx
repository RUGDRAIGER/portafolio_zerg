import React, { useCallback, useState } from 'react';

const SECTIONS = [
  { id: 'inicio', label: 'INICIO', morph: 'egg' },
  { id: 'proyectos', label: 'PROYECTOS', morph: 'larva' },
  { id: 'sobre', label: 'SOBRE MÍ', morph: 'chrysalis' },
  { id: 'contacto', label: 'CONTACTO', morph: 'egg' },
];

function HiveCrest() {
  return (
    <div className="hive-nav__crest" aria-hidden>
      <svg className="hive-nav__crest-svg" viewBox="0 0 140 112" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="crest-orb" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#c8ffb8" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#5cb84a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0c180a" stopOpacity="1" />
          </radialGradient>
          <filter id="crest-soft-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          className="hive-nav__crest-rib hive-nav__crest-rib--outer"
          d="M70 8 C42 10 22 28 18 52 C16 68 24 88 44 98 C58 104 82 104 96 98 C116 88 124 68 122 52 C118 28 98 10 70 8Z"
          fill="none"
        />
        <path
          className="hive-nav__crest-rib"
          d="M70 18 C50 20 34 34 30 54 C28 66 36 82 52 90 M70 18 C90 20 106 34 110 54 C112 66 104 82 88 90"
          fill="none"
        />
        <path
          className="hive-nav__crest-rib hive-nav__crest-rib--fine"
          d="M70 22 L70 90 M52 32 Q70 42 88 32 M48 56 Q70 48 92 56 M52 78 Q70 68 88 78"
          fill="none"
        />
        <circle className="hive-nav__crest-orb" cx="70" cy="54" r="26" fill="url(#crest-orb)" filter="url(#crest-soft-glow)" />
        <ellipse className="hive-nav__crest-silhouette" cx="70" cy="56" rx="9" ry="14" />
      </svg>
    </div>
  );
}

function GooDefs() {
  return (
    <svg className="hive-goo-defs" width="0" height="0" aria-hidden>
      <defs>
        <filter id="biomass-goo" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
        <filter id="slime-displace" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

function EggGlyph({ pulsing }) {
  return (
    <svg className="morph-glyph morph-glyph--egg" viewBox="0 0 48 64" aria-hidden>
      <ellipse className="egg-shell" cx="24" cy="30" rx="16" ry="22" />
      <ellipse className="egg-core" cx="24" cy="28" rx="7" ry="10" />
      <path
        className={`egg-vein ${pulsing ? 'egg-vein--pulse' : ''}`}
        d="M14 26 Q24 18 34 26 M18 38 Q24 44 30 38"
        fill="none"
      />
    </svg>
  );
}

function LarvaGlyph() {
  return (
    <svg className="morph-glyph morph-glyph--larva" viewBox="0 0 64 40" aria-hidden>
      <path
        className="larva-body"
        d="M6 22 C14 8 28 8 36 14 C48 24 58 20 58 22 C58 28 44 32 32 28 C20 24 12 34 6 22 Z"
      />
      <circle className="larva-segment" cx="20" cy="20" r="3" />
      <circle className="larva-segment" cx="32" cy="18" r="3.2" />
      <circle className="larva-segment" cx="44" cy="20" r="2.8" />
    </svg>
  );
}

function ChrysalisGlyph() {
  return (
    <svg className="morph-glyph morph-glyph--chrysalis" viewBox="0 0 48 72" aria-hidden>
      <path
        className="chrysalis-shell"
        d="M24 4 C36 12 40 28 40 44 C40 58 32 68 24 68 C16 68 8 58 8 44 C8 28 12 12 24 4 Z"
      />
      <path className="chrysalis-rib" d="M16 20 H32 M14 32 H34 M14 46 H34" fill="none" />
      <ellipse className="chrysalis-glow" cx="24" cy="36" rx="8" ry="14" />
    </svg>
  );
}

function MorphIcon({ type, active }) {
  switch (type) {
    case 'larva':
      return <LarvaGlyph />;
    case 'chrysalis':
      return <ChrysalisGlyph />;
    case 'egg':
    default:
      return <EggGlyph pulsing={active} />;
  }
}

export default function SidebarUI({ onNavigate }) {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  const handleSelect = useCallback(
    (id) => {
      setActiveId(id);
      onNavigate?.(id);
    },
    [onNavigate],
  );

  return (
    <div className="hive-nav-shell">
      <nav className="hive-nav" aria-label="Secciones del portafolio">
        <GooDefs />
        <HiveCrest />
        <div className="hive-nav__slime-rail" aria-hidden />
        <header className="hive-nav__brand">
          <span className="hive-nav__brand-tag">COLMENA</span>
          <span className="hive-nav__brand-sub">navegación orgánica</span>
        </header>
        <ul className="hive-nav__list">
          {SECTIONS.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`hive-nav__node${active ? ' hive-nav__node--active' : ''}`}
                  onClick={() => handleSelect(item.id)}
                  aria-current={active ? 'true' : undefined}
                >
                  <span className="hive-nav__goo-wrap">
                    <span className="hive-nav__goo-blob hive-nav__goo-blob--back" aria-hidden />
                    <span className="hive-nav__glyph">
                      <MorphIcon type={item.morph} active={active} />
                    </span>
                    <span className="hive-nav__goo-blob hive-nav__goo-blob--front" aria-hidden />
                  </span>
                  <span className="hive-nav__label">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <footer className="hive-nav__foot">
          <span className="hive-nav__foot-pulse" aria-hidden />
          <span className="hive-nav__foot-tag">COLMENA ACTIVA</span>
        </footer>
      </nav>
    </div>
  );
}
