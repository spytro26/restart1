import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { RoomData, ProductData, MiscellaneousData } from '@/types/calculation';
import { triggerGlobalUpdate } from '@/hooks/useGlobalUpdate';

export const STORAGE_KEYS = {
    ROOM_DATA: 'enzo_room_data',
    PRODUCT_DATA: 'enzo_product_data',
    MISC_DATA: 'enzo_misc_data',
};

// Default values exactly matching Excel spreadsheet
const defaultRoomData: RoomData = {
    length: 3.048, // Excel shows 3.048m (10 ft)
    width: 4.5,    // Excel shows 4.5m
    height: 3.0,   // Excel shows 3.0m
    lengthUnit: 'm',

    // Insulation parameters (from Excel)
    insulationType: 'PUF',              // Excel shows PUF
    wallInsulationThickness: 100,       // Excel shows 100mm
    ceilingInsulationThickness: 100,    // Excel shows 100mm
    floorInsulationThickness: 100,      // Excel shows 100mm

    wallUFactor: 0.295,    // Excel value
    ceilingUFactor: 0.295, // Excel value
    floorUFactor: 0.295,   // Excel value
    wallHours: 24,         // Excel shows 24 hrs
    ceilingHours: 24,      // Excel shows 24 hrs  
    floorHours: 24,        // Excel shows 24 hrs
};

const defaultProductData: ProductData = {
    massBeforeFreezing: 4000, // Excel shows 4000 kg
    massUnit: 'kg',

    // Product temperatures - NEW DEFAULT VALUES
    enteringTemp: 30,         // Default entering temperature
    finalTemp: 4,             // Default final temperature  
    tempUnit: 'C',            // Default temperature unit

    cpAboveFreezing: 4.1,     // Excel shows 4.1 kJ/kg·K
    pullDownHours: 24,        // Excel shows 24 hrs
    respirationMass: 4000,    // Excel shows 4000 kg (same as mass)
    watts: 50,                // Excel shows 50 W/Tonne
    productName: 'Custom',
    overridePreset: false,
};

const defaultMiscData: MiscellaneousData = {
    // Air Change (Excel row 21)
    airChangeRate: 3.4,      // Excel shows 3.4 
    enthalpyDiff: 0.10,      // Excel shows 0.10
    hoursOfLoad: 20,         // Excel shows 20 hrs

    // Equipment (Excel row 25)
    equipmentPower: 250,     // Excel shows 250 W (converted from 0.25 kW)
    equipmentUsageHours: 20, // Excel shows 20 hrs usage

    // Occupancy (Excel row 27)
    occupancyCount: 1.0,     // Excel shows 1.0 people
    occupancyHeatEquiv: 275, // Excel shows 275 W per person
    occupancyUsageHours: 20, // Excel shows 20 hrs usage

    // Lighting (Excel row 29)
    lightPower: 70,          // Excel shows 70 W (converted from 0.07 kW)
    lightUsageHours: 20,     // Excel shows 20 hrs usage

    // Heaters (Excel rows 31-35)
    peripheralHeaters: 0,    // Excel shows 0
    doorHeaters: 145,        // Excel shows 145 W (converted from 0.145 kW)
    trayHeaters: 0,          // Excel shows 0

    // Temperature parameters (Excel values)
    ambientTemp: 45,         // Excel shows 45°C
    roomTemp: 2,             // Excel shows 2°C
    tempUnit: 'C',

    // Additional Excel parameters
    dailyLoading: 4000,      // Excel shows 4000 kg/Day
    cpAboveFreezingMisc: 4.1,
    pullDownTime: 24,
    airFlowPerFan: 4163,     // Excel shows 4163 CFM
    doorClearOpening: 2000,  // Excel shows 2000mm
    storageCapacity: 8,      // Excel shows 8 kg/m³
    maximumStorage: 6338,    // Excel shows 6338 kgs
};

type StorageContextValue = {
    roomData: RoomData;
    productData: ProductData;
    miscData: MiscellaneousData;
    saveRoomData: (d: RoomData) => void;
    saveProductData: (d: ProductData) => void;
    saveMiscData: (d: MiscellaneousData) => void;
    resetToDefaults: () => void;
};

const StorageContext = createContext<StorageContextValue | undefined>(undefined);

export const StorageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [roomData, setRoomData] = useState<RoomData>(defaultRoomData);
    const [productData, setProductData] = useState<ProductData>(defaultProductData);
    const [miscData, setMiscData] = useState<MiscellaneousData>(defaultMiscData);

    // Load from storage once - simplified for React Native compatibility
    useEffect(() => {
        // For now, just use defaults - storage can be added later if needed
        console.log('Cold room calculator initialized with default values');
    }, []);

    const saveRoomData = (data: RoomData) => {
        setRoomData({ ...data });
        triggerGlobalUpdate();
    };

    const saveProductData = (data: ProductData) => {
        setProductData({ ...data });
        triggerGlobalUpdate();
    };

    const saveMiscData = (data: MiscellaneousData) => {
        setMiscData({ ...data });
        triggerGlobalUpdate();
    };

    const resetToDefaults = () => {
        setRoomData({ ...defaultRoomData });
        setProductData({ ...defaultProductData });
        setMiscData({ ...defaultMiscData });
        triggerGlobalUpdate();
    };

    const value = useMemo<StorageContextValue>(() => ({
        roomData,
        productData,
        miscData,
        saveRoomData,
        saveProductData,
        saveMiscData,
        resetToDefaults,
    }), [roomData, productData, miscData]);

    return (
        <StorageContext.Provider value={value}>
            {children}
        </StorageContext.Provider>
    );
};

export const useStorageContext = () => {
    const ctx = useContext(StorageContext);
    if (!ctx) throw new Error('useStorageContext must be used within StorageProvider');
    return ctx;
};
