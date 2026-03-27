import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import App from './App';

jest.mock('./src/app/store', () => {
  const mockStore = {
    getState: () => ({}),
    dispatch: jest.fn(),
    subscribe: () => () => undefined,
  };

  return {
    __esModule: true,
    default: mockStore,
    store: mockStore,
  };
});

let mockIsAuthenticated = false;
const mockDispatch = jest.fn();
const mockRestoreUserSession = jest.fn(() => ({type: 'auth/restoreSession'}));

jest.mock('./src/app/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => mockIsAuthenticated,
}));

jest.mock('./src/features/auth', () => ({
  restoreUserSession: () => mockRestoreUserSession(),
  clearAuth: () => ({type: 'auth/clearAuth'}),
  selectIsAuthenticated: jest.fn(),
  SignInScreen: () => {
    const {Text} = require('react-native');
    return <Text>SignInScreen</Text>;
  },
}));

jest.mock('./src/features/products', () => ({
  ProductDetailScreen: () => {
    const {Text} = require('react-native');
    return <Text>ProductDetailScreen</Text>;
  },
  ProductHistoryScreen: () => {
    const {Text} = require('react-native');
    return <Text>ProductHistoryScreen</Text>;
  },
}));

jest.mock('./src/navigation/MainNavigator', () => {
  return () => {
    const {Text} = require('react-native');
    return <Text>MainNavigator</Text>;
  };
});

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({children}: {children: React.ReactNode}) => <>{children}</>,
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => {
    return {
      Navigator: ({children}: {children: React.ReactNode}) => <>{children}</>,
      Screen: ({name}: {name: string}) => {
        const {Text} = require('react-native');
        return <Text>{name}</Text>;
      },
    };
  },
}));

describe('App', () => {
  beforeEach(() => {
    mockIsAuthenticated = false;
    mockDispatch.mockReset();
    mockDispatch.mockResolvedValue({});
    mockRestoreUserSession.mockClear();
  });

  it('should dispatch restore session on mount', async () => {
    render(<App />);

    await waitFor(() => {
      expect(mockRestoreUserSession).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });

  it('should render auth stack when user is not authenticated', async () => {
    const {getByText, queryByText} = render(<App />);

    await waitFor(() => {
      expect(getByText('SignIn')).toBeTruthy();
    });

    expect(queryByText('Main')).toBeNull();
    expect(queryByText('ProductDetail')).toBeNull();
    expect(queryByText('ProductHistory')).toBeNull();
  });

  it('should render app stack when user is authenticated', async () => {
    mockIsAuthenticated = true;

    const {getByText, queryByText} = render(<App />);

    await waitFor(() => {
      expect(getByText('Main')).toBeTruthy();
      expect(getByText('ProductDetail')).toBeTruthy();
      expect(getByText('ProductHistory')).toBeTruthy();
    });

    expect(queryByText('SignIn')).toBeNull();
  });
});
