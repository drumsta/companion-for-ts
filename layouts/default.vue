<script setup lang="ts">
  const route = useRoute();
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLink class="hover:text-theme-text-accent" to="/">Home page</NuxtLink>
    <NuxtLink class="hover:text-theme-text-accent" to="/about">About</NuxtLink>
    <NuxtLink class="hover:text-theme-text-accent" to="/contact">Contact</NuxtLink>
    <slot />

    <div>
      Current route: <code>{{ route.path }}</code>
    </div>
  </div>
</template>

<style scoped>
  .router-link-exact-active {
    color: var(--theme-text-accent);
  }
</style>
