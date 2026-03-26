import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type ProductDetailScreenStyles = {
  page: ViewStyle;
  card: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  backButton: ViewStyle;
  backButtonText: TextStyle;
};

export const styles = StyleSheet.create<ProductDetailScreenStyles>({
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
    gap: 12,
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
  backButton: {
    height: 44,
    borderRadius: 10,
    backgroundColor: '#0DF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#06131A',
  },
});
