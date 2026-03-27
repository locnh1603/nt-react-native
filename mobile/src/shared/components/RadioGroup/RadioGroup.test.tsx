import React from 'react';
import {render, userEvent} from '@testing-library/react-native';
import {RadioGroup} from './RadioGroup';

describe('RadioGroup', () => {
  it('should render options and selected state', () => {
    const {getByText, getByRole} = render(
      <RadioGroup
        options={[
          {label: 'English', value: 'en'},
          {label: 'Vietnamese', value: 'vi'},
        ]}
        selectedValue="en"
        onChange={jest.fn()}
      />,
    );

    expect(getByText('English')).toBeTruthy();
    expect(getByText('Vietnamese')).toBeTruthy();
    expect(getByRole('radio', {name: 'English'})).toBeTruthy();
  });

  it('should call onChange when option is pressed', async () => {
    const onChange = jest.fn();
    const {getByText} = render(
      <RadioGroup
        options={[
          {label: 'English', value: 'en'},
          {label: 'Vietnamese', value: 'vi'},
        ]}
        selectedValue="en"
        onChange={onChange}
      />,
    );

    const user = userEvent.setup();
    await user.press(getByText('Vietnamese'));

    expect(onChange).toHaveBeenCalledWith('vi');
  });
});
