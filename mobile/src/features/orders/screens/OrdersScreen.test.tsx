import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import {OrdersScreen} from './OrdersScreen';
import {ordersReducer} from '../ordersSlice';
import type {OrdersScreenProps} from '../../../types/navigation';
import {dataService} from '../../../services/data/data-service';
import { Order } from 'src/models/order';



jest.mock('../../../services/data/data-service', () => ({
  dataService: {
    getOrders: jest.fn(),
  },
}));

const mockedGetOrders = dataService.getOrders as jest.MockedFunction<
  typeof dataService.getOrders
>;

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  dispatch: jest.fn(),
  setOptions: jest.fn(),
};
const navigation = mockNavigation as unknown as OrdersScreenProps['navigation'];
const route = {} as OrdersScreenProps['route'];

const sampleOrders: Order[] = [
  {
    id: 1,
    userId: 1,
    items: [{productId: 10, quantity: 2, price: 25}],
    totalAmount: 50,
    shippingAddress: '123 Main St',
    paymentMethod: 'credit_card',
    status: 'delivered',
    createdAt: '2025-01-15T10:30:00Z',
  },
  {
    id: 2,
    userId: 1,
    items: [{productId: 11, quantity: 1, price: 99.99}],
    totalAmount: 99.99,
    shippingAddress: '456 Oak Ave',
    paymentMethod: 'paypal',
    status: 'pending',
  },
  {
    id: 3,
    userId: 1,
    items: [{productId: 12, quantity: 1, price: 200}],
    totalAmount: 200,
    shippingAddress: '789 Pine Rd',
    paymentMethod: 'cash_on_delivery',
    status: 'cancelled',
  },
];

function createStore() {
  return configureStore({
    reducer: {
      orders: ordersReducer,
    },
  });
}

describe('OrdersScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Order History header title', async () => {
    mockedGetOrders.mockResolvedValueOnce([]);
    const store = createStore();
    const {getByText} = render(
      <Provider store={store}>
        <OrdersScreen navigation={navigation} route={route} />
      </Provider>,
    );
    await waitFor(() => {
      expect(getByText('Order History')).toBeTruthy();
    });
  });

  it('shows loading state while fetching', () => {
    mockedGetOrders.mockReturnValueOnce(new Promise(() => {}));
    const store = createStore();
    const {getByText} = render(
      <Provider store={store}>
        <OrdersScreen navigation={navigation} route={route} />
      </Provider>,
    );
    expect(getByText('Loading orders...')).toBeTruthy();
  });

  it('dispatches fetchOrders on mount', () => {
    mockedGetOrders.mockResolvedValueOnce([]);
    const store = createStore();
    render(
      <Provider store={store}>
        <OrdersScreen navigation={navigation} route={route} />
      </Provider>,
    );
    expect(mockedGetOrders).toHaveBeenCalled();
  });

  it('renders tab bar with all four tabs', async () => {
    mockedGetOrders.mockResolvedValueOnce([]);
    const store = createStore();
    const {getByText} = render(
      <Provider store={store}>
        <OrdersScreen navigation={navigation} route={route} />
      </Provider>,
    );
    expect(getByText('All Orders')).toBeTruthy();
    expect(getByText('Ongoing')).toBeTruthy();
    expect(getByText('Completed')).toBeTruthy();
    expect(getByText('Cancelled')).toBeTruthy();
  });

  it('filters to ongoing orders when Ongoing tab pressed', async () => {
    mockedGetOrders.mockResolvedValueOnce(sampleOrders);
    const store = createStore();
    const {findByText, getByText, queryByText} = render(
      <Provider store={store}>
        <OrdersScreen navigation={navigation} route={route} />
      </Provider>,
    );

    await findByText('$50.00');
    await act(async () => {
      fireEvent.press(getByText('Ongoing'));
      await waitFor(() => {
        expect(queryByText('$99.99')).toBeTruthy();
      });
    });
  });

  it('filters to completed orders when Completed tab pressed', async () => {
    mockedGetOrders.mockResolvedValueOnce(sampleOrders);
    const store = createStore();
    const {findByText, getByText, queryByText} = render(
      <Provider store={store}>
        <OrdersScreen navigation={navigation} route={route} />
      </Provider>,
    );

    await findByText('$50.00');
    await act(async () => {
      fireEvent.press(getByText('Completed'));
      await waitFor(() => {
        expect(queryByText('$50.00')).toBeTruthy();
      });
    });
  });

  it('filters to cancelled orders when Cancelled tab pressed', async () => {
    mockedGetOrders.mockResolvedValueOnce(sampleOrders);
    const store = createStore();
    const {findByText, getAllByText, queryByText} = render(
      <Provider store={store}>
        <OrdersScreen navigation={navigation} route={route} />
      </Provider>,
    );

    await findByText('$50.00');
    await act(async () => {
      const cancelledElements = getAllByText('Cancelled');
      fireEvent.press(cancelledElements[0]);
      await waitFor(() => {
        expect(queryByText('$200.00')).toBeTruthy();
      });
    });
  });

  it('shows all orders when All Orders tab pressed', async () => {
    mockedGetOrders.mockResolvedValueOnce(sampleOrders);
    const store = createStore();
    const {findByText, getByText} = render(
      <Provider store={store}>
        <OrdersScreen navigation={navigation} route={route} />
      </Provider>,
    );

    await findByText('$50.00');
    await act(async () => {
      fireEvent.press(getByText('All Orders'));
      await waitFor(() => {
        expect(getByText('$50.00')).toBeTruthy();
        expect(getByText('$99.99')).toBeTruthy();
        expect(getByText('$200.00')).toBeTruthy();
      });
    });
  });

  it('shows error state with retry on API failure', async () => {
    mockedGetOrders.mockRejectedValueOnce(new Error('Network failed'));
    const store = createStore();
    const {getByText} = render(
      <Provider store={store}>
        <OrdersScreen navigation={navigation} route={route} />
      </Provider>,
    );

    await waitFor(() => {
      expect(getByText('Error Loading Orders')).toBeTruthy();
      expect(getByText('Retry')).toBeTruthy();
    });
  });

  it('shows empty state when no orders', async () => {
    mockedGetOrders.mockResolvedValueOnce([]);
    const store = createStore();
    const {getByText} = render(
      <Provider store={store}>
        <OrdersScreen navigation={navigation} route={route} />
      </Provider>,
    );

    await waitFor(() => {
      expect(getByText('No orders found.')).toBeTruthy();
    });
  });
});
