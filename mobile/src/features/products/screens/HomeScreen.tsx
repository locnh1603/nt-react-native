import {fetchProducts, selectProducts, selectProductsError, selectProductsLoading} from '../productsSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import type {HomeScreenProps} from '../../../types/navigation';
import {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
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
import {styles} from './HomeScreen.styles';

const ALL_ITEMS_FILTER = 'All Items';

const HomeScreen: FC<HomeScreenProps> = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] =
    useState<string>(ALL_ITEMS_FILTER);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = useMemo((): string[] => {
    const uniqueCategories = new Set(
      products.map(product => product.category).filter(Boolean),
    );

    return [ALL_ITEMS_FILTER, ...Array.from(uniqueCategories)];
  }, [products]);

  const filteredProducts = useMemo((): Product[] => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return products.filter(product => {
      const matchesCategory =
        selectedCategory === ALL_ITEMS_FILTER ||
        product.category === selectedCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
          product.category.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [products, searchText, selectedCategory]);

  const keyExtractor = useCallback((item: Product): string => {
    return String(item.id);
  }, []);

  const handleAddToCart = useCallback((_product: Product): void => {
    // Basic template action, can be replaced with cart logic.
  }, []);

  const handleRetry = useCallback((): void => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const renderItem: ListRenderItem<Product> = useCallback(
    ({item}) => {
      return (
        <View style={styles.productCell}>
          <ProductCard product={item} onAddPress={handleAddToCart} />
        </View>
      );
    },
    [handleAddToCart],
  );

  return (
    <Background>
      <View style={styles.page}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Discover</Text>

          <View style={styles.headerActions}>
            <Pressable style={styles.iconButton}>
              <FontAwesome name="bell" size={16} color="#111827" />
            </Pressable>

            <Pressable style={styles.iconButton}>
              <FontAwesome name="shopping-cart" size={16} color="#111827" />
            </Pressable>
          </View>
        </View>

        <View style={styles.searchWrap}>
          <FontAwesome name="search" size={14} color="#98A2B3" />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search products, brands..."
            placeholderTextColor="#98A2B3"
            style={styles.searchInput}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}>
          {categories.map(category => {
            const isSelected = category === selectedCategory;

            return (
              <Pressable
                key={category}
                style={[
                  styles.filterChip,
                  isSelected ? styles.filterChipActive : null,
                ]}
                onPress={() => setSelectedCategory(category)}>
                <Text
                  style={[
                    styles.filterChipText,
                    isSelected ? styles.filterChipTextActive : null,
                  ]}>
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {loading ? (
          <View style={styles.centerBlock}>
            <ActivityIndicator size="large" color="#0DF2F2" />
            <Text style={styles.statusText}>Loading products...</Text>
          </View>
        ) : null}

        {!loading && error ? (
          <View style={styles.centerBlock}>
            <ErrorDisplay
              title="Error Loading Products"
              message={error}
              onRetry={handleRetry}
            />
          </View>
        ) : null}

        {!loading && !error ? (
          <FlatList
            data={filteredProducts}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.centerBlock}>
                <Text style={styles.statusText}>No products found.</Text>
              </View>
            }
          />
        ) : null}
      </View>
    </Background>
  );
};

export {HomeScreen};
