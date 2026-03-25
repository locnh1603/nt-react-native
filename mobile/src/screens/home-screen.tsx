import { fetchProducts, selectProducts } from '../slices/product-slice';
import { useAppDispatch, useAppSelector } from '../stores/store';
import type {HomeScreenProps} from '../types/navigation';
import {FC, useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  View,
} from 'react-native';
import Background from '../components/Background';
import {ProductDisplay} from '../components/ProductDisplay';
import type {Product} from '../models/product';
import {
  selectProductsError,
  selectProductsLoading,
} from '../slices/product-slice';
import {styles} from './styles/home-screen-styles';

const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const keyExtractor = useCallback((item: Product): string => {
    return String(item.id);
  }, []);

  const handleAddToCart = useCallback((_product: Product): void => {
    // Basic template action, can be replaced with cart logic.
  }, []);

  const renderItem: ListRenderItem<Product> = useCallback(
    ({item}) => {
      return (
        <View style={styles.productCell}>
          <ProductDisplay product={item} onAddPress={handleAddToCart} />
        </View>
      );
    },
    [handleAddToCart],
  );

  return (
    <Background>
      <View style={styles.page}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.subtitle}>Product list template</Text>

        {loading ? (
          <View style={styles.centerBlock}>
            <ActivityIndicator size="large" color="#0DF2F2" />
            <Text style={styles.statusText}>Loading products...</Text>
          </View>
        ) : null}

        {!loading && error ? (
          <View style={styles.centerBlock}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {!loading && !error ? (
          <FlatList
            data={products}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.centerBlock}>
                <Text style={styles.statusText}>No products available.</Text>
              </View>
            }
          />
        ) : null}
      </View>
    </Background>
  );
};

export {HomeScreen};
