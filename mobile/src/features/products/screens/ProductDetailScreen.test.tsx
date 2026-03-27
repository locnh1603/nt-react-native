import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {render, userEvent} from '@testing-library/react-native';
import {ProductDetailScreen} from './ProductDetailScreen';
import productsReducer from '../productsSlice';
import type {Product} from '../../../models/product';
import type {ProductDetailScreenProps} from '../../../types/navigation';

const mockGetProductById = jest.fn();

jest.mock('../../../services/data/data-service', () => ({
  dataService: {
    getProducts: jest.fn(),
    getProductById: (productId: number) => mockGetProductById(productId),
  },
}));

const mockGoBack = jest.fn();

const navigation = {
  goBack: mockGoBack,
} as unknown as ProductDetailScreenProps['navigation'];

const route = {
  params: {productId: 5},
} as ProductDetailScreenProps['route'];

const productFixture: Product = {
  id: 5,
  name: 'Studio Headphones',
  description: 'Detailed sound and comfortable fit.',
  price: 249.99,
  image: 'https://example.com/headphones.png',
};

const renderProductDetailScreen = () => {
  const store = configureStore({
    reducer: {
      products: productsReducer,
    },
  });

  const rendered = render(
    <Provider store={store}>
      <ProductDetailScreen navigation={navigation} route={route} />
    </Provider>,
  );

  return {
    ...rendered,
    user: userEvent.setup(),
  };
};

describe('ProductDetailScreen', () => {
  beforeEach(() => {
    mockGetProductById.mockReset();
    mockGoBack.mockReset();
  });

  it('should render loading state while fetching product detail', () => {
    mockGetProductById.mockReturnValue(new Promise(() => undefined));

    const {UNSAFE_getByType} = renderProductDetailScreen();

    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it('should render product information when fetch succeeds', async () => {
    mockGetProductById.mockResolvedValue(productFixture);

    const {findByText} = renderProductDetailScreen();

    expect(await findByText('Product Details')).toBeTruthy();
    expect(await findByText('Studio Headphones')).toBeTruthy();
    expect(await findByText('$249.99')).toBeTruthy();
    expect(await findByText('Product Description')).toBeTruthy();
    expect(await findByText('Detailed sound and comfortable fit.')).toBeTruthy();
    expect(await findByText('Add to Cart')).toBeTruthy();
    expect(await findByText('Buy Now')).toBeTruthy();
  });

  it('should render error state and retry fetching product detail', async () => {
    mockGetProductById.mockRejectedValue(new Error('Failed to load product'));

    const {findByText, getByText, user} = renderProductDetailScreen();

    expect(await findByText('Error')).toBeTruthy();
    expect(getByText('Failed to load product')).toBeTruthy();

    await user.press(getByText('Retry'));

    expect(mockGetProductById).toHaveBeenCalledTimes(2);
  });
});
