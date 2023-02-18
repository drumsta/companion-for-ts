/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { defineMapStore } from "@src/stores/mapStore";

export type SpeedLimitStore = {
  rollingStock: string;
  speedUnits: string;
  maxSpeed: number;
  speedLimit: number;
};

const initialValue: SpeedLimitStore = {
  rollingStock: "",
  speedUnits: "km/h",
  maxSpeed: 120,
  speedLimit: 60,
};

const prefix = "app/";

export const speedLimitStore = defineMapStore(initialValue, prefix);
