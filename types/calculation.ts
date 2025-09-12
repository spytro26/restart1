export interface RoomData {
  length: number;
  width: number;
  height: number;
  lengthUnit: 'm' | 'ft';
  
  // Insulation data
  insulationType: string;
  wallInsulationThickness: number;
  ceilingInsulationThickness: number;
  floorInsulationThickness: number;
  
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
  
  // Product temperatures - NEW FIELDS
  enteringTemp: number;        // Product entering temperature
  finalTemp: number;           // Product final temperature  
  tempUnit: 'C' | 'F';        // Temperature unit for product temps
  
  cpAboveFreezing: number;
  cpBelowFreezing?: number; // Optional for products that may freeze
  freezingPoint?: number; // Optional freezing point
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
  
  // Additional Excel parameters for blast freezer
  fanMotorRating?: number; // kW per fan
  fanQuantity?: number; // Number of fans
  numberOfPeople?: number; // Excel shows 4.6 people
  peopleUsageFactor?: number; // Excel shows 0.5 usage factor
  lightPowerKw?: number; // kW lighting power
  lightUsageHours?: number; // Hours of lighting usage
  
  // Heater specifications from Excel
  peripheralHeaterPower?: number; // kW per heater
  peripheralHeaterQuantity?: number; // Number of peripheral heaters
  doorHeaterPower?: number; // kW per door heater
  doorHeaterQuantity?: number; // Number of door heaters
  trayHeaterPower?: number; // kW per tray heater
  trayHeaterQuantity?: number; // Number of tray heaters
  drainHeaterPower?: number; // kW per drain heater
  drainHeaterQuantity?: number; // Number of drain heaters
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
  productIncoming: number;  // Product entering temperature
  productOutgoing: number;  // Product final temperature
  tempUnit: 'C' | 'F';
  
  // Additional Excel parameters
  dailyLoading?: number;
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
  
  // Storage capacity validation (Excel methodology)
  storageCapacityValid?: boolean;
  maxStorageCapacity?: number;
  storageUtilization?: number;
}

// Freezer-specific calculation results
export interface FreezerCalculationResults extends CalculationResults {
  // Freezer-specific loads
  beforeFreezingLoad: number;
  latentHeatLoad: number;
  afterFreezingLoad: number;
  totalProductLoad: number;
}