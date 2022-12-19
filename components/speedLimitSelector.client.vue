<script setup lang="ts">
  import { useSpeedLimitStore } from '@/stores/speedLimit';

  const speedLimitStore = useSpeedLimitStore();
</script>

<template>
  <Knob
    v-model="speedLimitStore.speedLimit"
    class="flex justify-center"
    :min="0"
    :max="100"
    :step="5"
    :size="300"
    range-color="var(--theme-bg-negative)"
    value-color="var(--theme-bg-positive)"
    text-color="var(--theme-text-accent)"
  />
  <VisualsButton label="-5" />
</template>
