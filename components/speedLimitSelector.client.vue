<template>
  <div class="flex flex-col justify-center items-center">
    <h3>Max: {{ speedLimitStore.maxSpeed }}</h3>
    <br />
    <PSlider
      v-model="speedLimitStore.maxSpeed"
      container-class="bg-theme-secondary w-75"
      range-class="bg-theme-primary"
      handle-class="bg-theme-bg border-theme-primary"
      :min="30"
      :max="300"
      :step="10"
    />
    <br />
    <PKnob
      v-model="speedLimitStore.speedLimit"
      :min="0"
      :max="speedLimitStore.maxSpeed"
      :step="5"
      :size="300"
      range-class="stroke-theme-negative"
      value-class="stroke-theme-positive"
      text-class="fill-theme-text"
    />
    <br />
    <div class="flex h-14 justify-center">
      <PButton class="bg-theme-negative text-theme-light w-14 hover:(opacity-100)" @click="speedLimitStore.change(-25)"
        >-25</PButton
      >
      <PButton class="bg-theme-negative text-theme-light w-14 hover:(opacity-100)" @click="speedLimitStore.change(-10)"
        >-10</PButton
      >
      <PButton class="bg-theme-negative text-theme-light w-14 hover:(opacity-100)" @click="speedLimitStore.change(-5)"
        >-5</PButton
      >
      <PButton class="bg-theme-positive text-theme-light w-14 hover:(opacity-100)" @click="speedLimitStore.change(5)"
        >5</PButton
      >
      <PButton class="bg-theme-positive text-theme-light w-14 hover:(opacity-100)" @click="speedLimitStore.change(10)"
        >10</PButton
      >
      <PButton
        class="bg-theme-positive text-theme-light mr-2 w-14 hover:(opacity-100)"
        @click="speedLimitStore.change(25)"
        >25</PButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useSpeedLimitStore } from '@/stores/speedLimit';

  const speedLimitStore = useSpeedLimitStore();
  watch(toRef(speedLimitStore, 'maxSpeed'), speedLimitStore.onMaxSpeedChanged);
</script>
