import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { InputField } from '@/components/InputField';
import { ProductPicker } from '@/components/ProductPicker';
import { PRODUCT_PRESET_MAP } from '@/data/products';
import { useStorageContext } from '@/hooks/StorageProvider';

export default function ProductTab() {
  const { productData, saveProductData } = useStorageContext();

  const updateProductData = (field: string, value: string | number) => {
    const newData = { ...productData, [field]: value };
    console.log('📦 Updating product data:', field, '=', value);
    saveProductData(newData);
    setTimeout(() => {
      console.log('✅ Product data saved');
    }, 0);
  };

  const handleNumericChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    updateProductData(field, numValue);
  };

  const handleSelectProduct = (name: string) => {
    const preset = PRODUCT_PRESET_MAP[name];
    if (!preset) return;
    const next = {
      ...productData,
      productName: name,
      // Only auto-fill constants from preset; keep mass/hours as is
      cpAboveFreezing: preset.cpAboveFreezing,
      watts: preset.respirationWattsPerTonne,
      // If user changes afterwards, they can still edit fields
      overridePreset: false,
    };
    console.log('🍏 Selected product preset:', name, preset);
    saveProductData(next);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Product Load</Text>
          <Text style={styles.subtitle}>Product cooling and respiration calculations</Text>
        </View>

        <View style={styles.section}>
          <ProductPicker selected={productData.productName || 'Custom'} onSelect={handleSelectProduct} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Load</Text>

          <InputField
            label="Mass of Product"
            value={productData.massBeforeFreezing.toString()}
            onChangeText={(value) => handleNumericChange('massBeforeFreezing', value)}
            unitOptions={['kg', 'lbs']}
            selectedUnit={productData.massUnit}
            onUnitChange={(unit) => updateProductData('massUnit', unit as 'kg' | 'lbs')}
          />

          <InputField
            label="Cp Above Freezing"
            value={productData.cpAboveFreezing.toString()}
            onChangeText={(value) => handleNumericChange('cpAboveFreezing', value)}
            unit="kJ/kg·K"
          />

          <InputField
            label="Pull Down Hours"
            value={productData.pullDownHours.toString()}
            onChangeText={(value) => handleNumericChange('pullDownHours', value)}
            unit="hrs"
          />

          {/* Calculation notes removed for cleaner UI */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Respiration Load</Text>

          <InputField
            label="Mass of Product"
            value={productData.respirationMass.toString()}
            onChangeText={(value) => handleNumericChange('respirationMass', value)}
            unitOptions={['kg', 'lbs']}
            selectedUnit={productData.massUnit}
            onUnitChange={(unit) => updateProductData('massUnit', unit as 'kg' | 'lbs')}
          />

          <InputField
            label="Watts per Tonne"
            value={productData.watts.toString()}
            onChangeText={(value) => handleNumericChange('watts', value)}
            unit="W/T"
          />

          {/* Calculation notes removed for cleaner UI */}
        </View>

  {/* Info section removed for cleaner UI */}
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
  calculationCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  calculationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 4,
  },
  calculationFormula: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  calculationNote: {
    fontSize: 12,
    color: '#64748b',
    fontStyle: 'italic',
  },
  infoText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});