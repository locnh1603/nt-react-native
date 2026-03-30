import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Order, OrderStatus} from '../../models/order';
import {sampleOrdersData} from './sampleOrdersData';

export type OrderTabFilter = 'all' | 'ongoing' | 'completed' | 'cancelled';

const ONGOING_STATUSES: OrderStatus[] = ['pending', 'processing', 'shipped'];

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  activeTab: OrderTabFilter;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  activeTab: 'all',
};

export const fetchOrders = createAsyncThunk<
  Order[],
  void,
  {rejectValue: string}
>('orders/fetchAll', async () => {
  await new Promise<void>(resolve => {
    setTimeout(() => resolve(), 1000);
  });
  return sampleOrdersData;
});

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch orders';
      });
  },
});

export const {clearError, setActiveTab} = ordersSlice.actions;

export const selectOrders = (state: {orders: OrdersState}) =>
  state.orders.orders;
export const selectOrdersLoading = (state: {orders: OrdersState}) =>
  state.orders.loading;
export const selectOrdersError = (state: {orders: OrdersState}) =>
  state.orders.error;
export const selectActiveTab = (state: {orders: OrdersState}) =>
  state.orders.activeTab;

export const selectFilteredOrders = createSelector(
  [selectOrders, selectActiveTab],
  (orders, activeTab) => {
    if (activeTab === 'all') {
      return orders;
    }
    if (activeTab === 'ongoing') {
      return orders.filter(o => ONGOING_STATUSES.includes(o.status));
    }
    if (activeTab === 'completed') {
      return orders.filter(o => o.status === 'delivered');
    }
    if (activeTab === 'cancelled') {
      return orders.filter(o => o.status === 'cancelled');
    }
    return orders;
  },
);

export const ordersReducer = ordersSlice.reducer;

export default ordersReducer;
