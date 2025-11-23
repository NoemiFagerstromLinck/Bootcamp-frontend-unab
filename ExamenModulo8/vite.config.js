import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // Base path for GitHub Pages deployment of pokeweb
  // Example: https://NoemiFagerstromLinck.github.io/pokeweb/
    base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
  server: {
    port: 3000,
    host: true
  }
})