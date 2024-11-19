import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl';
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    basicSsl(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        // enabled: true,
      },
      manifest: {
        id: "/slowdown/",
        name: "Show Down!",
        short_name: "slowdown",
        description: "Helps me eat slower.",
        background_color: "#333",
        theme_color: "#96c",
        icons: [{
          src: "icon.svg",
          sizes: "192x192",
          type: "image/svg+xml",
          purpose: "any",
        }],
        orientation: "portrait",
      },
    }),
    vue(),
  ],
  base: "/slowdown/",
  server: {
    host: "0.0.0.0",
    https: true,
  }
})
