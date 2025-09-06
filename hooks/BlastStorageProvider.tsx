import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { triggerGlobalUpdate } from '@/hooks/useGlobalUpdate';

export const BLAST_STORAGE_KEYS = {
    ROOM_DATA: 'enzo_blast_room_data',
    PRODUCT_DATA: 'enzo_blast_product_data',
    MISC_DATA: 'enzo_blast_misc_data',
};

// Blast freezer specific data types based on Excel
export interface BlastRoomData {
    // Transmission Load - Excel values
    wallUFactor: number;        // W/m²K - Excel shows 0.153
    ceilingUFactor: number;     // W/m²K - Excel shows 0.153  
    floorUFactor: number;       // W/m²K - Excel shows 0.153
    wallArea: number;           // m² - Excel shows 70
    ceilingArea: number;        // m² - Excel shows 25
    floorArea: number;          // m² - Excel shows 25
    wallTempDiff: number;       // K - Excel shows 78
    ceilingTempDiff: number;    // K - Excel shows 78
    floorTempDiff: number;      // K - Excel shows 63
    wallHours: number;          // hrs - Excel shows 8
    ceilingHours: number;       // hrs - Excel shows 8
    floorHours: number;         // hrs - Excel shows 8
}

export interface BlastProductData {
    // Product Load - Excel values
    massBeforeFreezing: number;  // kg - Excel shows 2000
    massLatentHeat: number;      // kg - Excel shows 2000  
    massAfterFreezing: number;   // kg - Excel shows 2000
    cpAboveFreezing: number;     // kJ/kg·K - Excel shows 3.49
    cpBelowFreezing: number;     // kJ/kg·K - Excel shows 2.14
    tempDiffAbove: number;       // K - Excel shows -3.3
    tempDiffBelow: number;       // K - Excel shows -28.3
    pullDownHours: number;       // hrs - Excel shows 8
    latentHeat: number;          // kJ/kg - Excel shows 233
    productName: string;         // Excel shows "Chicken"
}

export interface BlastMiscellaneousData {
    // Air Change Load - Excel values
    airChangeRate: number;       // Air change rate(L/S) - Excel shows 4.2
    enthalpyDiff: number;        // Enthalpy diff (kJ/L) - Excel shows 0.14
    hoursOfLoad: number;         // Hours of load - Excel shows 2

    // Equipment Load - Excel values
    fanMotorRating: number;      // kW - Excel shows 0.37
    equipmentQuantity: number;   // Quantity - Excel shows 3
    equipmentHours: number;      // Usage in Hrs - Excel shows 8

    // Occupancy - Excel values
    occupancyCount: number;      // No of people - Excel shows 4.6
    occupancyHeatLoad: number;   // Light load (W) - Excel shows 0.5
    occupancyHours: number;      // Hours - Excel shows 1

    // Light Load - Excel values
    lightLoad: number;           // Light load (W) - Excel shows 0.1
    lightHours: number;          // Hours - Excel shows 1.2

    // Heaters - Excel values
    peripheralHeaterCapacity: number;  // Heater capacity(kW) - Excel shows 1.6
    peripheralHeaterCount: number;     // No of heaters - Excel shows 3
    peripheralHeaterHours: number;     // Hours - Excel shows 8

    doorHeaterCapacity: number;        // Heater capacity(kW) - Excel shows 0.27
    doorHeaterCount: number;           // No of Doors - Excel shows 1
    doorHeaterHours: number;           // Hours - Excel shows 8

    trayHeaterCapacity: number;        // Heater capacity(kW) - Excel shows 2.2
    trayHeaterCount: number;           // No of heaters - Excel shows 1
    trayHeaterHours: number;           // Hours - Excel shows 0.4

    drainHeaterCapacity: number;       // - Excel shows 0.04
    drainHeaterCount: number;          // - Excel shows 1
    drainHeaterHours: number;          // Hours - Excel shows 8

    // Temperature parameters - Excel values
    ambientTemp: number;               // Excel shows 43°C
    roomTemp: number;                  // Excel shows -35°C
    productIncoming: number;           // Excel shows -5°C
    productOutgoing: number;           // Excel shows -30°C
    tempUnit: 'C' | 'F';

    // Additional parameters from Excel
    capacityRequired: number;          // Excel shows 2000 kgs
    batchHours: number;               // Excel shows 8 Hrs
    internalVolume: number;           // Excel shows 3.5 M3
    insulationType: string;           // Excel shows PUF
    insulationThickness: number;      // Excel shows 150mm
    maxStorage: number;               // Excel shows 9279 Kgs
}

// Default values based on Excel spreadsheet for blast freezer - EXACT MATCH
const defaultBlastRoomData: BlastRoomData = {
    // Transmission Load - Excel Section 1
    wallUFactor: 0.153,        // Excel D8
    ceilingUFactor: 0.153,     // Excel D9
    floorUFactor: 0.153,       // Excel D10
    wallArea: 70,              // Excel E8
    ceilingArea: 25,           // Excel E9
    floorArea: 25,             // Excel E10
    wallTempDiff: 78,          // Excel F8
    ceilingTempDiff: 78,       // Excel F9
    floorTempDiff: 63,         // Excel F10
    wallHours: 8,              // Excel G8
    ceilingHours: 8,           // Excel G9
    floorHours: 8,             // Excel G10
};

const defaultBlastProductData: BlastProductData = {
    // Product Load - Excel Section 2
    massBeforeFreezing: 2000,   // Excel D14
    massLatentHeat: 2000,       // Excel D15
    massAfterFreezing: 2000,    // Excel D16
    cpAboveFreezing: 3.49,      // Excel E14
    cpBelowFreezing: 2.14,      // Excel E16
    tempDiffAbove: -3.3,        // Excel F14
    tempDiffBelow: -28.3,       // Excel F16
    pullDownHours: 8,           // Excel G14,G15,G16
    latentHeat: 233,            // Excel F15
    productName: 'Chicken',     // Excel shows Chicken
};

const defaultBlastMiscData: BlastMiscellaneousData = {
    // Air Change Load - Excel Section 3
    airChangeRate: 4.2,         // Excel D20
    enthalpyDiff: 0.14,         // Excel E20
    hoursOfLoad: 2,             // Excel F20

    // Equipment Load - Excel Section 4a
    fanMotorRating: 0.37,       // Excel D23
    equipmentQuantity: 3,       // Excel E23
    equipmentHours: 8,          // Excel F23

    // Occupancy - Excel Section 4b
    occupancyCount: 4.6,        // Excel E24
    occupancyHeatLoad: 0.5,     // Excel E25
    occupancyHours: 1,          // Excel F25

    // Light Load - Excel Section 4c
    lightLoad: 0.1,             // Excel D27
    lightHours: 1.2,            // Excel F27

    // Heaters - Excel Section 4d,4e,4f,4g
    peripheralHeaterCapacity: 1.6,  // Excel D29
    peripheralHeaterCount: 3,       // Excel E29
    peripheralHeaterHours: 8,       // Excel F29

    doorHeaterCapacity: 0.27,       // Excel D31
    doorHeaterCount: 1,             // Excel E31
    doorHeaterHours: 8,             // Excel F31

    trayHeaterCapacity: 2.2,        // Excel D33
    trayHeaterCount: 1,             // Excel E33
    trayHeaterHours: 0.4,           // Excel F33

    drainHeaterCapacity: 0.04,      // Excel D34
    drainHeaterCount: 1,            // Excel E34
    drainHeaterHours: 8,            // Excel F34

    // Temperature parameters from Excel
    ambientTemp: 43,                // Excel D52
    roomTemp: -35,                  // Excel D53
    productIncoming: -5,            // Excel D54
    productOutgoing: -30,           // Excel D55
    tempUnit: 'C',

    // Additional parameters from Excel
    capacityRequired: 2000,         // Excel D45
    batchHours: 8,                  // Excel D46
    internalVolume: 3.5,            // Excel D48
    insulationType: 'PUF',          // Excel D47
    insulationThickness: 150,       // Excel D48
    maxStorage: 9279,              // Excel D63
};

export interface BlastCalculationResults {
    // Transmission loads - Excel calculations
    wallLoad: number;              // Excel H8: =(E8*F8*G8*D8)/1000
    ceilingLoad: number;           // Excel H9: =(E9*F9*G9*D9)/1000  
    floorLoad: number;             // Excel H10: =(E10*F10*G10*D10)/1000
    totalTransmissionLoad: number; // Excel I8: =H8+H9+H10

    // Product loads - Excel calculations
    beforeFreezingLoad: number;    // Excel H14: =(D14*E14*F14*G14)/3600
    latentHeatLoad: number;        // Excel H15: =(D15*F15*G15)/3600
    afterFreezingLoad: number;     // Excel H16: =(D16*E16*F16*G16)/3600
    totalProductLoad: number;      // Excel I14: =H14+H15+H16

    // Air change load - Excel calculation
    airChangeLoad: number;         // Excel H20: =(D20*E20*F20)/1000

    // Equipment loads - Excel calculations
    equipmentLoad: number;         // Excel H23: =D23*E23*F23
    occupancyLoad: number;         // Excel H25: =E24*E25*F25/1000
    lightLoad: number;             // Excel H27: =D27*F27
    peripheralHeaterLoad: number;  // Excel H29: =D29*E29*F29
    doorHeaterLoad: number;        // Excel H31: =D31*E31*F31
    trayHeaterLoad: number;        // Excel H33: =D33*E33*F33
    drainHeaterLoad: number;       // Excel H34: =D34*E34*F34
    totalMiscLoad: number;         // Excel I23: =H23+H25+H27+H29+H31+H33+H34

    // Final results - Excel calculations
    totalLoadKJ: number;           // Excel G36: =SUM(I8,I14,H20,I23)
    totalLoadKw: number;           // Excel G37: =G36/3600
    totalLoadTR: number;           // Excel G38: =G37/3.517
    totalLoadTRWithSafety: number; // TR with 20% safety factor
    capacityIncludingSafety: number; // Safety factor percentage (20%)
    sensibleHeatKJ24Hr: number;    // Excel G40: =SUM(I8,G14)+SUM(H20,I23)
    latentHeatKJ24Hr: number;      // Excel G41: =H15
    refrigerationCapacity: number;  // Final TR with safety factor
}

type BlastStorageContextValue = {
    roomData: BlastRoomData;
    productData: BlastProductData;
    miscData: BlastMiscellaneousData;
    saveRoomData: (d: BlastRoomData) => void;
    saveProductData: (d: BlastProductData) => void;
    saveMiscData: (d: BlastMiscellaneousData) => void;
    resetToDefaults: () => void;
    calculateResults: () => BlastCalculationResults;
};

const BlastStorageContext = createContext<BlastStorageContextValue | undefined>(undefined);

export const BlastStorageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [roomData, setRoomData] = useState<BlastRoomData>(defaultBlastRoomData);
    const [productData, setProductData] = useState<BlastProductData>(defaultBlastProductData);
    const [miscData, setMiscData] = useState<BlastMiscellaneousData>(defaultBlastMiscData);

    // Load from storage once - simplified for Expo compatibility
    useEffect(() => {
        // For now, just use defaults - storage can be added later if needed
        console.log('Blast freezer calculator initialized with default values');
    }, []);

    const saveRoomData = (data: BlastRoomData) => {
        setRoomData({ ...data });
        triggerGlobalUpdate();
    };

    const saveProductData = (data: BlastProductData) => {
        setProductData({ ...data });
        triggerGlobalUpdate();
    };

    const saveMiscData = (data: BlastMiscellaneousData) => {
        setMiscData({ ...data });
        triggerGlobalUpdate();
    };

    const resetToDefaults = () => {
        setRoomData({ ...defaultBlastRoomData });
        setProductData({ ...defaultBlastProductData });
        setMiscData({ ...defaultBlastMiscData });
        triggerGlobalUpdate();
    };

    // Calculate results using EXACT Excel formulas
    const calculateResults = (): BlastCalculationResults => {
        // Transmission loads - Excel formulas (Area × TempDiff × Hours × U-Factor) / 1000
        const wallLoad = (roomData.wallArea * roomData.wallTempDiff * roomData.wallHours * roomData.wallUFactor) / 1000;
        const ceilingLoad = (roomData.ceilingArea * roomData.ceilingTempDiff * roomData.ceilingHours * roomData.ceilingUFactor) / 1000;
        const floorLoad = (roomData.floorArea * roomData.floorTempDiff * roomData.floorHours * roomData.floorUFactor) / 1000;
        const totalTransmissionLoad = wallLoad + ceilingLoad + floorLoad;

        // Product loads - Excel formulas (Mass × Cp × TempDiff × Hours) / 3600
        const beforeFreezingLoad = (productData.massBeforeFreezing * productData.cpAboveFreezing * productData.tempDiffAbove * productData.pullDownHours) / 3600;
        const latentHeatLoad = (productData.massLatentHeat * productData.latentHeat * productData.pullDownHours) / 3600;
        const afterFreezingLoad = (productData.massAfterFreezing * productData.cpBelowFreezing * productData.tempDiffBelow * productData.pullDownHours) / 3600;
        const totalProductLoad = beforeFreezingLoad + latentHeatLoad + afterFreezingLoad;

        // Air change load - Excel formula (Rate × Enthalpy × Hours) / 1000
        const airChangeLoad = (miscData.airChangeRate * miscData.enthalpyDiff * miscData.hoursOfLoad) / 1000;

        // Equipment loads - Excel formulas (keep in kWh first for display, then convert)
        const equipmentLoadKWh = miscData.fanMotorRating * miscData.equipmentQuantity * miscData.equipmentHours;
        const occupancyLoadKWh = (miscData.occupancyCount * miscData.occupancyHeatLoad * miscData.occupancyHours) / 1000;
        const lightLoadKWh = miscData.lightLoad * miscData.lightHours;
        const peripheralHeaterLoadKWh = miscData.peripheralHeaterCapacity * miscData.peripheralHeaterCount * miscData.peripheralHeaterHours;
        const doorHeaterLoadKWh = miscData.doorHeaterCapacity * miscData.doorHeaterCount * miscData.doorHeaterHours;
        const trayHeaterLoadKWh = miscData.trayHeaterCapacity * miscData.trayHeaterCount * miscData.trayHeaterHours;
        const drainHeaterLoadKWh = miscData.drainHeaterCapacity * miscData.drainHeaterCount * miscData.drainHeaterHours;
        const totalMiscLoadKWh = equipmentLoadKWh + occupancyLoadKWh + lightLoadKWh + peripheralHeaterLoadKWh + doorHeaterLoadKWh + trayHeaterLoadKWh + drainHeaterLoadKWh;

        // Convert miscellaneous loads to kJ for final calculation (kWh × 3600 = kJ)
        const totalMiscLoadKJ = totalMiscLoadKWh * 3600;

        // Final calculations - Excel formulas
        const totalLoadKJ = totalTransmissionLoad + totalProductLoad + airChangeLoad + totalMiscLoadKJ;
        const totalLoadKw = totalLoadKJ / 3600;
        const totalLoadTR = totalLoadKw / 3.517;
        const capacityIncludingSafety = 20; // 20% safety factor
        const totalLoadTRWithSafety = totalLoadTR * (1 + capacityIncludingSafety / 100);
        const sensibleHeatKJ24Hr = totalTransmissionLoad + beforeFreezingLoad + afterFreezingLoad + airChangeLoad + totalMiscLoadKJ;
        const latentHeatKJ24Hr = latentHeatLoad;
        const refrigerationCapacity = totalLoadTRWithSafety;

        return {
            wallLoad,
            ceilingLoad,
            floorLoad,
            totalTransmissionLoad,
            beforeFreezingLoad,
            latentHeatLoad,
            afterFreezingLoad,
            totalProductLoad,
            airChangeLoad,
            equipmentLoad: equipmentLoadKWh,
            occupancyLoad: occupancyLoadKWh,
            lightLoad: lightLoadKWh,
            peripheralHeaterLoad: peripheralHeaterLoadKWh,
            doorHeaterLoad: doorHeaterLoadKWh,
            trayHeaterLoad: trayHeaterLoadKWh,
            drainHeaterLoad: drainHeaterLoadKWh,
            totalMiscLoad: totalMiscLoadKWh,
            totalLoadKJ,
            totalLoadKw,
            totalLoadTR,
            totalLoadTRWithSafety,
            capacityIncludingSafety,
            sensibleHeatKJ24Hr,
            latentHeatKJ24Hr,
            refrigerationCapacity,
        };
    };

    const value = useMemo<BlastStorageContextValue>(() => ({
        roomData,
        productData,
        miscData,
        saveRoomData,
        saveProductData,
        saveMiscData,
        resetToDefaults,
        calculateResults,
    }), [roomData, productData, miscData]);

    return (
        <BlastStorageContext.Provider value={value}>
            {children}
        </BlastStorageContext.Provider>
    );
};

export const useBlastStorageContext = () => {
    const ctx = useContext(BlastStorageContext);
    if (!ctx) throw new Error('useBlastStorageContext must be used within BlastStorageProvider');
    return ctx;
};
