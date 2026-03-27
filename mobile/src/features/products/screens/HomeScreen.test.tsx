import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {render, userEvent} from '@testing-library/react-native';
import {HomeScreen} from './HomeScreen';
import productsReducer from '../productsSlice';
import type {Product} from '../../../models/product';

const mockNavigate = jest.fn();
const mockGetProducts = jest.fn();
const mockRecordProductHistory = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({navigate: mockNavigate}),
}));

jest.mock('../../../services/data/data-service', () => ({
  dataService: {
    getProducts: () => mockGetProducts(),
    getProductById: jest.fn(),
  },
}));

jest.mock('../../../services/storage/realm/product-history-service', () => ({
  recordProductHistory: (product: Product) => mockRecordProductHistory(product),
  getProductHistory: jest.fn(),
}));

const makeProduct = (id: number, name: string): Product => ({
  id,
  name,
  description: `${name} description`,
  price: 10 + id,
  image: '',
});

const renderHomeScreen = () => {
  const store = configureStore({
    reducer: {
      products: productsReducer,
    },
  });

  const rendered = render(
    <Provider store={store}>
      <HomeScreen navigation={undefined as never} route={undefined as never} />
    </Provider>,
  );

  return {
    ...rendered,
    user: userEvent.setup(),
  };
};

describe('HomeScreen', () => {
  beforeEach(() => {
    mockGetProducts.mockReset();
    mockNavigate.mockReset();
    mockRecordProductHistory.mockReset();
  });

  it('should render loading state while fetching products', async () => {
    mockGetProducts.mockReturnValue(new Promise(() => undefined));

    const {findByText} = renderHomeScreen();

    expect(await findByText('Loading products...')).toBeTruthy();
  });

  it('should render products and filter by search text', async () => {
    mockGetProducts.mockResolvedValue([
      makeProduct(1, 'Wireless Mouse'),
      makeProduct(2, 'Bluetooth Headset'),
    ]);

    const {findByText, getByPlaceholderText, queryByText, user} =
      renderHomeScreen();

    expect(await findByText('Wireless Mouse')).toBeTruthy();
    expect(await findByText('Bluetooth Headset')).toBeTruthy();

    await user.type(getByPlaceholderText('Search products, brands...'), 'mouse');

    expect(queryByText('Bluetooth Headset')).toBeNull();
  });

  it('should render error state and retry fetch', async () => {
    mockGetProducts.mockRejectedValue(new Error('Failed to fetch products'));

    const {findByText, getByText, user} = renderHomeScreen();

    expect(await findByText('Error Loading Products')).toBeTruthy();
    expect(getByText('Failed to fetch products')).toBeTruthy();

    await user.press(getByText('Retry'));

    expect(mockGetProducts).toHaveBeenCalledTimes(2);
  });

  it('should record product history and navigate to detail on product press', async () => {
    mockGetProducts.mockResolvedValue([makeProduct(7, 'Gaming Keyboard')]);

    const {findByText, user} = renderHomeScreen();

    const productNameText = await findByText('Gaming Keyboard');
    await user.press(productNameText);

    expect(mockRecordProductHistory).toHaveBeenCalledWith(
      expect.objectContaining({id: 7, name: 'Gaming Keyboard'}),
    );
    expect(mockNavigate).toHaveBeenCalledWith('ProductDetail', {productId: 7});
  });
});
