<script setup lang="ts">
  const localePath = useLocalePath();
  const route = useRoute();
</script>

<template>
  <NuxtLink class="hover:text-theme-text-accent" :to="localePath('index')">Home page</NuxtLink>
  <NuxtLink class="hover:text-theme-text-accent" :to="localePath('about')">About</NuxtLink>
  <NuxtLink class="hover:text-theme-text-accent" :to="localePath('contact')">Contact</NuxtLink>
  <slot />

  <div>
    Current route: <code>{{ route.path }}</code>
  </div>
</template>

<style scoped>
  .router-link-exact-active {
    color: var(--theme-text-accent);
  }
</style>
