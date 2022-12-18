<script setup lang="ts">
  import type { HeadAugmentations } from '@nuxt/schema';
  import type { ColorModeInstance } from '@nuxtjs/color-mode/dist/runtime/types';
  import type { UseHeadInput } from '@vueuse/head';

  const colorMode: ColorModeInstance = useColorMode();

  const useHeadInput: UseHeadInput<HeadAugmentations> = {
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
  };

  useHead(useHeadInput);
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
