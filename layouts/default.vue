<template>
  <div class="flex flex-row text-s justify-between">
    <div>{{ t('app.title-short') }}</div>
    <div>
      <PButton
        aria-haspopup="menu"
        aria-controls="languageMenu"
        :aria-expanded="isMenuVisible"
        :alt="t('layouts.default.language-menu')"
        @click="onLanguageIconClick($event)"
      >
        <PSvg name="locales" svg-class="h-5" />
      </PButton>
      <PMenu
        id="languageMenu"
        :aria-label="t('layouts.default.language-menu')"
        :menu-items="menuItems"
        :is-overlay-visible="isMenuVisible"
        container-class="right-0"
        @outside-click="onLanguageMenuOutsideClick($event)"
      />
    </div>
  </div>
  <slot />
  <footer>
    <nav class="bg-theme-bg-subtle flex h-20 text-base inset-x-0 bottom-0 fixed" :aria-label="t('layouts.default.navigation-target')">
      <ul class="flex flex-grow justify-around">
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
  import type { Ref, ComputedRef } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { MenuItem } from '~~/components/p/pMenu.vue';

  const { t, locales } = useI18n();
  const localePath = useLocalePath();
  const switchLocalePath = useSwitchLocalePath();

  const isMenuVisible: Ref<boolean> = ref(false);

  const menuItems: ComputedRef<MenuItem[]> = computed((): MenuItem[] => {
    const result: MenuItem[] = [];
    locales.value.forEach((locale) => {
      if (typeof locale !== 'string') {
        result.push({ key: locale.code, label: locale.name ?? locale.code, routeLocation: switchLocalePath(locale.code) });
      }
    });
    return result;
  });

  const onLanguageIconClick = function onLanguageIconClick(_event: MouseEvent): void {
    isMenuVisible.value = !isMenuVisible.value;
  };

  const onLanguageMenuOutsideClick = function onLanguageMenuOutsideClick(event: MouseEvent): void {
    isMenuVisible.value = false;
    event.stopPropagation();
  };
</script>
