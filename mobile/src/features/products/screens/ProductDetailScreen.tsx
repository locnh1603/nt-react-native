import React, {FC, useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Header} from '../../../shared/components/Header';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {
  clearSelectedProduct,
  fetchProductById,
  selectProductsError,
  selectProductsLoading,
  selectSelectedProduct,
} from '../productsSlice';
import {ErrorDisplay} from '../../../shared/components/ErrorDisplay';
import {Button} from '../../../shared/components/Button';
import ImageAssets from '../../../assets/images';
import type {ProductDetailScreenProps} from '../../../types/navigation';
import {styles} from './ProductDetailScreen.styles';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const ProductDetailScreen: FC<ProductDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectSelectedProduct);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  const {productId} = route.params;

  useEffect(() => {
    dispatch(fetchProductById(productId));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, productId]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleAddToCart = useCallback((): void => {
    // TODO: implement cart logic
  }, []);

  const handleBuyNow = useCallback((): void => {
    // TODO: implement buy now logic
  }, []);

  const handleRetry = useCallback((): void => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0DF2F2" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.centered}>
        <ErrorDisplay
          title={t('productDetail.errorTitle')}
          message={error ?? t('productDetail.notFound')}
          onRetry={handleRetry}
        />
      </View>
    );
  }

  const imageSource: ImageSourcePropType = product.image
    ? {uri: product.image}
    : ImageAssets.logo;

  return (
    <View style={styles.screen}>
      <Header
        title={t('productDetail.title')}
        onBack={handleGoBack}
        rightIconName="share-alt"
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Hero image */}
        <View style={[styles.imageContainer, {width: SCREEN_WIDTH}]}>
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Product info */}
        <View style={styles.infoSection}>
          <Text style={styles.productName}>{product.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>
              ${product.price.toFixed(2)}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>
            {t('productDetail.descriptionTitle')}
          </Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* CTA buttons */}
      <View style={styles.ctaRow}>
        <Button style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>{t('productDetail.addToCart')}</Text>
        </Button>
        <Button style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buyNowText}>{t('productDetail.buyNow')}</Text>
        </Button>
      </View>
    </View>
  );
};
