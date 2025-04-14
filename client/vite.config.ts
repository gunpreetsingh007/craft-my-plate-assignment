import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Optional: specify dev server port
    strictPort: true, // Optional: fail if port is already in use
  },
  build: {
    outDir: 'build' // Optional: specify output directory (defaults to dist)
  }
})
