<script setup lang="ts">
  import type { HeadAugmentations } from '@nuxt/schema';
  import type { ColorModeInstance } from '@nuxtjs/color-mode/dist/runtime/types';
  import type { UseHeadInput } from '@vueuse/head';

  const colorMode: ColorModeInstance = useColorMode();
  const i18nHead = useLocaleHead({ addSeoAttributes: true });

  const useHeadInput: UseHeadInput<HeadAugmentations> = {
    htmlAttrs: {
      ...i18nHead.value.htmlAttrs,
    },
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
