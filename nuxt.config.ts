// https://nuxt.com/docs/api/configuration/nuxt-config
// https://nuxt.com/docs/guide/directory-structure/components#dynamic-components
export default defineNuxtConfig({
  imports: {
    autoImport: false,
  },
  typescript: {
    strict: true,
    shim: false,
  },
});
