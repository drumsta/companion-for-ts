// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  imports: {
    autoImport: false
  },
  typescript: {
        strict: true,
        shim: false
      }
})
