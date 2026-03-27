import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {render, waitFor, userEvent} from '@testing-library/react-native';
import {ProfileScreen} from './ProfileScreen';
import authReducer from '../../auth/authSlice';
import profileReducer from '../profileSlice';
import type {ProfileScreenProps} from '../../../types/navigation';

const mockGetUserProfile = jest.fn();
const mockLogout = jest.fn();
const mockClearUserSession = jest.fn();
const mockChangeLanguage = jest.fn(() => Promise.resolve());

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: {defaultValue?: string}) => {
      const mockEnTranslations = require('../../../assets/translation/en.json');

      if (Object.prototype.hasOwnProperty.call(mockEnTranslations, key)) {
        return mockEnTranslations[key];
      }

      return typeof options?.defaultValue === 'string' ? options.defaultValue : key;
    },
    i18n: {
      language: 'en',
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

jest.mock('../../../services/data/data-service', () => ({
  dataService: {
    getUserProfile: () => mockGetUserProfile(),
    logout: () => mockLogout(),
    login: jest.fn(),
    signup: jest.fn(),
    getProducts: jest.fn(),
    getProductById: jest.fn(),
  },
}));

jest.mock('../../../services/user-session', () => ({
  getUserSession: jest.fn(),
  clearUserSession: () => mockClearUserSession(),
  refreshUserSessionExpiry: jest.fn(),
  storeUserSession: jest.fn(),
  updateUserSessionUser: jest.fn(),
}));

const navigation = {
  goBack: jest.fn(),
} as unknown as ProfileScreenProps['navigation'];

const route = {} as ProfileScreenProps['route'];

const renderProfileScreen = () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      profile: profileReducer,
    },
  });

  const rendered = render(
    <Provider store={store}>
      <ProfileScreen navigation={navigation} route={route} />
    </Provider>,
  );

  return {
    ...rendered,
    user: userEvent.setup(),
  };
};

describe('ProfileScreen', () => {
  beforeEach(() => {
    mockGetUserProfile.mockReset();
    mockLogout.mockReset();
    mockClearUserSession.mockReset();
    mockChangeLanguage.mockReset();
    (navigation.goBack as jest.Mock).mockReset();
  });

  it('should render loading state while fetching profile', async () => {
    mockGetUserProfile.mockReturnValue(new Promise(() => undefined));

    const {findByText} = renderProfileScreen();

    expect(await findByText('Loading profile...')).toBeTruthy();
  });

  it('should render error state when profile fetch fails', async () => {
    mockGetUserProfile.mockRejectedValue(new Error('Profile unavailable'));

    const {findByText} = renderProfileScreen();

    expect(await findByText('Error Loading Profile')).toBeTruthy();
    expect(await findByText('Error: Profile unavailable')).toBeTruthy();
  });

  it('should render profile details when profile fetch succeeds', async () => {
    mockGetUserProfile.mockResolvedValue({
      id: 3,
      username: 'alice',
      email: 'alice@example.com',
      age: 31,
      role: 'user',
      firstName: 'Alice',
      lastName: 'Cooper',
    });

    const {findByText} = renderProfileScreen();

    expect(await findByText('Profile Settings')).toBeTruthy();
    expect(await findByText('Alice Cooper')).toBeTruthy();
    expect(await findByText('Account Details')).toBeTruthy();
    expect(await findByText('alice@example.com')).toBeTruthy();
    expect(await findByText('31')).toBeTruthy();
  });

  it('should logout when pressing logout action', async () => {
    mockGetUserProfile.mockResolvedValue({
      id: 5,
      username: 'bob',
      email: 'bob@example.com',
      age: 25,
      role: 'user',
      firstName: 'Bob',
      lastName: 'Smith',
    });
    mockLogout.mockResolvedValue(undefined);
    mockClearUserSession.mockResolvedValue(undefined);

    const {findByText, getByText, user} = renderProfileScreen();

    expect(await findByText('Bob Smith')).toBeTruthy();

    await user.press(getByText('Logout'));

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalledTimes(1);
      expect(mockClearUserSession).toHaveBeenCalledTimes(1);
    });
  });

  it('should change app language when selecting Vietnamese option', async () => {
    mockGetUserProfile.mockResolvedValue({
      id: 8,
      username: 'ann',
      email: 'ann@example.com',
      age: 26,
      role: 'user',
      firstName: 'Ann',
      lastName: 'Lee',
    });

    const {findByText, getByText, user} = renderProfileScreen();

    expect(await findByText('Profile Settings')).toBeTruthy();

    await user.press(getByText('Vietnamese'));

    expect(mockChangeLanguage).toHaveBeenCalledWith('vi');
  });
});
