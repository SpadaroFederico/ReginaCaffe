import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { translations } from "./translations";

const LanguageContext = createContext(null);

function getInitialLanguage() {
  if (typeof window === "undefined") {
    return "it";
  }

  const savedLanguage = localStorage.getItem("regina-language");

  if (savedLanguage === "it" || savedLanguage === "en") {
    return savedLanguage;
  }

  return "it";
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem("regina-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => {
    const getTranslation = (dictionary, key) =>
      key
        .split(".")
        .reduce((current, part) => current?.[part], dictionary);

    const t = (key) => {
      return (
        getTranslation(translations[language], key) ??
        getTranslation(translations.it, key) ??
        key
      );
    };

    return {
      language,
      setLanguage,
      t,
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage deve essere usato dentro LanguageProvider"
    );
  }

  return context;
}