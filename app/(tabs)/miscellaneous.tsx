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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Miscellaneous Loads</Text>
          <Text style={styles.subtitle}>Air change, equipment, lighting & other loads</Text>
        </View>

        {/* Temperature Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Temperature Settings</Text>

          <InputField
            label="Ambient Temperature"
            value={miscData.ambientTemp.toString()}
            onChangeText={(value) => handleNumericChange('ambientTemp', value)}
            unitOptions={['C', 'F']}
            selectedUnit={miscData.tempUnit}
            onUnitChange={(unit) => updateMiscData('tempUnit', unit as 'C' | 'F')}
          />

          <InputField
            label="Room Temperature"
            value={miscData.roomTemp.toString()}
            onChangeText={(value) => handleNumericChange('roomTemp', value)}
            unitOptions={['C', 'F']}
            selectedUnit={miscData.tempUnit}
            onUnitChange={(unit) => updateMiscData('tempUnit', unit as 'C' | 'F')}
          />

          <InputField
            label="Product Incoming Temperature"
            value={miscData.productIncoming.toString()}
            onChangeText={(value) => handleNumericChange('productIncoming', value)}
            unitOptions={['C', 'F']}
            selectedUnit={miscData.tempUnit}
            onUnitChange={(unit) => updateMiscData('tempUnit', unit as 'C' | 'F')}
          />

          <InputField
            label="Product Outgoing Temperature"
            value={miscData.productOutgoing.toString()}
            onChangeText={(value) => handleNumericChange('productOutgoing', value)}
            unitOptions={['C', 'F']}
            selectedUnit={miscData.tempUnit}
            onUnitChange={(unit) => updateMiscData('tempUnit', unit as 'C' | 'F')}
          />

          {/* Info note removed for cleaner UI */}
        </View>

        {/* Air Change Load */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Air Change Load</Text>

          <InputField
            label="Air Change Rate"
            value={miscData.airChangeRate.toString()}
            onChangeText={(value) => handleNumericChange('airChangeRate', value)}
            unit="L/S"
          />

          <InputField
            label="Enthalpy Difference"
            value={miscData.enthalpyDiff.toString()}
            onChangeText={(value) => handleNumericChange('enthalpyDiff', value)}
            unit="kJ/L"
          />

          <InputField
            label="Hours of Load"
            value={miscData.hoursOfLoad.toString()}
            onChangeText={(value) => handleNumericChange('hoursOfLoad', value)}
            unit="hrs"
          />
        </View>

        {/* Equipment Load */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipment Load</Text>

          <InputField
            label="Equipment Power"
            value={miscData.equipmentPower.toString()}
            onChangeText={(value) => handleNumericChange('equipmentPower', value)}
            unit="W"
          />

          <InputField
            label="Usage Hours per Day"
            value={miscData.equipmentUsageHours.toString()}
            onChangeText={(value) => handleNumericChange('equipmentUsageHours', value)}
            unit="hrs/day"
          />
        </View>

        {/* Occupancy Load */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Occupancy Load</Text>

          <InputField
            label="Number of People"
            value={miscData.occupancyCount.toString()}
            onChangeText={(value) => handleNumericChange('occupancyCount', value)}
          />

          <InputField
            label="Heat Equivalent per Person"
            value={miscData.occupancyHeatEquiv.toString()}
            onChangeText={(value) => handleNumericChange('occupancyHeatEquiv', value)}
            unit="W"
          />

          <InputField
            label="Usage Hours per Day"
            value={miscData.occupancyUsageHours.toString()}
            onChangeText={(value) => handleNumericChange('occupancyUsageHours', value)}
            unit="hrs/day"
          />
        </View>

        {/* Lighting Load */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lighting Load</Text>

          <InputField
            label="Light Power"
            value={miscData.lightPower.toString()}
            onChangeText={(value) => handleNumericChange('lightPower', value)}
            unit="W"
          />

          <InputField
            label="Usage Hours per Day"
            value={miscData.lightUsageHours.toString()}
            onChangeText={(value) => handleNumericChange('lightUsageHours', value)}
            unit="hrs/day"
          />
        </View>

        {/* Heaters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Heaters</Text>

          <InputField
            label="Peripheral Heaters"
            value={miscData.peripheralHeaters.toString()}
            onChangeText={(value) => handleNumericChange('peripheralHeaters', value)}
            unit="W"
          />

          <InputField
            label="Door Heaters"
            value={miscData.doorHeaters.toString()}
            onChangeText={(value) => handleNumericChange('doorHeaters', value)}
            unit="W"
          />

          <InputField
            label="Tray Heaters"
            value={miscData.trayHeaters.toString()}
            onChangeText={(value) => handleNumericChange('trayHeaters', value)}
            unit="W"
          />
        </View>

        {/* Additional Parameters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cold Storage Specific Parameters</Text>

          <InputField
            label="Daily Loading"
            value={miscData.dailyLoading?.toString() || '4000'}
            onChangeText={(value) => handleNumericChange('dailyLoading', value)}
            unit="kg/day"
          />

          <InputField
            label="Insulation Type"
            value={miscData.insulationType || 'PUF'}
            onChangeText={(value) => updateMiscData('insulationType', value)}
            unit=""
          />

          <InputField
            label="Insulation Thickness"
            value={miscData.insulationThickness?.toString() || '100'}
            onChangeText={(value) => handleNumericChange('insulationThickness', value)}
            unit="mm"
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

        {/* Steam Humidifiers (if applicable) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Steam Humidifiers (Optional)</Text>

          <InputField
            label="Steam Generation Capacity"
            value={miscData.steamGenCapacity?.toString() || '0'}
            onChangeText={(value) => handleNumericChange('steamGenCapacity', value)}
            unit="kg/hr"
          />

          <InputField
            label="Room Length for Steam"
            value={miscData.roomLength?.toString() || '0'}
            onChangeText={(value) => handleNumericChange('roomLength', value)}
            unit="m"
          />

          <InputField
            label="Hours of Operation"
            value={miscData.hoursOfOperation?.toString() || '0'}
            onChangeText={(value) => handleNumericChange('hoursOfOperation', value)}
            unit="hrs"
          />
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
});