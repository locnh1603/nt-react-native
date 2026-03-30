import React, {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  type GestureResponderEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FontAwesome} from '@react-native-vector-icons/fontawesome';
import Background from '../../../shared/components/Background';
import {ErrorDisplay} from '../../../shared/components/ErrorDisplay';
import {Header} from '../../../shared/components/Header';
import {RadioGroup} from '../../../shared/components/RadioGroup';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  fetchProfile,
  selectProfileData,
  selectProfileLoading,
  selectProfileError,
} from '../profileSlice';
import {logoutUser, selectAuthUser} from '../../auth/authSlice';
import type {ProfileScreenProps} from '../../../types/navigation';
import {styles} from './ProfileScreen.styles';

type LanguageCode = 'en' | 'vi';

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const profileData = useAppSelector(selectProfileData);
  const loading = useAppSelector(selectProfileLoading);
  const error = useAppSelector(selectProfileError);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleRetry = useCallback(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleGearPress = useCallback((): void => {
    // TODO: open settings
  }, []);

  const handleEditDetailsPress = useCallback((event: GestureResponderEvent): void => {
    event.preventDefault();
  }, []);

  const handleOrderHistoryPress = useCallback((): void => {
    navigation.navigate('Orders');
  }, [navigation]);

  const handleLanguageChange = useCallback((language: string): void => {
    if (language === 'en' || language === 'vi') {
      void i18n.changeLanguage(language);
    }
  }, [i18n]);

  if (loading) {
    return (
      <Background>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#00DCE7" />
          <Text style={styles.loadingText}>{t('profile.loading')}</Text>
        </View>
      </Background>
    );
  }

  if (error && !profileData) {
    return (
      <Background>
        <View style={styles.centerContainer}>
          <ErrorDisplay
            title={t('profile.errorTitle')}
            message={error}
            onRetry={handleRetry}
          />
        </View>
      </Background>
    );
  }

  const firstName: string =
    profileData?.firstName || authUser?.firstName || authUser?.username || 'John';
  const lastName: string = profileData?.lastName || 'Doe';
  const initials: string = firstName.slice(0, 1).toUpperCase();
  const email: string = profileData?.email || 'john.doe@example.com';
  const age: number = profileData?.age || 28;
  const selectedLanguage: LanguageCode = i18n.language.startsWith('vi')
    ? 'vi'
    : 'en';

  const languageOptions = [
    {label: t('profile.languageEnglish'), value: 'en'},
    {label: t('profile.languageVietnamese'), value: 'vi'},
  ];

  return (
    <Background>
      <View style={styles.page}>
        <Header
          title={t('profile.title')}
          onBack={handleGoBack}
          rightIconName="cog"
          onRightPress={handleGearPress}
        />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.card, styles.topCard]}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>
              <View style={styles.avatarEditBadge}>
                <FontAwesome name="pencil" size={11} color="#0D1B2A" />
              </View>
            </View>

            <Text style={styles.name}>
              {firstName} {lastName}
            </Text>

            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>{t('profile.premiumMember')}</Text>
            </View>
          </View>

          <View style={[styles.card, styles.detailsCard]}>
            <View style={styles.detailsHeaderRow}>
              <Text style={styles.detailsTitle}>{t('profile.accountDetails')}</Text>
              <TouchableOpacity onPress={handleEditDetailsPress}>
                <Text style={styles.detailsAction}>{t('profile.editDetails')}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionLabel}>{t('profile.emailAddress')}</Text>
            <View style={styles.emailBox}>
              <Text style={styles.emailText}>{email}</Text>
            </View>

            <Text style={styles.sectionLabel}>{t('profile.firstName')}</Text>
            <Text style={styles.valueText}>{firstName}</Text>

            <Text style={styles.sectionLabel}>{t('profile.lastName')}</Text>
            <Text style={styles.valueText}>{lastName}</Text>

            <Text style={styles.sectionLabel}>{t('profile.age')}</Text>
            <Text style={styles.valueText}>{age}</Text>

            <View style={styles.languageSelector}>
              <Text style={styles.sectionLabel}>{t('profile.languageLabel')}</Text>
              <RadioGroup
                options={languageOptions}
                selectedValue={selectedLanguage}
                onChange={handleLanguageChange}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.card, styles.actionCard]}
            onPress={handleOrderHistoryPress}
            activeOpacity={0.8}>
            <View style={styles.actionLeft}>
              <View style={styles.actionIconWrap}>
                <FontAwesome name="history" size={15} color="#303A4A" />
              </View>
              <Text style={styles.actionText}>{t('profile.orderHistory')}</Text>
            </View>
            <FontAwesome name="angle-right" size={20} color="#B2BAC6" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, styles.logoutCard]} onPress={handleLogout}>
            <View style={styles.logoutIconWrap}>
              <FontAwesome name="sign-out" size={14} color="#F04438" />
            </View>
            <Text style={styles.logoutText}>{t('profile.logout')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Background>
  );
};

export {ProfileScreen};