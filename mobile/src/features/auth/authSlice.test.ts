import {configureStore} from '@reduxjs/toolkit';
import authReducer, {
  clearAuth,
  clearError,
  fetchUserProfile,
  loginUser,
  logoutUser,
  restoreUserSession,
  setToken,
  signupUser,
} from './authSlice';
import type {UserProfile} from '../../models/user';

const mockLogin = jest.fn();
const mockSignup = jest.fn();
const mockLogout = jest.fn();
const mockGetUserProfile = jest.fn();
const mockGetUserSession = jest.fn();
const mockClearUserSession = jest.fn();
const mockStoreUserSession = jest.fn();
const mockUpdateUserSessionUser = jest.fn();

jest.mock('../../services/data/data-service', () => ({
  dataService: {
    login: (credentials: {username: string; password: string}) =>
      mockLogin(credentials),
    signup: (payload: {
      username: string;
      email: string;
      password: string;
      age: number;
      firstName: string;
      lastName: string;
      role?: string;
    }) => mockSignup(payload),
    logout: () => mockLogout(),
    getUserProfile: () => mockGetUserProfile(),
  },
}));

jest.mock('../../services/user-session', () => ({
  getUserSession: () => mockGetUserSession(),
  clearUserSession: () => mockClearUserSession(),
  storeUserSession: (payload: {token: string}) => mockStoreUserSession(payload),
  updateUserSessionUser: (user: UserProfile) => mockUpdateUserSessionUser(user),
}));

const userFixture: UserProfile = {
  id: 1,
  username: 'john',
  email: 'john@example.com',
  age: 30,
  role: 'user',
  firstName: 'John',
  lastName: 'Doe',
};

const createStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
  });

describe('authSlice', () => {
  beforeEach(() => {
    mockLogin.mockReset();
    mockSignup.mockReset();
    mockLogout.mockReset();
    mockGetUserProfile.mockReset();
    mockGetUserSession.mockReset();
    mockClearUserSession.mockReset();
    mockStoreUserSession.mockReset();
    mockUpdateUserSessionUser.mockReset();
  });

  it('should handle clearError reducer', () => {
    const previousState = {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: 'Some error',
    };

    const nextState = authReducer(previousState, clearError());
    expect(nextState.error).toBeNull();
  });

  it('should handle setToken and clearAuth reducers', () => {
    const withToken = authReducer(undefined, setToken('abc-token'));
    expect(withToken.token).toBe('abc-token');
    expect(withToken.isAuthenticated).toBe(true);

    const cleared = authReducer(withToken, clearAuth());
    expect(cleared.user).toBeNull();
    expect(cleared.token).toBeNull();
    expect(cleared.isAuthenticated).toBe(false);
  });

  it('should restore existing user session', async () => {
    mockGetUserSession.mockResolvedValue({
      token: 'session-token',
      user: userFixture,
      expiresAt: Date.now() + 60_000,
    });

    const store = createStore();
    await store.dispatch(restoreUserSession());

    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(userFixture);
  });

  it('should clear auth state when restored session is null', async () => {
    mockGetUserSession.mockResolvedValue(null);

    const store = createStore();
    await store.dispatch(restoreUserSession());

    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  it('should login successfully and store session', async () => {
    mockLogin.mockResolvedValue({status: true, data: {token: 'login-token'}});
    mockGetUserProfile.mockResolvedValue(userFixture);

    const store = createStore();
    await store.dispatch(loginUser({username: 'john', password: 'pass123'}));

    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(userFixture);
    expect(mockStoreUserSession).toHaveBeenCalledWith({token: 'login-token'});
    expect(mockUpdateUserSessionUser).toHaveBeenCalledWith(userFixture);
  });

  it('should handle login failure', async () => {
    mockLogin.mockRejectedValue(new Error('Invalid credentials'));

    const store = createStore();
    await store.dispatch(loginUser({username: 'bad', password: 'bad'}));

    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('Invalid credentials');
  });

  it('should signup successfully and authenticate user', async () => {
    mockSignup.mockResolvedValue({status: true, data: {token: 'signup-token'}});
    mockGetUserProfile.mockResolvedValue(userFixture);

    const store = createStore();
    await store.dispatch(
      signupUser({
        username: 'john',
        email: 'john@example.com',
        password: 'Pass1234',
        age: 30,
        firstName: 'John',
        lastName: 'Doe',
        role: 'user',
      }),
    );

    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(userFixture);
  });

  it('should handle signup failure with default fallback message', async () => {
    mockSignup.mockRejectedValue('non-error');

    const store = createStore();
    await store.dispatch(
      signupUser({
        username: 'john',
        email: 'john@example.com',
        password: 'Pass1234',
        age: 30,
        firstName: 'John',
        lastName: 'Doe',
        role: 'user',
      }),
    );

    const state = store.getState().auth;
    expect(state.error).toBe('Signup failed');
    expect(state.isAuthenticated).toBe(false);
  });

  it('should clear local session even when server logout fails', async () => {
    mockLogout.mockRejectedValue(new Error('Server logout failed'));
    mockClearUserSession.mockResolvedValue(undefined);

    const store = createStore();
    await store.dispatch(logoutUser());

    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('Server logout failed');
    expect(mockClearUserSession).toHaveBeenCalledTimes(1);
  });

  it('should fetch user profile and update session user', async () => {
    mockGetUserProfile.mockResolvedValue(userFixture);

    const store = createStore();
    await store.dispatch(fetchUserProfile());

    const state = store.getState().auth;
    expect(state.user).toEqual(userFixture);
    expect(state.error).toBeNull();
    expect(mockUpdateUserSessionUser).toHaveBeenCalledWith(userFixture);
  });

  it('should handle fetch profile failure with default fallback message', async () => {
    mockGetUserProfile.mockRejectedValue('non-error');

    const store = createStore();
    await store.dispatch(fetchUserProfile());

    const state = store.getState().auth;
    expect(state.error).toBe('Failed to fetch profile');
  });
});
