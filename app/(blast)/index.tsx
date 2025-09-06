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

export default function BlastRoomDetailsTab() {
    const { roomData, saveRoomData } = useBlastStorageContext();

    const handleValueChange = (field: string, value: string) => {
        const numericValue = parseFloat(value) || 0;
        saveRoomData({
            ...roomData,
            [field]: numericValue,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Blast Freezer Transmission Load</Text>
                        <Text style={styles.subtitle}>Enter transmission parameters for heat load calculation</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Wall Parameters</Text>

                        <InputField
                            label="U-Factor"
                            value={roomData.wallUFactor.toString()}
                            onChangeText={(value) => handleValueChange('wallUFactor', value)}
                            keyboardType="numeric"
                            placeholder="0.153"
                            unit="W/m²·K"
                        />

                        <InputField
                            label="Area"
                            value={roomData.wallArea.toString()}
                            onChangeText={(value) => handleValueChange('wallArea', value)}
                            keyboardType="numeric"
                            placeholder="70"
                            unit="m²"
                        />

                        <InputField
                            label="Temperature Difference"
                            value={roomData.wallTempDiff.toString()}
                            onChangeText={(value) => handleValueChange('wallTempDiff', value)}
                            keyboardType="numeric"
                            placeholder="78"
                            unit="K"
                        />

                        <InputField
                            label="Hours of Load"
                            value={roomData.wallHours.toString()}
                            onChangeText={(value) => handleValueChange('wallHours', value)}
                            keyboardType="numeric"
                            placeholder="8"
                            unit="hrs"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ceiling Parameters</Text>

                        <InputField
                            label="U-Factor"
                            value={roomData.ceilingUFactor.toString()}
                            onChangeText={(value) => handleValueChange('ceilingUFactor', value)}
                            keyboardType="numeric"
                            placeholder="0.153"
                            unit="W/m²·K"
                        />

                        <InputField
                            label="Area"
                            value={roomData.ceilingArea.toString()}
                            onChangeText={(value) => handleValueChange('ceilingArea', value)}
                            keyboardType="numeric"
                            placeholder="25"
                            unit="m²"
                        />

                        <InputField
                            label="Temperature Difference"
                            value={roomData.ceilingTempDiff.toString()}
                            onChangeText={(value) => handleValueChange('ceilingTempDiff', value)}
                            keyboardType="numeric"
                            placeholder="78"
                            unit="K"
                        />

                        <InputField
                            label="Hours of Load"
                            value={roomData.ceilingHours.toString()}
                            onChangeText={(value) => handleValueChange('ceilingHours', value)}
                            keyboardType="numeric"
                            placeholder="8"
                            unit="hrs"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Floor Parameters</Text>

                        <InputField
                            label="U-Factor"
                            value={roomData.floorUFactor.toString()}
                            onChangeText={(value) => handleValueChange('floorUFactor', value)}
                            keyboardType="numeric"
                            placeholder="0.153"
                            unit="W/m²·K"
                        />

                        <InputField
                            label="Area"
                            value={roomData.floorArea.toString()}
                            onChangeText={(value) => handleValueChange('floorArea', value)}
                            keyboardType="numeric"
                            placeholder="25"
                            unit="m²"
                        />

                        <InputField
                            label="Temperature Difference"
                            value={roomData.floorTempDiff.toString()}
                            onChangeText={(value) => handleValueChange('floorTempDiff', value)}
                            keyboardType="numeric"
                            placeholder="63"
                            unit="K"
                        />

                        <InputField
                            label="Hours of Load"
                            value={roomData.floorHours.toString()}
                            onChangeText={(value) => handleValueChange('floorHours', value)}
                            keyboardType="numeric"
                            placeholder="8"
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
