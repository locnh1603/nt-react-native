import {combineReducers} from '@reduxjs/toolkit';
import {apiReducer} from '../features/api';
import {authReducer} from '../features/auth';
import {productsReducer} from '../features/products';
import {profileReducer} from '../features/profile';
import {ordersReducer} from '../features/orders';

export const rootReducer = combineReducers({
  auth: authReducer,
  api: apiReducer,
  products: productsReducer,
  profile: profileReducer,
  orders: ordersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
