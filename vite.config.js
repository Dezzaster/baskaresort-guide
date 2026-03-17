import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/baskaresort-guide/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'BAŞKA Resort Bodrum — Guest Guide',
        short_name: 'BAŞKA Guide',
        theme_color: '#0033A0',
        background_color: '#FFFEF9',
        display: 'standalone'
      }
    })
  ]
})
