import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portafolio_zerg/', // Base path para GitHub Pages
  server: {
    host: true, // Expone el servidor a la red local
    port: 5173,
    strictPort: false, // Si el puerto está ocupado, intenta otro
  },
})
