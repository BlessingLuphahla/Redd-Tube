/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const targetAPI = env.VITE_API_URL;

  return {
    plugins: [react()],
    server: {
      cors: true,
      proxy: {
        "/api": {
          target: targetAPI,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
