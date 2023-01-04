<!-- eslint-disable vue/no-v-html -->
<template>
  <span v-html="icon" />
</template>

<script setup lang="ts">
  import type { Ref } from 'vue';

  export interface Props {
    name: string;
    svgClass?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    name: '',
    svgClass: '',
  });

  const icon: Ref<string> = ref('');

  const iconsImport = import.meta.glob('assets/icons/**/**.svg', { as: 'raw', eager: false });
  const iconFile = iconsImport[`/assets/icons/${props.name}.svg`];

  if (typeof iconFile !== 'undefined') {
    const svg: Record<string, string> = await iconFile();

    for (const key in svg) {
      if (Object.hasOwn(svg, key)) {
        icon.value = icon.value.concat(svg[key] ?? '');
      }
    }

    if (props.svgClass !== '') {
      icon.value = icon.value.replace('<svg ', `<svg class="${props.svgClass}" `);
    }
  }
</script>
