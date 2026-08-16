import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { translations } from "./translations";
import { useLegal } from "../legal/LegalContext";

const LanguageContext =
  createContext(null);

const LANGUAGE_STORAGE_KEY =
  "regina-language";

const SUPPORTED_LANGUAGES =
  new Set(["it", "en"]);

function isSupportedLanguage(
  language
) {
  return SUPPORTED_LANGUAGES.has(
    language
  );
}

function readStoredLanguage(
  canPersistLanguage
) {
  if (
    typeof window === "undefined" ||
    !canPersistLanguage
  ) {
    return "it";
  }

  try {
    const savedLanguage =
      window.localStorage.getItem(
        LANGUAGE_STORAGE_KEY
      );

    if (
      isSupportedLanguage(
        savedLanguage
      )
    ) {
      return savedLanguage;
    }
  } catch {
    // Usiamo l'italiano come fallback.
  }

  return "it";
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

  const [
    language,
    setLanguageState,
  ] = useState(() =>
    readStoredLanguage(
      canPersistLanguage
    )
  );

  /*
   * Indica se abbiamo già sincronizzato
   * lo stato con localStorage.
   *
   * Se il consenso era già disponibile
   * al primo render, useState ha già
   * letto la lingua salvata.
   */
  const storageHydratedRef =
    useRef(
      canPersistLanguage
    );

  /*
   * Serve a distinguere una scelta
   * effettuata dall'utente nella sessione
   * corrente da una lingua recuperata
   * automaticamente dallo storage.
   */
  const userChangedLanguageRef =
    useRef(false);

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

            userChangedLanguageRef.current =
              true;

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
   *
   * oppure:
   *
   * <html lang="en">
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

        storageHydratedRef.current =
          true;

        return;
      }

      /*
       * Se LegalContext ha terminato
       * l'inizializzazione solo dopo
       * il primo render, recuperiamo
       * adesso l'eventuale lingua salvata.
       *
       * Non la recuperiamo se nel frattempo
       * l'utente ha già effettuato una nuova
       * scelta manuale.
       */
      if (
        !storageHydratedRef.current &&
        !userChangedLanguageRef.current
      ) {
        const storedLanguage =
          window.localStorage.getItem(
            LANGUAGE_STORAGE_KEY
          );

        storageHydratedRef.current =
          true;

        if (
          isSupportedLanguage(
            storedLanguage
          ) &&
          storedLanguage !==
            language
        ) {
          setLanguageState(
            storedLanguage
          );

          /*
           * Evitiamo di sovrascrivere
           * immediatamente lo storage con
           * il valore precedente del render.
           */
          return;
        }
      } else {
        storageHydratedRef.current =
          true;
      }

      /*
       * Con consenso alle preferenze,
       * memorizziamo la lingua corrente.
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