<template>
  <div ref="container" class="h-1 relative" :class="props.containerClass" @click="onClick($event)">
    <span class="h-full top-0 left-0 absolute block" :class="props.rangeClass" :style="rangeStyle()" />
    <span
      class="cursor-grab border-2 rounded-1/2 h-6 -mt-3 -ml-3 top-1/2 w-6 absolute touch-none block"
      role="slider"
      :class="props.handleClass"
      :style="handleStyle()"
      @touchstart="onDragStart($event)"
      @touchmove="onDrag($event)"
      @touchend="onDragEnd($event)"
      @mousedown="onMouseDown($event)"
      @keydown="onKeyDown($event)"
    />
  </div>
</template>

<script setup lang="ts">
  export interface Props {
    modelValue: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    containerClass?: string;
    rangeClass?: string;
    handleClass?: string;
  }

  export interface Events {
    (event: 'update:modelValue', modelValue: number): void;
    (event: 'change', modelValue: number): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: 0,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    containerClass: '',
    rangeClass: '',
    handleClass: '',
  });

  const emit = defineEmits<Events>();

  const container = ref<HTMLElement | null>(null);

  let initX: number | undefined;
  let barWidth: number | undefined;
  let dragging = false;

  function handlePosition(): number {
    if (props.modelValue < props.min) {
      return 0;
    }

    if (props.modelValue > props.max) {
      return 100;
    }

    return ((props.modelValue - props.min) * 100) / (props.max - props.min);
  }

  function rangeStyle(): { width: string } {
    return { width: handlePosition() + '%' };
  }

  function handleStyle(): { left: string } {
    return { left: handlePosition() + '%' };
  }

  const onBeforeUnmountHandler = () => {
    unbindDragListeners();
  };

  onBeforeUnmount(onBeforeUnmountHandler);

  function setValue(event: MouseEvent | TouchEvent): void {
    let handleValue: number;
    let pageX: number | undefined = event instanceof TouchEvent ? event.touches[0]?.pageX : event.pageX;

    if (pageX === undefined || initX === undefined || barWidth === undefined) {
      return;
    }

    handleValue = ((pageX - initX) * 100) / barWidth;

    let newValue: number = (props.max - props.min) * (handleValue / 100) + props.min;

    if (props.step != 0) {
      const oldValue: number = props.modelValue;
      const diff: number = newValue - oldValue;

      if (diff < 0) {
        newValue = oldValue + Math.ceil(newValue / props.step - oldValue / props.step) * props.step;
      } else if (diff > 0) {
        newValue = oldValue + Math.floor(newValue / props.step - oldValue / props.step) * props.step;
      }
    } else {
      newValue = Math.floor(newValue);
    }

    updateModel(newValue);
  }

  function updateModel(value: number): void {
    let newValue: number = parseFloat(value.toFixed(10));
    let modelValue: number;

    if (newValue < props.min) {
      newValue = props.min;
    } else if (newValue > props.max) {
      newValue = props.max;
    }

    modelValue = newValue;

    emit('update:modelValue', modelValue);
    emit('change', modelValue);
  }

  function onClick(event: MouseEvent): void {
    if (props.disabled) {
      return;
    }

    updateDomData();
    setValue(event);
  }

  function onDragStart(event: TouchEvent | MouseEvent): void {
    if (props.disabled) {
      return;
    }

    dragging = true;
    updateDomData();
    event.preventDefault();
  }

  function onDrag(event: TouchEvent | MouseEvent): void {
    if (dragging) {
      setValue(event);
      event.preventDefault();
    }
  }

  function onDragEnd(_event: TouchEvent | MouseEvent): void {
    if (dragging) {
      dragging = false;
    }
  }

  function onMouseDown(event: MouseEvent): void {
    bindDragListeners();
    onDragStart(event);
  }

  function bindDragListeners(): void {
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', onDragEnd);
  }

  function unbindDragListeners(): void {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', onDragEnd);
  }

  function onKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowDown':
      case 'ArrowLeft':
        decrementValue(event);
        event.preventDefault();
        break;
      case 'ArrowUp':
      case 'ArrowRight':
        incrementValue(event);
        event.preventDefault();
        break;
      case 'PageDown':
        decrementValue(event, true);
        event.preventDefault();
        break;
      case 'PageUp':
        incrementValue(event, true);
        event.preventDefault();
        break;
      case 'Home':
        updateModel(props.min);
        event.preventDefault();
        break;
      case 'End':
        updateModel(props.max);
        event.preventDefault();
        break;
      default:
        break;
    }
  }

  function decrementValue(event: Event, pageKey = false) {
    let newValue: number;

    if (props.step != 0) {
      newValue = props.modelValue - props.step;
    } else if (props.step === 0 && pageKey) {
      newValue = props.modelValue - 10;
    } else {
      newValue = props.modelValue - 1;
    }

    updateModel(newValue);
    event.preventDefault();
  }

  function incrementValue(event: Event, pageKey = false) {
    let newValue: number;

    if (props.step != 0) {
      newValue = props.modelValue + props.step;
    } else if (props.step === 0 && pageKey) {
      newValue = props.modelValue + 10;
    } else {
      newValue = props.modelValue + 1;
    }

    updateModel(newValue);
    event.preventDefault();
  }

  function updateDomData(): void {
    const rect: DOMRect | undefined = container.value?.getBoundingClientRect();

    if (rect === undefined) {
      return;
    }

    initX = rect.left + getWindowScrollLeft();
    barWidth = container.value?.offsetWidth;
  }

  function getWindowScrollLeft(): number {
    const doc: HTMLElement = document.documentElement;

    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  }
</script>
