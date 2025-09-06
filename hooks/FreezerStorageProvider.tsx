import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { RoomData, FreezerProductData, FreezerMiscellaneousData } from '@/types/calculation';
import { triggerGlobalUpdate } from '@/hooks/useGlobalUpdate';

export const FREEZER_STORAGE_KEYS = {
    ROOM_DATA: 'enzo_freezer_room_data',
    PRODUCT_DATA: 'enzo_freezer_product_data',
    MISC_DATA: 'enzo_freezer_misc_data',
};

// Default values based on Excel spreadsheet for freezer - EXACT MATCH
const defaultFreezerRoomData: RoomData = {
    length: 10.7,  // Excel shows L = 10.7m
    width: 6.1,    // Excel shows B = 6.1m  
    height: 2.44,  // Excel shows H = 2.44m
    lengthUnit: 'm',
    wallUFactor: 0.295,    // Excel shows 0.295 W/m²·K
    ceilingUFactor: 0.295, // Excel shows 0.295 W/m²·K
    floorUFactor: 0.295,   // Excel shows 0.295 W/m²·K
    wallHours: 24,         // Excel shows 24 hrs
    ceilingHours: 24,      // Excel shows 24 hrs
    floorHours: 24,        // Excel shows 24 hrs
};

const defaultFreezerProductData: FreezerProductData = {
    massBeforeFreezing: 3000, // Excel shows 3000 kg
    massUnit: 'kg',
    cpAboveFreezing: 3.74,     // Excel shows 3.74 kJ/kg·K before freezing
    cpBelowFreezing: 1.96,     // Excel shows 1.96 kJ/kg·K after freezing
    latentHeatOfFusion: 233,   // Excel shows 233 kJ/kg latent heat
    freezingPoint: -0.8,       // Excel shows -0.8°C freezing point
    pullDownHours: 10,         // Excel shows 10 hrs for each phase
    respirationMass: 3000,     // Same as mass
    watts: 0,                  // Excel shows 0 W/tonne for frozen products
    productName: 'Custom',
    overridePreset: false,
};

const defaultFreezerMiscData: FreezerMiscellaneousData = {
    // Air Change - Excel values
    airChangeRate: 0.4,        // Excel shows 0.4 air changes
    enthalpyDiff: 0.1203,      // Excel shows 0.1203 kJ/L
    hoursOfLoad: 16,           // Excel shows 16 hrs

    // Equipment - Excel values
    equipmentPower: 407,       // Excel shows 0.407 kW = 407W
    equipmentUsageHours: 16,   // Excel shows 16 hrs

    // Lighting - Excel values
    lightPower: 140,           // Excel shows 0.14 kW = 140W  
    lightUsageHours: 16,       // Excel shows 16 hrs

    // Door Heaters - Excel values
    peripheralHeaters: 0,      // Excel shows 0 kW
    doorHeaters: 243,          // Excel shows 0.243 kW = 243W
    trayHeaters: 0,            // Excel shows 0 kW

    // Occupancy - Excel values (minimal for freezer)
    occupancyCount: 0,         // Excel shows 0 people
    occupancyHeatEquiv: 0,     // Excel shows 0 W/person
    occupancyUsageHours: 0,    // Excel shows 0 hrs

    // Temperature parameters from Excel - EXACT VALUES
    ambientTemp: 45,           // Excel shows 45°C ambient
    roomTemp: -25,             // Excel shows -25°C freezer temperature
    productIncoming: 25,       // Excel shows 25°C incoming product
    productOutgoing: -15,      // Excel shows -15°C outgoing product
    productOutgoingFreezer: -15, // Final freezer temperature
    tempUnit: 'C',

    // Additional parameters from Excel
    dailyLoading: 3000,        // Excel shows 3000 kg/Day
    insulationType: 'PUF',     // Excel shows PUF insulation
    insulationThickness: 150,  // Excel shows 150mm for freezer
    cpAboveFreezingMisc: 3.74, // Excel shows 3.74 kJ/kg·K
    pullDownTime: 10,          // Excel shows 10 hrs
    airFlowPerFan: 2000,       // Excel shows 2000 CFM
    doorClearOpening: 900,     // Excel shows 900mm
    storageCapacity: 10,       // Excel shows 10 kg/m³
    maximumStorage: 26054,     // Excel calculation result
};

type FreezerStorageContextValue = {
    roomData: RoomData;
    productData: FreezerProductData;
    miscData: FreezerMiscellaneousData;
    saveRoomData: (d: RoomData) => void;
    saveProductData: (d: FreezerProductData) => void;
    saveMiscData: (d: FreezerMiscellaneousData) => void;
    resetToDefaults: () => void;
};

const FreezerStorageContext = createContext<FreezerStorageContextValue | undefined>(undefined);

export const FreezerStorageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [roomData, setRoomData] = useState<RoomData>(defaultFreezerRoomData);
    const [productData, setProductData] = useState<FreezerProductData>(defaultFreezerProductData);
    const [miscData, setMiscData] = useState<FreezerMiscellaneousData>(defaultFreezerMiscData);

    // Load from storage once - simplified for React Native compatibility
    useEffect(() => {
        // For now, just use defaults - storage can be added later if needed
        console.log('Freezer room calculator initialized with default values');
    }, []);

    const saveRoomData = (data: RoomData) => {
        setRoomData({ ...data });
        triggerGlobalUpdate();
    };

    const saveProductData = (data: FreezerProductData) => {
        setProductData({ ...data });
        triggerGlobalUpdate();
    };

    const saveMiscData = (data: FreezerMiscellaneousData) => {
        setMiscData({ ...data });
        triggerGlobalUpdate();
    };

    const resetToDefaults = () => {
        setRoomData({ ...defaultFreezerRoomData });
        setProductData({ ...defaultFreezerProductData });
        setMiscData({ ...defaultFreezerMiscData });
        triggerGlobalUpdate();
    };

    const value = useMemo<FreezerStorageContextValue>(() => ({
        roomData,
        productData,
        miscData,
        saveRoomData,
        saveProductData,
        saveMiscData,
        resetToDefaults,
    }), [roomData, productData, miscData]);

    return (
        <FreezerStorageContext.Provider value={value}>
            {children}
        </FreezerStorageContext.Provider>
    );
};

export const useFreezerStorageContext = () => {
    const ctx = useContext(FreezerStorageContext);
    if (!ctx) throw new Error('useFreezerStorageContext must be used within FreezerStorageProvider');
    return ctx;
};
