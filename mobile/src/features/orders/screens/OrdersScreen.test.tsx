import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import {OrdersScreen} from './OrdersScreen';
import {ordersReducer} from '../ordersSlice';
import type {OrdersScreenProps} from '../../../types/navigation';
import {sampleOrdersData} from '../sampleOrdersData';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  dispatch: jest.fn(),
  setOptions: jest.fn(),
};
const navigation = mockNavigation as unknown as OrdersScreenProps['navigation'];
const route = {} as OrdersScreenProps['route'];

function createStore() {
  return configureStore({
    reducer: {
      orders: ordersReducer,
    },
  });
}

describe('OrdersScreen', () => {
  const advanceFetchDelay = async (): Promise<void> => {
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders Order History header title', async () => {
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
    const store = createStore();
    const {getByText} = render(
      <Provider store={store}>
        <OrdersScreen navigation={navigation} route={route} />
      </Provider>,
    );
    expect(getByText('Loading orders...')).toBeTruthy();
  });

  it('loads sample orders after delay', async () => {
    const store = createStore();
    const {getByText} = render(
      <Provider store={store}>
        <OrdersScreen navigation={navigation} route={route} />
      </Provider>,
    );

    await advanceFetchDelay();

    await waitFor(() => {
      expect(getByText('$128.50')).toBeTruthy();
    });
  });

  it('renders tab bar with all four tabs', async () => {
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
    const store = createStore();
    const {getByText, queryByText} = render(
      <Provider store={store}>
        <OrdersScreen navigation={navigation} route={route} />
      </Provider>,
    );

    await advanceFetchDelay();

    await act(async () => {
      fireEvent.press(getByText('Ongoing'));
    });

    await waitFor(() => {
      expect(queryByText('$45.00')).toBeTruthy();
      expect(queryByText('$79.99')).toBeTruthy();
      expect(queryByText('$128.50')).toBeNull();
    });
  });

  it('filters to completed orders when Completed tab pressed', async () => {
    const store = createStore();
    const {getByText, queryByText} = render(
      <Provider store={store}>
        <OrdersScreen navigation={navigation} route={route} />
      </Provider>,
    );

    await advanceFetchDelay();

    await act(async () => {
      fireEvent.press(getByText('Completed'));
    });

    await waitFor(() => {
      expect(queryByText('$128.50')).toBeTruthy();
      expect(queryByText('$210.00')).toBeTruthy();
      expect(queryByText('$45.00')).toBeNull();
    });
  });

  it('filters to cancelled orders when Cancelled tab pressed', async () => {
    const store = createStore();
    const {getAllByText, queryByText} = render(
      <Provider store={store}>
        <OrdersScreen navigation={navigation} route={route} />
      </Provider>,
    );

    await advanceFetchDelay();

    await act(async () => {
      const cancelledElements = getAllByText('Cancelled');
      fireEvent.press(cancelledElements[0]);
    });

    await waitFor(() => {
      expect(queryByText('$99.00')).toBeTruthy();
      expect(queryByText('$128.50')).toBeNull();
    });
  });

  it('shows all orders when All Orders tab pressed', async () => {
    const store = createStore();
    const {getByText} = render(
      <Provider store={store}>
        <OrdersScreen navigation={navigation} route={route} />
      </Provider>,
    );

    await advanceFetchDelay();

    await act(async () => {
      fireEvent.press(getByText('All Orders'));
    });

    await waitFor(() => {
      expect(getByText(`$${sampleOrdersData[0].totalAmount.toFixed(2)}`)).toBeTruthy();
      expect(getByText(`$${sampleOrdersData[1].totalAmount.toFixed(2)}`)).toBeTruthy();
      expect(getByText(`$${sampleOrdersData[2].totalAmount.toFixed(2)}`)).toBeTruthy();
    });
  });
});
