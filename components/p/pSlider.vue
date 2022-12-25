<template>
  <div ref="container" class="h-1 relative" :class="props.containerClass" @click="onClick($event)">
    <span class="h-full top-0 left-0 absolute block" :class="props.rangeClass" :style="rangeStyle()" />
    <span
      class="cursor-grab border-2 rounded-1/2 h-6 -mt-3 -ml-3 top-1/2 w-6 absolute touch-none block"
      role="slider"
      aria-orientation="horizontal"
      :class="props.handleClass"
      :style="handleStyle()"
      :tabindex="props.disabled ? -1 : props.tabindex"
      :aria-valuemin="props.min"
      :aria-valuemax="props.max"
      :aria-valuenow="props.modelValue"
      :aria-labelledby="props.ariaLabelledby"
      :aria-label="props.ariaLabel"
      @keydown="onKeyDown($event)"
      @mousedown="onMouseDown($event)"
      @mouseup="onMouseUp($event)"
      @touchstart="onTouchStart($event)"
      @touchend="onTouchEnd($event)"
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
    tabindex?: number;
    ariaLabelledby?: string;
    ariaLabel?: string;
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
    tabindex: 0,
    ariaLabelledby: '',
    ariaLabel: '',
  });

  const emit = defineEmits<(event: 'change' | 'update:modelValue', modelValue: number) => void>();

  const container = ref<HTMLElement | null>(null);

  let initX = 0;
  let barWidth = 1;

  const handlePosition = function handlePosition(): number {
    if (props.modelValue < props.min) {
      return 0;
    }

    if (props.modelValue > props.max) {
      return 100;
    }

    return ((props.modelValue - props.min) * 100) / (props.max - props.min);
  };

  const rangeStyle = function rangeStyle(): { width: string } {
    return { width: `${handlePosition().toString()}%` };
  };

  const handleStyle = function handleStyle(): { left: string } {
    return { left: `${handlePosition().toString()}%` };
  };

  const updateModel = function updateModel(value: number): void {
    let newValue: number = parseFloat(value.toFixed(10));

    if (newValue < props.min) {
      newValue = props.min;
    }

    if (newValue > props.max) {
      newValue = props.max;
    }

    emit('update:modelValue', newValue);
    emit('change', newValue);
  };

  const updateValue = function updateValue(pageX: number): void {
    const handleValue: number = ((pageX - initX) * 100) / barWidth;
    const oldValue: number = props.modelValue;
    let newValue: number = (props.max - props.min) * (handleValue / 100) + props.min;
    const diff: number = newValue - oldValue;

    if (diff < 0) {
      newValue = oldValue + Math.ceil(newValue / props.step - oldValue / props.step) * props.step;
    }

    if (diff > 0) {
      newValue = oldValue + Math.floor(newValue / props.step - oldValue / props.step) * props.step;
    }

    updateModel(newValue);
  };

  const getWindowScrollLeft = function getWindowScrollLeft(): number {
    const doc: HTMLElement = document.documentElement;

    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  };

  const updateDomData = function updateDomData(): void {
    const rect: DOMRect | undefined = container.value?.getBoundingClientRect();

    if (typeof rect === 'undefined') {
      return;
    }

    initX = rect.left + getWindowScrollLeft();
    barWidth = container.value?.offsetWidth ?? 1;
  };

  const onClick = function onClick(event: MouseEvent): void {
    if (props.disabled) {
      return;
    }

    updateDomData();
    updateValue(event.pageX);
  };

  const onMouseMove = function onMouseMove(event: MouseEvent): void {
    if (props.disabled) {
      return;
    }

    updateValue(event.pageX);
    event.preventDefault();
  };

  const onMouseUp = function onMouseUp(event: MouseEvent): void {
    if (props.disabled) {
      return;
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    event.preventDefault();
  };

  const onMouseDown = function onMouseDown(event: MouseEvent): void {
    if (props.disabled) {
      return;
    }

    updateDomData();
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseup', onMouseUp, { passive: true });
    event.preventDefault();
  };

  const onTouchMove = function onTouchMove(event: TouchEvent): void {
    if (props.disabled || event.touches.length !== 1) {
      return;
    }

    const [touch] = event.targetTouches;

    if (typeof touch === 'undefined') {
      return;
    }

    updateValue(touch.pageX);
    event.preventDefault();
  };

  const onTouchEnd = function onTouchEnd(event: TouchEvent): void {
    if (props.disabled) {
      return;
    }

    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
    event.preventDefault();
  };

  const onTouchStart = function onTouchStart(event: TouchEvent): void {
    if (props.disabled) {
      return;
    }

    updateDomData();
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    event.preventDefault();
  };

  const onKeyDown = function onKeyDown(event: KeyboardEvent): void {
    if (props.disabled) {
      return;
    }

    switch (event.code) {
      case 'ArrowDown':
      case 'ArrowLeft': {
        updateModel(props.modelValue - props.step);
        break;
      }
      case 'ArrowUp':
      case 'ArrowRight': {
        updateModel(props.modelValue + props.step);
        break;
      }
      case 'PageDown': {
        updateModel(props.modelValue - props.step * 10);
        break;
      }
      case 'PageUp': {
        updateModel(props.modelValue + props.step * 10);
        break;
      }
      case 'Home': {
        updateModel(props.min);
        break;
      }
      case 'End': {
        updateModel(props.max);
        break;
      }
      default: {
        return;
      }
    }

    event.preventDefault();
  };
</script>
