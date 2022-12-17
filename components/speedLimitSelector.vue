<script setup lang="ts">
  const speedLimit = useSpeedLimit();
</script>

<template>
  <div>
    <q-knob
      v-model="speedLimit"
      class="text-orange-600 q-ma-md"
      :step="10"
      show-value
      size="90px"
      :thickness="0.22"
      color="text-orange"
      track-color="text-orange-500"
    />
  </div>
</template>
