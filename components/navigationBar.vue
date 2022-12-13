<script setup lang="ts">
  const localePath = useLocalePath();
</script>

<template>
  <nav
    class="bg-theme-bg-subtle flex inset-x-0 bottom-0 fixed sm:(h-12 text-xs) <sm:(h-10 text-xs) md:(h-16 text-sm) lg:(h-20 text-base) "
  >
    <ul class="flex flex-grow justify-around">
      <li>
        <NuxtLink class="hover:text-theme-text-accent" :to="localePath('index')"><span>Home page</span></NuxtLink>
      </li>
      <li>
        <NuxtLink class="hover:text-theme-text-accent" :to="localePath('about')"><span>About</span></NuxtLink>
      </li>
      <li>
        <NuxtLink class="hover:text-theme-text-accent" :to="localePath('contact')"><span>Contact</span></NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
  .router-link-exact-active {
    color: var(--theme-text-accent);
    border-top-color: var(--theme-text-accent);
    border-top-width: 2px;
  }
</style>
