export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
    },
  },
  colorMode: {
    classSuffix: '',
  },
  css: ['@/assets/css/theme.css'],
  i18n: {
    baseUrl: 'https://www.companionforts.com',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      redirectOn: 'root',
    },
    langDir: 'locales',
    lazy: true,
    locales: [
      {
        code: 'en',
        iso: 'en',
        name: 'English',
        file: 'en.json',
        isCatchallLocale: true,
      },
      {
        code: 'lt',
        iso: 'lt',
        name: 'Lietuvių',
        file: 'lt.json',
      },
    ],
    strategy: 'prefix_except_default',
    vueI18n: {
      legacy: false,
      locale: 'en',
      fallbackLocale: 'en',
    },
  },
  nitro: {
    compressPublicAssets: {
      brotli: true,
    },
    prerender: {
      crawlLinks: true,
    },
  },
  pages: true,
  modules: ['@nuxtjs/color-mode', '@nuxtjs/i18n', '@pinia/nuxt', '@vueuse/nuxt', 'nuxt-windicss', 'nuxt-simple-sitemap', 'nuxt-simple-robots'],
  robots: {
    indexable: true,
    sitemap: 'https://www.companionforts.com/sitemap.xml',
  },
  sitemap: {
    hostname: 'https://www.companionforts.com',
    enabled: true,
  },
  ssr: true,
  typescript: {
    shim: false,
    strict: true,
    typeCheck: false,
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
  webpack: {
    analyze: true,
  },
  windicss: {
    analyze: true,
    displayVersionInfo: false,
  },
});
