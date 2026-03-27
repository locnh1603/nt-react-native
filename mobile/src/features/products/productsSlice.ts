import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {dataService} from '../../services/data/data-service';
import {Product} from '../../models/product';

interface ProductState {
	products: Product[];
	selectedProduct: Product | null;
	loading: boolean;
	error: string | null;
}

const initialState: ProductState = {
	products: [],
	selectedProduct: null,
	loading: false,
	error: null,
};

export const fetchProducts = createAsyncThunk<
	Product[],
	void,
	{rejectValue: string}
>('products/fetchAll', async (_, {rejectWithValue}) => {
	try {
		const products = await dataService.getProducts();
		return products;
	} catch (error) {
		return rejectWithValue(
			error instanceof Error ? error.message : 'Failed to fetch products',
		);
	}
});

export const fetchProductById = createAsyncThunk<
	Product,
	number,
	{rejectValue: string}
>('products/fetchById', async (productId, {rejectWithValue}) => {
	try {
		const product = await dataService.getProductById(productId);
		return product;
	} catch (error) {
		return rejectWithValue(
			error instanceof Error ? error.message : 'Failed to fetch product',
		);
	}
});

export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		clearError: state => {
			state.error = null;
		},
		clearSelectedProduct: state => {
			state.selectedProduct = null;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchProducts.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
				state.error = null;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Failed to fetch products';
			});

		builder
			.addCase(fetchProductById.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProductById.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedProduct = action.payload;
				state.error = null;
			})
			.addCase(fetchProductById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Failed to fetch product';
			});
	},
});

export const {clearError, clearSelectedProduct} = productSlice.actions;

export const selectProducts = (state: {products: ProductState}) =>
	state.products.products;
export const selectSelectedProduct = (state: {products: ProductState}) =>
	state.products.selectedProduct;
export const selectProductsLoading = (state: {products: ProductState}) =>
	state.products.loading;
export const selectProductsError = (state: {products: ProductState}) =>
	state.products.error;

export const productsReducer = productSlice.reducer;

export default productsReducer;
