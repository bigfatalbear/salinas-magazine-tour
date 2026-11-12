import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const PROPERTY_UUID = '2dfce9de-de4b-57ae-a291-a170c20195cd'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const rawBase = env.VITE_BASE || '/'
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: false,
        includeAssets: [
          'favicon.svg',
          'icons/apple-touch-icon.png',
          'icons/favicon-64.png',
          'images/*.jpg',
        ],
        manifest: {
          id: PROPERTY_UUID,
          name: 'Salinas Magazine Tour',
          short_name: 'Salinas Tour',
          description:
            'Revista digital e guia turístico de Salinas da Margarida, Bahia. Cultura, gastronomia, comércio e belezas da Baía de Todos-os-Santos.',
          lang: 'pt-BR',
          dir: 'ltr',
          start_url: base,
          scope: base,
          display: 'standalone',
          orientation: 'portrait-primary',
          theme_color: '#0A3656',
          background_color: '#F8F6F0',
          categories: ['travel', 'news', 'lifestyle'],
          icons: [
            {
              src: 'icons/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'icons/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'icons/maskable-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,webp,woff,woff2}'],
          navigateFallback: `${base}index.html`,
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
          runtimeCaching: [
            {
              urlPattern: ({ url }) => url.hostname.endsWith('supabase.co'),
              handler: 'NetworkOnly',
            },
          ],
        },
        devOptions: {
          enabled: false,
        },
      }),
    ],
    server: {
      host: true,
      port: 5173,
    },
    preview: {
      host: true,
      port: 4173,
    },
  }
})
