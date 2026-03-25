import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type HomeScreenStyles = {
  page: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  centerBlock: ViewStyle;
  statusText: TextStyle;
  errorText: TextStyle;
  listContent: ViewStyle;
  row: ViewStyle;
  productCell: ViewStyle;
  itemCard: ViewStyle;
  itemName: TextStyle;
  itemMeta: TextStyle;
};

export const styles = StyleSheet.create<HomeScreenStyles>({
  page: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 14,
    color: '#6B7280',
  },
  centerBlock: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    marginTop: 10,
    fontSize: 14,
    color: '#4B5563',
  },
  errorText: {
    fontSize: 14,
    color: '#DC2626',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
    gap: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
    columnGap: 10,
  },
  productCell: {
    flex: 1,
    maxWidth: '49%',
  },
  itemCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  itemMeta: {
    marginTop: 4,
    fontSize: 14,
    color: '#0EA5A5',
    fontWeight: '600',
  },
});
