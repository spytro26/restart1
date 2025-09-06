export type ProductPreset = {
  name: string;
  cpAboveFreezing: number; // kJ/kg·K
  respirationWattsPerTonne: number; // W/Tonne
  hasRespiration: boolean;
};

export const PRODUCT_PRESETS: ProductPreset[] = [
  { name: 'Custom', cpAboveFreezing: 4.1, respirationWattsPerTonne: 50, hasRespiration: true },
  { name: 'Banana', cpAboveFreezing: 3.6, respirationWattsPerTonne: 350, hasRespiration: true },
  { name: 'Apple', cpAboveFreezing: 3.6, respirationWattsPerTonne: 250, hasRespiration: true },
  { name: 'Potato', cpAboveFreezing: 3.5, respirationWattsPerTonne: 120, hasRespiration: true },
  { name: 'Meat', cpAboveFreezing: 3.35, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Fish', cpAboveFreezing: 3.7, respirationWattsPerTonne: 0, hasRespiration: false },
];

export const PRODUCT_PRESET_MAP = PRODUCT_PRESETS.reduce<Record<string, ProductPreset>>(
  (acc, p) => {
    acc[p.name] = p;
    return acc;
  },
  {}
);
