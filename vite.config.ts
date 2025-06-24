import path from "path";
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@/components/*': path.resolve(__dirname, './src/components/')
    },
  },
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:1337'
    }
  },
})
