import { useEffect } from "react";

import { useLanguage } from "./LanguageContext";
import {
  DEFAULT_LANGUAGE,
  localizedPath,
  URL_LANGUAGES,
} from "../lib/navigation";

/*
 * =======================================================
 * METADATI DELLA PAGINA
 * =======================================================
 *
 * index.html contiene un solo <title> e una
 * sola description: senza questo hook la
 * pagina /menu verrebbe indicizzata con gli
 * stessi identici metadati della home, e il
 * cambio lingua non li aggiornerebbe mai.
 *
 * Qui vengono generati anche canonical e
 * hreflang, che dichiarano ai motori di
 * ricerca come le tre versioni linguistiche
 * si corrispondono tra loro.
 *
 * Gli URL sono costruiti da window.location.origin,
 * quindi restano corretti su qualunque dominio
 * senza bisogno di configurarne uno.
 *
 * Il sito è renderizzato lato client: questi
 * valori vengono letti dopo l'esecuzione del
 * JavaScript. I valori statici in index.html
 * restano la versione italiana della home,
 * che è il fallback corretto.
 */

const PAGE_PATHS = {
  home: "/",
  menu: "/menu",
};

/*
 * Aggiorna un meta esistente, oppure lo crea
 * se index.html non lo contiene.
 *
 * og:url ad esempio non è scritto a mano:
 * dipende dal dominio su cui il sito gira,
 * quindi ha senso solo a runtime.
 */
function setMetaContent(
  selector,
  content
) {
  let tag =
    document.head.querySelector(
      selector
    );

  if (!tag) {
    const match = selector.match(
      /\[(property|name)="([^"]+)"\]/
    );

    if (!match) {
      return;
    }

    tag =
      document.createElement("meta");

    tag.setAttribute(
      match[1],
      match[2]
    );

    document.head.appendChild(tag);
  }

  tag.setAttribute(
    "content",
    content
  );
}

/*
 * I link generati qui sono marcati con
 * data-managed, così ad ogni aggiornamento
 * possiamo rimuovere soltanto i nostri
 * senza toccare quelli scritti a mano
 * in index.html.
 */
function setLinkTag(
  rel,
  href,
  hreflang
) {
  const link =
    document.createElement("link");

  link.setAttribute("rel", rel);
  link.setAttribute("href", href);
  link.setAttribute(
    "data-managed",
    "true"
  );

  if (hreflang) {
    link.setAttribute(
      "hreflang",
      hreflang
    );
  }

  document.head.appendChild(link);
}

export function useDocumentMeta(page) {
  const { language, t } =
    useLanguage();

  const title =
    page === "menu"
      ? t("seo.menuTitle")
      : t("seo.homeTitle");

  const description =
    page === "menu"
      ? t("seo.menuDescription")
      : t("seo.homeDescription");

  useEffect(() => {
    document.title = title;

    setMetaContent(
      'meta[name="description"]',
      description
    );

    /*
     * Manteniamo allineata anche l'anteprima
     * social, altrimenti una condivisione
     * della pagina menu mostrerebbe il testo
     * della home.
     */
    setMetaContent(
      'meta[property="og:title"]',
      title
    );

    setMetaContent(
      'meta[property="og:description"]',
      description
    );

    setMetaContent(
      'meta[name="twitter:title"]',
      title
    );

    setMetaContent(
      'meta[name="twitter:description"]',
      description
    );

    setMetaContent(
      'meta[property="og:locale"]',
      language === "en"
        ? "en_GB"
        : language === "fr"
          ? "fr_FR"
          : "it_IT"
    );

    /*
     * Canonical e hreflang vengono ricreati
     * ad ogni cambio di pagina o lingua.
     */
    document.head
      .querySelectorAll(
        "link[data-managed]"
      )
      .forEach((tag) =>
        tag.remove()
      );

    /*
     * Con VITE_SITE_URL impostata in build,
     * canonical e hreflang puntano sempre al
     * dominio definitivo, anche quando la
     * stessa build è raggiungibile da
     * *.pages.dev o *.workers.dev: così i
     * motori di ricerca non indicizzano
     * quegli indirizzi come duplicati.
     */
    const origin =
      import.meta.env.VITE_SITE_URL?.trim().replace(
        /\/+$/,
        ""
      ) || window.location.origin;

    const path =
      PAGE_PATHS[page] ?? "/";

    const urlFor = (code) =>
      `${origin}${localizedPath(
        path,
        code
      )}`;

    setLinkTag(
      "canonical",
      urlFor(language)
    );

    setMetaContent(
      'meta[property="og:url"]',
      urlFor(language)
    );

    for (const code of URL_LANGUAGES) {
      setLinkTag(
        "alternate",
        urlFor(code),
        code
      );
    }

    /*
     * x-default indica la versione da servire
     * a chi non corrisponde a nessuna delle
     * lingue dichiarate.
     */
    setLinkTag(
      "alternate",
      urlFor(DEFAULT_LANGUAGE),
      "x-default"
    );
  }, [
    title,
    description,
    language,
    page,
  ]);
}
