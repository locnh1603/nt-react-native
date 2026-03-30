import {fetchProducts, selectProducts, selectProductsError, selectProductsLoading} from '../productsSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import type {HomeScreenProps, RootStackParamList} from '../../../types/navigation';
import {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {FontAwesome} from '@react-native-vector-icons/fontawesome';
import Background from '../../../shared/components/Background';
import {ErrorDisplay} from '../../../shared/components/ErrorDisplay';
import type {Product} from '../../../models/product';
import {ProductCard} from '../components/ProductCard';
import {recordProductHistory} from '../../../services/storage/realm/product-history-service';
import {useTranslation} from 'react-i18next';
import {styles} from './HomeScreen.styles';


const HomeScreen: FC<HomeScreenProps> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo((): Product[] => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return products.filter(product => {
      return (
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [products, searchText]);

  const handleProductPress = useCallback(
    (product: Product): void => {
      void recordProductHistory(product);
      navigation.navigate('ProductDetail', {productId: product.id});
    },
    [navigation],
  );

  const handleHistoryPress = useCallback((): void => {
    navigation.navigate('ProductHistory');
  }, [navigation]);

  const handleAddToCart = useCallback((_product: Product): void => {
    console.log('add to cart:', _product);
  }, []);

  const handleRetry = useCallback((): void => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Background>
      <View style={styles.page}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{t('home.discoverTitle')}</Text>

          <View style={styles.headerActions}>
            <Pressable style={styles.iconButton} onPress={handleHistoryPress}>
              <FontAwesome name="history" size={20} color="#111827" />
            </Pressable>

            <Pressable style={styles.iconButton}>
              <FontAwesome name="shopping-cart" size={20} color="#111827" />
            </Pressable>
          </View>
        </View>

        <View style={styles.searchWrap}>
          <FontAwesome name="search" size={14} color="#98A2B3" />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder={t('home.searchPlaceholder')}
            placeholderTextColor="#98A2B3"
            style={styles.searchInput}
          />
        </View>

        {loading ? (
          <View style={styles.centerBlock}>
            <ActivityIndicator size="large" color="#0DF2F2" />
            <Text style={styles.statusText}>{t('home.loadingProducts')}</Text>
          </View>
        ) : null}

        {!loading && error ? (
          <View style={styles.centerBlock}>
            <ErrorDisplay
              title={t('home.errorLoadingProductsTitle')}
              message={error}
              onRetry={handleRetry}
            />
          </View>
        ) : null}

        {!loading && !error ? (
          <ScrollView
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}>
            {filteredProducts.length === 0 ? (
              <View style={styles.centerBlock}>
                <Text style={styles.statusText}>{t('home.noProductsFound')}</Text>
              </View>
            ) : (
              <View style={styles.productsGrid}>
                {filteredProducts.map(item => {
                  return (
                    <View key={String(item.id)} style={styles.productCell}>
                      <ProductCard
                        product={item}
                        onAddPress={handleAddToCart}
                        onPress={handleProductPress}
                      />
                    </View>
                  );
                })}
              </View>
            )}
          </ScrollView>
        ) : null}
      </View>
    </Background>
  );
};

export {HomeScreen};
