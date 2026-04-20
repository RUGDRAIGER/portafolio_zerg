# Estructura del Portafolio Zerg

## 📁 Arquitectura de Componentes

### Capa Base (Z-0) - Fondos
**`HorizontalBackgroundGallery.jsx`**
- Galería horizontal con scroll suave
- Respeta colores y brillo originales de fondo1-7.png
- Optimizada para chip M4 con `will-change` y `translateZ(0)`
- Scroll-snap para transiciones precisas

### Capa de Menú (Z-10) - Overlay Interactivo
**`ZergOverlayMenu.jsx`**
- Menú fijo posicionado a la izquierda
- Usa `mix-blend-mode: screen` para integrar brillos verdes
- Hover con efecto de latido y brillo aumentado (brightness 1.5)
- Tipografía futurista con sombras de texto verde neón
- Animaciones con Framer Motion

### Capa de Partículas (Z-20) - Ambiente
**`CarbonParticles.jsx`**
- 11,600 luciernagas/esporas flotantes
- Sistema de partículas reactivo al mouse
- Canvas transparente para superposición
- No interfiere con la legibilidad del menú

## 🎨 Configuración de Tailwind

### Paleta de Colores Zerg
```javascript
zerg: {
  bio: '#00ff00',           // Bioluminiscencia
  glow: '#7cf067',          // Verde brillante
  purple: {
    deep: '#3d0066',        // Púrpura profundo
    mid: '#6b1aa3',
    light: '#9e46ff',
  },
  flesh: {...},             // Tonos de carne orgánica
  chitin: {...},            // Tonos de quitina
  slime: '#0bff6e',
  acid: '#39ff14',
}
```

### Fuentes
- `Orbitron` - Futurista principal
- `Rajdhani` - Futurista secundaria

## ⚡ Optimizaciones para M4

1. **Hardware Acceleration**
   - `will-change: transform` en elementos animados
   - `transform: translateZ(0)` para GPU rendering
   - `backface-visibility: hidden` en slides

2. **Blend Modes Optimizados**
   - `mix-blend-mode: screen` para el overlay
   - Transparencias nativas sin máscaras complejas

3. **60 FPS Garantizado**
   - Transiciones con `cubic-bezier` optimizado
   - Animaciones CSS en lugar de JavaScript cuando es posible
   - `scroll-behavior: smooth` nativo

## 🎯 Interacciones Implementadas

### Hover en Menú
- Brightness aumenta a 1.5
- Drop-shadow verde neón (0 0 12px)
- Escala 1.05 con Framer Motion
- Text-shadow animado (latido)

### Click en Menú
- Escala 0.95 (feedback táctil)
- Navegación suave a la sección correspondiente
- Estado activo con brightness 1.3

### Partículas
- Reacción al movimiento del mouse
- Movimiento orgánico tipo insecto
- Color verde fluorescente (#7cf067)

## 📱 Responsividad

- Menú se ajusta de 32vw (max 348px) en desktop
- En móvil: 45vw (max 280px)
- Font-size con `clamp()` para escalado fluido
- Media queries para pointer: fine y prefers-reduced-motion

## 🔧 Próximas Mejoras Sugeridas

1. **Sprites de Huevos Individuales**
   - Preparado para agregar huevo1-5.png
   - Fácil integración en la capa Z-20

2. **Efectos de Sonido**
   - Hover: susurro orgánico
   - Click: latido biomecánico
   - Ambiente: sonidos de colmena

3. **Contenido por Sección**
   - Preparado para agregar contenido específico por cada sección
   - Sistema de routing interno listo

## 📦 Archivos Principales

```
src/
├── components/
│   ├── HorizontalBackgroundGallery.jsx  # Fondos panorámicos
│   ├── HorizontalBackgroundGallery.css
│   ├── ZergOverlayMenu.jsx              # Menú interactivo
│   ├── ZergOverlayMenu.css
│   └── CarbonParticles.jsx              # Sistema de partículas
├── App.jsx                               # Orquestador principal
└── App.css                               # Estilos globales

tailwind.config.js                        # Configuración Zerg
```

## 🚀 Comandos

```bash
npm run dev    # Servidor de desarrollo
npm run build  # Build optimizado para producción
npm run lint   # Verificar código
```

## 📋 Checklist de Implementación

- ✅ Galería horizontal de fondos (respeta colores originales)
- ✅ Menú overlay fijo con blend mode
- ✅ Sistema de partículas optimizado
- ✅ Interacciones hover con Framer Motion
- ✅ Paleta de colores Zerg en Tailwind
- ✅ Optimizaciones para M4
- ✅ Cursor personalizado
- ✅ Responsive design
- ✅ Accesibilidad (prefers-reduced-motion)
- ⏳ Sprites de huevos individuales (pendiente assets)
- ⏳ Efectos de sonido
- ⏳ Contenido por sección
