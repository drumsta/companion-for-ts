export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      bodyAttrs: {
        class: 'antialiased text-theme-text bg-theme-bg',
      },
    },
  },
  colorMode: {
    classSuffix: '',
  },
  css: ['@/assets/css/theme.css'],
  i18n: {
    baseUrl: 'http://localhost:3000',
    locales: [
      {
        code: 'en',
        iso: 'en',
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
  // https://github.com/nuxt/framework/issues/7197
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
    },
  },
  pages: true,
  typescript: {
    shim: false,
    strict: true,
  },
  vite: {
    build: {
      minify: 'esbuild',
      modulePreload: {
        polyfill: false,
      },
      reportCompressedSize: true,
      target: 'esnext',
    },
  },
  windicss: {
    analyze: true,
  },
});
