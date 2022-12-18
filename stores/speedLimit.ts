import { useLocalStorage } from '@vueuse/core';
import { defineStore, skipHydrate } from 'pinia';
import type { Ref } from 'vue';

interface SpeedLimitStore {
  speedLimit: Ref<number>;
}

function setupStore(): SpeedLimitStore {
  const speedLimit: Ref<number> = useLocalStorage('app/speed-limit', 50);

  const store: SpeedLimitStore = {
    speedLimit: skipHydrate(speedLimit),
  };

  return store;
}

export const useSpeedLimitStore = defineStore('speedLimit', setupStore);
