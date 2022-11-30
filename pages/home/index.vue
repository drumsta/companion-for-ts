<!-- https://nuxt.com/docs/guide/directory-structure/layouts#overriding-a-layout-on-a-per-page-basis -->
<template>
    <div>
        <!-- Since this is an authenticated page, we will not be using the default layout that does not have a navbar. -->
        <!-- We will be using the custom navbar in /layouts/custom.vue -->
        <NuxtLayout name="custom"> Home page (Logged in user) </NuxtLayout>
    </div>
</template>
<script setup></script>
