import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type OrdersScreenStyles = {
  page: ViewStyle;
  card: ViewStyle;
  title: TextStyle;
  description: TextStyle;
};

export const styles = StyleSheet.create<OrdersScreenStyles>({
  page: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
  },
});
