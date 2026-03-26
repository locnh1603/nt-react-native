import {StyleSheet, ImageStyle, TextStyle, ViewStyle} from 'react-native';

type ListItemStyles = {
  listItem: ViewStyle;
  image: ImageStyle;
  textContainer: ViewStyle;
  title: TextStyle;
  body: TextStyle;
};

export const styles = StyleSheet.create<ListItemStyles>({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  },
});
