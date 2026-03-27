import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type ProductHistoryScreenStyles = {
  page: ViewStyle;
  content: ViewStyle;
  centered: ViewStyle;
  statusText: TextStyle;
  listContent: ViewStyle;
  historyItem: ViewStyle;
  historyHeaderRow: ViewStyle;
  productName: TextStyle;
  clickedAt: TextStyle;
  productPrice: TextStyle;
  clearButton: ViewStyle;
  clearButtonText: TextStyle;
};

export const styles = StyleSheet.create<ProductHistoryScreenStyles>({
  page: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  content: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statusText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
  },
  listContent: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  historyHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 12,
  },
  productName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  clickedAt: {
    fontSize: 12,
    color: '#6B7280',
  },
  productPrice: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  clearButton: {
    backgroundColor: '#10E3E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  }
});
