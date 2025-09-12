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
    length: 10.7,   // Excel shows 10.7m
    width: 6.1,     // Excel shows 6.1m  
    height: 2.44,   // Excel shows 2.44m
    lengthUnit: 'm',

    // Insulation parameters (from Excel)
    insulationType: 'PUF',              // Excel shows PUF - now with dropdown support
    wallInsulationThickness: 150,       // Excel shows 150mm for freezer
    ceilingInsulationThickness: 150,    // Excel shows 150mm for freezer
    floorInsulationThickness: 150,      // Excel shows 150mm for freezer

    wallUFactor: 0.153,    // Excel freezer value
    ceilingUFactor: 0.153, // Excel freezer value
    floorUFactor: 0.153,   // Excel freezer value
    wallHours: 8,          // Excel shows 8 hrs
    ceilingHours: 8,       // Excel shows 8 hrs  
    floorHours: 8,         // Excel shows 8 hrs
};

const defaultFreezerProductData: FreezerProductData = {
    massBeforeFreezing: 3000, // Excel shows 3000 kg
    massUnit: 'kg',
    enteringTemp: 25,          // Product entering temp (Excel shows 25°C)
    finalTemp: -15,            // Product final temp (Excel shows -15°C)
    tempUnit: 'C',             // Temperature unit
    cpAboveFreezing: 3.74,     // Excel shows 3.74 kJ/kg·K before freezing (Chicken)
    cpBelowFreezing: 1.96,     // Excel shows 1.96 kJ/kg·K after freezing (Chicken)
    latentHeatOfFusion: 233,   // Excel shows 233 kJ/kg latent heat (Chicken)
    freezingPoint: -0.8,       // Excel shows -0.8°C freezing point (Chicken)
    pullDownHours: 10,         // Excel shows 10 hrs for freezing process
    respirationMass: 3000,     // Same as mass
    watts: 0,                  // Excel shows 0 W/tonne for frozen products
    productName: 'Chicken',    // Excel shows Chicken as the product
    overridePreset: false,
};

const defaultFreezerMiscData: FreezerMiscellaneousData = {
    // Air Change - Excel exact values
    airChangeRate: 4.2,        // Excel shows 4.2 L/S air change rate
    enthalpyDiff: 0.14,        // Excel shows 0.14 kJ/L enthalpy difference
    hoursOfLoad: 16,           // Excel shows 16 hrs of load

    // Equipment - Excel values (will be overridden by specific calculations)
    equipmentPower: 1110,      // Total fan motor power = 0.37 * 3 * 1000 = 1110W
    equipmentUsageHours: 16,   // Excel shows 16 hrs

    // Lighting - Excel values
    lightPower: 1000,          // Excel shows 1.0 kW = 1000W
    lightUsageHours: 1.2,      // Excel shows 1.2 hrs usage

    // Heaters - Excel values (will be calculated specifically)
    peripheralHeaters: 12000,  // Excel shows 1.5 kW * 8 heaters = 12000W
    doorHeaters: 2160,         // Excel shows 0.27 kW * 8 doors = 2160W
    trayHeaters: 2200,         // Excel shows 2.2 kW = 2200W

    // Occupancy - Excel values
    occupancyCount: 4.6,       // Excel shows 4.6 people
    occupancyHeatEquiv: 500,   // Excel shows 0.5 kW = 500W per person equivalent
    occupancyUsageHours: 16,   // Excel shows 16 hrs

    // Temperature parameters from Excel - EXACT VALUES
    ambientTemp: 45,           // Excel shows 45°C ambient
    roomTemp: -25,             // Excel shows -25°C blast freezer temperature
    productIncoming: 25,       // Excel shows 25°C incoming product
    productOutgoing: -15,      // Excel shows -15°C outgoing product
    productOutgoingFreezer: -15, // Final freezer temperature
    tempUnit: 'C',

    // Additional parameters from Excel - EXACT VALUES 
    dailyLoading: 3000,        // Excel shows 3000 kg/Day
    cpAboveFreezingMisc: 3.74, // Excel shows 3.74 kJ/kg·K
    pullDownTime: 10,          // Excel shows 10 hrs
    airFlowPerFan: 5847,       // Excel shows 5847 CFM per fan
    doorClearOpening: 2100,    // Excel shows 2100 mm door clear opening
    storageCapacity: 4,        // Excel shows 4 kg/cm (storage capacity)
    maximumStorage: 5278,      // Excel shows 5278 Kgs maximum storage

    // New Excel-specific parameters
    fanMotorRating: 0.37,      // Excel shows 0.37 kW per fan
    fanQuantity: 3,            // Excel shows quantity 3
    numberOfPeople: 4.6,       // Excel shows 4.6 people
    peopleUsageFactor: 0.5,    // Excel shows 0.5 usage factor
    lightPowerKw: 1.0,         // Excel shows 1.0 kW lighting
    lightUsageHours: 1.2,      // Excel shows 1.2 hrs lighting usage

    // Heater specifications from Excel
    peripheralHeaterPower: 1.5,    // Excel shows 1.5 kW per heater
    peripheralHeaterQuantity: 8,   // Excel shows 8 heaters
    doorHeaterPower: 0.27,         // Excel shows 0.27 kW per door
    doorHeaterQuantity: 8,         // Excel shows 8 doors
    trayHeaterPower: 2.2,          // Excel shows 2.2 kW per tray
    trayHeaterQuantity: 1,         // Excel shows 1 tray heater
    drainHeaterPower: 0.04,        // Excel shows 0.04 kW per drain
    drainHeaterQuantity: 1,        // Excel shows 1 drain heater
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
