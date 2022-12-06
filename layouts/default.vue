<script setup lang="ts">
  const route = useRoute();
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLink to="/">Home page</NuxtLink>
    <NuxtLink to="/about">About</NuxtLink>
    <NuxtLink to="/contact">Contact</NuxtLink>
    <slot />

    <div>
      Current route: <code>{{ route.path }}</code>
    </div>
  </div>
</template>
