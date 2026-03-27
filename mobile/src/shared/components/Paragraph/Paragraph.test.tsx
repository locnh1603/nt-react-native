import React from 'react';
import {render} from '@testing-library/react-native';
import {Paragraph} from './Paragraph';

describe('Paragraph', () => {
  it('should render children content', () => {
    const {getByText} = render(<Paragraph>Hello paragraph</Paragraph>);

    expect(getByText('Hello paragraph')).toBeTruthy();
  });
});
