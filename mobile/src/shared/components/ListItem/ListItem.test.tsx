import React from 'react';
import {Image} from 'react-native';
import {render} from '@testing-library/react-native';
import {ListItem} from './ListItem';
import ImageAssets from '../../../assets/images';

describe('ListItem', () => {
  it('should render title and body text', () => {
    const {getByText} = render(
      <ListItem
        item={{
          title: 'Sample title',
          body: 'Sample body',
          imageUrl: 'https://cdn.test/image.jpg',
        }}
      />,
    );

    expect(getByText('Sample title')).toBeTruthy();
    expect(getByText('Sample body')).toBeTruthy();
  });

  it('should use fallback logo when image url is empty', () => {
    const {UNSAFE_getByType} = render(
      <ListItem
        item={{
          title: 'No image',
          body: 'Body',
          imageUrl: '',
        }}
      />,
    );

    const image = UNSAFE_getByType(Image);
    expect(image.props.source).toBe(ImageAssets.logo);
  });
});
