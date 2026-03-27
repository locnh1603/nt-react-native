import React from 'react';
import {render} from '@testing-library/react-native';
import {ProductHistoryScreen} from './ProductHistoryScreen';

const mockGetProductHistory = jest.fn();

jest.mock('../../../services/storage/realm/product-history-service', () => ({
  getProductHistory: () => mockGetProductHistory(),
  recordProductHistory: jest.fn(),
}));

const navigation = {
  goBack: jest.fn(),
} as never;

const route = {
  params: undefined,
} as never;

describe('ProductHistoryScreen', () => {
  beforeEach(() => {
    mockGetProductHistory.mockReset();
  });

  it('should render loading state while fetching history', async () => {
    mockGetProductHistory.mockReturnValue(new Promise(() => undefined));

    const {findByText} = render(
      <ProductHistoryScreen navigation={navigation} route={route} />,
    );

    expect(await findByText('Loading product history...')).toBeTruthy();
  });

  it('should render history entries when service returns data', async () => {
    mockGetProductHistory.mockResolvedValue([
      {
        id: 'history-1',
        productId: 11,
        productName: 'Wireless Charger',
        productPrice: 39.5,
        clickedAt: 1710000000000,
      },
    ]);

    const {findByText} = render(
      <ProductHistoryScreen navigation={navigation} route={route} />,
    );

    expect(await findByText('Product History')).toBeTruthy();
    expect(await findByText('Wireless Charger')).toBeTruthy();
    expect(await findByText('$39.50')).toBeTruthy();
  });

  it('should render empty state when history has no entries', async () => {
    mockGetProductHistory.mockResolvedValue([]);

    const {findByText} = render(
      <ProductHistoryScreen navigation={navigation} route={route} />,
    );

    expect(await findByText('No product click history yet.')).toBeTruthy();
  });

  it('should render error message when history loading fails', async () => {
    mockGetProductHistory.mockRejectedValue(new Error('Realm unavailable'));

    const {findByText} = render(
      <ProductHistoryScreen navigation={navigation} route={route} />,
    );

    expect(await findByText('Realm unavailable')).toBeTruthy();
  });
});
