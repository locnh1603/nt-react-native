import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from '../../thunks/app-thunk';
import {dataService} from '../../services/data/data-service';
import type {RootState} from '../../redux/store';

interface Photo {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

interface ApiState {
	data: Photo[];
	loading: boolean;
	error: string | null;
}

const initialState: ApiState = {
	data: [],
	loading: false,
	error: null,
};

export const apiSlice = createSlice({
	name: 'api',
	initialState,
	reducers: {
		fetchDataStart: state => {
			state.loading = true;
			state.error = null;
		},
		fetchDataSuccess: (state, action: PayloadAction<Photo[]>) => {
			state.loading = false;
			state.data = action.payload;
		},
		fetchDataFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {fetchDataStart, fetchDataSuccess, fetchDataFailure} =
	apiSlice.actions;

export const fetchApiData = (): AppThunk => async dispatch => {
	dispatch(fetchDataStart());
	try {
		const products = await dataService.getProducts();
		dispatch(fetchDataSuccess(products as unknown as Photo[]));
	} catch (error) {
		const errorMessage = error ? String(error) : 'Unknown error';
		dispatch(fetchDataFailure(errorMessage));
	}
};

export const selectApiData = (state: RootState) => state.api.data;
export const selectApiLoading = (state: RootState) => state.api.loading;
export const selectApiError = (state: RootState) => state.api.error;

export const apiReducer = apiSlice.reducer;

export default apiReducer;
