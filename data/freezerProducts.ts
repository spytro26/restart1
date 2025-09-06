// Freezer product presets based on Excel data and refrigeration engineering
export interface FreezerProductPreset {
  name: string;
  cpAboveFreezing: number;  // kJ/kg·K
  cpBelowFreezing: number;  // kJ/kg·K
  latentHeatOfFusion: number; // kJ/kg
  freezingPoint: number;    // °C
  respirationWatts: number; // W/tonne (usually 0 for frozen products)
}

export const freezerProducts: FreezerProductPreset[] = [
  {
    name: 'Custom',
    cpAboveFreezing: 3.74,
    cpBelowFreezing: 1.96,
    latentHeatOfFusion: 233,
    freezingPoint: -0.8,
    respirationWatts: 0,
  },
  {
    name: 'Meat',
    cpAboveFreezing: 3.74,  // Typical for meat
    cpBelowFreezing: 1.96,
    latentHeatOfFusion: 233, // Typical for meat
    freezingPoint: -0.8,
    respirationWatts: 0,     // No respiration when frozen
  },
  {
    name: 'Fish',
    cpAboveFreezing: 3.68,   // Typical for fish
    cpBelowFreezing: 1.89,
    latentHeatOfFusion: 245, // Higher water content
    freezingPoint: -1.2,
    respirationWatts: 0,
  },
  {
    name: 'Poultry',
    cpAboveFreezing: 3.52,
    cpBelowFreezing: 1.84,
    latentHeatOfFusion: 218,
    freezingPoint: -0.6,
    respirationWatts: 0,
  },
  {
    name: 'Vegetables',
    cpAboveFreezing: 3.89,   // Higher water content
    cpBelowFreezing: 2.05,
    latentHeatOfFusion: 280, // High water content
    freezingPoint: -0.5,
    respirationWatts: 0,
  },
  {
    name: 'Ice Cream',
    cpAboveFreezing: 3.14,   // Dairy product
    cpBelowFreezing: 1.72,
    latentHeatOfFusion: 196, // Lower water content due to sugars/fats
    freezingPoint: -2.8,     // Lower due to sugars
    respirationWatts: 0,
  },
];
