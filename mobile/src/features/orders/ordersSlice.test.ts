import {
  clearError,
  fetchOrders,
  selectActiveTab,
  selectFilteredOrders,
  selectOrders,
  selectOrdersError,
  selectOrdersLoading,
  setActiveTab,
  ordersReducer,
  OrderTabFilter,
} from './ordersSlice';
import {Order, OrderStatus} from '../../models/order';
import {configureStore} from '@reduxjs/toolkit';

jest.mock('../../services/data/data-service', () => ({
  dataService: {
    getOrders: jest.fn(),
  },
}));

import {dataService} from '../../services/data/data-service';

const mockedGetOrders = dataService.getOrders as jest.MockedFunction<
  typeof dataService.getOrders
>;

const sampleOrders: Order[] = [
  {
    id: 1,
    userId: 1,
    items: [{productId: 10, quantity: 2, price: 25}],
    totalAmount: 50,
    shippingAddress: '123 Main St',
    paymentMethod: 'credit_card',
    status: 'pending',
  },
  {
    id: 2,
    userId: 1,
    items: [{productId: 11, quantity: 1, price: 99.99}],
    totalAmount: 99.99,
    shippingAddress: '456 Oak Ave',
    paymentMethod: 'paypal',
    status: 'processing',
  },
  {
    id: 3,
    userId: 1,
    items: [{productId: 12, quantity: 3, price: 10}],
    totalAmount: 30,
    shippingAddress: '789 Pine Rd',
    paymentMethod: 'cash_on_delivery',
    status: 'shipped',
  },
  {
    id: 4,
    userId: 1,
    items: [{productId: 13, quantity: 1, price: 149.99}],
    totalAmount: 149.99,
    shippingAddress: '101 Elm St',
    paymentMethod: 'debit_card',
    status: 'delivered',
  },
  {
    id: 5,
    userId: 1,
    items: [{productId: 14, quantity: 1, price: 200}],
    totalAmount: 200,
    shippingAddress: '202 Maple Dr',
    paymentMethod: 'credit_card',
    status: 'cancelled',
  },
];

function createStore(overrides?: {orders?: Partial<typeof initialState>}) {
  return configureStore({
    reducer: {
      orders: ordersReducer,
    },
    preloadedState: overrides
      ? {orders: {...initialState, ...overrides.orders}}
      : undefined,
  });
}

type OrdersState = {
  orders: Order[];
  loading: boolean;
  error: string | null;
  activeTab: OrderTabFilter;
};

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  activeTab: 'all',
};

describe('ordersSlice', () => {
  describe('initial state', () => {
    it('has correct initial state', () => {
      const store = createStore();
      const state = store.getState().orders;
      expect(state.orders).toEqual([]);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.activeTab).toBe('all');
    });
  });

  describe('reducers', () => {
    it('clearError clears error', () => {
      const store = createStore({
        orders: {...initialState, error: 'some error'},
      });
      store.dispatch(clearError());
      expect(store.getState().orders.error).toBeNull();
    });

    it('setActiveTab updates activeTab', () => {
      const store = createStore();
      store.dispatch(setActiveTab('ongoing'));
      expect(store.getState().orders.activeTab).toBe('ongoing');
    });
  });

  describe('fetchOrders thunk', () => {
    it('pending sets loading true and clears error', () => {
      const store = createStore({
        orders: {...initialState, error: 'previous error'},
      });
      store.dispatch({type: fetchOrders.pending.type});
      const state = store.getState().orders;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('fulfilled sets loading false, populates orders, clears error', async () => {
      mockedGetOrders.mockResolvedValueOnce(sampleOrders);
      const store = createStore({
        orders: {...initialState, error: 'old error'},
      });
      await store.dispatch(fetchOrders());
      const state = store.getState().orders;
      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(sampleOrders);
      expect(state.error).toBeNull();
    });

    it('rejected with Error sets error message', async () => {
      mockedGetOrders.mockRejectedValueOnce(new Error('Network failed'));
      const store = createStore();
      await store.dispatch(fetchOrders());
      const state = store.getState().orders;
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Network failed');
    });

    it('rejected with non-Error sets fallback message', async () => {
      mockedGetOrders.mockRejectedValueOnce('unknown');
      const store = createStore();
      await store.dispatch(fetchOrders());
      const state = store.getState().orders;
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to fetch orders');
    });
  });

  describe('selectors', () => {
    const stateWithOrders = {
      orders: {...initialState, orders: sampleOrders},
    };

    it('selectOrders returns orders array', () => {
      expect(selectOrders(stateWithOrders)).toEqual(sampleOrders);
    });

    it('selectOrdersLoading returns loading boolean', () => {
      expect(selectOrdersLoading({orders: initialState})).toBe(false);
      expect(
        selectOrdersLoading({orders: {...initialState, loading: true}}),
      ).toBe(true);
    });

    it('selectOrdersError returns error string', () => {
      expect(selectOrdersError({orders: initialState})).toBeNull();
      expect(
        selectOrdersError({orders: {...initialState, error: 'err'}}),
      ).toBe('err');
    });

    it('selectActiveTab returns current tab', () => {
      expect(selectActiveTab({orders: initialState})).toBe('all');
    });

    describe('selectFilteredOrders', () => {
      it('returns all orders when tab is "all"', () => {
        const state = {
          orders: {
            ...initialState,
            orders: sampleOrders,
            activeTab: 'all' as OrderTabFilter,
          },
        };
        expect(selectFilteredOrders(state)).toEqual(sampleOrders);
      });

      it('filters pending/processing/shipped when tab is "ongoing"', () => {
        const state = {
          orders: {
            ...initialState,
            orders: sampleOrders,
            activeTab: 'ongoing' as OrderTabFilter,
          },
        };
        const filtered = selectFilteredOrders(state);
        expect(filtered.every(o => ['pending', 'processing', 'shipped'].includes(o.status))).toBe(true);
        expect(filtered).toHaveLength(3);
      });

      it('filters delivered when tab is "completed"', () => {
        const state = {
          orders: {
            ...initialState,
            orders: sampleOrders,
            activeTab: 'completed' as OrderTabFilter,
          },
        };
        const filtered = selectFilteredOrders(state);
        expect(filtered.every(o => o.status === 'delivered')).toBe(true);
        expect(filtered).toHaveLength(1);
      });

      it('filters cancelled when tab is "cancelled"', () => {
        const state = {
          orders: {
            ...initialState,
            orders: sampleOrders,
            activeTab: 'cancelled' as OrderTabFilter,
          },
        };
        const filtered = selectFilteredOrders(state);
        expect(filtered.every(o => o.status === 'cancelled')).toBe(true);
        expect(filtered).toHaveLength(1);
      });
    });
  });
});
