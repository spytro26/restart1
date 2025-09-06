import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { InputField } from '@/components/InputField';
import { useStorage } from '@/hooks/useStorage';

export default function MiscellaneousTab() {
  const { miscData, saveMiscData } = useStorage();

  const updateMiscData = (field: string, value: string | number) => {
    const newData = { ...miscData, [field]: value };
    saveMiscData(newData);
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

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Temperature differences are automatically calculated:
              {'\n'}• Wall/Ceiling/Floor TD = Ambient - Room
              {'\n'}• Product TD = Incoming - Outgoing
            </Text>
          </View>
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
            unit="kW"
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
            unit="kW"
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
            unit="kW"
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
            unit="kW"
          />

          <InputField
            label="Door Heaters"
            value={miscData.doorHeaters.toString()}
            onChangeText={(value) => handleNumericChange('doorHeaters', value)}
            unit="kW"
          />

          <InputField
            label="Tray Heaters"
            value={miscData.trayHeaters.toString()}
            onChangeText={(value) => handleNumericChange('trayHeaters', value)}
            unit="kW"
          />
        </View>

        {/* Additional Parameters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Parameters</Text>
          
          <InputField
            label="Daily Loading"
            value={miscData.dailyLoading.toString()}
            onChangeText={(value) => handleNumericChange('dailyLoading', value)}
            unit="kg/day"
          />

          <InputField
            label="Cp Above Freezing"
            value={miscData.cpAboveFreezingMisc.toString()}
            onChangeText={(value) => handleNumericChange('cpAboveFreezingMisc', value)}
            unit="kJ/kg·K"
          />

          <InputField
            label="Pull Down Time"
            value={miscData.pullDownTime.toString()}
            onChangeText={(value) => handleNumericChange('pullDownTime', value)}
            unit="hrs"
          />

          <InputField
            label="Air Flow per Fan"
            value={miscData.airFlowPerFan.toString()}
            onChangeText={(value) => handleNumericChange('airFlowPerFan', value)}
            unit="cfm"
          />

          <InputField
            label="Door Clear Opening"
            value={miscData.doorClearOpening.toString()}
            onChangeText={(value) => handleNumericChange('doorClearOpening', value)}
            unit="mm"
          />

          <InputField
            label="Storage Capacity"
            value={miscData.storageCapacity.toString()}
            onChangeText={(value) => handleNumericChange('storageCapacity', value)}
            unit="kg/m³"
          />

          <InputField
            label="Maximum Storage"
            value={miscData.maximumStorage.toString()}
            onChangeText={(value) => handleNumericChange('maximumStorage', value)}
            unit="kgs"
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