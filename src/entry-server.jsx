import { prerender } from "react-dom/static";

import AppRoot from "./AppRoot.jsx";
import { getMacroPlainTitle } from "./components/menu/menuText";
import { findMenuMacro } from "./data/menuData";
import { getLocalizedValue } from "./i18n/localize";
import { translations } from "./i18n/translations";
import {
  DEFAULT_LANGUAGE,
  getAppPathname,
  getPathLanguage,
  setServerPathname,
} from "./lib/navigation";

/*
 * =======================================================
 * PRERENDER IN BUILD
 * =======================================================
 *
 * Questo file non viene caricato dal browser:
 * lo compila vite-prerender-plugin.js dopo la
 * build normale e lo esegue una volta per ogni
 * pagina pubblica, così dist/ contiene HTML
 * vero (titoli, testi, link) invece del solo
 * <div id="root"></div> vuoto.
 *
 * Titolo e descrizione seguono le stesse chiavi
 * di src/i18n/useDocumentMeta.js.
 */

function seoText(language, key) {
  return (
    translations[language]?.seo?.[key] ??
    translations[DEFAULT_LANGUAGE].seo[key]
  );
}

export async function renderRoute(pathname) {
  setServerPathname(pathname);

  const language =
    getPathLanguage() ?? DEFAULT_LANGUAGE;

  const appPath = getAppPathname();

  const page =
    appPath === "/menu" ||
    appPath.startsWith("/menu/")
      ? "menu"
      : "home";

  /*
   * Le carte (/menu/drink, ...) hanno titolo
   * e descrizione propri: gli stessi valori
   * che MenuPage passa a useDocumentMeta.
   */
  const macro = appPath.startsWith("/menu/")
    ? findMenuMacro(
        appPath.slice("/menu/".length)
      )
    : null;

  /*
   * Senza onError React nasconderebbe l'errore
   * di un componente dentro un <Suspense> e
   * produrrebbe comunque HTML, con un guscio
   * vuoto al posto della pagina.
   */
  const errors = [];

  const { prelude } = await prerender(
    <AppRoot />,
    {
      onError(error) {
        errors.push(error);
      },
    }
  );

  const html = await new Response(
    prelude
  ).text();

  if (errors.length > 0) {
    throw new Error(
      `Errore di rendering su ${pathname}: ${
        errors[0]?.message ?? errors[0]
      }`
    );
  }

  return {
    html,
    key: `${language}:${appPath}`,
    language,
    page,
    title: macro
      ? `${getMacroPlainTitle(
          macro,
          language
        )} · ${seoText(language, "menuTitle")}`
      : seoText(language, `${page}Title`),
    description: macro
      ? `${getLocalizedValue(
          macro.summary,
          language
        )} Regina Caffè, Grottaglie.`
      : seoText(
          language,
          `${page}Description`
        ),
  };
}
