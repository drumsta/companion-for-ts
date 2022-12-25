<template>
  <main class="flex flex-col justify-center items-center">
    <h1>{{ t('pages.index.header') }}</h1>
    <SpeedLimitSelector />
  </main>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  useHead({
    title: t('pages.index.title'),
    meta: [{ name: 'og:og:title', content: t('pages.index.title') }],
  });
</script>
