import React from 'react';
import {render} from '@testing-library/react-native';
import {TextInput} from './TextInput';

describe('TextInput', () => {
  it('should render description when no error text is provided', () => {
    const {getByText, queryByText} = render(
      <TextInput placeholder="Username" description="Use your account username" />,
    );

    expect(getByText('Use your account username')).toBeTruthy();
    expect(queryByText('Required field')).toBeNull();
  });

  it('should render error text and hide description when error is present', () => {
    const {getByText, queryByText} = render(
      <TextInput
        placeholder="Email"
        description="Use a valid email"
        errorText="Required field"
      />,
    );

    expect(getByText('Required field')).toBeTruthy();
    expect(queryByText('Use a valid email')).toBeNull();
  });
});
