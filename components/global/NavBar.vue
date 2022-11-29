<template>
  <div class="nav-bar">
    <NuxtLink to="/home">Home page</NuxtLink>
    <NuxtLink to="/about">About page</NuxtLink>
    <NuxtLink to="/contact">Contact page</NuxtLink>
    <NuxtLink to="/">Logout</NuxtLink>
  </div>
</template>
<style>
.nav-bar {
  display: flex;
  width: 500px;
  margin: 0 auto;
  margin-bottom: 100px;
  justify-content: space-between;
}
</style>
