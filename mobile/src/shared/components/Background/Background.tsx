import React, {FC, ReactNode} from 'react';
import {ImageBackground, KeyboardAvoidingView} from 'react-native';
import ImageAssets from '../../../assets/images';
import {styles} from './Background.styles';

interface BackgroundProps {
  children: ReactNode;
}

export const Background: FC<BackgroundProps> = ({children}) => {
  return (
    <ImageBackground
      source={ImageAssets.background_dot}
      resizeMode="repeat"
      style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Background;
