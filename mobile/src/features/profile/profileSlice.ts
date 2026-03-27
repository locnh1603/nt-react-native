import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from '../../thunks/app-thunk';
import {dataService} from '../../services/data/data-service';
import {UserProfile} from '../../models/user';

interface ProfileState {
	data: UserProfile | null;
	loading: boolean;
	error: string | null;
}

const initialState: ProfileState = {
	data: null,
	loading: false,
	error: null,
};

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		fetchProfileStart: state => {
			state.loading = true;
			state.error = null;
		},
		fetchProfileSuccess: (state, action: PayloadAction<UserProfile>) => {
			state.loading = false;
			state.data = action.payload;
		},
		fetchProfileFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {fetchProfileStart, fetchProfileSuccess, fetchProfileFailure} =
	profileSlice.actions;

export const fetchProfile = (): AppThunk => async dispatch => {
	dispatch(fetchProfileStart());
	try {
		const response = await dataService.getUserProfile();
		dispatch(fetchProfileSuccess(response));
	} catch (error) {
		const errorMessage = error ? String(error) : 'Unknown error';
		dispatch(fetchProfileFailure(errorMessage));
	}
};

export const selectProfileData = (state: {profile: ProfileState}) =>
	state.profile.data;
export const selectProfileLoading = (state: {profile: ProfileState}) =>
	state.profile.loading;
export const selectProfileError = (state: {profile: ProfileState}) =>
	state.profile.error;

export const profileReducer = profileSlice.reducer;

export default profileReducer;
