/* eslint-disable no-duplicate-imports */
import type { SitemapOptions } from "@astrojs/sitemap";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import critters from "astro-critters";
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
  filter: (page: string): boolean =>
    page !== "https://www.companionforts.com/colors/" && page !== "https://www.companionforts.com/lt/colors/",
};

export default defineConfig({
  // https://docs.astro.build/en/reference/configuration-reference/
  site: "https://www.companionforts.com/",

  server: {
    host: true,
  },

  build: {
    assets: "assets",
  },

  vite: {
    logLevel: "info",
    server: {
      hmr: {
        overlay: false,
      },
    },
    build: {
      assetsInlineLimit: 0,
      target: "esnext",
      modulePreload: {
        polyfill: false,
      },
    },
  },

  integrations: [astroI18next(), tailwind(), sitemap(sitemapOptions), critters()],
});
