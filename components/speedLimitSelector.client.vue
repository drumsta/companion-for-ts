<script setup lang="ts">
  import { useSpeedLimitStore } from '@/stores/speedLimit';

  const speedLimitStore = useSpeedLimitStore();
  watch(toRef(speedLimitStore, 'maxSpeed'), speedLimitStore.onMaxSpeedChanged);
</script>

<template>
  <div class="flex flex-col justify-center">
    <h3 class="flex justify-center">Max: {{ speedLimitStore.maxSpeed }}</h3>
    <div class="flex justify-center">
      <Slider v-model="speedLimitStore.maxSpeed" class="bg-theme-bg-accent h-1 w-60" :step="30" :min="30" :max="300" />
    </div>
    <br />
    <Knob
      v-model="speedLimitStore.speedLimit"
      class="flex justify-center"
      :min="0"
      :max="speedLimitStore.maxSpeed"
      :step="5"
      :size="300"
      range-color="var(--theme-negative)"
      value-color="var(--theme-positive)"
      text-color="var(--theme-text)"
    />
    <div class="flex h-16 justify-center">
      <PButton class="bg-theme-negative text-theme-light ml-0 w-16" @click="speedLimitStore.change(-25)">-25</PButton>
      <PButton class="bg-theme-negative text-theme-light w-16" @click="speedLimitStore.change(-10)">-10</PButton>
      <PButton class="bg-theme-negative text-theme-light w-16" @click="speedLimitStore.change(-5)">-5</PButton>
      <PButton class="bg-theme-positive text-theme-light w-16" @click="speedLimitStore.change(5)">5</PButton>
      <PButton class="bg-theme-positive text-theme-light w-16" @click="speedLimitStore.change(10)">10</PButton>
      <PButton class="bg-theme-positive text-theme-light w-16" @click="speedLimitStore.change(25)">25</PButton>
    </div>
  </div>
</template>

<style scoped>
  .p-slider,
  .p-slider-range {
    background: var(--theme-primary);
  }
</style>
