import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { InputField } from '@/components/InputField';
import { useBlastStorageContext } from '@/hooks/BlastStorageProvider';

export default function BlastProductTab() {
    const { productData, saveProductData } = useBlastStorageContext();

    const handleValueChange = (field: string, value: string) => {
        const numericValue = parseFloat(value) || 0;
        saveProductData({
            ...productData,
            [field]: numericValue,
        });
    };

    const handleStringChange = (field: string, value: string) => {
        saveProductData({
            ...productData,
            [field]: value,
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

                        <InputField
                            label="Product Name"
                            value={productData.productName}
                            onChangeText={(value) => handleStringChange('productName', value)}
                            placeholder="Chicken"
                        />

                        <InputField
                            label="Pull Down Hours"
                            value={productData.pullDownHours.toString()}
                            onChangeText={(value) => handleValueChange('pullDownHours', value)}
                            keyboardType="numeric"
                            placeholder="8"
                            unit="hrs"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Before Freezing Load</Text>
                        <Text style={styles.sectionSubtitle}>Mass of product and specific heat above freezing</Text>

                        <InputField
                            label="Mass Before Freezing"
                            value={productData.massBeforeFreezing.toString()}
                            onChangeText={(value) => handleValueChange('massBeforeFreezing', value)}
                            keyboardType="numeric"
                            placeholder="2000"
                            unit="kg"
                        />

                        <InputField
                            label="Cp Above Freezing"
                            value={productData.cpAboveFreezing.toString()}
                            onChangeText={(value) => handleValueChange('cpAboveFreezing', value)}
                            keyboardType="numeric"
                            placeholder="3.49"
                            unit="kJ/kg·K"
                        />

                        <InputField
                            label="Temperature Difference"
                            value={productData.tempDiffAbove.toString()}
                            onChangeText={(value) => handleValueChange('tempDiffAbove', value)}
                            keyboardType="numeric"
                            placeholder="-3.3"
                            unit="K"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Latent Heat of Freezing</Text>
                        <Text style={styles.sectionSubtitle}>Heat removal during phase change</Text>

                        <InputField
                            label="Mass for Latent Heat"
                            value={productData.massLatentHeat.toString()}
                            onChangeText={(value) => handleValueChange('massLatentHeat', value)}
                            keyboardType="numeric"
                            placeholder="2000"
                            unit="kg"
                        />

                        <InputField
                            label="Latent Heat"
                            value={productData.latentHeat.toString()}
                            onChangeText={(value) => handleValueChange('latentHeat', value)}
                            keyboardType="numeric"
                            placeholder="233"
                            unit="kJ/kg"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>After Freezing Load</Text>
                        <Text style={styles.sectionSubtitle}>Mass of product and specific heat below freezing</Text>

                        <InputField
                            label="Mass After Freezing"
                            value={productData.massAfterFreezing.toString()}
                            onChangeText={(value) => handleValueChange('massAfterFreezing', value)}
                            keyboardType="numeric"
                            placeholder="2000"
                            unit="kg"
                        />

                        <InputField
                            label="Cp Below Freezing"
                            value={productData.cpBelowFreezing.toString()}
                            onChangeText={(value) => handleValueChange('cpBelowFreezing', value)}
                            keyboardType="numeric"
                            placeholder="2.14"
                            unit="kJ/kg·K"
                        />

                        <InputField
                            label="Temperature Difference"
                            value={productData.tempDiffBelow.toString()}
                            onChangeText={(value) => handleValueChange('tempDiffBelow', value)}
                            keyboardType="numeric"
                            placeholder="-28.3"
                            unit="K"
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
