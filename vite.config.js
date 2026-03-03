import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // GitHub Pages: serve SPA for any path so /flowerPlant/my-plants etc. work on refresh
    {
      name: 'copy-404',
      writeBundle() {
        const src = path.resolve(__dirname, 'dist/index.html')
        const dest = path.resolve(__dirname, 'dist/404.html')
        if (fs.existsSync(src)) fs.copyFileSync(src, dest)
      },
    },
  ],
  // Match classmate: "/flowerPlant" for GitHub Pages (case-sensitive – must match repo URL)
  base: process.env.NODE_ENV === 'production' ? '/flowerPlant' : '/',
})
