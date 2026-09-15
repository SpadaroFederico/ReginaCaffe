import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import seoPlugin from "./vite-seo-plugin.js";

export default defineConfig({
  /*
   * Il sito è progettato per essere
   * pubblicato alla radice del dominio.
   *
   * Questo mantiene corretti:
   *
   * /
   * /menu
   * /admin
   *
   * e import.meta.env.BASE_URL.
   */
  base: "/",

  plugins: [
    react(),
    tailwindcss(),
    seoPlugin(),
  ],
});