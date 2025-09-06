import { RoomData, ProductData, MiscellaneousData, CalculationResults } from '@/types/calculation';

// Unit conversion functions
export const convertLength = (value: number, from: 'm' | 'ft', to: 'm' | 'ft'): number => {
  if (from === to) return value;
  if (from === 'ft' && to === 'm') return value * 0.3048;
  if (from === 'm' && to === 'ft') return value / 0.3048;
  return value;
};

export const convertMass = (value: number, from: 'kg' | 'lbs', to: 'kg' | 'lbs'): number => {
  if (from === to) return value;
  if (from === 'lbs' && to === 'kg') return value * 0.453592;
  if (from === 'kg' && to === 'lbs') return value / 0.453592;
  return value;
};

export const convertTemp = (value: number, from: 'C' | 'F', to: 'C' | 'F'): number => {
  if (from === to) return value;
  if (from === 'F' && to === 'C') return (value - 32) * 5/9;
  if (from === 'C' && to === 'F') return (value * 9/5) + 32;
  return value;
};

export const calculateHeatLoad = (
  roomData: RoomData,
  productData: ProductData,
  miscData: MiscellaneousData
): CalculationResults => {
  
  // Convert all units to metric for calculation (matching Excel)
  const length = convertLength(roomData.length, roomData.lengthUnit, 'm');
  const width = convertLength(roomData.width, roomData.lengthUnit, 'm');
  const height = convertLength(roomData.height, roomData.lengthUnit, 'm');
  
  const productMass = convertMass(productData.massBeforeFreezing, productData.massUnit, 'kg');
  const respirationMassKg = convertMass(productData.respirationMass, productData.massUnit, 'kg');
  
  // Convert temperatures to Celsius for calculation
  const ambientTempC = convertTemp(miscData.ambientTemp, miscData.tempUnit, 'C');
  const roomTempC = convertTemp(miscData.roomTemp, miscData.tempUnit, 'C');
  const productIncomingC = convertTemp(miscData.productIncoming, miscData.tempUnit, 'C');
  const productOutgoingC = convertTemp(miscData.productOutgoing, miscData.tempUnit, 'C');
  
  // Calculate temperature differences (Excel logic)
  const wallTempDiff = ambientTempC - roomTempC; // 45 - 2 = 43°C
  const ceilingTempDiff = (ambientTempC - roomTempC) * 0.3; // Reduced for ceiling
  const floorTempDiff = (ambientTempC - roomTempC) * 0.3; // Reduced for floor
  const productTempDiff = productIncomingC - productOutgoingC; // 30 - 4 = 26°C
  
  // Calculate areas
  const wallArea1 = length * height * 2; // Two walls (length sides)
  const wallArea2 = width * height * 2;  // Two walls (width sides)
  const totalWallArea = wallArea1 + wallArea2;
  const ceilingArea = length * width;
  const floorArea = length * width;
  const internalVolume = length * width * height;
  
  // Transmission Load Calculations (exactly matching Excel formulas)
  // Wall: U-factor × Area × TD × Hrs of load / 24
  const wallLoad = (roomData.wallUFactor * totalWallArea * wallTempDiff * roomData.wallHours) / 24;
  
  // Ceiling: U-factor × Area × TD × Hrs of load / 24  
  const ceilingLoad = (roomData.ceilingUFactor * ceilingArea * ceilingTempDiff * roomData.ceilingHours) / 24;
  
  // Floor: U-factor × Area × TD × Hrs of load / 24
  const floorLoad = (roomData.floorUFactor * floorArea * floorTempDiff * roomData.floorHours) / 24;
  
  const totalTransmissionLoad = wallLoad + ceilingLoad + floorLoad;
  
  // Product Load Calculation (Excel: Mass × Cp × TD × pulldown hrs / pulldown hrs)
  const productLoad = (productMass * productData.cpAboveFreezing * productTempDiff * productData.pullDownHours) / productData.pullDownHours;
  
  // Respiration Load (Excel: Mass × Watts/Tonne)
  const respirationLoad = (respirationMassKg * productData.watts) / 1000; // Convert to kW
  
  // Air Change Load (Excel: Air change rate × Volume × Enthalpy diff × Hrs of load)
  const airChangeLoad = (miscData.airChangeRate * internalVolume * miscData.enthalpyDiff * miscData.hoursOfLoad) / 1000;
  
  // Miscellaneous Loads (Excel uses hours, not percentage)
  const equipmentLoad = (miscData.equipmentPower * miscData.equipmentUsageHours) / 24;
  const occupancyLoad = (miscData.occupancyCount * miscData.occupancyHeatEquiv * miscData.occupancyUsageHours) / 24;
  const lightLoad = (miscData.lightPower * miscData.lightUsageHours) / 24;
  const heaterLoad = miscData.peripheralHeaters + miscData.doorHeaters + miscData.trayHeaters;
  
  const totalMiscLoad = equipmentLoad + occupancyLoad + lightLoad + heaterLoad;
  
  // Total Load in kW
  const totalLoadKw = totalTransmissionLoad + productLoad + respirationLoad + airChangeLoad + totalMiscLoad;
  
  // Total Load in Watts
  const totalLoad = totalLoadKw * 1000;
  
  // Convert to other units
  const loadInKJ = totalLoadKw; // kW
  const loadInKw = totalLoadKw;  // kW
  
  // TR Calculation (1 TR = 3516.85 W) - Excel uses this exact conversion
  const totalLoadTR = totalLoad / 3516.85;
  
  // Capacity including 10% safety factor (Excel formula)
  const capacityTR = totalLoadTR * 1.10;
  
  // Additional calculations matching Excel
  const sensibleHeat = totalLoad * 0.85; // Assuming 85% sensible heat
  const latentHeat = totalLoad * 0.15;   // Assuming 15% latent heat
  
  // Air quantity required (CFM) - Excel formula
  const airQtyRequired = totalLoad / (1.08 * 20); // Assuming 20°F temperature difference
  
  // Refrigeration capacity in BTU/hr (Excel: TR × 12000)
  const refrigerationCapacity = totalLoadTR * 12000; // 1 TR = 12000 BTU/hr
  
  return {
    wallLoad,
    ceilingLoad,
    floorLoad,
    totalTransmissionLoad,
    productLoad,
    respirationLoad,
    airChangeLoad,
    equipmentLoad,
    occupancyLoad,
    lightLoad,
    heaterLoad,
    totalMiscLoad,
    totalLoad,
    totalLoadTR,
    capacityTR,
    sensibleHeat,
    latentHeat,
    airQtyRequired,
    loadInKJ,
    loadInKw,
    refrigerationCapacity,
    wallTempDiff,
    ceilingTempDiff,
    floorTempDiff,
    productTempDiff
  };
};