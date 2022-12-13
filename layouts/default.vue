<script setup lang="ts">
  const route = useRoute();
</script>

<template>
  <div>
    Current route: <code>{{ route.path }}</code>
  </div>

  <slot />

  <NavigationBar />
</template>

<style scoped>
  .router-link-exact-active {
    color: var(--theme-text-accent);
  }
</style>
