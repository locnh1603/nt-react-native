import {StyleSheet, TextStyle} from 'react-native';

type HeaderStyles = {
  header: TextStyle;
};

export const styles = StyleSheet.create<HeaderStyles>({
  header: {
    fontSize: 21,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
