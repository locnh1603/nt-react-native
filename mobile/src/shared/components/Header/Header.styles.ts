import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type HeaderStyles = {
  container: ViewStyle;
  sideButton: ViewStyle;
  title: TextStyle;
};

export const styles = StyleSheet.create<HeaderStyles>({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  sideButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#0D1B2A',
  },
});
