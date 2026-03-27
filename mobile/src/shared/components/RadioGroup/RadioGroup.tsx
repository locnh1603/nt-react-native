import React, {FC} from 'react';
import {Pressable, Text, View} from 'react-native';
import {styles} from './RadioGroup.styles';

export interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export const RadioGroup: FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      {options.map(option => {
        const isSelected = option.value === selectedValue;

        return (
          <Pressable
            key={option.value}
            style={styles.optionButton}
            onPress={() => onChange(option.value)}
            accessibilityRole="radio"
            accessibilityState={{selected: isSelected}}>
            <View style={styles.radioOuter}>
              {isSelected ? <View style={styles.radioInner} /> : null}
            </View>
            <Text style={styles.label}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default RadioGroup;
