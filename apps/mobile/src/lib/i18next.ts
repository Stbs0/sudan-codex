/* eslint-disable import/no-named-as-default-member */
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your translations
import ar from "../locales/ar/translation.json";
import en from "../locales/en/translation.json";
import { storage } from "./mmkv";

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const languageDetector = {
  type: "languageDetector" as const,
  async: true,
  detect: (callback: (lang: string) => void) => {
    const storedLanguage = storage.getString("user.settings.language.code");
    if (storedLanguage) {
      return callback(storedLanguage);
    }

    const deviceLanguage = Localization.getLocales()?.[0]?.languageCode;
    const initialLanguage = (deviceLanguage ?? "").startsWith("ar")
      ? "ar"
      : "en";
    return callback(initialLanguage);
  },
  init: () => {},
  cacheUserLanguage: (language: string) => {
    storage.set("user.settings.language.code", language);
  },
};
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",

    compatibilityJSON: "v4",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
