import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type StatusBadgeStyles = {
  badge: ViewStyle;
  text: TextStyle;
};

export const styles = StyleSheet.create<StatusBadgeStyles>({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
});
