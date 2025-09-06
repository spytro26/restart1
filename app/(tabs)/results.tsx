import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useStorageContext } from '@/hooks/StorageProvider';
import { useGlobalUpdate } from '@/hooks/useGlobalUpdate';
import { calculateHeatLoad } from '@/utils/calculations';

export default function ResultsTab() {
  const { roomData, productData, miscData } = useStorageContext();
  const { updateCount } = useGlobalUpdate();

  // Calculate results fresh every render
  const results = calculateHeatLoad(roomData, productData, miscData);
  console.log('🧮 Recalculated results with length:', roomData.length, 'width:', roomData.width, 'height:', roomData.height);

  // No extra focus update needed; context changes re-render automatically

  // Calculate room volume for load density
  const roomVolume = roomData.length * roomData.width * roomData.height; // m³

  const ResultCard = ({
    title,
    value,
    unit,
    subtitle,
    color = '#2563eb'
  }: {
    title: string;
    value: number;
    unit: string;
    subtitle?: string;
    color?: string;
  }) => (
    <View style={[styles.resultCard, { borderLeftColor: color }]}>
      <Text style={styles.resultTitle}>{title}</Text>
      <Text style={[styles.resultValue, { color }]}>
        {value.toFixed(3)} {unit}
      </Text>
      {subtitle && <Text style={styles.resultSubtitle}>{subtitle}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView key={updateCount} style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.powered}>Powered by Enzo</Text>
          <Text style={styles.title}>Results</Text>
        </View>

        {/* Final Results (Top) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Final Results</Text>
          <View style={styles.safetyResultCard}>
            <Text style={styles.safetyResultTitle}>Required Capacity (with 20% Safety)</Text>
            <Text style={styles.safetyResultValue}>
              {results.capacityTR.toFixed(3)} TR
            </Text>
            <Text style={styles.safetyResultSubValue}>
              {(results.totalLoad * 1.20).toFixed(0)} W ({(results.loadInKw * 1.20).toFixed(2)} kW)
            </Text>
            <Text style={styles.safetyResultSubValue}>{results.refrigerationCapacity.toFixed(0)} BTU/hr</Text>
          </View>
        </View>

        {/* Transmission Loads */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transmission Loads</Text>

          <ResultCard
            title="Wall Load"
            value={results.wallLoad}
            unit="kW"
            color="#2563eb"
          />

          <ResultCard
            title="Ceiling Load"
            value={results.ceilingLoad}
            unit="kW"
            color="#2563eb"
          />

          <ResultCard
            title="Floor Load"
            value={results.floorLoad}
            unit="kW"
            color="#2563eb"
          />

          <ResultCard
            title="Total Transmission Load"
            value={results.totalTransmissionLoad}
            unit="kW"
            subtitle={`${(results.totalTransmissionLoad * 1000 / 3516.85).toFixed(3)} TR`}
            color="#2563eb"
          />
        </View>

  {/* Product & Air */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product & Air Loads</Text>

          <ResultCard
            title="Product Load"
            value={results.productLoad}
            unit="kW"
            subtitle={`${(results.productLoad * 1000 / 3516.85).toFixed(3)} TR`}
            color="#2563eb"
          />

          <ResultCard
            title="Respiration Load"
            value={results.respirationLoad}
            unit="kW"
            subtitle={`${(results.respirationLoad * 1000 / 3516.85).toFixed(3)} TR`}
            color="#2563eb"
          />

          <ResultCard
            title="Air Change Load"
            value={results.airChangeLoad}
            unit="kW"
            subtitle={`${(results.airChangeLoad * 1000 / 3516.85).toFixed(3)} TR`}
            color="#2563eb"
          />
        </View>

  {/* Miscellaneous Loads */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Miscellaneous Loads</Text>

          <ResultCard
            title="Equipment Load"
            value={results.equipmentLoad}
            unit="kW"
            color="#2563eb"
          />

          <ResultCard
            title="Occupancy Load"
            value={results.occupancyLoad}
            unit="kW"
            color="#2563eb"
          />

          <ResultCard
            title="Lighting Load"
            value={results.lightLoad}
            unit="kW"
            color="#2563eb"
          />

          <ResultCard
            title="Heater Load"
            value={results.heaterLoad}
            unit="kW"
            color="#2563eb"
          />

          <ResultCard
            title="Total Miscellaneous Load"
            value={results.totalMiscLoad}
            unit="kW"
            subtitle={`${(results.totalMiscLoad * 1000 / 3516.85).toFixed(3)} TR`}
            color="#2563eb"
          />
        </View>

        {/* Support Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional</Text>
          <ResultCard title="Sensible Heat" value={results.sensibleHeat} unit="W" color="#2563eb" />
          <ResultCard title="Latent Heat" value={results.latentHeat} unit="W" color="#2563eb" />
          <ResultCard title="Air Quantity Required" value={results.airQtyRequired} unit="CFM" color="#2563eb" />
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
    paddingVertical: 14,
    alignItems: 'center',
  },
  powered: {
    fontSize: 14,
    color: '#1e40af',
    marginBottom: 6,
    letterSpacing: 1,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 10,
  },
  resultCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  resultTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  resultSubtitle: {
    fontSize: 11,
    color: '#6b7280',
  },
  safetyResultCard: {
    backgroundColor: '#1e40af',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  safetyResultTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  safetyResultValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  safetyResultSubValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#bfdbfe',
  },
});