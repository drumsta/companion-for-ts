/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { useData } from "@src/data/data";

export type RollingStockClass = {
  rollingStockClass: string;
  rollingStockModel: string;
  manufacturerName: string;
  rollingStockFamily: string;
  rollingStockCategory: string;
  typeDescription: string;
  transmissionType: string;
  powerType: string;
  primeMover: string;
  electrificationRequirements: {
    powerSource: string;
    currentCollector: string;
    supplyType: {
      current: string;
      voltage: string;
      frequency: string;
    };
    maximumSpeed: number;
  }[];
  brakingSystem: string | string[];
  maximumSpeed: number;
  speedUnits: string;
};

export const rollingStockClassList = await useData<RollingStockClass>("/json/rolling-stock-class.json");
