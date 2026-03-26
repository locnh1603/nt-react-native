import {StyleSheet, ViewStyle} from 'react-native';

type BackgroundStyles = {
  background: ViewStyle;
  container: ViewStyle;
};

export const styles = StyleSheet.create<BackgroundStyles>({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
