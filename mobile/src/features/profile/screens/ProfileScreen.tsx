import React, {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FontAwesome} from '@react-native-vector-icons/fontawesome';
import Background from '../../../shared/components/Background';
import {ErrorDisplay} from '../../../shared/components/ErrorDisplay';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {
  fetchProfile,
  selectProfileData,
  selectProfileLoading,
  selectProfileError,
} from '../profileSlice';
import {logoutUser, selectAuthUser} from '../../auth/authSlice';
import type {ProfileScreenProps} from '../../../types/navigation';
import {styles} from './ProfileScreen.styles';

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation: _navigation}) => {
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

  if (loading) {
    return (
      <Background>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#00DCE7" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </Background>
    );
  }

  if (error && !profileData) {
    return (
      <Background>
        <View style={styles.centerContainer}>
          <ErrorDisplay
            title="Error Loading Profile"
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

  return (
    <Background>
      <View style={styles.page}>
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
              <Text style={styles.premiumBadgeText}>PREMIUM MEMBER</Text>
            </View>
          </View>

          <View style={[styles.card, styles.detailsCard]}>
            <View style={styles.detailsHeaderRow}>
              <Text style={styles.detailsTitle}>Account Details</Text>
              <TouchableOpacity>
                <Text style={styles.detailsAction}>Edit Details</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionLabel}>EMAIL ADDRESS</Text>
            <View style={styles.emailBox}>
              <Text style={styles.emailText}>{email}</Text>
            </View>

            <Text style={styles.sectionLabel}>FIRST NAME</Text>
            <Text style={styles.valueText}>{firstName}</Text>

            <Text style={styles.sectionLabel}>LAST NAME</Text>
            <Text style={styles.valueText}>{lastName}</Text>

            <Text style={styles.sectionLabel}>AGE</Text>
            <Text style={styles.valueText}>{age}</Text>
          </View>

          <TouchableOpacity style={[styles.card, styles.actionCard]}>
            <View style={styles.actionLeft}>
              <View style={styles.actionIconWrap}>
                <FontAwesome name="history" size={15} color="#303A4A" />
              </View>
              <Text style={styles.actionText}>Order History</Text>
            </View>
            <FontAwesome name="angle-right" size={20} color="#B2BAC6" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, styles.logoutCard]} onPress={handleLogout}>
            <View style={styles.logoutIconWrap}>
              <FontAwesome name="sign-out" size={14} color="#F04438" />
            </View>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Background>
  );
};

export {ProfileScreen};
