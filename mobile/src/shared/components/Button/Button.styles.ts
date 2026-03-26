import {StyleSheet, ViewStyle} from 'react-native';

type ButtonStyles = {
  button: ViewStyle;
};

export const styles = StyleSheet.create<ButtonStyles>({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 10,
    backgroundColor: '#39B78D',
    alignItems: 'center',
    borderRadius: 10,
  },
});
