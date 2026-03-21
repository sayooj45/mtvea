import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/', // ensures all routes resolve correctly
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
  }
})