import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url)
    }
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    esbuildOptions: {
      target: 'es2022',
      treeShaking: true
    }
  },
  server: {
    warmup: {
      clientFiles: ['./src/components/layout/Header.tsx']
    }
  }
})