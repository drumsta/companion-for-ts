<script setup lang="ts">
  export interface Props {
    foo: string;
  }

  const defaults: Props = {
    foo: 'hello',
  };

  const props = withDefaults(defineProps<Props>(), defaults);

  props.foo;
</script>

<template>
  <button>
    <slot />
  </button>
</template>
