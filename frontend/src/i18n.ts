import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../public/locales/en.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    // fr: { translation: fr },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes content
  },
});

export default i18n;
