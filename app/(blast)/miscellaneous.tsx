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

export default function BlastMiscellaneousTab() {
    const { miscData, saveMiscData } = useBlastStorageContext();

    const handleValueChange = (field: string, value: string) => {
        const numericValue = parseFloat(value) || 0;
        saveMiscData({
            ...miscData,
            [field]: numericValue,
        });
    };

    const handleStringChange = (field: string, value: string) => {
        saveMiscData({
            ...miscData,
            [field]: value,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Miscellaneous Load Parameters</Text>
                        <Text style={styles.subtitle}>Enter additional load parameters for heat calculation</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Basic Parameters</Text>

                        <InputField
                            label="Capacity Required"
                            value={miscData.capacityRequired.toString()}
                            onChangeText={(value) => handleValueChange('capacityRequired', value)}
                            keyboardType="numeric"
                            placeholder="2000"
                            unit="kgs"
                        />

                        <InputField
                            label="Batch Hours"
                            value={miscData.batchHours.toString()}
                            onChangeText={(value) => handleValueChange('batchHours', value)}
                            keyboardType="numeric"
                            placeholder="8"
                            unit="Hrs"
                        />

                        <InputField
                            label="Internal Volume"
                            value={miscData.internalVolume.toString()}
                            onChangeText={(value) => handleValueChange('internalVolume', value)}
                            keyboardType="numeric"
                            placeholder="3.5"
                            unit="M3"
                        />

                        <InputField
                            label="Insulation Type"
                            value={miscData.insulationType}
                            onChangeText={(value) => handleStringChange('insulationType', value)}
                            placeholder="PUF"
                        />

                        <InputField
                            label="Insulation Thickness"
                            value={miscData.insulationThickness.toString()}
                            onChangeText={(value) => handleValueChange('insulationThickness', value)}
                            keyboardType="numeric"
                            placeholder="150"
                            unit="mm"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Air Change Load</Text>

                        <InputField
                            label="Air Change Rate"
                            value={miscData.airChangeRate.toString()}
                            onChangeText={(value) => handleValueChange('airChangeRate', value)}
                            keyboardType="numeric"
                            placeholder="4.2"
                            unit="L/S"
                        />

                        <InputField
                            label="Enthalpy Difference"
                            value={miscData.enthalpyDiff.toString()}
                            onChangeText={(value) => handleValueChange('enthalpyDiff', value)}
                            keyboardType="numeric"
                            placeholder="0.14"
                            unit="kJ/L"
                        />

                        <InputField
                            label="Hours of Load"
                            value={miscData.hoursOfLoad.toString()}
                            onChangeText={(value) => handleValueChange('hoursOfLoad', value)}
                            keyboardType="numeric"
                            placeholder="2"
                            unit="hrs"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Equipment Load</Text>

                        <InputField
                            label="Fan Motor Rating"
                            value={miscData.fanMotorRating.toString()}
                            onChangeText={(value) => handleValueChange('fanMotorRating', value)}
                            keyboardType="numeric"
                            placeholder="0.37"
                            unit="kW"
                        />

                        <InputField
                            label="Equipment Quantity"
                            value={miscData.equipmentQuantity.toString()}
                            onChangeText={(value) => handleValueChange('equipmentQuantity', value)}
                            keyboardType="numeric"
                            placeholder="3"
                        />

                        <InputField
                            label="Equipment Hours"
                            value={miscData.equipmentHours.toString()}
                            onChangeText={(value) => handleValueChange('equipmentHours', value)}
                            keyboardType="numeric"
                            placeholder="8"
                            unit="hrs"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Occupancy Load</Text>

                        <InputField
                            label="Occupancy Count"
                            value={miscData.occupancyCount.toString()}
                            onChangeText={(value) => handleValueChange('occupancyCount', value)}
                            keyboardType="numeric"
                            placeholder="4.6"
                            unit="people"
                        />

                        <InputField
                            label="Occupancy Heat Load"
                            value={miscData.occupancyHeatLoad.toString()}
                            onChangeText={(value) => handleValueChange('occupancyHeatLoad', value)}
                            keyboardType="numeric"
                            placeholder="0.5"
                            unit="W/person"
                        />

                        <InputField
                            label="Occupancy Hours"
                            value={miscData.occupancyHours.toString()}
                            onChangeText={(value) => handleValueChange('occupancyHours', value)}
                            keyboardType="numeric"
                            placeholder="1"
                            unit="hrs"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Light Load</Text>

                        <InputField
                            label="Light Load"
                            value={miscData.lightLoad.toString()}
                            onChangeText={(value) => handleValueChange('lightLoad', value)}
                            keyboardType="numeric"
                            placeholder="0.1"
                            unit="kW"
                        />

                        <InputField
                            label="Light Hours"
                            value={miscData.lightHours.toString()}
                            onChangeText={(value) => handleValueChange('lightHours', value)}
                            keyboardType="numeric"
                            placeholder="1.2"
                            unit="hrs"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Heater Loads</Text>

                        <Text style={styles.subSectionTitle}>Peripheral Heaters</Text>
                        <InputField
                            label="Heater Capacity"
                            value={miscData.peripheralHeaterCapacity.toString()}
                            onChangeText={(value) => handleValueChange('peripheralHeaterCapacity', value)}
                            keyboardType="numeric"
                            placeholder="1.6"
                            unit="kW"
                        />

                        <InputField
                            label="Number of Heaters"
                            value={miscData.peripheralHeaterCount.toString()}
                            onChangeText={(value) => handleValueChange('peripheralHeaterCount', value)}
                            keyboardType="numeric"
                            placeholder="3"
                        />

                        <InputField
                            label="Hours"
                            value={miscData.peripheralHeaterHours.toString()}
                            onChangeText={(value) => handleValueChange('peripheralHeaterHours', value)}
                            keyboardType="numeric"
                            placeholder="8"
                            unit="hrs"
                        />

                        <Text style={styles.subSectionTitle}>Door Heaters</Text>
                        <InputField
                            label="Heater Capacity"
                            value={miscData.doorHeaterCapacity.toString()}
                            onChangeText={(value) => handleValueChange('doorHeaterCapacity', value)}
                            keyboardType="numeric"
                            placeholder="0.27"
                            unit="kW"
                        />

                        <InputField
                            label="Number of Doors"
                            value={miscData.doorHeaterCount.toString()}
                            onChangeText={(value) => handleValueChange('doorHeaterCount', value)}
                            keyboardType="numeric"
                            placeholder="1"
                        />

                        <InputField
                            label="Hours"
                            value={miscData.doorHeaterHours.toString()}
                            onChangeText={(value) => handleValueChange('doorHeaterHours', value)}
                            keyboardType="numeric"
                            placeholder="8"
                            unit="hrs"
                        />

                        <Text style={styles.subSectionTitle}>Tray Heaters</Text>
                        <InputField
                            label="Heater Capacity"
                            value={miscData.trayHeaterCapacity.toString()}
                            onChangeText={(value) => handleValueChange('trayHeaterCapacity', value)}
                            keyboardType="numeric"
                            placeholder="2.2"
                            unit="kW"
                        />

                        <InputField
                            label="Number of Heaters"
                            value={miscData.trayHeaterCount.toString()}
                            onChangeText={(value) => handleValueChange('trayHeaterCount', value)}
                            keyboardType="numeric"
                            placeholder="1"
                        />

                        <InputField
                            label="Hours"
                            value={miscData.trayHeaterHours.toString()}
                            onChangeText={(value) => handleValueChange('trayHeaterHours', value)}
                            keyboardType="numeric"
                            placeholder="0.4"
                            unit="hrs"
                        />

                        <Text style={styles.subSectionTitle}>Drain Heaters</Text>
                        <InputField
                            label="Heater Capacity"
                            value={miscData.drainHeaterCapacity.toString()}
                            onChangeText={(value) => handleValueChange('drainHeaterCapacity', value)}
                            keyboardType="numeric"
                            placeholder="0.04"
                            unit="kW"
                        />

                        <InputField
                            label="Number of Heaters"
                            value={miscData.drainHeaterCount.toString()}
                            onChangeText={(value) => handleValueChange('drainHeaterCount', value)}
                            keyboardType="numeric"
                            placeholder="1"
                        />

                        <InputField
                            label="Hours"
                            value={miscData.drainHeaterHours.toString()}
                            onChangeText={(value) => handleValueChange('drainHeaterHours', value)}
                            keyboardType="numeric"
                            placeholder="8"
                            unit="hrs"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Temperature Parameters</Text>

                        <InputField
                            label="Ambient Temperature"
                            value={miscData.ambientTemp.toString()}
                            onChangeText={(value) => handleValueChange('ambientTemp', value)}
                            keyboardType="numeric"
                            placeholder="43"
                            unit="°C"
                        />

                        <InputField
                            label="Room Temperature"
                            value={miscData.roomTemp.toString()}
                            onChangeText={(value) => handleValueChange('roomTemp', value)}
                            keyboardType="numeric"
                            placeholder="-35"
                            unit="°C"
                        />

                        <InputField
                            label="Product Incoming"
                            value={miscData.productIncoming.toString()}
                            onChangeText={(value) => handleValueChange('productIncoming', value)}
                            keyboardType="numeric"
                            placeholder="-5"
                            unit="°C"
                        />

                        <InputField
                            label="Product Outgoing"
                            value={miscData.productOutgoing.toString()}
                            onChangeText={(value) => handleValueChange('productOutgoing', value)}
                            keyboardType="numeric"
                            placeholder="-30"
                            unit="°C"
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
    subSectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 12,
        marginTop: 16,
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
