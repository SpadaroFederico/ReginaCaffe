import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  /*
   * Il sito è pensato per essere
   * pubblicato alla radice del dominio:
   *
   * https://reginacaffe.it/
   *
   * Questo mantiene corretti anche
   * import.meta.env.BASE_URL e /admin.
   */
  base: "/",

  plugins: [
    react(),
    tailwindcss(),
  ],
});