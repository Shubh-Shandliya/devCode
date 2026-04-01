import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/react-router-dom/')
          ) {
            return 'react-vendor'
          }
          if (id.includes('/node_modules/framer-motion/')) {
            return 'motion-vendor'
          }
          if (
            id.includes('/node_modules/three/') ||
            id.includes('/node_modules/@react-three/fiber/') ||
            id.includes('/node_modules/@react-three/drei/')
          ) {
            return 'three-vendor'
          }
          return undefined
        },
      },
    },
  },
})
