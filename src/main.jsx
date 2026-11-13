import { createRoot, hydrateRoot } from "react-dom/client";

import AppRoot from "./AppRoot.jsx";
import "./index.css";

import {
  DEFAULT_LANGUAGE,
  getAppPathname,
  getPathLanguage,
} from "./lib/navigation";

const rootElement =
  document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'Elemento root non trovato. Verifica che index.html contenga <div id="root"></div>.'
  );
}

/*
 * In produzione ogni pagina pubblica è già
 * stata renderizzata in build e porta nel
 * root la propria chiave "lingua:percorso"
 * (vedi vite-prerender-plugin.js).
 *
 * Idratiamo solo se la chiave coincide con
 * l'URL aperto. Cloudflare serve index.html
 * (la home in italiano) anche per /admin e
 * per i percorsi sconosciuti: in quei casi
 * l'HTML statico non corrisponde alla pagina
 * e va sostituito con un render normale.
 *
 * In sviluppo il root è vuoto: render normale.
 */
const currentKey = `${
  getPathLanguage() ?? DEFAULT_LANGUAGE
}:${getAppPathname()}`;

if (
  rootElement.dataset.prerendered ===
  currentKey
) {
  hydrateRoot(rootElement, <AppRoot />);
} else {
  createRoot(rootElement).render(
    <AppRoot />
  );
}
