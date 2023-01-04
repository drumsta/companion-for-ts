<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  import type { ColorModeInstance } from '@nuxtjs/color-mode/dist/runtime/types';
  import { useI18n } from 'vue-i18n';

  const colorMode: ColorModeInstance = useColorMode();
  const { t } = useI18n();
  const i18nHead = useLocaleHead({
    addDirAttribute: true,
    addSeoAttributes: true,
  });

  useHead({
    title: t('app.title'),
    htmlAttrs: {
      ...i18nHead.value.htmlAttrs,
    },
    /*
     * https://midstride.com/seo-for-nuxt-meta-tags
     * https://langvad.dev/blog/how-to-work-with-meta-data-in-nuxt
     * https://stackoverflow.com/questions/71571875/nuxt-seo-meta-description
     */
    meta: [
      { 'http-equiv': 'content-type', 'content': 'text/html; charset=UTF-8' },
      { name: 'application-name', content: t('app.title') },
      { name: 'description', content: t('app.description') },
      { name: 'keywords', content: 'Train Simulator, TS Classic, TSW3' },
      { name: 'author', content: 'https://github.com/drumsta/companion-for-ts' },
      { name: 'og:site_name', content: t('app.title') },
      { name: 'og:description', content: t('app.description') },
      ...(i18nHead.value.meta ?? []),
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: computed(() =>
          colorMode.preference === 'dark' || (colorMode.preference === 'system' && colorMode.value === 'dark')
            ? '/favicon-dark.svg'
            : '/favicon.svg',
        ),
      },
      {
        rel: 'me',
        type: 'text/html',
        href: 'https://github.com/drumsta/companion-for-ts',
      },
      ...(i18nHead.value.link ?? []),
    ],
    bodyAttrs: {
      class: 'antialiased text-theme-text bg-theme-bg',
    },
  });
</script>
