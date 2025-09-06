import { useState, useEffect } from 'react';
import { RoomData, ProductData, MiscellaneousData } from '@/types/calculation';

const STORAGE_KEYS = {
  ROOM_DATA: 'enzo_room_data',
  PRODUCT_DATA: 'enzo_product_data',
  MISC_DATA: 'enzo_misc_data',
};

// Default values exactly from Excel
const defaultRoomData: RoomData = {
  length: 3.048, // Excel shows 3.048m
  width: 4.5,
  height: 3.0,
  lengthUnit: 'm',
  wallUFactor: 0.295,
  ceilingUFactor: 0.295,
  floorUFactor: 0.295,
  wallHours: 24,
  ceilingHours: 24,
  floorHours: 24,
};

const defaultProductData: ProductData = {
  massBeforeFreezing: 4000,
  massUnit: 'kg',
  cpAboveFreezing: 4.1,
  pullDownHours: 24,
  respirationMass: 4000,
  watts: 50,
};

const defaultMiscData: MiscellaneousData = {
  airChangeRate: 3.4,
  enthalpyDiff: 0.10,
  hoursOfLoad: 20,
  equipmentPower: 0.25,
  equipmentUsageHours: 4.8, // 20% of 24 hours
  occupancyCount: 1.0,
  occupancyHeatEquiv: 0.275,
  occupancyUsageHours: 4.8, // 20% of 24 hours
  lightPower: 0.07,
  lightUsageHours: 4.8, // 20% of 24 hours
  peripheralHeaters: 0,
  doorHeaters: 0.145,
  trayHeaters: 0,
  dailyLoading: 4000,
  ambientTemp: 45,
  roomTemp: 2,
  productIncoming: 30,
  productOutgoing: 4,
  cpAboveFreezingMisc: 4.1,
  pullDownTime: 24,
  airFlowPerFan: 4163,
  doorClearOpening: 900,
  storageCapacity: 8,
  maximumStorage: 6338,
  tempUnit: 'C',
};

export const useStorage = () => {
  const [roomData, setRoomData] = useState<RoomData>(defaultRoomData);
  const [productData, setProductData] = useState<ProductData>(defaultProductData);
  const [miscData, setMiscData] = useState<MiscellaneousData>(defaultMiscData);

  // Load data from storage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const roomJson = localStorage.getItem(STORAGE_KEYS.ROOM_DATA);
        const productJson = localStorage.getItem(STORAGE_KEYS.PRODUCT_DATA);
        const miscJson = localStorage.getItem(STORAGE_KEYS.MISC_DATA);

        if (roomJson) setRoomData({ ...defaultRoomData, ...JSON.parse(roomJson) });
        if (productJson) setProductData({ ...defaultProductData, ...JSON.parse(productJson) });
        if (miscJson) setMiscData({ ...defaultMiscData, ...JSON.parse(miscJson) });
      } catch (error) {
        console.log('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Save functions
  const saveRoomData = (data: RoomData) => {
    setRoomData(data);
    localStorage.setItem(STORAGE_KEYS.ROOM_DATA, JSON.stringify(data));
  };

  const saveProductData = (data: ProductData) => {
    setProductData(data);
    localStorage.setItem(STORAGE_KEYS.PRODUCT_DATA, JSON.stringify(data));
  };

  const saveMiscData = (data: MiscellaneousData) => {
    setMiscData(data);
    localStorage.setItem(STORAGE_KEYS.MISC_DATA, JSON.stringify(data));
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setRoomData(defaultRoomData);
    setProductData(defaultProductData);
    setMiscData(defaultMiscData);
    localStorage.removeItem(STORAGE_KEYS.ROOM_DATA);
    localStorage.removeItem(STORAGE_KEYS.PRODUCT_DATA);
    localStorage.removeItem(STORAGE_KEYS.MISC_DATA);
  };

  return {
    roomData,
    productData,
    miscData,
    saveRoomData,
    saveProductData,
    saveMiscData,
    resetToDefaults,
  };
};