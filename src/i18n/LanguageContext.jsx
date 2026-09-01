import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { translations } from "./translations";
import { useLegal } from "../legal/LegalContext";
import {
  DEFAULT_LANGUAGE,
  getPathLanguage,
} from "../lib/navigation";

const LanguageContext =
  createContext(null);

const LANGUAGE_STORAGE_KEY =
  "regina-language";

const SUPPORTED_LANGUAGES =
  new Set(["it", "en", "fr"]);

function isSupportedLanguage(
  language
) {
  return SUPPORTED_LANGUAGES.has(
    language
  );
}

function getTranslation(
  dictionary,
  key
) {
  return key
    .split(".")
    .reduce(
      (current, part) =>
        current?.[part],
      dictionary
    );
}

export function LanguageProvider({
  children,
}) {
  const { consent } = useLegal();

  /*
   * Manteniamo distinti:
   *
   * - consenso esplicitamente concesso
   * - consenso esplicitamente negato
   * - stato non ancora inizializzato
   *
   * Questo evita di cancellare troppo
   * presto una lingua precedentemente
   * memorizzata mentre LegalContext
   * sta ancora inizializzando.
   */
  const preferencesConsent =
    consent?.categories?.preferences;

  const hasPreferenceDecision =
    typeof preferencesConsent ===
    "boolean";

  const canPersistLanguage =
    preferencesConsent === true;

  /*
   * =======================================================
   * LINGUA E URL
   * =======================================================
   *
   * /en e /fr sono versioni distinte del
   * sito, con un loro indirizzo indicizzabile.
   *
   * Quando il percorso porta un prefisso è
   * quello a comandare: una pagina inglese
   * deve restare inglese anche se il visitatore
   * aveva salvato un'altra preferenza, altrimenti
   * il contenuto non corrisponderebbe all'URL
   * che i motori di ricerca hanno indicizzato.
   *
   * Senza prefisso la pagina è sempre italiana:
   * è l'unico modo per cui il link "IT" dello
   * switcher (che punta a "/") funzioni davvero
   * anche dopo che è stata salvata un'altra lingua.
   */
  const pathLanguage = getPathLanguage();

  const [
    language,
    setLanguageState,
  ] = useState(
    () =>
      pathLanguage ??
      DEFAULT_LANGUAGE
  );

  /*
   * API esposta ai componenti.
   *
   * Accettiamo esclusivamente le lingue
   * supportate dall'applicazione.
   */
  const setLanguage =
    useCallback(
      (nextLanguage) => {
        setLanguageState(
          (currentLanguage) => {
            const resolvedLanguage =
              typeof nextLanguage ===
              "function"
                ? nextLanguage(
                    currentLanguage
                  )
                : nextLanguage;

            if (
              !isSupportedLanguage(
                resolvedLanguage
              )
            ) {
              return currentLanguage;
            }

            return resolvedLanguage;
          }
        );
      },
      []
    );

  /*
   * =======================================================
   * HTML LANG
   * =======================================================
   *
   * Il cambio lingua non modifica soltanto
   * il testo visibile.
   *
   * Aggiorna anche:
   *
   * <html lang="it">
   * <html lang="en">
   * <html lang="fr">
   *
   * utile per accessibilità, browser
   * e motori di ricerca.
   */
  useEffect(() => {
    if (
      typeof document ===
      "undefined"
    ) {
      return;
    }

    document.documentElement.lang =
      language;
  }, [language]);

  /*
   * =======================================================
   * PERSISTENZA DELLA LINGUA
   * =======================================================
   */

  useEffect(() => {
    if (
      typeof window ===
        "undefined" ||
      !hasPreferenceDecision
    ) {
      return;
    }

    try {
      /*
       * Preferenze negate:
       * nessuna lingua persistente.
       *
       * La lingua scelta rimane comunque
       * attiva per la sessione corrente.
       */
      if (
        !canPersistLanguage
      ) {
        window.localStorage.removeItem(
          LANGUAGE_STORAGE_KEY
        );

        return;
      }

      /*
       * Memorizziamo la lingua corrente
       * solo a scopo informativo: non viene
       * più riletta per decidere cosa
       * mostrare, perché farlo rompeva il
       * link "IT" dello switcher (l'URL
       * "/" tornava a mostrare l'ultima
       * lingua salvata invece dell'italiano).
       */
      window.localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        language
      );
    } catch {
      /*
       * localStorage può essere bloccato
       * dal browser.
       *
       * Il cambio lingua continua comunque
       * a funzionare nella sessione corrente.
       */
    }
  }, [
    language,
    canPersistLanguage,
    hasPreferenceDecision,
  ]);

  const value =
    useMemo(() => {
      const t = (key) => {
        return (
          getTranslation(
            translations[
              language
            ],
            key
          ) ??
          getTranslation(
            translations.it,
            key
          ) ??
          key
        );
      };

      return {
        language,
        setLanguage,
        t,
      };
    }, [
      language,
      setLanguage,
    ]);

  return (
    <LanguageContext.Provider
      value={value}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context =
    useContext(
      LanguageContext
    );

  if (!context) {
    throw new Error(
      "useLanguage deve essere utilizzato dentro LanguageProvider"
    );
  }

  return context;
}