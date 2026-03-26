import { ThunkAction } from 'redux-thunk';
import type { RootState } from '../app/store';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, any>;

