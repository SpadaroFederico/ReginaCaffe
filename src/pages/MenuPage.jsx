import { useReducedMotion } from "framer-motion";

import { findMenuMacro } from "../data/menuData";
import { useLanguage } from "../i18n/LanguageContext";
import { getLocalizedValue } from "../i18n/localize";
import { useDocumentMeta } from "../i18n/useDocumentMeta";
import { getAppPathname } from "../lib/navigation";

import MenuIndex from "../components/menu/MenuIndex";
import MenuMacroView from "../components/menu/MenuMacroView";
import { getMacroPlainTitle } from "../components/menu/menuText";

/*
 * =======================================================
 * PAGINA MENU
 * =======================================================
 *
 * /menu          → indice delle carte (QR ai tavoli)
 * /menu/<slug>   → singola carta, es. /menu/drink
 *
 * Gli stessi percorsi valgono con /en e /fr.
 * Uno slug sconosciuto mostra l'indice:
 * nessun vicolo cieco per chi arriva da un
 * link vecchio o sbagliato.
 *
 * Gli slug e i contenuti sono in
 * src/data/menuData.js.
 */

function getMenuSlug() {
  const segments = getAppPathname()
    .split("/")
    .filter(Boolean);

  return segments[0] === "menu"
    ? segments[1] ?? null
    : null;
}

export default function MenuPage() {
  const { language, t } = useLanguage();

  const reduceMotion = useReducedMotion();

  const macro = findMenuMacro(getMenuSlug());

  useDocumentMeta(
    "menu",
    macro
      ? {
          path: `/menu/${macro.slug}`,
          title: `${getMacroPlainTitle(
            macro,
            language
          )} · ${t("seo.menuTitle")}`,
          description: `${getLocalizedValue(
            macro.summary,
            language
          )} Regina Caffè, Grottaglie.`,
        }
      : undefined
  );

  if (macro) {
    return (
      <MenuMacroView
        macro={macro}
        language={language}
        t={t}
        reduceMotion={reduceMotion}
      />
    );
  }

  return (
    <MenuIndex
      language={language}
      t={t}
      reduceMotion={reduceMotion}
    />
  );
}
