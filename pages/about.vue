<script setup lang="ts">
  import type { PageMeta } from 'nuxt/dist/pages/runtime/composables';

  definePageMeta({
    layout: 'default',
  } as PageMeta);
</script>

<template>
  <div>
    <h1>{{ $t('pages.index.lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit-illo-cupiditate') }}</h1>
  </div>
</template>
