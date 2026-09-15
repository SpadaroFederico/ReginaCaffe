/*
 * =======================================================
 * SEO IN BUILD: SITEMAP, ROBOTS E URL ASSOLUTI
 * =======================================================
 *
 * Sitemap, og:image e dati strutturati
 * richiedono URL assoluti, ma il dominio
 * definitivo non è scritto nel codice:
 * arriva dalla variabile VITE_SITE_URL
 * (es. https://www.reginacaffe.it), da
 * impostare tra le variabili di build di
 * Cloudflare oppure in .env.production.
 *
 * Con VITE_SITE_URL:
 *
 * - dist/sitemap.xml con le 6 pagine
 *   (/, /menu nelle tre lingue) e i
 *   relativi hreflang;
 * - dist/robots.txt con la riga Sitemap:;
 * - og:image e twitter:image in index.html;
 * - %SITE_URL% sostituito nei dati strutturati.
 *
 * Senza VITE_SITE_URL la build continua,
 * ma senza sitemap e anteprime social.
 *
 * Il plugin blocca invece la build se
 * mancano le chiavi Supabase: senza di
 * esse il sito andrebbe online con la
 * sezione eventi e l'area admin rotte.
 */

/*
 * Devono restare allineati a PAGE_PATHS di
 * src/i18n/useDocumentMeta.js e a
 * src/lib/navigation.js: gli URL della
 * sitemap devono coincidere con i canonical.
 */
const PAGES = ["/", "/menu"];

const LANGUAGES = ["it", "en", "fr"];

const DEFAULT_LANGUAGE = "it";

const REQUIRED_ENV = [
  "VITE_SUPABASE_URL",
  "VITE_SUPABASE_PUBLISHABLE_KEY",
];

function localizedPath(path, language) {
  const prefix =
    language === DEFAULT_LANGUAGE
      ? ""
      : `/${language}`;

  const normalized =
    path === "/" ? "" : path;

  return `${prefix}${normalized}` || "/";
}

function buildSitemap(siteUrl) {
  const today = new Date()
    .toISOString()
    .slice(0, 10);

  const entries = PAGES.flatMap((page) =>
    LANGUAGES.map((language) => {
      const alternates = [
        ...LANGUAGES.map(
          (code) =>
            `    <xhtml:link rel="alternate" hreflang="${code}" href="${siteUrl}${localizedPath(page, code)}"/>`
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${localizedPath(page, DEFAULT_LANGUAGE)}"/>`,
      ];

      return [
        "  <url>",
        `    <loc>${siteUrl}${localizedPath(page, language)}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        ...alternates,
        "  </url>",
      ].join("\n");
    })
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");
}

function buildRobots(siteUrl) {
  const lines = [
    "User-agent: *",
    "Allow: /",
    "",
    "# L'area amministrativa non deve finire nell'indice.",
    "Disallow: /admin",
  ];

  if (siteUrl) {
    lines.push(
      "",
      `Sitemap: ${siteUrl}/sitemap.xml`
    );
  }

  return `${lines.join("\n")}\n`;
}

export default function seoPlugin() {
  let siteUrl = "";

  return {
    name: "regina-seo",

    configResolved(config) {
      siteUrl = (config.env.VITE_SITE_URL ?? "")
        .trim()
        .replace(/\/+$/, "");

      if (
        siteUrl &&
        !/^https:\/\/[^/\s]+$/.test(siteUrl)
      ) {
        throw new Error(
          `VITE_SITE_URL deve essere solo l'origine https, senza percorso (es. https://www.reginacaffe.it). Valore ricevuto: "${siteUrl}"`
        );
      }

      if (config.command !== "build") {
        return;
      }

      const missing = REQUIRED_ENV.filter(
        (key) => !config.env[key]?.trim()
      );

      if (missing.length > 0) {
        throw new Error(
          `Variabili mancanti per la build: ${missing.join(", ")}. Su Cloudflare vanno impostate tra le variabili di BUILD, non tra quelle di runtime.`
        );
      }

      if (!siteUrl) {
        config.logger.warn(
          "\n[regina-seo] VITE_SITE_URL non impostata: niente sitemap.xml, og:image né URL assoluti nei dati strutturati.\n"
        );
      }
    },

    transformIndexHtml(html) {
      const withSiteUrl = html.replaceAll(
        "%SITE_URL%",
        siteUrl
      );

      if (!siteUrl) {
        return withSiteUrl;
      }

      const image = `${siteUrl}/og-image.jpg`;

      return {
        html: withSiteUrl,
        tags: [
          {
            tag: "meta",
            attrs: {
              property: "og:image",
              content: image,
            },
            injectTo: "head",
          },
          {
            tag: "meta",
            attrs: {
              property: "og:image:width",
              content: "1200",
            },
            injectTo: "head",
          },
          {
            tag: "meta",
            attrs: {
              property: "og:image:height",
              content: "675",
            },
            injectTo: "head",
          },
          {
            tag: "meta",
            attrs: {
              property: "og:image:alt",
              content: "Regina Caffè, Grottaglie",
            },
            injectTo: "head",
          },
          {
            tag: "meta",
            attrs: {
              name: "twitter:image",
              content: image,
            },
            injectTo: "head",
          },
        ],
      };
    },

    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: buildRobots(siteUrl),
      });

      if (siteUrl) {
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: buildSitemap(siteUrl),
        });
      }
    },
  };
}
