// https://nuxt.com/docs/api/configuration/nuxt-config
// https://nuxt.com/docs/getting-started/seo-meta

import type { NuxtConfig } from '@nuxt/schema';

// https://nuxt.com/docs/guide/directory-structure/components#dynamic-components
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      title: 'Companion for TS',
      // https://midstride.com/seo-for-nuxt-meta-tags
      // https://langvad.dev/blog/how-to-work-with-meta-data-in-nuxt
      // https://stackoverflow.com/questions/71571875/nuxt-seo-meta-description
      meta: [{ name: 'description', content: 'Companion for TS' }],
    },
  },
  build: {
    analyze: true,
  },
  devServer: {
    port: 3334,
  },
  modules: ['@nuxtjs/color-mode', '@nuxtjs/tailwindcss'],
  pages: true,
  typescript: {
    strict: true,
  },
  colorMode: {
    classSuffix: '',
  },
} as NuxtConfig);
