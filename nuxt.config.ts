// https://nuxt.com/docs/api/configuration/nuxt-config
// https://nuxt.com/docs/guide/directory-structure/components#dynamic-components
import type { NuxtConfig } from 'nuxt/config';

const nuxtConfig: NuxtConfig = {
  build: {
    analyze: true,
  },
  devServer: {
    port: 3334,
  },
};

export default defineNuxtConfig(nuxtConfig);
