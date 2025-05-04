import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../public/locales/en.json";
import zh from "../public/locales/zh.json";
import ms from "../public/locales/ms.json";
import ja from "../public/locales/ja.json";
import { getCookie, setCookie } from "./utils";

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

// Grab language from cookie or browser or fallback
const cookieLang = getCookie("language");
const browserLang = navigator.language.split("-")[0];
const initialLanguage = cookieLang || browserLang || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Set cookie when language changes
i18n.on("languageChanged", (lng) => {
  setCookie("language", lng);
});

export default i18n;
