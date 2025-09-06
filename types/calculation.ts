export interface RoomData {
  length: number;
  width: number;
  height: number;
  lengthUnit: 'm' | 'ft';
  
  // Transmission data
  wallUFactor: number;
  ceilingUFactor: number;
  floorUFactor: number;
  wallHours: number;
  ceilingHours: number;
  floorHours: number;
}

export interface ProductData {
  massBeforeFreezing: number;
  massUnit: 'kg' | 'lbs';
  cpAboveFreezing: number;
  pullDownHours: number;
  
  // Respiration
  respirationMass: number;
  watts: number;

  // Preset selection
  productName?: string; // e.g., 'Banana', 'Custom'
  overridePreset?: boolean; // if user edits fields after preset
}

// Freezer-specific product data
export interface FreezerProductData extends ProductData {
  // Latent heat for freezing
  latentHeatOfFusion: number; // kJ/kg
  
  // Cp below freezing
  cpBelowFreezing: number; // kJ/kg·K
  
  // Freezing point
  freezingPoint: number; // °C
}

// Freezer-specific miscellaneous data
export interface FreezerMiscellaneousData extends MiscellaneousData {
  // Freezer-specific parameters
  productOutgoingFreezer?: number; // Final temperature after freezing
}

export interface MiscellaneousData {
  // Air Change
  airChangeRate: number;
  enthalpyDiff: number;
  hoursOfLoad: number;
  
  // Equipment
  equipmentPower: number;
  equipmentUsageHours: number;
  
  // Occupancy
  occupancyCount: number;
  occupancyHeatEquiv: number;
  occupancyUsageHours: number;
  
  // Lighting
  lightPower: number;
  lightUsageHours: number;
  
  // Heaters
  peripheralHeaters: number;
  doorHeaters: number;
  trayHeaters: number;
  
  // Temperature parameters
  ambientTemp: number;
  roomTemp: number;
  productIncoming: number;
  productOutgoing: number;
  tempUnit: 'C' | 'F';
  
  // Additional Excel parameters
  dailyLoading?: number;
  insulationType?: string;
  insulationThickness?: number;
  cpAboveFreezingMisc?: number;
  pullDownTime?: number;
  airFlowPerFan?: number;
  doorClearOpening?: number;
  storageCapacity?: number;
  maximumStorage?: number;
  steamGenCapacity?: number;
  roomLength?: number;
  hoursOfOperation?: number;
}

export interface CalculationResults {
  // Transmission loads
  wallLoad: number;
  ceilingLoad: number;
  floorLoad: number;
  totalTransmissionLoad: number;
  
  // Product loads
  productLoad: number;
  
  // Respiration load
  respirationLoad: number;
  
  // Air change load
  airChangeLoad: number;
  
  // Miscellaneous loads
  equipmentLoad: number;
  occupancyLoad: number;
  lightLoad: number;
  heaterLoad: number;
  steamHumidifierLoad?: number;
  totalMiscLoad: number;
  
  // Final results
  totalLoad: number;
  totalLoadTR: number;
  capacityTR: number;
  sensibleHeat: number;
  latentHeat: number;
  airQtyRequired: number;
  
  // Additional results
  loadInKJ: number;
  loadInKw: number;
  loadInBtu?: number;
  refrigerationCapacity: number;
  
  // Temperature differences (calculated)
  wallTempDiff: number;
  ceilingTempDiff: number;
  floorTempDiff: number;
  productTempDiff: number;
  
  // Additional Excel matching properties
  dailyLoading?: number;
  insulationType?: string;
  insulationThickness?: number;
}

// Freezer-specific calculation results
export interface FreezerCalculationResults extends CalculationResults {
  // Freezer-specific loads
  beforeFreezingLoad: number;
  latentHeatLoad: number;
  afterFreezingLoad: number;
  totalProductLoad: number;
}