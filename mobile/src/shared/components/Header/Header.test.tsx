import React from 'react';
import {render, userEvent} from '@testing-library/react-native';
import {Header} from './Header';

jest.mock('@react-native-vector-icons/fontawesome', () => ({
  FontAwesome: ({name}: {name: string}) => {
    const {Text} = require('react-native');
    return <Text>{name}</Text>;
  },
}));

describe('Header', () => {
  it('should render title text', () => {
    const {getByText} = render(<Header title="Profile Settings" />);

    expect(getByText('Profile Settings')).toBeTruthy();
  });

  it('should trigger back and right actions when provided', async () => {
    const onBack = jest.fn();
    const onRightPress = jest.fn();

    const {getByText} = render(
      <Header
        title="Details"
        onBack={onBack}
        rightIconName="cog"
        onRightPress={onRightPress}
      />,
    );

    const user = userEvent.setup();
    await user.press(getByText('arrow-left'));
    await user.press(getByText('cog'));

    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onRightPress).toHaveBeenCalledTimes(1);
  });
});
