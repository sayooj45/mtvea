import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',        // Important: keep it '/'
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist', // matches Vercel output
  }
})