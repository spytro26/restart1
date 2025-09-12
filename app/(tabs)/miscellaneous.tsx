import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { InputField } from '@/components/InputField';
import { useStorageContext } from '@/hooks/StorageProvider';

export default function MiscellaneousTab() {
  const { miscData, saveMiscData } = useStorageContext();

  const updateMiscData = (field: string, value: string | number) => {
    const newData = { ...miscData, [field]: value };
    console.log('⚙️ Updating misc data:', field, '=', value);
    saveMiscData(newData);
    setTimeout(() => {
      console.log('✅ Misc data saved');
    }, 0);
  };

  const handleNumericChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    updateMiscData(field, numValue);
  };

  // Calculate air change load (matching Excel formula exactly)
  const calculateAirChangeLoad = () => {
    const { airChangeRate = 3.4, enthalpyDiff = 0.10, hoursOfLoad = 20 } = miscData;
    // Excel: =Air change rate * Enthalpy diff * Hours of load / 1000
    return (airChangeRate * enthalpyDiff * hoursOfLoad) / 1000;
  };

  // Calculate equipment load (matching Excel)
  const calculateEquipmentLoad = () => {
    const { fanMotorRating = 0.37, equipmentQuantity = 3, equipmentUsageHours = 8 } = miscData;
    // Excel: =Fan Motor Rating (kW) * Quantity * Usage Hrs / 24
    return (fanMotorRating * equipmentQuantity * equipmentUsageHours) / 24;
  };

  // Calculate occupancy load (matching Excel)  
  const calculateOccupancyLoad = () => {
    const { occupancyCount = 1.0, occupancyHeatEquiv = 275, occupancyUsageHours = 20 } = miscData;
    // Excel: =No of people * Heat per person (W) * Usage hrs / (24 * 1000)
    return (occupancyCount * occupancyHeatEquiv * occupancyUsageHours) / (24 * 1000);
  };

  // Calculate light load (matching Excel)
  const calculateLightLoad = () => {
    const { lightPower = 70, lightUsageHours = 20 } = miscData;
    // Excel: =Light power (W) * Usage hrs / (24 * 1000)
    return (lightPower * lightUsageHours) / (24 * 1000);
  };

  // Calculate total heater load (continuous operation)
  const calculateHeaterLoad = () => {
    const { 
      peripheralHeaters = 1.5, peripheralHeatersQuantity = 8,
      doorHeaters = 0.27, doorHeatersQuantity = 8,
      trayHeaters = 2.2, trayHeatersQuantity = 1,
      drainHeaters = 0.04, drainHeatersQuantity = 1
    } = miscData;
    
    const peripheralLoad = (peripheralHeaters * peripheralHeatersQuantity) / 1000;
    const doorLoad = (doorHeaters * doorHeatersQuantity) / 1000;  
    const trayLoad = (trayHeaters * trayHeatersQuantity) / 1000;
    const drainLoad = ((drainHeaters || 0) * drainHeatersQuantity) / 1000;
    
    return peripheralLoad + doorLoad + trayLoad + drainLoad;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Miscellaneous Loads</Text>
          <Text style={styles.subtitle}>Air change, equipment, lighting & other loads</Text>
        </View>

        {/* Air Change Load */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Air Change Load</Text>

          <InputField
            label="Air Change Rate"
            value={miscData.airChangeRate?.toString() || '3.4'}
            onChangeText={(value) => handleNumericChange('airChangeRate', value)}
            unit="L/S"
          />

          <InputField
            label="Enthalpy Difference"
            value={miscData.enthalpyDiff?.toString() || '0.10'}
            onChangeText={(value) => handleNumericChange('enthalpyDiff', value)}
            unit="kJ/L"
          />

          <InputField
            label="Hours of Load"
            value={miscData.hoursOfLoad?.toString() || '20'}
            onChangeText={(value) => handleNumericChange('hoursOfLoad', value)}
            unit="hrs"
          />

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Calculated Load: {calculateAirChangeLoad().toFixed(4)} kW
            </Text>
          </View>
        </View>

        {/* Equipment Load */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipment Load</Text>

          <InputField
            label="Fan Motor Rating"
            value={miscData.fanMotorRating?.toString() || '0.37'}
            onChangeText={(value) => handleNumericChange('fanMotorRating', value)}
            unit="kW"
          />

          <InputField
            label="Quantity"
            value={miscData.equipmentQuantity?.toString() || '3'}
            onChangeText={(value) => handleNumericChange('equipmentQuantity', value)}
          />

          <InputField
            label="Usage Hours"
            value={miscData.equipmentUsageHours?.toString() || '8'}
            onChangeText={(value) => handleNumericChange('equipmentUsageHours', value)}
            unit="hrs"
          />

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Calculated Load: {calculateEquipmentLoad().toFixed(3)} kW
            </Text>
          </View>
        </View>

        {/* Occupancy Load */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Occupancy Load</Text>

          <InputField
            label="Number of People"
            value={miscData.occupancyCount?.toString() || '1.0'}
            onChangeText={(value) => handleNumericChange('occupancyCount', value)}
          />

          <InputField
            label="Heat per Person"
            value={miscData.occupancyHeatEquiv?.toString() || '275'}
            onChangeText={(value) => handleNumericChange('occupancyHeatEquiv', value)}
            unit="W"
          />

          <InputField
            label="Usage Hours"
            value={miscData.occupancyUsageHours?.toString() || '20'}
            onChangeText={(value) => handleNumericChange('occupancyUsageHours', value)}
            unit="hrs"
          />

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Calculated Load: {calculateOccupancyLoad().toFixed(3)} kW
            </Text>
          </View>
        </View>

        {/* Lighting Load */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lighting Load</Text>

          <InputField
            label="Light Power"
            value={miscData.lightPower?.toString() || '70'}
            onChangeText={(value) => handleNumericChange('lightPower', value)}
            unit="W"
          />

          <InputField
            label="Usage Hours"
            value={miscData.lightUsageHours?.toString() || '20'}
            onChangeText={(value) => handleNumericChange('lightUsageHours', value)}
            unit="hrs"
          />

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Calculated Load: {calculateLightLoad().toFixed(3)} kW
            </Text>
          </View>
        </View>

        {/* Heaters - Following Excel Structure */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Heaters (Continuous Operation)</Text>

          <InputField
            label="Peripheral Heaters Power"
            value={miscData.peripheralHeaters?.toString() || '1.5'}
            onChangeText={(value) => handleNumericChange('peripheralHeaters', value)}
            unit="kW each"
          />

          <InputField
            label="Peripheral Heaters Quantity"
            value={miscData.peripheralHeatersQuantity?.toString() || '8'}
            onChangeText={(value) => handleNumericChange('peripheralHeatersQuantity', value)}
          />

          <InputField
            label="Door Heaters Power"
            value={miscData.doorHeaters?.toString() || '0.27'}
            onChangeText={(value) => handleNumericChange('doorHeaters', value)}
            unit="kW each"
          />

          <InputField
            label="Door Heaters Quantity"
            value={miscData.doorHeatersQuantity?.toString() || '8'}
            onChangeText={(value) => handleNumericChange('doorHeatersQuantity', value)}
          />

          <InputField
            label="Tray Heaters Power"
            value={miscData.trayHeaters?.toString() || '2.2'}
            onChangeText={(value) => handleNumericChange('trayHeaters', value)}
            unit="kW each"
          />

          <InputField
            label="Tray Heaters Quantity"
            value={miscData.trayHeatersQuantity?.toString() || '1'}
            onChangeText={(value) => handleNumericChange('trayHeatersQuantity', value)}
          />

          <InputField
            label="Drain Heaters Power"
            value={miscData.drainHeaters?.toString() || '0.04'}
            onChangeText={(value) => handleNumericChange('drainHeaters', value)}
            unit="kW each"
          />

          <InputField
            label="Drain Heaters Quantity"
            value={miscData.drainHeatersQuantity?.toString() || '1'}
            onChangeText={(value) => handleNumericChange('drainHeatersQuantity', value)}
          />

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Total Heater Load: {calculateHeaterLoad().toFixed(3)} kW (continuous)
            </Text>
          </View>
        </View>

        {/* Additional Parameters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Storage Parameters</Text>

          <InputField
            label="Daily Loading"
            value={miscData.dailyLoading?.toString() || '4000'}
            onChangeText={(value) => handleNumericChange('dailyLoading', value)}
            unit="kg/day"
          />

          <InputField
            label="Door Clear Opening"
            value={miscData.doorClearOpening?.toString() || '2000'}
            onChangeText={(value) => handleNumericChange('doorClearOpening', value)}
            unit="mm"
          />

          <InputField
            label="Storage Capacity"
            value={miscData.storageCapacity?.toString() || '8'}
            onChangeText={(value) => handleNumericChange('storageCapacity', value)}
            unit="kg/m³"
          />

          <InputField
            label="Maximum Storage"
            value={miscData.maximumStorage?.toString() || '6338'}
            onChangeText={(value) => handleNumericChange('maximumStorage', value)}
            unit="kgs"
          />
        </View>

        {/* Total Miscellaneous Load Display */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Total Miscellaneous Load</Text>
          <View style={styles.infoCard}>
            <Text style={[styles.infoText, { fontSize: 16, fontWeight: 'bold' }]}>
              Equipment: {calculateEquipmentLoad().toFixed(3)} kW
            </Text>
            <Text style={[styles.infoText, { fontSize: 16, fontWeight: 'bold' }]}>
              Occupancy: {calculateOccupancyLoad().toFixed(3)} kW
            </Text>
            <Text style={[styles.infoText, { fontSize: 16, fontWeight: 'bold' }]}>
              Lighting: {calculateLightLoad().toFixed(3)} kW
            </Text>
            <Text style={[styles.infoText, { fontSize: 16, fontWeight: 'bold' }]}>
              Heaters: {calculateHeaterLoad().toFixed(3)} kW
            </Text>
            <Text style={[styles.infoText, { fontSize: 16, fontWeight: 'bold' }]}>
              Air Change: {calculateAirChangeLoad().toFixed(4)} kW
            </Text>
            <View style={styles.totalLine} />
            <Text style={[styles.infoText, { fontSize: 18, fontWeight: 'bold', color: '#2563eb' }]}>
              TOTAL: {(calculateEquipmentLoad() + calculateOccupancyLoad() + calculateLightLoad() + calculateHeaterLoad() + calculateAirChangeLoad()).toFixed(3)} kW
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  infoText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
  totalLine: {
    height: 1,
    backgroundColor: '#2563eb',
    marginVertical: 8,
  },
});