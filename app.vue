<script setup lang="ts">
  import type { HeadAugmentations } from '@nuxt/schema';
  import type { UseHeadInput } from '@unhead/vue';

  const colorMode = useColorMode();

  useHead({
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
    ],
  } as UseHeadInput<HeadAugmentations>);
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>