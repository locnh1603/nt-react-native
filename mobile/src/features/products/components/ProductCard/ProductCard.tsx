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
  style?: ViewStyle;
}

const ProductCardComponent: FC<ProductCardProps> = ({
  product,
  onAddPress,
  style,
}) => {
  const imageSource: ImageSourcePropType = useMemo(() => {
    if (product.imageUrl) {
      return {uri: product.imageUrl};
    }

    return ImageAssets.logo;
  }, [product.imageUrl]);

  const showSaleBadge = product.stock >= 20 && product.price >= 40;
  const oldPrice = showSaleBadge ? product.price * 1.2 : null;

  const handleAddPress = (): void => {
    onAddPress?.(product);
  };

  return (
    <View style={[styles.card, style]}>
      <View style={styles.imageWrap}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />

        {showSaleBadge ? (
          <View style={styles.saleBadge}>
            <Text style={styles.saleBadgeText}>SALE</Text>
          </View>
        ) : null}

        <View style={styles.favoriteButton}>
          <FontAwesome name="heart" size={14} color="#6B7280" />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.category} numberOfLines={1}>
          {product.category}
        </Text>

        <View style={styles.footer}>
          <View style={styles.priceBlock}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {oldPrice ? (
              <Text style={styles.oldPrice}>${oldPrice.toFixed(2)}</Text>
            ) : null}
          </View>

          <Pressable style={styles.addButton} onPress={handleAddPress}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export const ProductCard = memo(ProductCardComponent);
