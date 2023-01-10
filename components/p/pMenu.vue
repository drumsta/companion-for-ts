<template>
  <Transition @enter="onEnter()" @leave="onLeave()">
    <div
      v-if="props.isOverlayVisible"
      v-bind="$attrs"
      ref="container"
      class="bg-theme-bg border-theme-border rounded-md border-1 p-1 absolute"
      :class="props.containerClass"
    >
      <ul
        :id="$attrs['id'] + '_list'"
        role="menu"
        :tabindex="props.isOverlayVisible ? 0 : -1"
        :aria-activedescendant="props.isOverlayVisible ? $attrs['id'] + '_' + focusedIndex : ''"
        :aria-label="props.ariaLabel"
        :aria-labelledby="props.ariaLabelledby"
        @keydown="onListKeyDown($event)"
      >
        <li
          v-for="(menuItem, i) of props.menuItems"
          :id="$attrs['id'] + '_' + i"
          ref="itemRefs"
          :key="menuItem.key"
          class="py-1 px-4 hover:(underline) focus:(underline z-1) "
          :class="i === focusedIndex ? props.checkedMenuItemClass : props.menuItemClass"
          role="presentation"
          tabindex="-1"
        >
          <NuxtLink role="menuitem" :to="menuItem.routeLocation" :aria-label="menuItem.label" @click="onMenuItemClick($event)">
            <span>{{ menuItem.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import type { Ref } from 'vue';

  export interface MenuItem {
    key: string;
    label: string;
    routeLocation: string;
  }

  export interface Props {
    menuItems: MenuItem[];
    isOverlayVisible?: boolean;
    containerClass?: string;
    menuItemClass?: string;
    checkedMenuItemClass?: string;
    ariaLabelledby?: string;
    ariaLabel?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    isOverlayVisible: false,
    containerClass: '',
    menuItemClass: '',
    checkedMenuItemClass: 'bg-theme-primary',
    ariaLabelledby: '',
    ariaLabel: '',
  });

  const emit = defineEmits(['outsideClick']);

  const container = ref<HTMLElement>();
  const itemRefs = ref<HTMLElement[]>([]);

  const focusedIndex: Ref<number> = ref(0);

  const changeFocusedOptionIndex = function changeFocusedOptionIndex(index: number): void {
    let itemIndex: number = index;

    if (itemIndex < 0) {
      itemIndex = 0;
    }

    if (itemIndex >= props.menuItems.length) {
      itemIndex = props.menuItems.length - 1;
    }

    focusedIndex.value = itemIndex;
    (itemRefs.value[itemIndex]?.children[0] as HTMLElement).focus();
  };

  const onBodyClick = function onBodyClick(event: MouseEvent): void {
    if (!props.isOverlayVisible) {
      return;
    }

    const isInsideContainer = container.value?.contains(event.target as HTMLElement) ?? false;

    if (isInsideContainer) {
      return;
    }

    emit('outsideClick', event);
  };

  const onMenuItemClick = function onMenuItemClick(event: MouseEvent): void {
    if (!props.isOverlayVisible) {
      return;
    }

    emit('outsideClick', event);
  };

  const onEnter = function onEnter(): void {
    document.addEventListener('click', onBodyClick, true);
    changeFocusedOptionIndex(0);
  };

  const onLeave = function onLeave(): void {
    document.removeEventListener('click', onBodyClick);
  };

  const onListKeyDown = function onListKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowDown':
        changeFocusedOptionIndex(focusedIndex.value + 1);
        break;
      case 'ArrowUp':
        changeFocusedOptionIndex(focusedIndex.value - 1);
        break;
      case 'Home':
        changeFocusedOptionIndex(0);
        break;
      case 'End':
        changeFocusedOptionIndex(props.menuItems.length - 1);
        break;
      case 'Escape':
        emit('outsideClick', event);
        break;
      case 'Tab':
        emit('outsideClick', event);
        break;
      default:
        return;
    }

    event.preventDefault();
  };
</script>
