import {ImageStyle, StyleSheet} from 'react-native';

type LogoStyles = {
  image: ImageStyle;
};

export const styles = StyleSheet.create<LogoStyles>({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
    alignSelf: 'center',
  },
});
