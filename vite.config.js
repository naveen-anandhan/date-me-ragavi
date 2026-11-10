import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/date-me-ragavi/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: true
  },
  preview: {
    port: 5173,
    host: true,
    allowedHosts: true
  }
})

