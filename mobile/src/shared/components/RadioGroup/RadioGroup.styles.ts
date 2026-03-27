import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type RadioGroupStyles = {
  container: ViewStyle;
  optionButton: ViewStyle;
  radioOuter: ViewStyle;
  radioInner: ViewStyle;
  label: TextStyle;
};

export const styles = StyleSheet.create<RadioGroupStyles>({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    paddingVertical: 4,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#A0AEC0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#09DFE9',
  },
  label: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
});
