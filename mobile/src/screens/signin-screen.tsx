import {FC, useCallback, useState} from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput as RNTextInput,
  View,
} from 'react-native';
import Background from '../components/Background';
import {ITextInput} from '../types/text-input';
import type {SignInScreenProps} from '../types/navigation';
import type {SignupRequest} from '../models/auth';
import {styles} from './styles/signin-screen-styles';
import {
  clearError,
  loginUser,
  selectAuthError,
  selectAuthLoading,
  signupUser,
} from '../slices/auth-slice';
import {useAppDispatch, useAppSelector} from '../stores/store';

export const SignInScreen: FC<SignInScreenProps> = () => {
  const dispatch = useAppDispatch();
  const authError = useAppSelector(selectAuthError);
  const authLoading = useAppSelector(selectAuthLoading);
  const passwordRequirementPattern: RegExp = /^(?=.*[A-Z])(?=.*\d).+$/;
  const [isBiometricEnabled, setIsBiometricEnabled] = useState<boolean>(false);
  const [activeMode, setActiveMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState<ITextInput>({
    value: 'example',
    error: '',
  });
  const [password, setPassword] = useState<ITextInput>({
    value: 'password',
    error: '',
  });
  const [signupUsername, setSignupUsername] = useState<ITextInput>({
    value: '',
    error: '',
  });
  const [firstName, setFirstName] = useState<ITextInput>({
    value: '',
    error: '',
  });
  const [lastName, setLastName] = useState<ITextInput>({
    value: '',
    error: '',
  });
  const [signupEmail, setSignupEmail] = useState<ITextInput>({
    value: '',
    error: '',
  });
  const [signupPassword, setSignupPassword] = useState<ITextInput>({
    value: '',
    error: '',
  });
  const [confirmPassword, setConfirmPassword] = useState<ITextInput>({
    value: '',
    error: '',
  });
  const [age, setAge] = useState<ITextInput>({
    value: '',
    error: '',
  });

  const handlePressSignIn = useCallback(async () => {
    dispatch(clearError());
    await dispatch(
      loginUser({
        username: username.value,
        password: password.value,
      }),
    );
  }, [dispatch, password.value, username.value]);

  const handlePressSignUp = useCallback(async () => {
    dispatch(clearError());

    const nextSignupPasswordError: string = passwordRequirementPattern.test(
      signupPassword.value,
    )
      ? ''
      : 'Password must include at least 1 capital letter and 1 number.';
    const nextConfirmPasswordError: string =
      signupPassword.value === confirmPassword.value
        ? ''
        : 'Confirm password must match password.';
    const parsedAge: number = Number(age.value);
    const nextAgeError: string =
      Number.isInteger(parsedAge) && parsedAge > 0
        ? ''
        : 'Age must be a valid positive number.';

    setSignupPassword(currentValue => ({
      ...currentValue,
      error: nextSignupPasswordError,
    }));
    setAge(currentValue => ({
      ...currentValue,
      error: nextAgeError,
    }));
    setConfirmPassword(currentValue => ({
      ...currentValue,
      error: nextConfirmPasswordError,
    }));

    if (nextSignupPasswordError || nextConfirmPasswordError || nextAgeError) {
      return;
    }

    const signupPayload: SignupRequest = {
      username: signupUsername.value,
      email: signupEmail.value,
      password: signupPassword.value,
      age: parsedAge,
      firstName: firstName.value,
      lastName: lastName.value,
      role: 'user',
    };

    console.log('Dispatching signup with payload:', signupPayload);

    await dispatch(signupUser(signupPayload));
  }, [
    age.value,
    confirmPassword.value,
    dispatch,
    firstName.value,
    lastName.value,
    passwordRequirementPattern,
    signupEmail.value,
    signupPassword.value,
    signupUsername.value,
  ]);

  const handleSelectLogin = useCallback(() => {
    dispatch(clearError());
    setActiveMode('login');
  }, [dispatch]);

  const handleSelectSignUp = useCallback(() => {
    dispatch(clearError());
    setActiveMode('signup');
  }, [dispatch]);

  const handleToggleBiometric = useCallback(() => {
    setIsBiometricEnabled(prev => !prev);
  }, []);

  const usernameHasError: boolean = username.error.length > 0;
  const passwordHasError: boolean = password.error.length > 0;
  const signupUsernameHasError: boolean = signupUsername.error.length > 0;
  const firstNameHasError: boolean = firstName.error.length > 0;
  const lastNameHasError: boolean = lastName.error.length > 0;
  const signupEmailHasError: boolean = signupEmail.error.length > 0;
  const signupPasswordHasError: boolean = signupPassword.error.length > 0;
  const confirmPasswordHasError: boolean = confirmPassword.error.length > 0;
  const ageHasError: boolean = age.error.length > 0;
  const isLoginMode: boolean = activeMode === 'login';

  return (
    <Background>
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.pageContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.shell}>
          <View style={styles.sectionStack}>
            <View style={styles.headerPanel}>
              <View style={styles.lockBadge}>
                <Text style={styles.lockGlyph}>LOCK</Text>
              </View>
              <Text style={styles.welcome}>
                {isLoginMode ? 'Welcome Back' : 'Create Account'}
              </Text>
              <Text style={styles.details}>
                {isLoginMode
                  ? 'Please enter your details'
                  : 'Fill in your details to get started'}
              </Text>
            </View>

            <View style={styles.tabGroup}>
              <TouchableOpacity
                style={[
                  styles.tabItem,
                  isLoginMode ? styles.tabItemActive : null,
                ]}
                onPress={handleSelectLogin}>
                <Text
                  style={[
                    styles.tabText,
                    isLoginMode ? styles.tabTextActive : null,
                  ]}>
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabItem,
                  !isLoginMode ? styles.tabItemActive : null,
                ]}
                onPress={handleSelectSignUp}>
                <Text
                  style={[
                    styles.tabText,
                    !isLoginMode ? styles.tabTextActive : null,
                  ]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formPanel}>
              <View style={styles.formInputs}>
                {isLoginMode ? (
                  <>
                    <View style={styles.fieldBlock}>
                      <Text style={styles.fieldLabel}>Username</Text>
                      <RNTextInput
                        style={styles.fieldInput}
                        placeholder="johndoe123"
                        placeholderTextColor="#9CA3AF"
                        returnKeyType="next"
                        value={username.value}
                        onChangeText={(text: string) =>
                          setUsername({value: text, error: ''})
                        }
                        autoCapitalize="none"
                        textContentType="username"
                      />
                      {usernameHasError ? (
                        <Text style={styles.inputError}>{username.error}</Text>
                      ) : null}
                    </View>

                    <View style={styles.fieldBlock}>
                      <Text style={styles.fieldLabel}>Password</Text>
                      <RNTextInput
                        style={styles.fieldInput}
                        placeholder="........"
                        placeholderTextColor="#9CA3AF"
                        returnKeyType="done"
                        value={password.value}
                        onChangeText={(text: string) =>
                          setPassword({value: text, error: ''})
                        }
                        secureTextEntry
                      />
                      {passwordHasError ? (
                        <Text style={styles.inputError}>{password.error}</Text>
                      ) : null}
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.fieldBlock}>
                      <Text style={styles.fieldLabel}>Username</Text>
                      <RNTextInput
                        style={styles.fieldInput}
                        placeholder="johndoe"
                        placeholderTextColor="#9CA3AF"
                        returnKeyType="next"
                        value={signupUsername.value}
                        onChangeText={(text: string) =>
                          setSignupUsername({value: text, error: ''})
                        }
                        autoCapitalize="none"
                        textContentType="username"
                      />
                      {signupUsernameHasError ? (
                        <Text style={styles.inputError}>{signupUsername.error}</Text>
                      ) : null}
                    </View>

                    <View style={styles.fieldBlock}>
                      <Text style={styles.fieldLabel}>First Name</Text>
                      <RNTextInput
                        style={styles.fieldInput}
                        placeholder="John"
                        placeholderTextColor="#9CA3AF"
                        returnKeyType="next"
                        value={firstName.value}
                        onChangeText={(text: string) =>
                          setFirstName({value: text, error: ''})
                        }
                        textContentType="givenName"
                      />
                      {firstNameHasError ? (
                        <Text style={styles.inputError}>{firstName.error}</Text>
                      ) : null}
                    </View>

                    <View style={styles.fieldBlock}>
                      <Text style={styles.fieldLabel}>Last Name</Text>
                      <RNTextInput
                        style={styles.fieldInput}
                        placeholder="Doe"
                        placeholderTextColor="#9CA3AF"
                        returnKeyType="next"
                        value={lastName.value}
                        onChangeText={(text: string) =>
                          setLastName({value: text, error: ''})
                        }
                        textContentType="familyName"
                      />
                      {lastNameHasError ? (
                        <Text style={styles.inputError}>{lastName.error}</Text>
                      ) : null}
                    </View>

                    <View style={styles.fieldBlock}>
                      <Text style={styles.fieldLabel}>Email</Text>
                      <RNTextInput
                        style={styles.fieldInput}
                        placeholder="john.doe@example.com"
                        placeholderTextColor="#9CA3AF"
                        returnKeyType="next"
                        value={signupEmail.value}
                        onChangeText={(text: string) =>
                          setSignupEmail({value: text, error: ''})
                        }
                        autoCapitalize="none"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                      />
                      {signupEmailHasError ? (
                        <Text style={styles.inputError}>{signupEmail.error}</Text>
                      ) : null}
                    </View>

                    <View style={styles.fieldBlock}>
                      <Text style={styles.fieldLabel}>Age</Text>
                      <RNTextInput
                        style={styles.fieldInput}
                        placeholder="30"
                        placeholderTextColor="#9CA3AF"
                        returnKeyType="next"
                        value={age.value}
                        onChangeText={(text: string) =>
                          setAge({value: text, error: ''})
                        }
                        keyboardType="number-pad"
                      />
                      {ageHasError ? (
                        <Text style={styles.inputError}>{age.error}</Text>
                      ) : null}
                    </View>

                    <View style={styles.fieldBlock}>
                      <Text style={styles.fieldLabel}>Password</Text>
                      <RNTextInput
                        style={styles.fieldInput}
                        placeholder="Create password"
                        placeholderTextColor="#9CA3AF"
                        returnKeyType="next"
                        value={signupPassword.value}
                        onChangeText={(text: string) =>
                          setSignupPassword({value: text, error: ''})
                        }
                        secureTextEntry
                      />
                      <Text style={styles.inputHint}>
                        Must include at least 1 capital letter and 1 number.
                      </Text>
                      {signupPasswordHasError ? (
                        <Text style={styles.inputError}>{signupPassword.error}</Text>
                      ) : null}
                    </View>

                    <View style={styles.fieldBlock}>
                      <Text style={styles.fieldLabel}>Confirm Password</Text>
                      <RNTextInput
                        style={styles.fieldInput}
                        placeholder="Confirm password"
                        placeholderTextColor="#9CA3AF"
                        returnKeyType="done"
                        value={confirmPassword.value}
                        onChangeText={(text: string) =>
                          setConfirmPassword({value: text, error: ''})
                        }
                        secureTextEntry
                      />
                      {confirmPasswordHasError ? (
                        <Text style={styles.inputError}>{confirmPassword.error}</Text>
                      ) : null}
                    </View>
                  </>
                )}
              </View>

              {isLoginMode ? (
                <>
                  <TouchableOpacity>
                    <Text style={styles.forgotLink}>Forgot Password?</Text>
                  </TouchableOpacity>

                  <Pressable
                    style={styles.biometricRow}
                    onPress={handleToggleBiometric}>
                    <View
                      style={[
                        styles.checkBox,
                        isBiometricEnabled ? styles.checkBoxChecked : null,
                      ]}>
                      {isBiometricEnabled ? (
                        <Text style={styles.checkBoxTick}>✓</Text>
                      ) : null}
                    </View>
                    <Text style={styles.biometricLabel}>
                      Use biometrics for faster login
                    </Text>
                  </Pressable>
                </>
              ) : null}

              <TouchableOpacity
                style={styles.primaryButton}
                disabled={authLoading}
                onPress={isLoginMode ? handlePressSignIn : handlePressSignUp}>
                <Text style={styles.primaryButtonText}>
                  {authLoading
                    ? isLoginMode
                      ? 'Signing In...'
                      : 'Creating Account...'
                    : isLoginMode
                      ? 'Sign In'
                      : 'Create Account'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>
                  {isLoginMode ? 'Sign in with Biometrics' : 'Sign up with Biometrics'}
                </Text>
              </TouchableOpacity>

              {authError ? (
                <Text style={styles.authFeedback}>{authError}</Text>
              ) : null}
            </View>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.oauthSection}>
              <View style={styles.socialRow}>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialText}>Facebook</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.legalSection}>
              <Text style={styles.legalText}>
                By continuing, you agree to our{' '}
                <Text style={styles.legalLink}>Terms of Service</Text> and{' '}
                <Text style={styles.legalLink}>Privacy Policy</Text>.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};
