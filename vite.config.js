import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use repo path for GitHub Pages build; use "/" for local dev so localhost works
  base: process.env.NODE_ENV === 'production' ? '/FlowerPlant/' : '/',
})
