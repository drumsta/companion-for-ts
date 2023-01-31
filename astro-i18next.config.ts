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
      loadPath: "./src/i18n/{{lng}}/{{ns}}.json",
    },
  },
  routes: {
    lt: {
      about: "about",
      colors: "colors",
    },
  },
} as AstroI18nextConfig;
