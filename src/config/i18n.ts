export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

// In the full project this drives /[locale]/ routing with next-intl.
// For this test, the homepage lives at / with hreflang tags for both locales.
export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
};
