import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { InputField } from '@/components/InputField';
import { UnitPicker } from '@/components/UnitPicker';
import { useFreezerStorageContext } from '@/hooks/FreezerStorageProvider';

export default function FreezerRoomDetailsTab() {
  const { roomData, saveRoomData } = useFreezerStorageContext();

  const handleValueChange = (field: string, value: string) => {
    const numericValue = parseFloat(value) || 0;
    saveRoomData({
      ...roomData,
      [field]: numericValue,
    });
  };

  const handleUnitChange = (field: string, unit: string) => {
    saveRoomData({
      ...roomData,
      [field]: unit,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Freezer Room Dimensions</Text>
            <Text style={styles.subtitle}>Enter the dimensions of your freezer room</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Room Dimensions</Text>

            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <InputField
                  label="Length"
                  value={roomData.length.toString()}
                  onChangeText={(value) => handleValueChange('length', value)}
                  keyboardType="numeric"
                  placeholder="0"
                />
              </View>
              <View style={styles.unitContainer}>
                <UnitPicker
                  selectedUnit={roomData.lengthUnit}
                  onUnitChange={(unit) => handleUnitChange('lengthUnit', unit)}
                  units={['m', 'ft']}
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <InputField
                  label="Width"
                  value={roomData.width.toString()}
                  onChangeText={(value) => handleValueChange('width', value)}
                  keyboardType="numeric"
                  placeholder="0"
                />
              </View>
              <View style={styles.unitContainer}>
                <Text style={styles.unitText}>{roomData.lengthUnit}</Text>
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <InputField
                  label="Height"
                  value={roomData.height.toString()}
                  onChangeText={(value) => handleValueChange('height', value)}
                  keyboardType="numeric"
                  placeholder="0"
                />
              </View>
              <View style={styles.unitContainer}>
                <Text style={styles.unitText}>{roomData.lengthUnit}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thermal Properties</Text>
            <Text style={styles.sectionSubtitle}>U-factors for heat transmission</Text>

            <InputField
              label="Wall U-Factor"
              value={roomData.wallUFactor.toString()}
              onChangeText={(value) => handleValueChange('wallUFactor', value)}
              keyboardType="numeric"
              placeholder="0.295"
              unit="W/m²·K"
            />

            <InputField
              label="Ceiling U-Factor"
              value={roomData.ceilingUFactor.toString()}
              onChangeText={(value) => handleValueChange('ceilingUFactor', value)}
              keyboardType="numeric"
              placeholder="0.295"
              unit="W/m²·K"
            />

            <InputField
              label="Floor U-Factor"
              value={roomData.floorUFactor.toString()}
              onChangeText={(value) => handleValueChange('floorUFactor', value)}
              keyboardType="numeric"
              placeholder="0.295"
              unit="W/m²·K"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Operating Hours</Text>
            <Text style={styles.sectionSubtitle}>Hours of load for each surface</Text>

            <InputField
              label="Wall Hours"
              value={roomData.wallHours.toString()}
              onChangeText={(value) => handleValueChange('wallHours', value)}
              keyboardType="numeric"
              placeholder="24"
              unit="hrs"
            />

            <InputField
              label="Ceiling Hours"
              value={roomData.ceilingHours.toString()}
              onChangeText={(value) => handleValueChange('ceilingHours', value)}
              keyboardType="numeric"
              placeholder="24"
              unit="hrs"
            />

            <InputField
              label="Floor Hours"
              value={roomData.floorHours.toString()}
              onChangeText={(value) => handleValueChange('floorHours', value)}
              keyboardType="numeric"
              placeholder="24"
              unit="hrs"
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Powered by Enzo</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    marginRight: 12,
  },
  unitContainer: {
    minWidth: 80,
  },
  unitText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    paddingVertical: 12,
  },
  footer: {
    marginTop: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
  },
});
