import React, {FC} from 'react';
import {Text} from 'react-native';
import {styles} from './Header.styles';

interface HeaderProps {
  text: string;
}

export const Header: FC<HeaderProps> = ({text}) => {
  return <Text style={styles.header}>{text}</Text>;
};

export default Header;
