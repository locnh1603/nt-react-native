import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type HomeScreenStyles = {
  page: ViewStyle;
  headerRow: ViewStyle;
  headerActions: ViewStyle;
  iconButton: ViewStyle;
  title: TextStyle;
  searchWrap: ViewStyle;
  searchInput: TextStyle;
  filtersContent: ViewStyle;
  filterChip: ViewStyle;
  filterChipActive: ViewStyle;
  filterChipText: TextStyle;
  filterChipTextActive: TextStyle;
  centerBlock: ViewStyle;
  statusText: TextStyle;
  listContent: ViewStyle;
  row: ViewStyle;
  productCell: ViewStyle;
};

export const styles = StyleSheet.create<HomeScreenStyles>({
  page: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F4F7',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1F2937',
  },
  searchWrap: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    backgroundColor: '#F2F4F7',
    borderRadius: 14,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#111827',
  },
  filtersContent: {
    marginTop: 14,
    paddingBottom: 10,
    columnGap: 10,
  },
  filterChip: {
    paddingHorizontal: 20,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F2F4F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: '#10E3E3',
  },
  filterChipText: {
    fontSize: 21,
    fontWeight: '500',
    color: '#4B5563',
  },
  filterChipTextActive: {
    color: '#0F172A',
  },
  centerBlock: {
    paddingVertical: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4B5563',
  },
  listContent: {
    paddingTop: 6,
    paddingBottom: 28,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCell: {
    flex: 1,
    maxWidth: '48.5%',
  },
});
