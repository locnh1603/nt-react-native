import React from 'react';
import {ImageBackground, KeyboardAvoidingView, Text} from 'react-native';
import {render} from '@testing-library/react-native';
import {Background} from './Background';

describe('Background', () => {
  it('should render children inside background containers', () => {
    const {getByText, UNSAFE_getByType} = render(
      <Background>
        <Text>Child Content</Text>
      </Background>,
    );

    expect(getByText('Child Content')).toBeTruthy();
    expect(UNSAFE_getByType(ImageBackground)).toBeTruthy();
    expect(UNSAFE_getByType(KeyboardAvoidingView)).toBeTruthy();
  });
});
