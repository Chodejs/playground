import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,             // Allows using describe, it, expect without imports
    environment: 'jsdom',      // Simulates a browser
    setupFiles: './src/test/setup.js', // We will create this next
    css: true,                 // Parses CSS files (useful if classNames matter)
  },
})