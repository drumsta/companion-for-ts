import type { AstroI18nextConfig } from "astro-i18next";

export default {
  locales: ["en", "lt"],
  defaultLocale: "en",
  namespaces: ["translation"],
  defaultNamespace: "translation",
  load: ["server"],
  showDefaultLocale: false,
  i18nextServer: {
    cleanCode: true,
    backend: {
      loadPath: "./public/locales/{{lng}}/{{ns}}.json",
    },
  },
  routes: {
    lt: {
      about: "apie",
      colors: "spalvos",
    },
  },
} as AstroI18nextConfig;
