import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages expects the repo name here so assets load correctly
  base: '/tech-timeline/',
  build: {
    outDir: 'dist',
  }
})
