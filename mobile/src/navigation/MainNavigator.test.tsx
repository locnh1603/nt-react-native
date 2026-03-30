import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import MainNavigator from './MainNavigator';
import {rootReducer} from '../app/rootReducer';
import type {MainNavigatorProps} from '../types/navigation';
import type {RootState} from '../app/store';

const createTestStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  });
};

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
          {options?.tabBarLabel ? <Text>{`Label:${options.tabBarLabel}`}</Text> : null}
          {focusedIcon}
          {unfocusedIcon}
        </View>
      );
    },
  }),
}));

describe('MainNavigator', () => {
  it('should render all three bottom-tab routes with real screens', () => {
    const navigation = {} as MainNavigatorProps['navigation'];
    const route = {} as MainNavigatorProps['route'];
    const testStore = createTestStore();

    const {getByText} = render(
      <Provider store={testStore}>
        <MainNavigator navigation={navigation} route={route} />
      </Provider>,
    );

    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Orders')).toBeTruthy();
    expect(getByText('Profile')).toBeTruthy();

    expect(getByText('Label:Home')).toBeTruthy();
    expect(getByText('Label:Orders')).toBeTruthy();
    expect(getByText('Label:Profile')).toBeTruthy();

    expect(getByText('Orders')).toBeTruthy();
  });
});
