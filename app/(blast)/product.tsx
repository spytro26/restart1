import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { InputField } from '@/components/InputField';
import { CategorizedBlastProductPicker } from '@/components/CategorizedBlastProductPicker';
import { useBlastStorageContext } from '@/hooks/BlastStorageProvider';

export default function BlastProductTab() {
    const { productData, saveProductData } = useBlastStorageContext();

    const handleProductSelect = (productName: string, productInfo?: any) => {
        if (productInfo) {
            saveProductData({
                ...productData,
                productName,
                cpAboveFreezing: productInfo.cpAboveFreezing,
                cpBelowFreezing: productInfo.cpBelowFreezing,
                latentHeat: productInfo.latentHeatOfFusion,
            });
        }
    };

    const handleValueChange = (field: string, value: string) => {
        const numericValue = parseFloat(value) || 0;
        saveProductData({
            ...productData,
            [field]: numericValue,
        });
    };

    const handleUnitChange = (field: string, unit: string) => {
        saveProductData({
            ...productData,
            [field]: unit,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Product Load Parameters</Text>
                        <Text style={styles.subtitle}>Enter product specifications for heat load calculation</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Product Information</Text>

                        <CategorizedBlastProductPicker
                            selected={productData.productName || 'Custom'}
                            onSelect={handleProductSelect}
                        />

                        <InputField
                            label="Product Entering Temp"
                            value={productData.productEnteringTemp.toString()}
                            onChangeText={(value) => handleValueChange('productEnteringTemp', value)}
                            keyboardType="numbers-and-punctuation"
                            placeholder="-5"
                            unitOptions={['°C', '°F']}
                            selectedUnit={productData.tempUnit === 'F' ? '°F' : '°C'}
                            onUnitChange={(unit) => handleUnitChange('tempUnit', unit === '°F' ? 'F' : 'C')}
                        />

                        <InputField
                            label="Product Final Temp"
                            value={productData.productFinalTemp.toString()}
                            onChangeText={(value) => handleValueChange('productFinalTemp', value)}
                            keyboardType="numbers-and-punctuation"
                            placeholder="-30"
                            unitOptions={['°C', '°F']}
                            selectedUnit={productData.tempUnit === 'F' ? '°F' : '°C'}
                            onUnitChange={(unit) => handleUnitChange('tempUnit', unit === '°F' ? 'F' : 'C')}
                        />

                        <InputField
                            label="Pull Down Hours"
                            value={productData.pullDownHours.toString()}
                            onChangeText={(value) => handleValueChange('pullDownHours', value)}
                            keyboardType="decimal-pad"
                            placeholder="8"
                            unit="hrs"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Product Thermal Properties</Text>
                        <Text style={styles.sectionSubtitle}>Specific heat and latent heat values</Text>

                        <InputField
                            label="Cp Above Freezing"
                            value={productData.cpAboveFreezing.toString()}
                            onChangeText={(value) => handleValueChange('cpAboveFreezing', value)}
                            keyboardType="decimal-pad"
                            placeholder="3.49"
                            unit="kJ/kg·K"
                        />

                        <InputField
                            label="Cp Below Freezing"
                            value={productData.cpBelowFreezing.toString()}
                            onChangeText={(value) => handleValueChange('cpBelowFreezing', value)}
                            keyboardType="decimal-pad"
                            placeholder="2.14"
                            unit="kJ/kg·K"
                        />

                        <InputField
                            label="Latent Heat"
                            value={productData.latentHeat.toString()}
                            onChangeText={(value) => handleValueChange('latentHeat', value)}
                            keyboardType="decimal-pad"
                            placeholder="233"
                            unit="kJ/kg"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Product Properties</Text>

                        <InputField
                            label="Freezing Point"
                            value={productData.freezingPoint.toString()}
                            onChangeText={(value) => handleValueChange('freezingPoint', value)}
                            keyboardType="numbers-and-punctuation"
                            placeholder="-1.7"
                            unitOptions={['°C', '°F']}
                            selectedUnit={productData.tempUnit === 'F' ? '°F' : '°C'}
                            onUnitChange={(unit) => handleUnitChange('tempUnit', unit === '°F' ? 'F' : 'C')}
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
