import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {render, waitFor, userEvent} from '@testing-library/react-native';
import {SignInScreen} from './SignInScreen';
import authReducer from '../authSlice';
import type {SignInScreenProps} from '../../../types/navigation';
import type {UserProfile} from '../../../models/user';

const mockLogin = jest.fn();
const mockSignup = jest.fn();
const mockGetUserProfile = jest.fn();
const mockStoreUserSession = jest.fn();
const mockUpdateUserSessionUser = jest.fn();

jest.mock('../../../services/data/data-service', () => ({
  dataService: {
    login: (payload: {username: string; password: string}) => mockLogin(payload),
    signup: (payload: {
      username: string;
      email: string;
      password: string;
      age: number;
      firstName: string;
      lastName: string;
      role?: string;
    }) => mockSignup(payload),
    getUserProfile: () => mockGetUserProfile(),
    logout: jest.fn(),
    getProducts: jest.fn(),
    getProductById: jest.fn(),
  },
}));

jest.mock('../../../services/user-session', () => ({
  getUserSession: jest.fn(),
  clearUserSession: jest.fn(),
  refreshUserSessionExpiry: jest.fn(),
  storeUserSession: (payload: {token: string}) => mockStoreUserSession(payload),
  updateUserSessionUser: (user: UserProfile) => mockUpdateUserSessionUser(user),
}));

const navigation = {} as SignInScreenProps['navigation'];
const route = {} as SignInScreenProps['route'];

const userFixture: UserProfile = {
  id: 1,
  username: 'example',
  email: 'example@test.dev',
  age: 21,
  role: 'user',
  firstName: 'Example',
  lastName: 'User',
};

const renderSignInScreen = () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  const rendered = render(
    <Provider store={store}>
      <SignInScreen navigation={navigation} route={route} />
    </Provider>,
  );

  return {
    ...rendered,
    user: userEvent.setup(),
  };
};

describe('SignInScreen', () => {
  beforeEach(() => {
    mockLogin.mockReset();
    mockSignup.mockReset();
    mockGetUserProfile.mockReset();
    mockStoreUserSession.mockReset();
    mockUpdateUserSessionUser.mockReset();
  });

  it('should submit login with default credentials', async () => {
    mockLogin.mockResolvedValue({
      status: true,
      data: {token: 'token-123'},
    });
    mockGetUserProfile.mockResolvedValue(userFixture);

    const {getByText, user} = renderSignInScreen();

    await user.press(getByText('Sign In'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: 'example',
        password: 'password',
      });
      expect(mockStoreUserSession).toHaveBeenCalledWith({token: 'token-123'});
      expect(mockUpdateUserSessionUser).toHaveBeenCalledWith(userFixture);
    });
  });

  it('should show signup validation errors and prevent submit for invalid input', async () => {
    const {getAllByText, getByPlaceholderText, getAllByPlaceholderText, findByText, user} =
      renderSignInScreen();

    await user.press(getAllByText('Sign Up')[0]);

    await user.type(getAllByPlaceholderText('Abcd1234')[0], 'weakpass');
    await user.type(getAllByPlaceholderText('Abcd1234')[1], 'different');
    await user.type(getByPlaceholderText('25'), '-1');

    await user.press(getAllByText('Sign Up')[1]);

    expect(
      await findByText('Password must include at least 1 capital letter and 1 number.'),
    ).toBeTruthy();
    expect(await findByText('Confirm password must match password.')).toBeTruthy();
    expect(await findByText('Age must be a valid positive number.')).toBeTruthy();
    expect(mockSignup).not.toHaveBeenCalled();
  });

  it('should submit signup when form values are valid', async () => {
    mockSignup.mockResolvedValue({
      status: true,
      data: {token: 'signup-token'},
    });
    mockGetUserProfile.mockResolvedValue(userFixture);

    const {getAllByText, getByPlaceholderText, getAllByPlaceholderText, user} =
      renderSignInScreen();

    await user.press(getAllByText('Sign Up')[0]);

    await user.type(getByPlaceholderText('johndoe'), 'newuser');
    await user.type(getByPlaceholderText('John'), 'New');
    await user.type(getByPlaceholderText('Doe'), 'User');
    await user.type(getByPlaceholderText('you@example.com'), 'new@user.dev');
    await user.type(getAllByPlaceholderText('Abcd1234')[0], 'Abcd1234');
    await user.type(getAllByPlaceholderText('Abcd1234')[1], 'Abcd1234');
    await user.type(getByPlaceholderText('25'), '25');

    await user.press(getAllByText('Sign Up')[1]);

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({
        username: 'newuser',
        email: 'new@user.dev',
        password: 'Abcd1234',
        age: 25,
        firstName: 'New',
        lastName: 'User',
        role: 'user',
      });
    });
  });
});
