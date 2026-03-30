import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import App from './App';

let mockIsAuthenticated = false;
const mockDispatch = jest.fn();

jest.mock('./src/app/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) => {
    if (selector.toString().includes('isAuthenticated')) {
      return mockIsAuthenticated;
    }
    return undefined;
  },
}));

jest.mock('./src/services/data/data-service', () => ({
  dataService: {
    login: jest.fn(),
    signup: jest.fn(),
    logout: jest.fn(),
    getUserProfile: jest.fn(),
    getProducts: jest.fn(),
    getProductById: jest.fn(),
  },
}));

jest.mock('./src/services/user-session', () => ({
  storeUserSession: jest.fn(),
  clearUserSession: jest.fn(),
  updateUserSessionUser: jest.fn(),
}));

jest.mock('./src/services/auth-redirect', () => ({
  setAuthRedirectHandler: jest.fn(),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({children}: {children: React.ReactNode}) => <>{children}</>,
    Screen: ({
      name,
      options,
    }: {
      name: string;
      options?: {
        tabBarLabel?: string;
        tabBarIcon?: (props: {focused: boolean}) => React.ReactNode;
      };
    }) => {
      const {Text, View} = require('react-native');
      const focusedIcon = options?.tabBarIcon
        ? options.tabBarIcon({focused: true})
        : null;
      const unfocusedIcon = options?.tabBarIcon
        ? options.tabBarIcon({focused: false})
        : null;
      return (
        <View>
          <Text>{name}</Text>
          {options?.tabBarLabel ? <Text>{options.tabBarLabel}</Text> : null}
          {focusedIcon}
          {unfocusedIcon}
        </View>
      );
    },
  }),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({children}: {children: React.ReactNode}) => <>{children}</>,
    Screen: ({
      name,
      component: Component,
    }: {
      name: string;
      component: React.ComponentType<any>;
      options?: any;
    }) => {
      return <Component />;
    },
  }),
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsAuthenticated = false;
    mockDispatch.mockReturnValue(Promise.resolve());
  });

  it('should dispatch restoreUserSession on mount', async () => {
    const {getByText} = render(<App />);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  it('should render SignInScreen when user is not authenticated', async () => {
    mockIsAuthenticated = false;

    const {getByTestId} = render(<App />);

    await waitFor(() => {
      expect(getByTestId('sign-in-screen')).toBeTruthy();
    });
  });

  it('should not render SignInScreen when user is authenticated', async () => {
    mockIsAuthenticated = true;

    const {queryByTestId} = render(<App />);

    await waitFor(() => {
      expect(queryByTestId('sign-in-screen')).toBeNull();
    });
  });
});
