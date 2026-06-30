import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import type { InitOptions } from "i18next";

import enTranslation from "./locales/en/translation.json";

const options: InitOptions = {
  resources: {
    en: {
      translation: enTranslation,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
};

i18n.use(initReactI18next).init(options);

export default i18n;
