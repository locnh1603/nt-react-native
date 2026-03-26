import React, {FC} from 'react';
import {Image} from 'react-native';
import ImageAssets from '../../../assets/images';
import {styles} from './Logo.styles';

export const Logo: FC = () => {
  return <Image source={ImageAssets.logo} style={styles.image} />;
};

export default Logo;
