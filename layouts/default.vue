<template>
  <div class="text-s">Companion for TS</div>
  <slot />
  <footer>
    <nav
      class="bg-theme-bg-subtle flex h-20 text-base inset-x-0 bottom-0 fixed"
      :aria-label="t('layouts.default.navigation-target')"
    >
      <ul class="flex flex-grow justify-around" role="list">
        <li>
          <NuxtLink
            class="flex flex-col w-25 items-center hover:(border-t-2) focus:(border-t-2)"
            :to="localePath('index')"
            exact-active-class="border-t-2 border-theme-border-accent text-theme-text-accent"
          >
            <PSvg name="trip" svg-class="h-10" />
            <span>{{ t('layouts.default.drive') }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import type { LocalePathFunction } from 'vue-i18n-routing';

  const { t } = useI18n();

  const localePath: LocalePathFunction = useLocalePath();
</script>
