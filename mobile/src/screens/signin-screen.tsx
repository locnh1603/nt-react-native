import {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import {ITextInput} from '../types/text-input';
import Button from '../components/Button';
import type {AccountScreenProps} from '../types/navigation';

type ISignInStyles = {
  changeLanguageContent: ViewStyle;
  languageItem: ViewStyle;
  row: ViewStyle;
  link: TextStyle;
};

export const SignInScreen: FC<AccountScreenProps> = () => {
  const [email, setEmail] = useState<ITextInput>({
    value: 'eve.holt@reqres.in',
    error: '',
  });
  const [password, setPassword] = useState<ITextInput>({
    value: 'cityslicka',
    error: '',
  });

  const onPressSignIn = async () => {};

  return (
    <Background>
      <View
        style={{
          width: '100%',
          height: '100%',
          padding: 20,
          flex: 1,
          flexDirection: 'column',
        }}>
        <View style={{alignContent: 'center', flex: 0.2}}>
          <View style={styles.changeLanguageContent}>
            <Text
              style={styles.languageItem}
              onPress={() => {
                console.log('press language');
              }}>
              English
            </Text>
            <Text
              style={styles.languageItem}
              onPress={() => {
                console.log('press language');
              }}>
              Tiếng Việt
            </Text>
          </View>
        </View>
        <View style={{alignContent: 'center', flex: 0.5}}>
          <Logo />
          <TextInput
            placeholder="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text: string) => setEmail({value: text, error: ''})}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            // autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text: string) =>
              setPassword({value: text, error: ''})
            }
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
          <Button
            mode="contained"
            onPress={() => {
              onPressSignIn();
            }}>
            <Text>Login</Text>
          </Button>
          <View style={styles.row}>
            <Text>Don’t have an account? </Text>
            <Text style={styles.link}>Sign Up coming soon</Text>
          </View>
        </View>
        <View style={{alignContent: 'center', flex: 0.2}}></View>
      </View>
    </Background>
  );
};

export const styles = StyleSheet.create<ISignInStyles>({
  changeLanguageContent: {
    flexDirection: 'row',
    position: 'absolute',
    top: 20,
    right: 0,
  },
  languageItem: {
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: 'gray',
  },
});
