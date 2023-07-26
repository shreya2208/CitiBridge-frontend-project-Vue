import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
       vue: '@vue/compat'
    }
  },

  server:{
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      '/api': 'http://0.0.0.0:8081',
     
    '/stocks': {
      target: 'https://mboum-finance.p.rapidapi.com',
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(/^\/stocks/, ''),
    },
    '/demo': {
      target: 'https://mboum.com/api/v1',
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(/^\/demo/, ''),
    },
  }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2
          }
        }
      }
    })
  ]
})
