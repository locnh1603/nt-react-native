import React, {FC, useMemo} from 'react';
import {
  Image,
  ImageStyle,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import type {Product} from '../models/product';

interface ProductDisplayProps {
  product: Product;
  onAddPress?: (product: Product) => void;
}

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

export const ProductDisplay: FC<ProductDisplayProps> = ({
  product,
  onAddPress,
}) => {
  const imageSource: ImageSourcePropType = useMemo(() => {
    if (product.imageUrl) {
      return {uri: product.imageUrl};
    }

    return require('../assets/images/logo.png');
  }, [product.imageUrl]);

  const handleAddPress = (): void => {
    onAddPress?.(product);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageWrap}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
        <View style={styles.favoriteButton}>
          <Text style={styles.favoriteButtonText}>♡</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.category}>{product.category}</Text>

        <View style={styles.footer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Pressable style={styles.addButton} onPress={handleAddPress}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create<ProductDisplayStyles>({
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
