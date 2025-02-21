import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

console.log('lets see if this works');

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    credentials: true,
    proxy: {
      "/api": {
        target: "http://localhost:4503",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});


