import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './ErrorDisplay.styles';

interface ErrorDisplayProps {
  title: string;
  message: string;
  onRetry: () => void;
  retryLabel?: string;
}

export const ErrorDisplay: FC<ErrorDisplayProps> = ({
  title,
  message,
  onRetry,
  retryLabel = 'Retry',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryButtonText}>{retryLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorDisplay;