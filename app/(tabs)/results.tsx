import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStorageContext } from '@/hooks/StorageProvider';
import { useGlobalUpdate } from '@/hooks/useGlobalUpdate';
import { calculateHeatLoad } from '@/utils/calculations';
import { generateAndSharePDF, PDFData } from '@/utils/pdfGenerator';

export default function ColdRoomResultsTab() {
  const { roomData, productData, miscData } = useStorageContext();

  // Subscribe to global updates for real-time calculation
  useGlobalUpdate();

  const results = calculateHeatLoad(roomData, productData, miscData);

  const handleSharePDF = async () => {
    const pdfData: PDFData = {
      title: 'Cold Room Heat Load Summary',
      subtitle: 'Key calculation results for cold room refrigeration system',
      sections: [
        {
          title: 'Final Results',
          items: [
            { label: 'Total Load', value: results.totalLoadTR.toFixed(1), unit: 'TR', isHighlighted: true },
            { label: 'Capacity with Safety', value: results.capacityTR.toFixed(1), unit: 'TR', isHighlighted: true },
            { label: 'Total Load', value: results.loadInKw.toFixed(1), unit: 'kW', isHighlighted: true },
            { label: 'Refrigeration Capacity', value: results.refrigerationCapacity.toFixed(0), unit: 'BTU/hr' },
          ]
        },
        {
          title: 'Transmission Loads',
          items: [
            { label: 'Total Transmission', value: results.totalTransmissionLoad.toFixed(1), unit: 'kW' },
            { label: 'Wall Load', value: results.wallLoad.toFixed(1), unit: 'kW' },
            { label: 'Ceiling Load', value: results.ceilingLoad.toFixed(1), unit: 'kW' },
          ]
        },
        {
          title: 'Product & Other Loads',
          items: [
            { label: 'Product Load', value: results.productLoad.toFixed(1), unit: 'kW' },
            { label: 'Total Miscellaneous', value: results.totalMiscLoad.toFixed(1), unit: 'kW' },
            { label: 'Air Change Load', value: results.airChangeLoad.toFixed(1), unit: 'kW' },
          ]
        },
        {
          title: 'Heat Distribution',
          items: [
            { label: 'Sensible Heat', value: (results.sensibleHeat / 1000).toFixed(1), unit: 'kW' },
            { label: 'Latent Heat', value: (results.latentHeat / 1000).toFixed(1), unit: 'kW' },
            { label: 'Air Quantity Required', value: results.airQtyRequired.toFixed(0), unit: 'CFM' },
          ]
        }
      ]
    };

    await generateAndSharePDF(pdfData);
  };

  const ResultCard = ({ title, value, unit, isHighlighted = false }: {
    title: string;
    value: number;
    unit: string;
    isHighlighted?: boolean;
  }) => (
    <View style={[styles.resultCard, isHighlighted && styles.highlightedCard]}>
      <Text style={[styles.resultLabel, isHighlighted && styles.highlightedLabel]}>{title}</Text>
      <Text style={[styles.resultValue, isHighlighted && styles.highlightedValue]}>
        {value.toFixed(1)} <Text style={styles.resultUnit}>{unit}</Text>
      </Text>
    </View>
  );

  const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Final Results</Text>
            <Text style={styles.subtitle}>Cold room heat load calculation results</Text>

            {/* PDF Export Button */}
            <TouchableOpacity style={styles.pdfButton} onPress={handleSharePDF}>
              <Ionicons name="document-text-outline" size={20} color="#ffffff" />
              <Text style={styles.pdfButtonText}>Share as PDF</Text>
            </TouchableOpacity>
          </View>

          {/* Final Results - Highlighted */}
          <SectionCard title="Final Results">
            <ResultCard
              title="Total Load (Base)"
              value={results.loadInKw}
              unit="kW"
              isHighlighted={true}
            />
            <ResultCard
              title="Total Load (Base)"
              value={results.totalLoadTR}
              unit="TR"
            />
            <ResultCard
              title="Capacity with 20% Safety Factor"
              value={results.loadInKw * 1.20}
              unit="kW"
              isHighlighted={true}
            />
            <ResultCard
              title="Capacity with 20% Safety Factor"
              value={results.capacityTR}
              unit="TR"
              isHighlighted={true}
            />
            <ResultCard
              title="Refrigeration Capacity"
              value={results.refrigerationCapacity}
              unit="BTU/hr"
            />
          </SectionCard>

          {/* Transmission Loads */}
          <SectionCard title="Transmission Loads">
            <ResultCard title="Wall Load" value={results.wallLoad} unit="kW" />
            <ResultCard title="Ceiling Load" value={results.ceilingLoad} unit="kW" />
            <ResultCard title="Floor Load" value={results.floorLoad} unit="kW" />
            <ResultCard
              title="Total Transmission Load"
              value={results.totalTransmissionLoad}
              unit="kW"
            />
          </SectionCard>

          {/* Product Loads */}
          <SectionCard title="Product Loads">
            <ResultCard title="Product Load" value={results.productLoad} unit="kW" />
            <ResultCard title="Respiration Load" value={results.respirationLoad} unit="kW" />
          </SectionCard>

          {/* Other Loads */}
          <SectionCard title="Other Loads">
            <ResultCard title="Air Change Load" value={results.airChangeLoad} unit="kW" />
            <ResultCard title="Equipment Load" value={results.equipmentLoad} unit="kW" />
            <ResultCard title="Lighting Load" value={results.lightLoad} unit="kW" />
            <ResultCard title="Heater Load" value={results.heaterLoad} unit="kW" />
            <ResultCard title="Occupancy Load" value={results.occupancyLoad} unit="kW" />
            <ResultCard
              title="Total Miscellaneous Load"
              value={results.totalMiscLoad}
              unit="kW"
            />
          </SectionCard>

          {/* Heat Distribution */}
          <SectionCard title="Heat Distribution">
            <ResultCard title="Sensible Heat" value={results.sensibleHeat / 1000} unit="kW" />
            <ResultCard title="Latent Heat" value={results.latentHeat / 1000} unit="kW" />
            <ResultCard title="Air Quantity Required" value={results.airQtyRequired} unit="CFM" />
          </SectionCard>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Powered by Enzo</Text>
            <Text style={styles.footerSubtext}>
              Professional cold room heat load calculations following ASHRAE standards
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
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  pdfButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  pdfButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  resultCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  highlightedCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderBottomWidth: 0,
  },
  resultLabel: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  highlightedLabel: {
    fontWeight: '600',
    color: '#1e293b',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  highlightedValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563eb',
  },
  resultUnit: {
    fontSize: 14,
    fontWeight: '400',
    color: '#2563eb',
  },
  footer: {
    marginTop: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});