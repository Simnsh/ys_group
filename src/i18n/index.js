import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// load translation JSONs
import enCommon from "../locales/en/common.json";
import idCommon from "../locales/id/common.json";
import msCommon from "../locales/ms/common.json";
import zhCommon from "../locales/zh/common.json";

import enHome from "../locales/en/home.json";
import idHome from "../locales/id/home.json";
import msHome from "../locales/ms/home.json";
import zhHome from "../locales/zh/home.json";

import productEn from "../locales/en/product.json";
import productId from "../locales/id/product.json";
import productMs from "../locales/ms/product.json";
import productZh from "../locales/zh/product.json";

import contactEn from "../locales/en/contact.json";
import contactId from "../locales/id/contact.json";
import contactMs from "../locales/ms/contact.json";
import contactZh from "../locales/zh/contact.json";

import footerEn from "../locales/en/footer.json";
import footerId from "../locales/id/footer.json";
import footerMs from "../locales/ms/footer.json";
import footerZh from "../locales/zh/footer.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        home: enHome,
        product: productEn,
        contact: contactEn,
        footer: footerEn,
      },
      id: {
        common: idCommon,
        home: idHome,
        product: productId,
        contact: contactId,
        footer: footerId,
      },
      ms: {
        common: msCommon,
        home: msHome,
        product: productMs,
        contact: contactMs,
        footer: footerMs,
      },
      zh: {
        common: zhCommon,
        home: zhHome,
        product: productZh,
        contact: contactZh,
        footer: footerZh,
      },
    },
    ns: ["common", "home", "product", "contact", "footer"],
    defaultNS: "common",
    fallbackLng: "en",
    supportedLngs: ["en", "id", "ms", "zh"],
    interpolation: { escapeValue: false },
  });

export default i18n;
