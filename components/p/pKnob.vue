<template>
  <div ref="container" :class="props.containerClass">
    <svg
      role="slider"
      viewBox="0 0 100 100"
      :width="size"
      :height="size"
      @click="onClick($event)"
      @keydown="onKeyDown($event)"
      @mousedown="onMouseDown($event)"
      @mouseup="onMouseUp($event)"
      @touchstart="onTouchStart($event)"
      @touchend="onTouchEnd($event)"
    >
      <path class="fill-none" :class="props.rangeClass" :d="rangePath()" :stroke-width="strokeWidth"></path>
      <path class="fill-none" :class="props.valueClass" :d="valuePath()" :stroke-width="strokeWidth"></path>
      <text v-if="showValue" class="text-center text-xl" :class="props.textClass" :x="50" :y="57" text-anchor="middle">
        {{ valueToDisplay() }}
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
  export interface Props {
    modelValue: number;
    size: number;
    min: number;
    max: number;
    step: number;
    disabled: boolean;
    readonly: boolean;
    strokeWidth: number;
    showValue: boolean;
    valueTemplate: string;
    containerClass: string;
    rangeClass: string;
    valueClass: string;
    textClass: string;
  }

  export interface Events {
    (event: 'update:modelValue', modelValue: number): void;
    (event: 'change', modelValue: number): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: 0,
    size: 100,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    readonly: false,
    strokeWidth: 14,
    showValue: true,
    valueTemplate: '{value}',
    containerClass: '',
    rangeClass: '',
    valueClass: '',
    textClass: '',
  });

  const emit = defineEmits<Events>();

  const container = ref<HTMLElement | null>(null);

  const radius = 40;
  const midX = 50;
  const midY = 50;
  const minRadians: number = (4 * Math.PI) / 3;
  const maxRadians: number = -Math.PI / 3;
  const minX: number = midX + Math.cos(minRadians) * radius;
  const minY: number = midY - Math.sin(minRadians) * radius;
  const maxX: number = midX + Math.cos(maxRadians) * radius;
  const maxY: number = midY - Math.sin(maxRadians) * radius;

  function valueToDisplay(): string {
    return props.valueTemplate.replace(/{value}/g, props.modelValue.toString());
  }

  function rangePath(): string {
    return `M ${minX} ${minY} A ${radius} ${radius} 0 1 1 ${maxX} ${maxY}`;
  }

  function valuePath(): string {
    return `M ${zeroX()} ${zeroY()} A ${radius} ${radius} 0 ${largeArc()} ${sweep()} ${valueX()} ${valueY()}`;
  }

  function zeroRadians(): number {
    if (props.min > 0 && props.max > 0) {
      return mapRange(props.min, props.min, props.max, minRadians, maxRadians);
    } else {
      return mapRange(0, props.min, props.max, minRadians, maxRadians);
    }
  }

  function valueRadians(): number {
    return mapRange(props.modelValue, props.min, props.max, minRadians, maxRadians);
  }

  function zeroX(): number {
    return midX + Math.cos(zeroRadians()) * radius;
  }

  function zeroY(): number {
    return midY - Math.sin(zeroRadians()) * radius;
  }

  function valueX(): number {
    return midX + Math.cos(valueRadians()) * radius;
  }

  function valueY(): number {
    return midY - Math.sin(valueRadians()) * radius;
  }

  function largeArc(): 0 | 1 {
    return Math.abs(zeroRadians() - valueRadians()) < Math.PI ? 0 : 1;
  }

  function sweep(): 0 | 1 {
    return valueRadians() > zeroRadians() ? 0 : 1;
  }

  function updateValue(offsetX: number, offsetY: number): void {
    let dx: number = offsetX - props.size / 2;
    let dy: number = props.size / 2 - offsetY;
    let angle: number = Math.atan2(dy, dx);
    let start: number = -Math.PI / 2 - Math.PI / 6;
    updateModel(angle, start);
  }

  function updateModel(angle: number, start: number): void {
    let mappedValue: number;

    if (angle > maxRadians) {
      mappedValue = mapRange(angle, minRadians, maxRadians, props.min, props.max);
    } else if (angle < start) {
      mappedValue = mapRange(angle + 2 * Math.PI, minRadians, maxRadians, props.min, props.max);
    } else {
      return;
    }

    let newValue: number = Math.round((mappedValue - props.min) / props.step) * props.step + props.min;

    emit('update:modelValue', newValue);
    emit('change', newValue);
  }

  function updateModelValue(newValue: number): void {
    if (newValue > props.max) {
      emit('update:modelValue', props.max);
    } else if (newValue < props.min) {
      emit('update:modelValue', props.min);
    } else {
      emit('update:modelValue', newValue);
    }
  }

  function mapRange(x: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  function onClick(event: MouseEvent): void {
    if (!props.disabled && !props.readonly) {
      updateValue(event.offsetX, event.offsetY);
    }
  }

  function onMouseDown(event: MouseEvent): void {
    if (!props.disabled && !props.readonly) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      event.preventDefault();
    }
  }

  function onMouseMove(event: MouseEvent): void {
    if (!props.disabled && !props.readonly) {
      updateValue(event.offsetX, event.offsetY);
      event.preventDefault();
    }
  }

  function onMouseUp(event: MouseEvent) {
    if (!props.disabled && !props.readonly) {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      event.preventDefault();
    }
  }

  function onTouchStart(event: TouchEvent) {
    if (!props.disabled && !props.readonly) {
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onTouchEnd);
      event.preventDefault();
    }
  }

  function onTouchMove(event: TouchEvent) {
    if (!props.disabled && !props.readonly && event.touches.length == 1) {
      const rect: DOMRect | undefined = container.value?.getBoundingClientRect();
      const touch = event.targetTouches[0];

      if (rect === undefined || touch === undefined) {
        return;
      }

      const offsetX = touch.clientX - rect.left;
      const offsetY = touch.clientY - rect.top;
      updateValue(offsetX, offsetY);
    }
  }

  function onTouchEnd(event: TouchEvent) {
    if (!props.disabled && !props.readonly) {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      event.preventDefault();
    }
  }

  function onKeyDown(event: KeyboardEvent): void {
    if (!props.disabled && !props.readonly) {
      switch (event.code) {
        case 'ArrowRight':
        case 'ArrowUp': {
          event.preventDefault();
          updateModelValue(props.modelValue + 1);
          break;
        }
        case 'ArrowLeft':
        case 'ArrowDown': {
          event.preventDefault();
          updateModelValue(props.modelValue - 1);
          break;
        }
        case 'Home': {
          event.preventDefault();
          emit('update:modelValue', props.min);
          break;
        }
        case 'End': {
          event.preventDefault();
          emit('update:modelValue', props.max);
          break;
        }
        case 'PageUp': {
          event.preventDefault();
          updateModelValue(props.modelValue + 10);
          break;
        }
        case 'PageDown': {
          event.preventDefault();
          updateModelValue(props.modelValue - 10);
          break;
        }
      }
    }
  }
</script>
