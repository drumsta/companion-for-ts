<template>
  <section class="flex flex-col justify-center items-center" :title="t('components.speed-limit-selector.title')">
    <div class="flex flex-row items-center">
      <span id="maxSpeed">
        {{ t('components.speed-limit-selector.max-speed', { maxSpeed: speedLimitStore.maxSpeed }) }}
      </span>
      <PRadioButton
        v-model="speedLimitStore.speedUnits"
        :options="speedUnits"
        :aria-label="t('components.speed-limit-selector.select-speed-units')"
      />
    </div>
    <PSlider
      v-model="speedLimitStore.maxSpeed"
      aria-labelledby="maxSpeed"
      container-class="bg-theme-secondary w-75 mt-6"
      range-class="bg-theme-primary"
      handle-class="bg-theme-bg border-theme-primary"
      :tabindex="0"
      :min="30"
      :max="300"
      :step="10"
    />
    <PKnob
      v-model="speedLimitStore.speedLimit"
      :aria-label="t('components.speed-limit-selector.current-speed')"
      :tabindex="0"
      :min="0"
      :max="speedLimitStore.maxSpeed"
      :step="5"
      :size="300"
      :show-value2="true"
      :show-value3="true"
      :value-template2="getActiveSpeedUnitValue() ?? ''"
      :value-template3="`${normalizeSpeedValue(convertSpeedUnits())} ${getAlternateSpeedUnitValue()}`"
      container-class="mt-6"
      range-class="stroke-theme-negative"
      value-class="stroke-theme-positive"
      text-class="fill-theme-text"
    />
    <div
      class="flex h-14 justify-center mt-6"
      role="spinbutton"
      aria-valuemin="0"
      :aria-label="t('components.speed-limit-selector.current-speed')"
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
  </section>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { useSpeedLimitStore } from '@/stores/speedLimit';

  const { t } = useI18n();

  const speedLimitStore = useSpeedLimitStore();
  watch(toRef(speedLimitStore, 'maxSpeed'), speedLimitStore.onMaxSpeedChanged);

  const speedUnits = ref([
    {
      key: 'km/h',
      value: t('components.speed-limit-selector.kph'),
      label: t('components.speed-limit-selector.kilometres-per-hour'),
    },
    {
      key: 'mph',
      value: t('components.speed-limit-selector.mph'),
      label: t('components.speed-limit-selector.miles-per-hour'),
    },
  ]);

  const getActiveSpeedUnitKey = function getActiveSpeedUnitKey(): string | undefined {
    const speedUnitKey: string | undefined = speedUnits.value.find(
      (unit) => unit.key === speedLimitStore.speedUnits,
    )?.key;
    return speedUnitKey;
  };

  const getActiveSpeedUnitValue = function getActiveSpeedUnitValue(): string | undefined {
    const speedUnitValue: string | undefined = speedUnits.value.find(
      (unit) => unit.key === speedLimitStore.speedUnits,
    )?.value;
    return speedUnitValue;
  };

  const getAlternateSpeedUnitValue = function getAlternateSpeedUnitValue(): string | undefined {
    const speedUnitValue: string | undefined = speedUnits.value.find(
      (unit) => unit.key !== speedLimitStore.speedUnits,
    )?.value;
    return speedUnitValue;
  };

  const convertSpeedUnits = function convertSpeedUnits(): number {
    const activeSpeedUnitValue: string | undefined = getActiveSpeedUnitKey();

    if (typeof activeSpeedUnitValue === 'undefined') {
      return 0;
    }

    const mphToKmhFactor = 1.609344;

    if (activeSpeedUnitValue === 'km/h') {
      const mph: number = speedLimitStore.speedLimit / mphToKmhFactor;
      return mph;
    }

    if (activeSpeedUnitValue === 'mph') {
      const kmh: number = speedLimitStore.speedLimit * mphToKmhFactor;
      return kmh;
    }

    return 0;
  };

  const normalizeSpeedValue = function normalizeSpeedValue(speed: number): string {
    if (speed >= 10) {
      const normalizedSpeed: string = speed.toFixed(0);
      return normalizedSpeed;
    }

    if (speed < 10 && speed > 0) {
      const normalizedSpeed: string = speed.toFixed(1);
      return normalizedSpeed;
    }

    return speed.toString();
  };
</script>
