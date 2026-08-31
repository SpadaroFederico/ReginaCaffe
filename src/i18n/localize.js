/*
 * =======================================================
 * VALORI LOCALIZZATI NEI DATI
 * =======================================================
 *
 * Eventi, menu e prodotti consigliati
 * non passano dal dizionario di
 * translations.js.
 *
 * Il testo viaggia insieme al dato,
 * nella forma:
 *
 * {
 *   it: "...",
 *   en: "...",
 *   fr: "...",
 * }
 *
 * Alcuni campi restano invece stringhe
 * semplici, perché identici in tutte
 * le lingue (nomi propri, prezzi).
 *
 * L'italiano è la lingua di riferimento:
 * se una traduzione manca, mostriamo
 * comunque il contenuto italiano invece
 * di lasciare l'interfaccia vuota.
 */

export const DEFAULT_LANGUAGE = "it";

export function getLocalizedValue(
  value,
  language
) {
  if (typeof value === "string") {
    return value;
  }

  return (
    value?.[language] ??
    value?.[DEFAULT_LANGUAGE] ??
    ""
  );
}

/*
 * =======================================================
 * LOCALE PER Intl
 * =======================================================
 *
 * Serve alla formattazione di date
 * e orari degli eventi.
 */

const INTL_LOCALES = {
  it: "it-IT",
  en: "en-GB",
  fr: "fr-FR",
};

export function getIntlLocale(
  language
) {
  return (
    INTL_LOCALES[language] ??
    INTL_LOCALES[DEFAULT_LANGUAGE]
  );
}
