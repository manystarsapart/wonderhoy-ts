import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        projects: resolve(__dirname, 'projects/index.html'),
        blog: resolve(__dirname, 'blog/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
      },
    },
  },
  plugins: [
  ],
})
