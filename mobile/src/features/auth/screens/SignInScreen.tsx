import {FC, useCallback, useState} from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput as RNTextInput,
  View,
} from 'react-native';
import {FontAwesome} from '@react-native-vector-icons/fontawesome';
import Background from '../../../shared/components/Background';
import {ITextInput} from '../../../types/text-input';
import type {SignInScreenProps} from '../../../types/navigation';
import type {SignupRequest} from '../../../models/auth';
import {styles} from './SignInScreen.styles';
import {
  clearError,
  loginUser,
  selectAuthError,
  selectAuthLoading,
  signupUser,
} from '../authSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {useTranslation} from 'react-i18next';

export const SignInScreen: FC<SignInScreenProps> = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
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
                <FontAwesome name="shopping-bag" size={24} color="#1ED9DE" />
              </View>
              <Text style={styles.welcome}>
                {isLoginMode
                  ? t('signin.welcomeBack')
                  : t('signin.createAccountTitle')}
              </Text>
              <Text style={styles.details}>
                {isLoginMode
                  ? t('signin.enterDetails')
                  : t('signin.fillDetails')}
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
                  {t('signin.loginTab')}
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
                  {t('signin.signUpTab')}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formPanel}>
              <View style={styles.formInputs}>
                {isLoginMode ? (
                  <>
                    <View style={styles.fieldBlock}>
                      <Text style={styles.fieldLabel}>{t('signin.usernameLabel')}</Text>
                      <RNTextInput
                        style={styles.fieldInput}
                        placeholder={t('signin.usernamePlaceholder')}
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
                      <Text style={styles.fieldLabel}>{t('signin.passwordLabel')}</Text>
                      <RNTextInput
                        style={styles.fieldInput}
                        placeholder={t('signin.passwordPlaceholder')}
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

                    <TouchableOpacity>
                      <Text style={styles.forgotLink}>{t('signin.forgotPassword')}</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <View style={styles.fieldBlock}>
                      <Text style={styles.fieldLabel}>{t('signin.usernameLabel')}</Text>
                      <RNTextInput
                        style={styles.fieldInput}
                        placeholder={t('signin.signUpUsernamePlaceholder')}
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
                        <Text style={styles.inputError}>
                          {signupUsername.error}
                        </Text>
                      ) : null}
                    </View>

                    <View style={styles.fieldBlock}>
                      <Text style={styles.fieldLabel}>{t('signin.firstNameLabel')}</Text>
                      <RNTextInput
                        style={styles.fieldInput}
                        placeholder={t('signin.firstNamePlaceholder')}
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
                      <Text style={styles.fieldLabel}>{t('signin.lastNameLabel')}</Text>
                      <RNTextInput
                        style={styles.fieldInput}
                        placeholder={t('signin.lastNamePlaceholder')}
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
                      <Text style={styles.fieldLabel}>{t('signin.emailLabel')}</Text>
                      <RNTextInput
                        style={styles.fieldInput}
                        placeholder={t('signin.emailPlaceholder')}
                        placeholderTextColor="#9CA3AF"
                        keyboardType="email-address"
                        returnKeyType="next"
                        value={signupEmail.value}
                        onChangeText={(text: string) =>
                          setSignupEmail({value: text, error: ''})
                        }
                        autoCapitalize="none"
                        textContentType="emailAddress"
                      />
                      {signupEmailHasError ? (
                        <Text style={styles.inputError}>
                          {signupEmail.error}
                        </Text>
                      ) : null}
                    </View>

                    <View style={styles.fieldBlock}>
                      <Text style={styles.fieldLabel}>{t('signin.passwordLabel')}</Text>
                      <RNTextInput
                        style={styles.fieldInput}
                        placeholder={t('signin.signUpPasswordPlaceholder')}
                        placeholderTextColor="#9CA3AF"
                        returnKeyType="next"
                        value={signupPassword.value}
                        onChangeText={(text: string) =>
                          setSignupPassword({value: text, error: ''})
                        }
                        secureTextEntry
                      />
                      {signupPasswordHasError ? (
                        <Text style={styles.inputError}>
                          {signupPassword.error}
                        </Text>
                      ) : null}
                    </View>

                    <View style={styles.fieldBlock}>
                      <Text style={styles.fieldLabel}>{t('signin.confirmPasswordLabel')}</Text>
                      <RNTextInput
                        style={styles.fieldInput}
                        placeholder={t('signin.signUpPasswordPlaceholder')}
                        placeholderTextColor="#9CA3AF"
                        returnKeyType="next"
                        value={confirmPassword.value}
                        onChangeText={(text: string) =>
                          setConfirmPassword({value: text, error: ''})
                        }
                        secureTextEntry
                      />
                      {confirmPasswordHasError ? (
                        <Text style={styles.inputError}>
                          {confirmPassword.error}
                        </Text>
                      ) : null}
                    </View>

                    <View style={styles.fieldBlock}>
                      <Text style={styles.fieldLabel}>{t('signin.ageLabel')}</Text>
                      <RNTextInput
                        style={styles.fieldInput}
                        placeholder={t('signin.agePlaceholder')}
                        placeholderTextColor="#9CA3AF"
                        keyboardType="numeric"
                        returnKeyType="done"
                        value={age.value}
                        onChangeText={(text: string) =>
                          setAge({value: text, error: ''})
                        }
                      />
                      {ageHasError ? (
                        <Text style={styles.inputError}>{age.error}</Text>
                      ) : null}
                    </View>
                  </>
                )}
              </View>

              <View style={styles.biometricRow}>
                <Pressable
                  style={[
                    styles.checkBox,
                    isBiometricEnabled ? styles.checkBoxChecked : null,
                  ]}
                  onPress={handleToggleBiometric}>
                  {isBiometricEnabled ? (
                    <Text style={styles.checkBoxTick}>✓</Text>
                  ) : null}
                </Pressable>
                <Text style={styles.biometricLabel}>
                  {isLoginMode
                    ? t('signin.useBiometrics')
                    : t('signin.enableBiometrics')}
                </Text>
              </View>

              {authError ? (
                <Text style={styles.authFeedback}>{authError}</Text>
              ) : null}

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={isLoginMode ? handlePressSignIn : handlePressSignUp}
                disabled={authLoading}>
                <Text style={styles.primaryButtonText}>
                  {authLoading
                    ? isLoginMode
                      ? t('signin.signingIn')
                      : t('signin.signingUp')
                    : isLoginMode
                    ? t('signin.signInAction')
                    : t('signin.signUpAction')}
                </Text>
              </TouchableOpacity>

              {isLoginMode ? (
                <>
                  <TouchableOpacity style={styles.secondaryButton}>
                    <View style={styles.secondaryButtonContent}>
                      <FontAwesome
                        name="lock"
                        size={16}
                        color="#08D9E2"
                      />
                      <Text style={styles.secondaryButtonText}>
                        {t('signin.signInWithBiometrics')}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.oauthSection}>
                    <View style={styles.dividerRow}>
                      <View style={styles.dividerLine} />
                      <Text style={styles.dividerText}>{t('signin.orContinueWith')}</Text>
                      <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.socialRow}>
                      <TouchableOpacity style={styles.socialButton}>
                        <View style={styles.socialButtonContent}>
                          <FontAwesome
                            name="google"
                            size={18}
                            color="#EA4335"
                          />
                          <Text style={styles.socialText}>{t('signin.google')}</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.socialButton}>
                        <View style={styles.socialButtonContent}>
                          <FontAwesome
                            name="facebook"
                            size={18}
                            color="#1877F2"
                          />
                          <Text style={styles.socialText}>{t('signin.facebook')}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.legalSection}>
                    <Text style={styles.legalText}>
                      {t('signin.legalPrefix')}{' '}
                      <Text style={styles.legalLink}>{t('signin.termsOfService')}</Text>{' '}
                      {t('signin.legalAnd')}{' '}
                      <Text style={styles.legalLink}>{t('signin.privacyPolicy')}</Text>.
                    </Text>
                  </View>
                </>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};
