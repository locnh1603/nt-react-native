import React, {FC, useMemo} from 'react';
import {Image, ImageSourcePropType, Pressable, Text, View} from 'react-native';
import ImageAssets from '../../../assets/images';
import type {PriceUnit, Product} from '../../../models/product';
import {styles} from './ProductDisplay.styles';

interface ProductDisplayProps {
  product: Product;
  onAddPress?: (product: Product) => void;
}

const currencyByUnit: Record<PriceUnit, string> = {
  dollar: 'USD',
  euro: 'EUR',
  inr: 'INR',
};

export const ProductDisplay: FC<ProductDisplayProps> = ({
  product,
  onAddPress,
}) => {
  const imageSource: ImageSourcePropType = useMemo(() => {
    if (product.image) {
      return {uri: product.image};
    }

    return ImageAssets.logo;
  }, [product.image]);

  const handleAddPress = (): void => {
    onAddPress?.(product);
  };

  const formattedPrice = useMemo((): string => {
    const currency = product.priceUnit ? currencyByUnit[product.priceUnit] : 'USD';

    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(product.price);
    } catch {
      return `${currency} ${product.price.toFixed(2)}`;
    }
  }, [product.price, product.priceUnit]);

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
        <Text style={styles.category}>{product.priceUnit ?? ''}</Text>

        <View style={styles.footer}>
          <Text style={styles.price}>{formattedPrice}</Text>
          <Pressable style={styles.addButton} onPress={handleAddPress}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ProductDisplay;
