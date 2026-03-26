import {combineReducers} from '@reduxjs/toolkit';
import {apiReducer} from '../features/api';
import {authReducer} from '../features/auth';
import {productsReducer} from '../features/products';
import {profileReducer} from '../features/profile';

export const rootReducer = combineReducers({
  auth: authReducer,
  api: apiReducer,
  products: productsReducer,
  profile: profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
