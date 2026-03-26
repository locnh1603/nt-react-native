import {StyleSheet, TextStyle, ViewStyle, ImageStyle} from 'react-native';

type ProductCardStyles = {
  card: ViewStyle;
  imageWrap: ViewStyle;
  image: ImageStyle;
  favoriteButton: ViewStyle;
  saleBadge: ViewStyle;
  saleBadgeText: TextStyle;
  content: ViewStyle;
  title: TextStyle;
  category: TextStyle;
  footer: ViewStyle;
  priceBlock: ViewStyle;
  price: TextStyle;
  oldPrice: TextStyle;
  addButton: ViewStyle;
  addButtonText: TextStyle;
};

export const styles = StyleSheet.create<ProductCardStyles>({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageWrap: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#DCE8DC',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFFE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saleBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#0FE4E4',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  saleBadgeText: {
    fontSize: 11,
    color: '#111827',
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  content: {
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  category: {
    marginTop: 2,
    fontSize: 15,
    color: '#6B7280',
  },
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  price: {
    fontSize: 34,
    fontWeight: '800',
    color: '#111827',
  },
  oldPrice: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  addButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#10E3E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0F172A',
    lineHeight: 24,
  },
});
