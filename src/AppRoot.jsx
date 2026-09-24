import { StrictMode } from "react";

import App from "./App.jsx";

import { LegalProvider } from "./legal/LegalContext.jsx";
import { LanguageProvider } from "./i18n/LanguageContext.jsx";

/*
 * Albero React condiviso da main.jsx (browser)
 * ed entry-server.jsx (prerender in build).
 *
 * Deve essere identico nei due casi: se
 * server e client renderizzassero alberi
 * diversi, l'idratazione fallirebbe.
 */
export default function AppRoot() {
  return (
    <StrictMode>
      <LegalProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </LegalProvider>
    </StrictMode>
  );
}
