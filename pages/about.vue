<template>
  <main class="flex flex-col justify-center items-center">
    <h1>{{ t('lorem-ipsum') }}</h1>
  </main>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  useHead({
    title: t('pages.about.title'),
    meta: [{ name: 'og:og:title', content: t('pages.about.title') }],
  });
</script>
