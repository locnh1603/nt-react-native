import {StyleSheet, TextStyle} from 'react-native';

type ParagraphStyles = {
  text: TextStyle;
};

export const styles = StyleSheet.create<ParagraphStyles>({
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 12,
  },
});
