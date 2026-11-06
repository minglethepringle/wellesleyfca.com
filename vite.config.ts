import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves project sites from /<repo>/. The deploy workflow passes that path in
// BASE_PATH; locally (and with a custom domain) it stays '/'.
const base = process.env.BASE_PATH ? `${process.env.BASE_PATH.replace(/\/$/, '')}/` : '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
