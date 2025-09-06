import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { RotateCcw } from 'lucide-react-native';
import { useStorage } from '@/hooks/useStorage';
import { calculateHeatLoad } from '@/utils/calculations';

export default function ResultsTab() {
  const { roomData, productData, miscData, resetToDefaults } = useStorage();

  const results = useMemo(() => {
    return calculateHeatLoad(roomData, productData, miscData);
  }, [roomData, productData, miscData]);

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
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Results</Text>
          <Text style={styles.subtitle}>Heat Load Calculation Summary</Text>
          
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={resetToDefaults}
          >
            <RotateCcw size={16} color="#ffffff" />
            <Text style={styles.resetButtonText}>Reset to Defaults</Text>
          </TouchableOpacity>
        </View>

        {/* Temperature Differences Display */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calculated Temperature Differences</Text>
          
          <ResultCard
            title="Wall Temperature Difference"
            value={results.wallTempDiff}
            unit="°C"
            subtitle="Ambient - Room Temperature"
            color="#dc2626"
          />
          
          <ResultCard
            title="Ceiling Temperature Difference"
            value={results.ceilingTempDiff}
            unit="°C"
            subtitle="30% of Wall TD"
            color="#dc2626"
          />
          
          <ResultCard
            title="Floor Temperature Difference"
            value={results.floorTempDiff}
            unit="°C"
            subtitle="30% of Wall TD"
            color="#dc2626"
          />
          
          <ResultCard
            title="Product Temperature Difference"
            value={results.productTempDiff}
            unit="°C"
            subtitle="Incoming - Outgoing Temperature"
            color="#ea580c"
          />
        </View>

        {/* Transmission Loads */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transmission Loads</Text>
          
          <ResultCard
            title="Wall Load"
            value={results.wallLoad}
            unit="kW"
            color="#dc2626"
          />
          
          <ResultCard
            title="Ceiling Load"
            value={results.ceilingLoad}
            unit="kW"
            color="#dc2626"
          />
          
          <ResultCard
            title="Floor Load"
            value={results.floorLoad}
            unit="kW"
            color="#dc2626"
          />
          
          <ResultCard
            title="Total Transmission Load"
            value={results.totalTransmissionLoad}
            unit="kW"
            subtitle={`${(results.totalTransmissionLoad * 1000 / 3516.85).toFixed(3)} TR`}
            color="#991b1b"
          />
        </View>

        {/* Product Loads */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product & Air Loads</Text>
          
          <ResultCard
            title="Product Load"
            value={results.productLoad}
            unit="kW"
            subtitle={`${(results.productLoad * 1000 / 3516.85).toFixed(3)} TR`}
            color="#ea580c"
          />
          
          <ResultCard
            title="Respiration Load"
            value={results.respirationLoad}
            unit="kW"
            subtitle={`${(results.respirationLoad * 1000 / 3516.85).toFixed(3)} TR`}
            color="#ea580c"
          />
          
          <ResultCard
            title="Air Change Load"
            value={results.airChangeLoad}
            unit="kW"
            subtitle={`${(results.airChangeLoad * 1000 / 3516.85).toFixed(3)} TR`}
            color="#0891b2"
          />
        </View>

        {/* Miscellaneous Loads */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Miscellaneous Loads</Text>
          
          <ResultCard
            title="Equipment Load"
            value={results.equipmentLoad}
            unit="kW"
            color="#7c3aed"
          />
          
          <ResultCard
            title="Occupancy Load"
            value={results.occupancyLoad}
            unit="kW"
            color="#7c3aed"
          />
          
          <ResultCard
            title="Lighting Load"
            value={results.lightLoad}
            unit="kW"
            color="#7c3aed"
          />
          
          <ResultCard
            title="Heater Load"
            value={results.heaterLoad}
            unit="kW"
            color="#7c3aed"
          />
          
          <ResultCard
            title="Total Miscellaneous Load"
            value={results.totalMiscLoad}
            unit="kW"
            subtitle={`${(results.totalMiscLoad * 1000 / 3516.85).toFixed(3)} TR`}
            color="#6d28d9"
          />
        </View>

        {/* Final Results */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Final Results</Text>
          
          <View style={styles.finalResultCard}>
            <Text style={styles.finalResultTitle}>Total Heat Load</Text>
            <Text style={styles.finalResultValue}>
              {results.totalLoadTR.toFixed(3)} TR
            </Text>
            <Text style={styles.finalResultSubValue}>
              {results.totalLoad.toFixed(0)} W ({results.loadInKw.toFixed(2)} kW)
            </Text>
          </View>
          
          <ResultCard
            title="Refrigeration Capacity (with 10% safety)"
            value={results.capacityTR}
            unit="TR"
            subtitle={`${results.refrigerationCapacity.toFixed(0)} BTU/hr`}
            color="#059669"
          />
          
          <ResultCard
            title="Sensible Heat"
            value={results.sensibleHeat}
            unit="W"
            color="#0891b2"
          />
          
          <ResultCard
            title="Latent Heat"
            value={results.latentHeat}
            unit="W"
            color="#0891b2"
          />
          
          <ResultCard
            title="Air Quantity Required"
            value={results.airQtyRequired}
            unit="CFM"
            subtitle="Air flow requirement"
            color="#7c2d12"
          />
        </View>

        {/* Excel Matching Verification */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Excel Formula Verification</Text>
          <View style={styles.verificationCard}>
            <Text style={styles.verificationTitle}>✓ Expected Excel Values (Default Settings)</Text>
            <Text style={styles.verificationText}>
              With default values, Excel should show:
            </Text>
            <Text style={styles.verificationItem}>• Total TR: ~1.96 TR</Text>
            <Text style={styles.verificationItem}>• Total Load: ~6.89 kW</Text>
            <Text style={styles.verificationItem}>• Capacity (10% safety): ~2.16 TR</Text>
            <Text style={styles.verificationItem}>• Air Qty Required: ~4163 CFM</Text>
            <Text style={styles.verificationItem}>• Wall Load: ~0.17 TR</Text>
            <Text style={styles.verificationItem}>• Product Load: ~1.40 TR</Text>
            <Text style={styles.verificationFooter}>
              Formulas: Transmission = U×A×TD×Hrs/24, TR = Load/3516.85
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
    marginBottom: 16,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
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
  resultCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  resultSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  finalResultCard: {
    backgroundColor: '#1e40af',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  finalResultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  finalResultValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  finalResultSubValue: {
    fontSize: 18,
    fontWeight: '500',
    color: '#bfdbfe',
  },
  verificationCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
  },
  verificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#15803d',
    marginBottom: 8,
  },
  verificationText: {
    fontSize: 14,
    color: '#166534',
    marginBottom: 12,
  },
  verificationItem: {
    fontSize: 12,
    color: '#166534',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  verificationFooter: {
    fontSize: 12,
    fontWeight: '600',
    color: '#15803d',
    marginTop: 8,
  },
});