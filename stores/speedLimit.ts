import { useLocalStorage } from '@vueuse/core';
import { defineStore, skipHydrate } from 'pinia';
import type { Ref } from 'vue';

interface SpeedLimitStore {
  speedLimit: Ref<number>;
  maxSpeed: Ref<number>;
  speedUnits: Ref<string>;
  change: (amount: number) => void;
  onMaxSpeedChanged: () => void;
}

const setupStore = function setupStore(): SpeedLimitStore {
  const speedLimit: Ref<number> = useLocalStorage('app/speed-limit', 50);
  const maxSpeed: Ref<number> = useLocalStorage('app/speed-max', 120);
  const speedUnits: Ref<string> = useLocalStorage('app/speed-units', 'km/h');

  const change = function change(amount: number): void {
    speedLimit.value += amount;

    if (speedLimit.value < 0) {
      speedLimit.value = 0;
    }

    if (speedLimit.value > maxSpeed.value) {
      speedLimit.value = maxSpeed.value;
    }
  };

  const onMaxSpeedChanged = function onMaxSpeedChanged(): void {
    if (maxSpeed.value < speedLimit.value) {
      speedLimit.value = maxSpeed.value;
    }
  };

  const store: SpeedLimitStore = {
    speedLimit: skipHydrate(speedLimit),
    maxSpeed: skipHydrate(maxSpeed),
    speedUnits: skipHydrate(speedUnits),
    change,
    onMaxSpeedChanged,
  };

  return store;
};

export const useSpeedLimitStore = defineStore('speedLimit', setupStore);
