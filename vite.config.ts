import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl';
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    basicSsl(),
    vue(),
  ],
  server: {
    host: "0.0.0.0",
    https: true,
  }
})
