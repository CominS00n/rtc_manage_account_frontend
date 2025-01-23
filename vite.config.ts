import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/v2': {
        target: 'http://192.168.21.25:8002',
        changeOrigin: true,
        configure: proxy => {
          proxy.on('proxyReq', proxyReq => {
            console.log('Proxying request:', proxyReq.path)
          })
        },
      },
    },
  },
  preview: {
    port: 8080,
  },
})
