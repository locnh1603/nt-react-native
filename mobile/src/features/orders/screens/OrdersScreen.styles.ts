import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type OrdersScreenStyles = {
  container: ViewStyle;
  scrollContent: ViewStyle;
  loadingContainer: ViewStyle;
  loadingText: TextStyle;
  emptyText: TextStyle;
  emptyContainer: ViewStyle;
  errorContainer: ViewStyle;
  cardGap: ViewStyle;
};

export const styles = StyleSheet.create<OrdersScreenStyles>({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 36,
    gap: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#64748b',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  cardGap: {
    marginBottom: 2,
  },
});
