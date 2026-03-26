import React, {FC} from 'react';
import {Text, TextInput as RNTextInput, TextInputProps, View} from 'react-native';
import {styles} from './TextInput.styles';

interface AppTextInputProps extends TextInputProps {
  errorText?: string;
  description?: string;
}

export const TextInput: FC<AppTextInputProps> = ({
  errorText,
  description,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <RNTextInput style={styles.input} underlineColorAndroid="transparent" {...props} />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

export default TextInput;
