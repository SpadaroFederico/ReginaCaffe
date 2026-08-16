import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const LegalContext = createContext(null);

const CONSENT_STORAGE_KEY =
  "regina-cookie-consent";

const CONSENT_VERSION = "1.0";

/*
 * Cambia questi valori quando aggiungerai
 * realmente servizi analitici o di marketing.
 */
export const AVAILABLE_CATEGORIES =
  Object.freeze({
    preferences: true,
    analytics: false,
    marketing: false,
  });

function addSixMonths(date) {
  const result = new Date(date);

  result.setMonth(result.getMonth() + 6);

  return result;
}

function normalizeCategories(
  categories = {}
) {
  return {
    necessary: true,

    preferences:
      AVAILABLE_CATEGORIES.preferences &&
      Boolean(categories.preferences),

    analytics:
      AVAILABLE_CATEGORIES.analytics &&
      Boolean(categories.analytics),

    marketing:
      AVAILABLE_CATEGORIES.marketing &&
      Boolean(categories.marketing),
  };
}

function removeStoredConsent() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(
      CONSENT_STORAGE_KEY
    );
  } catch {
    // Il sito continua a funzionare anche
    // quando localStorage non è disponibile.
  }
}

function readStoredConsent() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawConsent =
      localStorage.getItem(
        CONSENT_STORAGE_KEY
      );

    if (!rawConsent) {
      return null;
    }

    const parsedConsent =
      JSON.parse(rawConsent);

    const hasCorrectVersion =
      parsedConsent?.version ===
      CONSENT_VERSION;

    const expirationTime =
      new Date(
        parsedConsent?.expiresAt
      ).getTime();

    const isExpired =
      !Number.isFinite(expirationTime) ||
      expirationTime <= Date.now();

    if (
      !hasCorrectVersion ||
      isExpired
    ) {
      removeStoredConsent();
      return null;
    }

    return {
      ...parsedConsent,

      categories:
        normalizeCategories(
          parsedConsent.categories
        ),
    };
  } catch {
    removeStoredConsent();
    return null;
  }
}

export function LegalProvider({
  children,
}) {
  const [consent, setConsent] =
    useState(readStoredConsent);

  const [activeModal, setActiveModal] =
    useState(null);

  const saveConsent = useCallback(
    (categories) => {
      const now = new Date();

      const nextConsent = {
        version: CONSENT_VERSION,

        decidedAt: now.toISOString(),

        expiresAt:
          addSixMonths(
            now
          ).toISOString(),

        categories:
          normalizeCategories(
            categories
          ),
      };

      try {
        localStorage.setItem(
          CONSENT_STORAGE_KEY,
          JSON.stringify(nextConsent)
        );
      } catch {
        // Manteniamo comunque la scelta
        // nella sessione React corrente.
      }

      setConsent(nextConsent);

      return nextConsent;
    },
    []
  );

  const acceptAll = useCallback(() => {
    return saveConsent({
      preferences:
        AVAILABLE_CATEGORIES.preferences,

      analytics:
        AVAILABLE_CATEGORIES.analytics,

      marketing:
        AVAILABLE_CATEGORIES.marketing,
    });
  }, [saveConsent]);

  const rejectOptional =
    useCallback(() => {
      return saveConsent({
        preferences: false,
        analytics: false,
        marketing: false,
      });
    }, [saveConsent]);

  const savePreferences =
    useCallback(
      (preferences) => {
        return saveConsent({
          preferences:
            preferences.preferences,

          analytics:
            preferences.analytics,

          marketing:
            preferences.marketing,
        });
      },
      [saveConsent]
    );

  const resetConsent =
    useCallback(() => {
      removeStoredConsent();
      setConsent(null);
    }, []);

  const openPrivacy =
    useCallback(() => {
      setActiveModal("privacy");
    }, []);

  const openCookiePolicy =
    useCallback(() => {
      setActiveModal("cookies");
    }, []);

  const openPreferences =
    useCallback(() => {
      setActiveModal("preferences");
    }, []);

  const closeModal =
    useCallback(() => {
      setActiveModal(null);
    }, []);

  const hasConsent = useCallback(
    (category) => {
      if (category === "necessary") {
        return true;
      }

      return Boolean(
        consent?.categories?.[category]
      );
    },
    [consent]
  );

  useEffect(() => {
    const handleStorage = (event) => {
      if (
        event.key !==
        CONSENT_STORAGE_KEY
      ) {
        return;
      }

      setConsent(readStoredConsent());
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  const value = useMemo(
    () => ({
      consent,

      showBanner: consent === null,

      activeModal,

      availableCategories:
        AVAILABLE_CATEGORIES,

      acceptAll,
      rejectOptional,
      savePreferences,
      resetConsent,

      openPrivacy,
      openCookiePolicy,
      openPreferences,
      closeModal,

      hasConsent,
    }),
    [
      consent,
      activeModal,
      acceptAll,
      rejectOptional,
      savePreferences,
      resetConsent,
      openPrivacy,
      openCookiePolicy,
      openPreferences,
      closeModal,
      hasConsent,
    ]
  );

  return (
    <LegalContext.Provider
      value={value}
    >
      {children}
    </LegalContext.Provider>
  );
}

export function useLegal() {
  const context =
    useContext(LegalContext);

  if (!context) {
    throw new Error(
      "useLegal deve essere utilizzato dentro LegalProvider"
    );
  }

  return context;
}