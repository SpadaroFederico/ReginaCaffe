import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
<<<<<<< HEAD
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
=======
  base: '/ReginaCaffe/',
  plugins: [react(), tailwindcss()],
})
>>>>>>> 5b70b81c07f76af75af65ff319fa50a1871da6ee
