import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import react from "@vitejs/plugin-react";

import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  PAGES,
  localizedPath,
} from "./vite-seo-plugin.js";

/*
 * =======================================================
 * PRERENDER IN BUILD
 * =======================================================
 *
 * Il sito è una SPA: index.html contiene solo
 * <div id="root"></div> e i testi nascono dal
 * JavaScript. Dopo la build normale questo
 * plugin renderizza ogni pagina pubblica con
 * React (src/entry-server.jsx) e scrive in dist/
 * un file HTML completo per ciascuna:
 *
 *   /         → index.html
 *   /menu     → menu.html
 *   /en       → en.html
 *   /en/menu  → en/menu.html
 *   /fr       → fr.html
 *   /fr/menu  → fr/menu.html
 *
 * Sono le stesse 6 pagine della sitemap. I file
 * sono "menu.html" e non "menu/index.html" perché
 * Cloudflare, per /menu, serve menu.html senza
 * redirect; con la cartella reindirizzerebbe a
 * /menu/, diverso da canonical e sitemap.
 *
 * Non serve nessun browser: è React eseguito da
 * Node, con le sole dipendenze già del progetto.
 *
 * Se il prerender fallisce la build NON si ferma:
 * dist/ resta quello di sempre (shell SPA) e nel
 * log compare un avviso. Le pagine si scrivono
 * solo dopo che tutte sono state renderizzate.
 *
 * /admin e i percorsi sconosciuti non vengono
 * prerenderizzati: Cloudflare li serve con
 * index.html e main.jsx sceglie da solo se
 * idratare o rifare il render (vedi main.jsx).
 */

const SSR_ENTRY = "src/entry-server.jsx";

const SSR_OUT_DIR = "dist-ssr";

const OG_LOCALES = {
  it: "it_IT",
  en: "en_GB",
  fr: "fr_FR",
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function outputFile(route) {
  return route === "/"
    ? "index.html"
    : `${route.slice(1)}.html`;
}

/*
 * Sostituisce un pezzo di index.html, ma solo
 * se lo trova esattamente una volta: se qualcuno
 * riscrive quel tag, meglio un errore che una
 * pagina con metadati sbagliati.
 */
function replaceOnce(
  html,
  pattern,
  replacement,
  label
) {
  const found =
    html.match(
      new RegExp(pattern.source, "g")
    )?.length ?? 0;

  if (found !== 1) {
    throw new Error(
      `index.html: "${label}" trovato ${found} volte, ne serve esattamente 1.`
    );
  }

  return html.replace(
    pattern,
    () => replacement
  );
}

function metaPattern(attribute, name) {
  return new RegExp(
    `<meta\\s+${attribute}="${name}"\\s+content="[^"]*"\\s*/>`
  );
}

function metaTag(attribute, name, content) {
  return `<meta ${attribute}="${name}" content="${escapeHtml(content)}" />`;
}

function buildPageHtml(
  template,
  page,
  siteUrl
) {
  let html = template;

  html = replaceOnce(
    html,
    /<html lang="[^"]*">/,
    `<html lang="${page.language}">`,
    "<html lang>"
  );

  html = replaceOnce(
    html,
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(page.title)}</title>`,
    "<title>"
  );

  const metas = [
    ["name", "description", page.description],
    ["property", "og:title", page.title],
    ["property", "og:description", page.description],
    ["name", "twitter:title", page.title],
    ["name", "twitter:description", page.description],
    ["property", "og:locale", OG_LOCALES[page.language]],
  ];

  for (const [attribute, name, content] of metas) {
    html = replaceOnce(
      html,
      metaPattern(attribute, name),
      metaTag(attribute, name, content),
      `meta ${name}`
    );
  }

  /*
   * Canonical, hreflang e og:url: stessi valori
   * che useDocumentMeta.js scrive a runtime, con
   * data-managed così il browser li sostituisce
   * invece di duplicarli.
   */
  if (siteUrl) {
    const urlFor = (language) =>
      `${siteUrl}${localizedPath(page.path, language)}`;

    const tags = [
      `<link rel="canonical" href="${urlFor(page.language)}" data-managed="true" />`,
      ...LANGUAGES.map(
        (code) =>
          `<link rel="alternate" href="${urlFor(code)}" hreflang="${code}" data-managed="true" />`
      ),
      `<link rel="alternate" href="${urlFor(DEFAULT_LANGUAGE)}" hreflang="x-default" data-managed="true" />`,
      metaTag("property", "og:url", urlFor(page.language)),
    ];

    html = replaceOnce(
      html,
      /<\/head>/,
      `${tags.map((tag) => `    ${tag}\n`).join("")}  </head>`,
      "</head>"
    );
  }

  return replaceOnce(
    html,
    /<div id="root"><\/div>/,
    `<div id="root" data-prerendered="${page.key}">${page.html}</div>`,
    'root vuoto'
  );
}

/*
 * Un guscio vuoto non deve mai passare per
 * "pagina prerenderizzata".
 */
function assertHasContent(page) {
  const marker =
    page.pageName === "menu" ? "<h2" : "<h1";

  if (!page.html.includes(marker)) {
    throw new Error(
      `${page.path} (${page.language}): l'HTML renderizzato non contiene ${marker}.`
    );
  }
}

async function buildServerBundle(
  config,
  ssrDir
) {
  const { build } = await import("vite");

  await build({
    configFile: false,
    root: config.root,
    mode: config.mode,
    base: config.base,
    envDir: config.envDir,
    logLevel: "warn",
    publicDir: false,
    plugins: [react()],
    build: {
      ssr: SSR_ENTRY,
      outDir: ssrDir,
      emptyOutDir: true,
      minify: false,
      sourcemap: false,
      reportCompressedSize: false,
      rolldownOptions: {
        output: {
          entryFileNames: "entry-server.mjs",
          chunkFileNames: "chunks/[name]-[hash].mjs",
        },
      },
    },
  });

  const entry = (await fs.readdir(ssrDir)).find(
    (file) => file.startsWith("entry-server.")
  );

  if (!entry) {
    throw new Error(
      `Bundle server non trovato in ${ssrDir}.`
    );
  }

  return path.join(ssrDir, entry);
}

export default function prerenderPlugin() {
  let config;
  let buildFailed = false;

  return {
    name: "regina-prerender",

    apply: "build",

    configResolved(resolved) {
      config = resolved;
    },

    buildEnd(error) {
      if (error) {
        buildFailed = true;
      }
    },

    async closeBundle() {
      if (buildFailed || config.build.ssr) {
        return;
      }

      const outDir = path.resolve(
        config.root,
        config.build.outDir
      );

      const ssrDir = path.resolve(
        config.root,
        SSR_OUT_DIR
      );

      const siteUrl = (
        config.env.VITE_SITE_URL ?? ""
      )
        .trim()
        .replace(/\/+$/, "");

      /*
       * Node 20 non ha WebSocket nativo e supabase-js
       * lo pretende già alla creazione del client.
       * Nel prerender non si apre nessuna connessione
       * (gli effect non girano): basta un segnaposto,
       * rimosso a fine lavoro.
       */
      const stubWebSocket =
        typeof globalThis.WebSocket === "undefined";

      if (stubWebSocket) {
        globalThis.WebSocket = class WebSocket {};
      }

      try {
        const template = await fs.readFile(
          path.join(outDir, "index.html"),
          "utf8"
        );

        const entry = await buildServerBundle(
          config,
          ssrDir
        );

        const { renderRoute } = await import(
          pathToFileURL(entry).href
        );

        const files = [];

        for (const pagePath of PAGES) {
          for (const language of LANGUAGES) {
            const route = localizedPath(
              pagePath,
              language
            );

            const rendered =
              await renderRoute(route);

            const page = {
              ...rendered,
              pageName: rendered.page,
              path: pagePath,
            };

            assertHasContent(page);

            files.push({
              route,
              html: buildPageHtml(
                template,
                page,
                siteUrl
              ),
            });
          }
        }

        for (const { route, html } of files) {
          const file = path.join(
            outDir,
            outputFile(route)
          );

          await fs.mkdir(path.dirname(file), {
            recursive: true,
          });

          await fs.writeFile(file, html);
        }

        config.logger.info(
          `\n[regina-prerender] ${files.length} pagine prerenderizzate: ${files
            .map(({ route }) => route)
            .join(", ")}\n`
        );
      } catch (error) {
        config.logger.warn(
          `\n[regina-prerender] PRERENDER NON RIUSCITO, dist/ resta senza HTML prerenderizzato (il sito funziona comunque come SPA).\n${
            error?.stack ?? error
          }\n`
        );
      } finally {
        if (stubWebSocket) {
          delete globalThis.WebSocket;
        }

        await fs.rm(ssrDir, {
          recursive: true,
          force: true,
        });
      }
    },
  };
}
