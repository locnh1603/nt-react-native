import React from 'react';
import {render, userEvent} from '@testing-library/react-native';
import {Text} from 'react-native';
import {Button} from './Button';

describe('Button', () => {
  it('should invoke onPress when pressed', async () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <Button onPress={onPress}>
        <Text>Tap me</Text>
      </Button>,
    );

    const user = userEvent.setup();
    await user.press(getByText('Tap me'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should not invoke onPress when disabled', async () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <Button onPress={onPress} disabled>
        <Text>Disabled</Text>
      </Button>,
    );

    const user = userEvent.setup();
    await user.press(getByText('Disabled'));

    expect(onPress).not.toHaveBeenCalled();
  });
});
