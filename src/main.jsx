import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import { LegalProvider } from "./legal/LegalContext.jsx";
import { LanguageProvider } from "./i18n/LanguageContext.jsx";

const rootElement =
  document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'Elemento root non trovato. Verifica che index.html contenga <div id="root"></div>.'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <LegalProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </LegalProvider>
  </StrictMode>
);