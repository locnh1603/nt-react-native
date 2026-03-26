import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/auth-slice';
import apiReducer from '../slices/api-slice';
import productReducer from '../slices/product-slice';
import profileReducer from '../slices/profile-slice';

const rootReducer = combineReducers({
  auth: authReducer,
  api: apiReducer,
  products: productReducer,
  profile: profileReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;