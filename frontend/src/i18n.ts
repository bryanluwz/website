import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../public/locales/en.json";
import zh from "../public/locales/zh.json";
import ms from "../public/locales/ms.json";
import ja from "../public/locales/ja.json";

const resources = {
  en: { translation: en },
  zh: { translation: zh },
  ms: { translation: ms },
  ja: { translation: ja },
};

export type TSupportedLanguages = keyof typeof resources;
export const SupportedLanguages = {
  en: "ENG",
  zh: "CHN",
  ms: "MAL",
  ja: "JAP",
};

// Try to get the language from localStorage
const storedLanguage = localStorage.getItem("language");
const browserLang = navigator.language.split("-")[0] || "en";

// Default to 'en' if nothing is stored
const initialLanguage = storedLanguage || browserLang || "en";

i18n.use(initReactI18next).init({
  resources: resources,
  lng: initialLanguage, // Set initial language from localStorage or fallback to 'en'
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes content
  },
});

// Save the selected language in localStorage when changed
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

export default i18n;
