import { ThunkAction } from 'redux-thunk';
import type { RootState } from '../redux/store';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, any>;

