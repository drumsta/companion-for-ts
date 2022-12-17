<script setup lang="ts">
  const speedLimit = useSpeedLimit();
</script>

<template>
  <div>
    <q-knob v-model="speedLimit" class="q-ma-md" :step="10" show-value size="50px" color="lime" :min="0" :max="100" />
  </div>
</template>
