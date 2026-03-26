import React, {FC} from 'react';
import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {styles} from './Button.styles';

interface ButtonProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
}

export const Button: FC<ButtonProps> = ({style, ...props}) => {
  return <TouchableOpacity style={[styles.button, style]} {...props} />;
};

export default Button;
