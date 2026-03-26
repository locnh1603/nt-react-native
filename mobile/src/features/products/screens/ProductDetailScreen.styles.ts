import {Dimensions, ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

const IMAGE_HEIGHT = Dimensions.get('window').width * 0.85;

type ProductDetailScreenStyles = {
  screen: ViewStyle;
  centered: ViewStyle;
  scroll: ViewStyle;
  scrollContent: ViewStyle;
  imageContainer: ViewStyle;
  image: ImageStyle;
  infoSection: ViewStyle;
  productName: TextStyle;
  priceRow: ViewStyle;
  currentPrice: TextStyle;
  oldPrice: TextStyle;
  sectionTitle: TextStyle;
  description: TextStyle;
  ctaRow: ViewStyle;
  addToCartButton: ViewStyle;
  buyNowButton: ViewStyle;
  addToCartText: TextStyle;
  buyNowText: TextStyle;
};

export const styles = StyleSheet.create<ProductDetailScreenStyles>({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  imageContainer: {
    height: IMAGE_HEIGHT,
    backgroundColor: '#F3F4F6',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  productName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currentPrice: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F2937',
  },
  oldPrice: {
    fontSize: 16,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6B7280',
  },
  ctaRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  addToCartButton: {
    flex: 1,
    marginVertical: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#0DF2F2',
  },
  buyNowButton: {
    flex: 1,
    marginVertical: 0,
    backgroundColor: '#0DF2F2',
  },
  addToCartText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0DF2F2',
  },
  buyNowText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#06131A',
  },
});
