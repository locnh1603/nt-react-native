import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {render} from '@testing-library/react-native';
import {OrdersScreen} from './OrdersScreen';
import type {OrdersScreenProps} from '../../../types/navigation';

const navigation = {} as OrdersScreenProps['navigation'];
const route = {} as OrdersScreenProps['route'];

describe('OrdersScreen', () => {
  it('should render orders title', () => {
    const store = configureStore({
      reducer: {
        ordersTestState: (state = {}) => state,
      },
    });

    const {getByText} = render(
      <Provider store={store}>
        <OrdersScreen navigation={navigation} route={route} />
      </Provider>,
    );

    expect(getByText('Orders')).toBeTruthy();
  });
});
