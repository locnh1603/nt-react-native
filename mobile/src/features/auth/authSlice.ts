import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {apiService} from '../../services/api-service';
import {LoginRequest, SignupRequest, AuthResponse} from '../../models/auth';
import {UserProfile} from '../../models/user';
import type {UserSession} from '../../services/user-session';
import {
	getUserSession,
	clearUserSession,
	storeUserSession,
	updateUserSessionUser,
} from '../../services/user-session';

interface AuthState {
	user: UserProfile | null;
	token: string | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	user: null,
	token: null,
	isAuthenticated: false,
	loading: false,
	error: null,
};

export const restoreUserSession = createAsyncThunk<
	UserSession | null,
	void,
	{rejectValue: string}
>('auth/restoreSession', async () => {
	return await getUserSession();
});

export const loginUser = createAsyncThunk<
	AuthResponse,
	LoginRequest,
	{rejectValue: string}
>('auth/login', async (credentials, {rejectWithValue}) => {
	try {
		const response = await apiService.login(credentials);
		await storeUserSession({
			token: response.data.token,
			user: response.data.user,
		});
		return response;
	} catch (error) {
		return rejectWithValue(
			error instanceof Error ? error.message : 'Login failed',
		);
	}
});

export const signupUser = createAsyncThunk<
	AuthResponse,
	SignupRequest,
	{rejectValue: string}
>('auth/signup', async (userData, {rejectWithValue}) => {
	try {
		const response = await apiService.signup(userData);
		await storeUserSession({
			token: response.data.token,
			user: response.data.user,
		});
		return response;
	} catch (error) {
		return rejectWithValue(
			error instanceof Error ? error.message : 'Signup failed',
		);
	}
});

export const logoutUser = createAsyncThunk<void, void, {rejectValue: string}>(
	'auth/logout',
	async (_, {rejectWithValue}) => {
		let logoutError: unknown;
		try {
			await apiService.logout();
		} catch (error) {
			logoutError = error;
		}

		try {
			await clearUserSession();
		} catch (error) {
			return rejectWithValue(
				error instanceof Error ? error.message : 'Logout failed',
			);
		}

		if (logoutError) {
			return rejectWithValue(
				logoutError instanceof Error ? logoutError.message : 'Logout failed',
			);
		}
	},
);

export const fetchUserProfile = createAsyncThunk<
	UserProfile,
	void,
	{rejectValue: string}
>('auth/fetchProfile', async (_, {rejectWithValue}) => {
	try {
		const profile = await apiService.getUserProfile();
		await updateUserSessionUser(profile);
		return profile;
	} catch (error) {
		return rejectWithValue(
			error instanceof Error ? error.message : 'Failed to fetch profile',
		);
	}
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearError: state => {
			state.error = null;
		},
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
			state.isAuthenticated = true;
		},
		clearAuth: state => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(restoreUserSession.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(restoreUserSession.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload) {
					state.user = action.payload.user;
					state.token = null;
					state.isAuthenticated = true;
				} else {
					state.user = null;
					state.token = null;
					state.isAuthenticated = false;
				}
			})
			.addCase(restoreUserSession.rejected, (state, action) => {
				state.loading = false;
				state.user = null;
				state.token = null;
				state.isAuthenticated = false;
				state.error = action.payload || 'Failed to restore session';
			})
			
		builder
			.addCase(loginUser.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.data.user;
				state.token = null;
				state.isAuthenticated = true;
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Login failed';
				state.isAuthenticated = false;
			});

		builder
			.addCase(signupUser.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signupUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.data.user;
				state.token = null;
				state.isAuthenticated = true;
				state.error = null;
			})
			.addCase(signupUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Signup failed';
				state.isAuthenticated = false;
			});

		builder
			.addCase(logoutUser.pending, state => {
				state.loading = true;
			})
			.addCase(logoutUser.fulfilled, state => {
				state.loading = false;
				state.user = null;
				state.token = null;
				state.isAuthenticated = false;
				state.error = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.user = null;
				state.token = null;
				state.isAuthenticated = false;
				state.error = action.payload || 'Logout failed';
			});

		builder
			.addCase(fetchUserProfile.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUserProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.error = null;
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Failed to fetch profile';
			});
	},
});

export const {clearError, setToken, clearAuth} = authSlice.actions;

export const selectAuthUser = (state: {auth: AuthState}) => state.auth.user;
export const selectAuthToken = (state: {auth: AuthState}) => state.auth.token;
export const selectIsAuthenticated = (state: {auth: AuthState}) =>
	state.auth.isAuthenticated;
export const selectAuthLoading = (state: {auth: AuthState}) =>
	state.auth.loading;
export const selectAuthError = (state: {auth: AuthState}) => state.auth.error;

export const authReducer = authSlice.reducer;

export default authReducer;
