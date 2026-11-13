/*
 * =======================================================
 * NAVIGAZIONE
 * =======================================================
 *
 * Il sito ha tre percorsi reali:
 *
 * /       → home con le sezioni
 * /menu   → pagina della carta
 * /admin  → area amministrativa
 *
 * Le versioni inglese e francese vivono
 * sotto un prefisso di lingua:
 *
 * /            /en            /fr
 * /menu        /en/menu       /fr/menu
 *
 * L'italiano non ha prefisso: è la lingua
 * predefinita del sito.
 *
 * Avere un URL distinto per lingua è ciò
 * che permette ai motori di ricerca di
 * indicizzare le tre versioni separatamente
 * e di collegarle tra loro con hreflang.
 *
 * L'area amministrativa resta fuori: non
 * viene indicizzata e non ha traduzioni.
 *
 * Le sezioni (#eventi, #consigliati, #orari,
 * #social) esistono soltanto nella home, ma
 * Header e Footer compaiono anche su /menu:
 * per questo i link di sezione passano da
 * sectionHref(), che fuori dalla home rimanda
 * alla home nella lingua corrente.
 */

export const HOME_PATH = "/";

export const DEFAULT_LANGUAGE = "it";

/*
 * Lingue che compaiono nell'URL.
 * L'italiano è servito senza prefisso.
 */
export const PREFIXED_LANGUAGES = [
  "en",
  "fr",
];

export const URL_LANGUAGES = [
  DEFAULT_LANGUAGE,
  ...PREFIXED_LANGUAGES,
];

function getBasePath() {
  const rawBase =
    import.meta.env.BASE_URL || "/";

  return rawBase === "/"
    ? ""
    : rawBase.replace(/\/+$/, "");
}

/*
 * Durante il prerender in build non esiste
 * window: il percorso da renderizzare viene
 * impostato da src/entry-server.jsx prima di
 * ogni pagina. Nel browser resta null e si
 * legge sempre window.location.
 */
let serverPathname = null;

export function setServerPathname(
  pathname
) {
  serverPathname = pathname;
}

/*
 * Percorso corrente normalizzato rispetto
 * a BASE_URL, senza slash finale.
 *
 * Include ancora l'eventuale prefisso di
 * lingua: serve a chi deve leggerlo.
 */
function getRawPathname() {
  const pathname =
    (serverPathname ??
      (typeof window === "undefined"
        ? "/"
        : window.location.pathname)) ||
    "/";

  const base = getBasePath();

  let relativePathname = pathname;

  if (base) {
    if (pathname === base) {
      relativePathname = "/";
    } else if (
      pathname.startsWith(
        `${base}/`
      )
    ) {
      relativePathname =
        pathname.slice(
          base.length
        ) || "/";
    }
  }

  relativePathname =
    relativePathname.replace(
      /\/{2,}/g,
      "/"
    );

  if (relativePathname.length > 1) {
    relativePathname =
      relativePathname.replace(
        /\/+$/,
        ""
      );
  }

  return relativePathname || "/";
}

/*
 * Lingua indicata dall'URL, oppure null
 * se il percorso non ha prefisso.
 */
export function getPathLanguage() {
  const segments = getRawPathname()
    .split("/")
    .filter(Boolean);

  const first = segments[0];

  return PREFIXED_LANGUAGES.includes(
    first
  )
    ? first
    : null;
}

/*
 * Percorso senza prefisso di lingua.
 *
 * È su questo che App decide quale pagina
 * mostrare: /en/menu e /menu portano alla
 * stessa pagina, in due lingue diverse.
 */
export function getAppPathname() {
  const raw = getRawPathname();
  const language = getPathLanguage();

  if (!language) {
    return raw;
  }

  const stripped = raw.slice(
    language.length + 1
  );

  return stripped || "/";
}

export function isHomePage() {
  return (
    getAppPathname() === HOME_PATH
  );
}

/*
 * Costruisce un percorso nella lingua
 * richiesta, a partire da un percorso
 * senza prefisso.
 */
export function localizedPath(
  path,
  language
) {
  const base = getBasePath();

  const prefix =
    PREFIXED_LANGUAGES.includes(
      language
    )
      ? `/${language}`
      : "";

  const normalized =
    path === "/" ? "" : path;

  return (
    `${base}${prefix}${normalized}` ||
    "/"
  );
}

/*
 * Link verso un percorso reale, mantenendo
 * la lingua in cui si sta navigando.
 */
export function pagePath(path) {
  return localizedPath(
    path,
    getPathLanguage() ??
      DEFAULT_LANGUAGE
  );
}

/*
 * Link verso una sezione della home.
 *
 * In home resta un'ancora interna, così
 * lo scroll morbido continua a funzionare.
 *
 * Altrove diventa un link alla home, che
 * il browser raggiunge posizionandosi
 * direttamente sulla sezione.
 */
export function sectionHref(sectionId) {
  if (isHomePage()) {
    return `#${sectionId}`;
  }

  return `${pagePath(
    HOME_PATH
  )}#${sectionId}`.replace(
    /\/{2,}/g,
    "/"
  );
}

/*
 * Scroll morbido verso una sezione.
 *
 * Gestiamo il click soltanto quando l'href
 * è un'ancora della pagina corrente e il
 * target esiste davvero: in tutti gli altri
 * casi lasciamo navigare il browser, che
 * sa raggiungere /menu o /#sezione.
 */
export function scrollToSection(
  event,
  href
) {
  if (!href.startsWith("#")) {
    return false;
  }

  const target =
    document.querySelector(href);

  if (!target) {
    return false;
  }

  event.preventDefault();

  const prefersReducedMotion =
    window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  target.scrollIntoView({
    behavior: prefersReducedMotion
      ? "auto"
      : "smooth",
    block: "start",
  });

  window.history.pushState(
    null,
    "",
    href
  );

  return true;
}
