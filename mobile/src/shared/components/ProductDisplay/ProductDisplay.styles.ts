import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

type ProductDisplayStyles = {
  card: ViewStyle;
  imageWrap: ViewStyle;
  image: ImageStyle;
  favoriteButton: ViewStyle;
  favoriteButtonText: TextStyle;
  content: ViewStyle;
  title: TextStyle;
  category: TextStyle;
  footer: ViewStyle;
  price: TextStyle;
  addButton: ViewStyle;
  addButtonText: TextStyle;
};

export const styles = StyleSheet.create<ProductDisplayStyles>({
  card: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageWrap: {
    position: 'relative',
    width: '100%',
    height: 196,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 10,
  },
  title: {
    color: '#111827',
    fontSize: 26 / 2,
    fontWeight: '600',
  },
  category: {
    marginTop: 2,
    color: '#8B93A6',
    fontSize: 22 / 2,
  },
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: '#111827',
    fontSize: 32 / 2,
    fontWeight: '800',
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#0FD6DE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#07363A',
    fontSize: 22,
    lineHeight: 22,
    fontWeight: '600',
    marginTop: -1,
  },
});
