import React, {FC, memo, useMemo} from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {FontAwesome} from '@react-native-vector-icons/fontawesome';
import type {Product} from '../../../../models/product';
import ImageAssets from '../../../../assets/images';
import {styles} from './ProductCard.styles';

interface ProductCardProps {
  product: Product;
  onAddPress?: (product: Product) => void;
  onPress?: (product: Product) => void;
  style?: ViewStyle;
}

const ProductCardComponent: FC<ProductCardProps> = ({
  product,
  onAddPress,
  onPress,
  style,
}) => {
  const handleCardPress = (): void => {
    onPress?.(product);
  };
  const imageSource: ImageSourcePropType = useMemo(() => {
    if (product.image) {
      return {uri: product.image};
    }

    return ImageAssets.logo;
  }, [product.image]);

  const handleAddPress = (): void => {
    onAddPress?.(product);
  };

  return (
    <Pressable style={[styles.card, style]} onPress={handleCardPress}>
      <View style={styles.imageWrap}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />

        <View style={styles.favoriteButton}>
          <FontAwesome name="heart" size={14} color="#6B7280" />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {product.name}
        </Text>

        <View style={styles.footer}>
          <View style={styles.priceBlock}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>

          <Pressable style={styles.addButton} onPress={handleAddPress}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export const ProductCard = memo(ProductCardComponent);
