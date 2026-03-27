import React from 'react';
import {render, userEvent} from '@testing-library/react-native';
import {ProductDisplay} from './ProductDisplay';

describe('ProductDisplay', () => {
  it('should render product fields with formatted price', () => {
    const {getByText} = render(
      <ProductDisplay
        product={{
          id: 1,
          name: 'Smart Watch',
          description: 'Wearable device',
          price: 149.5,
          priceUnit: 'dollar',
          image: 'https://cdn.test/watch.png',
        }}
      />,
    );

    expect(getByText('Smart Watch')).toBeTruthy();
    expect(getByText('dollar')).toBeTruthy();
    expect(getByText('$149.50')).toBeTruthy();
  });

  it('should render euro price with locale-aware formatting', () => {
    const {getByText} = render(
      <ProductDisplay
        product={{
          id: 3,
          name: 'Desk Lamp',
          description: 'Lamp',
          price: 49.99,
          priceUnit: 'euro',
          image: '',
        }}
      />,
    );

    expect(getByText(/49\.99|49,99/)).toBeTruthy();
  });

  it('should call onAddPress with product when add button is pressed', async () => {
    const onAddPress = jest.fn();
    const product = {
      id: 2,
      name: 'Keyboard',
      description: 'Mechanical keyboard',
      price: 89.99,
      image: '',
    };

    const {getByText} = render(
      <ProductDisplay product={product} onAddPress={onAddPress} />,
    );

    const user = userEvent.setup();
    await user.press(getByText('+'));

    expect(onAddPress).toHaveBeenCalledWith(product);
  });
});
