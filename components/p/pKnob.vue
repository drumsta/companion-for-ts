<template>
  <div ref="container" :class="props.containerClass">
    <svg
      role="slider"
      viewBox="0 0 100 100"
      :width="props.size"
      :height="props.size"
      :tabindex="props.disabled ? -1 : props.tabindex"
      :aria-valuemin="props.min"
      :aria-valuemax="props.max"
      :aria-valuenow="props.modelValue"
      :aria-labelledby="props.ariaLabelledby"
      :aria-label="props.ariaLabel"
      @click="onClick($event)"
      @keydown="onKeyDown($event)"
      @mousedown="onMouseDown($event)"
      @mouseup="onMouseUp($event)"
      @touchstart="onTouchStart($event)"
      @touchend="onTouchEnd($event)"
    >
      <path class="fill-none" :class="props.rangeClass" :d="rangePath()" :stroke-width="props.strokeWidth"></path>
      <path class="fill-none" :class="props.valueClass" :d="valuePath()" :stroke-width="props.strokeWidth"></path>
      <text
        v-if="props.showValue"
        class="text-center text-xl"
        :class="props.textClass"
        :x="50"
        :y="props.showValue2 ? 47 : 57"
        text-anchor="middle"
      >
        {{ valueToDisplay(props.valueTemplate) }}
      </text>
      <text
        v-if="props.showValue2"
        class="text-center text-xl"
        :class="props.textClass"
        :x="50"
        :y="65"
        text-anchor="middle"
      >
        {{ valueToDisplay(props.valueTemplate2) }}
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
  export interface Props {
    modelValue: number;
    size?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    strokeWidth?: number;
    showValue?: boolean;
    showValue2?: boolean;
    valueTemplate?: string;
    valueTemplate2?: string;
    containerClass?: string;
    rangeClass?: string;
    valueClass?: string;
    textClass?: string;
    tabindex?: number;
    ariaLabelledby?: string;
    ariaLabel?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: 0,
    size: 100,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    strokeWidth: 14,
    showValue: true,
    showValue2: false,
    valueTemplate: '{value}',
    valueTemplate2: '',
    containerClass: '',
    rangeClass: '',
    valueClass: '',
    textClass: '',
    tabindex: 0,
    ariaLabelledby: '',
    ariaLabel: '',
  });

  const emit = defineEmits<(event: 'change' | 'update:modelValue', modelValue: number) => void>();

  const container = ref<HTMLElement | null>(null);
  const three = 3;
  const four = 4;
  const radius = 40;
  const midX = 50;
  const midY = 50;
  const minRadians: number = (four * Math.PI) / three;
  const maxRadians: number = -Math.PI / three;
  const minX: number = midX + Math.cos(minRadians) * radius;
  const minY: number = midY - Math.sin(minRadians) * radius;
  const maxX: number = midX + Math.cos(maxRadians) * radius;
  const maxY: number = midY - Math.sin(maxRadians) * radius;

  const valueToDisplay = function valueToDisplay(valueTemplate: string): string {
    return valueTemplate.replace('{value}', props.modelValue.toString());
  };

  const rangePath = function rangePath(): string {
    return `M ${minX} ${minY} A ${radius} ${radius} 0 1 1 ${maxX} ${maxY}`;
  };

  const mapRange = function mapRange(x: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  const zeroRadians = function zeroRadians(): number {
    if (props.min > 0 && props.max > 0) {
      return mapRange(props.min, props.min, props.max, minRadians, maxRadians);
    }

    return mapRange(0, props.min, props.max, minRadians, maxRadians);
  };

  const valueRadians = function valueRadians(): number {
    return mapRange(props.modelValue, props.min, props.max, minRadians, maxRadians);
  };

  const zeroX = function zeroX(): number {
    return midX + Math.cos(zeroRadians()) * radius;
  };

  const zeroY = function zeroY(): number {
    return midY - Math.sin(zeroRadians()) * radius;
  };

  const largeArc = function largeArc(): 0 | 1 {
    return Math.abs(zeroRadians() - valueRadians()) < Math.PI ? 0 : 1;
  };

  const sweep = function sweep(): 0 | 1 {
    return valueRadians() > zeroRadians() ? 0 : 1;
  };

  const valueX = function valueX(): number {
    return midX + Math.cos(valueRadians()) * radius;
  };

  const valueY = function valueY(): number {
    return midY - Math.sin(valueRadians()) * radius;
  };

  const valuePath = function valuePath(): string {
    return `M ${zeroX()} ${zeroY()} A ${radius} ${radius} 0 ${largeArc()} ${sweep()} ${valueX()} ${valueY()}`;
  };

  const updateModel = function updateModel(value: number): void {
    let newValue: number = value;

    if (newValue < props.min) {
      newValue = props.min;
    }

    if (newValue > props.max) {
      newValue = props.max;
    }

    emit('update:modelValue', newValue);
    emit('change', newValue);
  };

  const updateValue = function updateValue(offsetX: number, offsetY: number): void {
    const dx: number = offsetX - props.size / 2;
    const dy: number = props.size / 2 - offsetY;
    const angle: number = Math.atan2(dy, dx);
    const start: number = -Math.PI / 2 - Math.PI / 6;
    let mappedValue = 0;

    if (angle > maxRadians) {
      mappedValue = mapRange(angle, minRadians, maxRadians, props.min, props.max);
    } else if (angle < start) {
      mappedValue = mapRange(angle + 2 * Math.PI, minRadians, maxRadians, props.min, props.max);
    } else {
      return;
    }

    updateModel(Math.round((mappedValue - props.min) / props.step) * props.step + props.min);
  };

  const onClick = function onClick(event: MouseEvent): void {
    if (props.disabled) {
      return;
    }

    updateValue(event.offsetX, event.offsetY);
  };

  const onMouseMove = function onMouseMove(event: MouseEvent): void {
    if (props.disabled) {
      return;
    }

    updateValue(event.offsetX, event.offsetY);
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

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseup', onMouseUp, { passive: true });
    event.preventDefault();
  };

  const onTouchMove = function onTouchMove(event: TouchEvent): void {
    if (props.disabled || event.touches.length !== 1) {
      return;
    }

    const rect: DOMRect | undefined = container.value?.getBoundingClientRect();
    const [touch] = event.targetTouches;

    if (typeof rect === 'undefined' || typeof touch === 'undefined') {
      return;
    }

    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;
    updateValue(offsetX, offsetY);
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

    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    event.preventDefault();
  };

  const onKeyDown = function onKeyDown(event: KeyboardEvent): void {
    if (props.disabled) {
      return;
    }

    switch (event.code) {
      case 'ArrowLeft':
      case 'ArrowDown': {
        updateModel(props.modelValue - props.step);
        break;
      }
      case 'ArrowRight':
      case 'ArrowUp': {
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
