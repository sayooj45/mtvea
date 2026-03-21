import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/', // ensures all routes resolve correctly on refresh
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist', // default is dist, make sure matches Vercel settings
  }
})
