<template>
  <div class="flex flex-col justify-center items-center">
    <h2 id="maxSpeed">Max Speed: {{ speedLimitStore.maxSpeed }}</h2>
    <br />
    <PSlider
      v-model="speedLimitStore.maxSpeed"
      aria-labelledby="maxSpeed"
      container-class="bg-theme-secondary w-75"
      range-class="bg-theme-primary"
      handle-class="bg-theme-bg border-theme-primary"
      :tabindex="0"
      :min="30"
      :max="300"
      :step="10"
    />
    <br />
    <PKnob
      v-model="speedLimitStore.speedLimit"
      aria-label="Current Speed"
      :tabindex="0"
      :min="0"
      :max="speedLimitStore.maxSpeed"
      :step="5"
      :size="300"
      range-class="stroke-theme-negative"
      value-class="stroke-theme-positive"
      text-class="fill-theme-text"
    />
    <br />
    <div
      class="flex h-14 justify-center"
      role="spinbutton"
      aria-label="Current Speed"
      aria-valuemin="0"
      tabindex="0"
      :aria-valuenow="speedLimitStore.speedLimit"
      :aria-valuemax="speedLimitStore.maxSpeed"
    >
      <PButton
        class="bg-theme-negative text-theme-light w-14 hover:(opacity-100)"
        type="button"
        @click="speedLimitStore.change(-25)"
        >-25</PButton
      >
      <PButton
        class="bg-theme-negative text-theme-light w-14 hover:(opacity-100)"
        type="button"
        @click="speedLimitStore.change(-10)"
        >-10</PButton
      >
      <PButton
        class="bg-theme-negative text-theme-light w-14 hover:(opacity-100)"
        type="button"
        @click="speedLimitStore.change(-5)"
        >-5</PButton
      >
      <PButton
        class="bg-theme-positive text-theme-light w-14 hover:(opacity-100)"
        type="button"
        @click="speedLimitStore.change(5)"
        >+5</PButton
      >
      <PButton
        class="bg-theme-positive text-theme-light w-14 hover:(opacity-100)"
        type="button"
        @click="speedLimitStore.change(10)"
        >+10</PButton
      >
      <PButton
        class="bg-theme-positive text-theme-light mr-2 w-14 hover:(opacity-100)"
        type="button"
        @click="speedLimitStore.change(25)"
        >+25</PButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useSpeedLimitStore } from '@/stores/speedLimit';

  const speedLimitStore = useSpeedLimitStore();
  watch(toRef(speedLimitStore, 'maxSpeed'), speedLimitStore.onMaxSpeedChanged);
</script>
