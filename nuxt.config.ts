// https://nuxt.com/docs/api/configuration/nuxt-config
// https://nuxt.com/docs/getting-started/seo-meta
import type { NuxtConfig } from '@nuxt/schema';

const nuxtConfig: NuxtConfig = {
  app: {
    head: {
      charset: 'utf-8',
      title: 'Companion for TS',
      viewport: 'width=device-width, initial-scale=1.0',
      // https://midstride.com/seo-for-nuxt-meta-tags
      // https://langvad.dev/blog/how-to-work-with-meta-data-in-nuxt
      // https://stackoverflow.com/questions/71571875/nuxt-seo-meta-description
      meta: [{ name: 'description', content: 'Companion for TS' }],
      bodyAttrs: { class: 'antialiased text-theme-text bg-theme-bg' },
    },
  },
  build: {
    transpile: ['primevue'],
  },
  colorMode: {
    classSuffix: '',
  },
  css: ['@/assets/css/theme.css', '@/assets/css/components.css'],
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
      },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_and_default',
    lazy: true,
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
    },
    vueI18n: {
      legacy: false,
      locale: 'en',
      fallbackLocale: 'en',
    },
  },
  modules: ['@nuxtjs/color-mode', '@nuxtjs/i18n', '@pinia/nuxt', '@vueuse/nuxt', 'nuxt-windicss'],
  pages: true,
  typescript: {
    shim: false,
    strict: true,
  },
  vite: {
    build: {
      minify: 'esbuild',
    },
  },
  windicss: {
    analyze: true,
  },
};

// https://nuxt.com/docs/guide/directory-structure/components#dynamic-components
export default defineNuxtConfig(nuxtConfig);
