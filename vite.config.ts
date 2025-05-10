import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html', // Your popup
        content: 'src/content.js', // Your content script
        background: 'src/background.js' // Your background script
      },
      output: {
        entryFileNames: '[name].js', // Ensures fixed names like content.js, background.js
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      }
    }
  }
})
