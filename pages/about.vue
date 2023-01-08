<template>
  <header class="flex flex-col justify-center items-center">
    <h1>{{ t('lorem-ipsum.header') }}</h1>
    <h2>{{ t('lorem-ipsum.description') }}</h2>
  </header>
  <main>
    <div>{{ t('lorem-ipsum.1') }}</div>
    <div>{{ t('lorem-ipsum.2') }}</div>
    <div>{{ t('lorem-ipsum.3') }}</div>
  </main>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  defineI18nRoute({
    paths: {
      en: '/about',
      lt: '/apie',
    },
  });

  useHead({
    title: t('pages.about.title'),
    meta: [{ name: 'og:title', content: t('pages.about.title') }],
  });
</script>
