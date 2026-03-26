import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type ErrorDisplayStyles = {
  container: ViewStyle;
  title: TextStyle;
  message: TextStyle;
  retryButton: ViewStyle;
  retryButtonText: TextStyle;
};

export const styles = StyleSheet.create<ErrorDisplayStyles>({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#6F7A8D',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#00DCE7',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});