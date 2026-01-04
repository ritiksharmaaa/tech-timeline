import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // REQUIRED for GitHub Pages project sites
  base: '/tech-timline/',

  build: {
    outDir: 'dist',
  },
})
