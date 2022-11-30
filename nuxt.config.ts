/*
 * https://nuxt.com/docs/api/configuration/nuxt-config
 * https://nuxt.com/docs/guide/directory-structure/components#dynamic-components
 */
export default defineNuxtConfig({
    build: {
        analyze: true,
    },
    imports: {
        autoImport: false,
    },
    typescript: {
        shim: false,
        strict: true,
        typeCheck: true,
    },
    webpack: {
        analyze: true,
    },
});
