/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Zerg personalizada
        zerg: {
          bio: '#00ff00',           // Bioluminiscencia verde ácida
          glow: '#7cf067',          // Verde brillante secundario
          purple: {
            deep: '#3d0066',        // Púrpura profundo orgánico
            mid: '#6b1aa3',         // Púrpura medio
            light: '#9e46ff',       // Púrpura claro
          },
          flesh: {
            dark: '#2d1b2e',        // Carne orgánica oscura
            mid: '#4a2d4e',         // Carne media
            light: '#7a5980',       // Carne clara
          },
          chitin: {
            dark: '#1a0f1f',        // Quitina oscura
            mid: '#2d1f33',         // Quitina media
            light: '#4a3654',       // Quitina clara
          },
          slime: '#0bff6e',         // Verde viscoso
          acid: '#39ff14',          // Verde ácido brillante
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          'from': {
            textShadow: '0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(0, 255, 0, 0.3)',
          },
          'to': {
            textShadow: '0 0 20px rgba(0, 255, 0, 0.8), 0 0 30px rgba(0, 255, 0, 0.6)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
