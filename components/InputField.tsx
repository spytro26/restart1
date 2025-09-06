import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad';
  unit?: string;
  unitOptions?: string[];
  selectedUnit?: string;
  onUnitChange?: (unit: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'decimal-pad',
  unit,
  unitOptions,
  selectedUnit,
  onUnitChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, (unit || unitOptions) && styles.inputWithUnit]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor="#64748b"
        />
        {unitOptions && selectedUnit && onUnitChange ? (
          <View style={styles.unitPickerContainer}>
            {unitOptions.map((unitOption) => (
              <TouchableOpacity
                key={unitOption}
                style={[
                  styles.unitButton,
                  selectedUnit === unitOption && styles.selectedUnitButton,
                  unitOption === unitOptions[0] && styles.firstUnitButton,
                  unitOption === unitOptions[unitOptions.length - 1] && styles.lastUnitButton,
                ]}
                onPress={() => onUnitChange(unitOption)}
              >
                <Text
                  style={[
                    styles.unitButtonText,
                    selectedUnit === unitOption && styles.selectedUnitButtonText,
                  ]}
                >
                  {unitOption}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : unit ? (
          <Text style={styles.unit}>{unit}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  inputWithUnit: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
  },
  unit: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderLeftWidth: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  unitPickerContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderLeftWidth: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
  },
  unitButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f8fafc',
    borderRightWidth: 1,
    borderRightColor: '#d1d5db',
  },
  firstUnitButton: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  lastUnitButton: {
    borderRightWidth: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  selectedUnitButton: {
    backgroundColor: '#2563eb',
  },
  unitButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  selectedUnitButtonText: {
    color: '#ffffff',
  },
});