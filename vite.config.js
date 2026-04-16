import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        // Don't let SW navigation fallback intercept .pdf requests
        navigateFallbackDenylist: [/\.pdf$/i],
        // Don't precache the large PDFs (would exceed cache limits anyway)
        globIgnores: ['**/*.pdf']
      },
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
