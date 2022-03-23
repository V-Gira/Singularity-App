import i18next from "i18next";
import I18nLanguageDetector from "i18next-browser-languagedetector";
import I18nHttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const PossibleLanguages = [
  "en",
  "fr",

] as const;

export type IPossibleLanguages = typeof PossibleLanguages[number];

export const PossibleLanguagesNames: Record<IPossibleLanguages, string> = {
  "en": "English",
  "fr": "Français",
};

export async function InternationalizationService() {
  const i18n = i18next;

  await i18n
    .use(I18nLanguageDetector)
    .use(initReactI18next)
    .use(I18nHttpApi)
    .init({
      supportedLngs: [...PossibleLanguages],
      fallbackLng: "en",
      debug: false,
      keySeparator: false,
      interpolation: {
        escapeValue: false,
      },
    });
}
