import React from 'react';
import {Image} from 'react-native';
import {render} from '@testing-library/react-native';
import {Logo} from './Logo';
import ImageAssets from '../../../assets/images';

describe('Logo', () => {
  it('should render logo image asset', () => {
    const {UNSAFE_getByType} = render(<Logo />);
    const image = UNSAFE_getByType(Image);

    expect(image.props.source).toBe(ImageAssets.logo);
  });
});
