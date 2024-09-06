import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
    },
  },
  plugins: [react(), TanStackRouterVite()],
  envPrefix: "VITE_",
  server: {
    host: true,
    strictPort: true,
    port: 3000,
  },
});
