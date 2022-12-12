# Companion for TS

## Questions

- Styling
  - Is 'font-heading' a CSS or Tailwind command? e.g. in `<h1 class="font-heading">`.
  - Why two links to icons in HTML Header? One to `favicon.svg`, another one to `favicon-dark.svg`.

## Investigation Topics

- Architecture, including Clean Architecture
  - [x] Web framework - vue3 + Nuxt
  - Model, Services + Service Interfaces.
  - SSR, including how to have both, SPA and SSR, for different App sections.
  - Offline capabilities - data caching + storage, PWA
- Coding standards & practices
  - [x] EsLint, StyleLint, prettier.
  - [x] Strong typing - TypeScript.
- Styling
  - [x] Multi-theming, including dark theme - `@nuxtjs/color-mode` + `windicss`.
  - [x] Individual elements styling, styling in style section in SFC.
  - [UnoCSS](https://github.com/unocss/unocss) - The instant on-demand Atomic CSS engine.
- [x] Localization - i18n
- State Management - Pinia
- API & Data persistence
  - native vue calls vs axios.
  - Data storages available on client side.
- Performance, Web standards - Lighthouse, [web.dev](https://web.dev/learn)
  - PostProcessing - PostCSS + minifization + compression
