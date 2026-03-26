import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type HomeScreenStyles = {
  page: ViewStyle;
  headerRow: ViewStyle;
  headerActions: ViewStyle;
  iconButton: ViewStyle;
  title: TextStyle;
  searchWrap: ViewStyle;
  searchInput: TextStyle;
  centerBlock: ViewStyle;
  statusText: TextStyle;
  listContent: ViewStyle;
  productsGrid: ViewStyle;
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
    paddingVertical: 8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F4F7',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
  },
  searchWrap: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    backgroundColor: '#F2F4F7',
    borderRadius: 28,
    paddingHorizontal: 18,
    height: 52,
  },
  searchInput: {
    flex: 1,
    height: 52,
    fontSize: 15,
    color: '#111827',
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
    paddingTop: 28,
    paddingBottom: 28,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  productCell: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});
