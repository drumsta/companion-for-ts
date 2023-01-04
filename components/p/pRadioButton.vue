<template>
  <div
    ref="container"
    class="flex flex-row ml-2"
    :class="props.containerClass"
    role="radiogroup"
    :aria-labelledby="props.ariaLabelledby"
    :aria-label="props.ariaLabel"
  >
    <div
      v-for="(option, i) of props.options"
      :key="option.key"
      class="bg-theme-bg-subtle border-theme-border rounded-md cursor-pointer border-1 m-0 text-theme-text py-1 px-4 justify-center items-center select-none inline-flex hover:(underline) focus:(underline z-1) first-of-type:(rounded-tr-none rounded-br-none) last-of-type:(rounded-tl-none rounded-bl-none) not-last:(border-r-0) not-first-of-type:not-last-of-type:(rounded-none) "
      :class="
        (props.buttonClass,
        isSelected(option) ? (props.checkedButtonClass === '' ? 'bg-theme-primary' : props.checkedButtonClass) : '')
      "
      role="radio"
      :tabindex="getTabIndex(i)"
      :aria-label="option.value"
      :aria-checked="isSelected(option)"
      @click="onClick($event, option, i)"
      @keydown="onKeydown($event, option, i)"
    >
      <slot name="option" :option="option" :index="i">
        <span>{{ option.value }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Ref } from 'vue';

  export interface Props {
    modelValue: string;
    options: { key: string; value: string }[];
    unselectable?: boolean;
    disabled?: boolean;
    containerClass?: string;
    buttonClass?: string;
    checkedButtonClass?: string;
    tabindex?: number;
    ariaLabelledby?: string;
    ariaLabel?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    unselectable: false,
    disabled: false,
    containerClass: '',
    buttonClass: '',
    checkedButtonClass: '',
    tabindex: 0,
    ariaLabelledby: '',
    ariaLabel: '',
  });

  const emit = defineEmits<(event: 'change' | 'update:modelValue', modelValue: string) => void>();

  const container = ref<HTMLElement>();

  const focusedIndex: Ref<number> = ref(0);

  onMounted(() => {
    if (typeof container.value === 'undefined') {
      return;
    }

    for (let i = 0; i <= container.value.children.length - 1; i += 1) {
      if (container.value.children[i]?.getAttribute('aria-checked') === 'true') {
        focusedIndex.value = i;
      }
    }
  });

  const getTabIndex = function getTabIndex(i: number): string {
    return i === focusedIndex.value ? '0' : '-1';
  };

  const isSelected = function isSelected(option: { key: string; value: string }): boolean {
    return props.modelValue === option.key;
  };

  const changeTabIndexes = function changeTabIndexes(direction: 'next' | 'prev'): void {
    if (typeof container.value === 'undefined') {
      return;
    }

    let firstTabableChild: { element: Element | undefined; index: number } | undefined;
    let index = 0;

    for (let i = 0; i <= container.value.children.length - 1; i += 1) {
      if (container.value.children[i]?.getAttribute('tabindex') === '0')
        firstTabableChild = { element: container.value.children[i], index: i };
    }

    if (typeof firstTabableChild === 'undefined') {
      return;
    }

    if (direction === 'prev') {
      if (firstTabableChild.index === 0) {
        index = container.value.children.length - 1;
      } else {
        index = firstTabableChild.index - 1;
      }
    }

    if (direction === 'next') {
      if (firstTabableChild.index === container.value.children.length - 1) {
        index = 0;
      } else {
        index = firstTabableChild.index + 1;
      }
    }

    focusedIndex.value = index;

    const element: Element | undefined = container.value.children[index];
    if (element instanceof HTMLDivElement) {
      element.focus();
    }
  };

  const onClick = function onClick(
    _event: KeyboardEvent | MouseEvent,
    option: { key: string; value: string },
    index: number,
  ): void {
    if (props.disabled) {
      return;
    }

    const selected: boolean = isSelected(option);

    if (selected && !props.unselectable) {
      return;
    }

    const newValue: string = selected ? '' : option.key;
    focusedIndex.value = index;

    emit('update:modelValue', newValue);
    emit('change', newValue);
  };

  const onKeydown = function onKeydown(
    event: KeyboardEvent,
    option: { key: string; value: string },
    index: number,
  ): void {
    switch (event.code) {
      case 'Space': {
        onClick(event, option, index);
        break;
      }
      case 'ArrowDown':
      case 'ArrowRight': {
        changeTabIndexes('next');
        break;
      }
      case 'ArrowUp':
      case 'ArrowLeft': {
        changeTabIndexes('prev');
        break;
      }
      default:
        return;
    }

    event.preventDefault();
  };
</script>
