import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TextInputStyles = {
  container: ViewStyle;
  input: ViewStyle;
  description: TextStyle;
  error: TextStyle;
};

export const styles = StyleSheet.create<TextInputStyles>({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  description: {
    fontSize: 13,
    color: 'gray',
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: 'gray',
    paddingTop: 8,
  },
});
