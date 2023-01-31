/* eslint-disable no-duplicate-imports */
import type { SitemapOptions } from "@astrojs/sitemap";
import sitemap from "@astrojs/sitemap";
import astroI18next from "astro-i18next";
import { defineConfig } from "astro/config";

const sitemapOptions: SitemapOptions = {
  i18n: {
    defaultLocale: "en",
    locales: {
      en: "en",
      lt: "lt",
    },
  },
  filter: (page) => page !== "https://www.companionforts.com/colors/" &&
    page !== "https://www.companionforts.com/lt/colors/",
};

export default defineConfig({
  // https://docs.astro.build/en/reference/configuration-reference/
  site: "https://www.companionforts.com/",

  server: {
    host: true,
  },

  vite: {
    logLevel: "info",
    clearScreen: false,
    server: {
      hmr: {
        overlay: false,
      },
    },
    build: {
      target: "esnext",
      minify: "esbuild",
      reportCompressedSize: true,
      modulePreload: {
        polyfill: false,
      },
    },
  },

  integrations: [astroI18next(), sitemap(sitemapOptions)],
});
