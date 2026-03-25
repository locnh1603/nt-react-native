import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Background from '../components/Background';
import { useAppDispatch, useAppSelector } from '../stores/store';
import {
  fetchProfile,
  selectProfileData,
  selectProfileLoading,
  selectProfileError,
} from '../slices/profile-slice';
import {logoutUser, selectAuthUser} from '../slices/auth-slice';
import type { ProfileScreenProps } from '../types/navigation';
import {styles} from './styles/profile-screen-styles.tsx';

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation: _navigation }) => {
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

  // Show loading state
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

  // Show error state
  if (error && !profileData) {
    return (
      <Background>
        <View style={styles.centerContainer}>
          <Text style={styles.errorTitle}>Error Loading Profile</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </Background>
    );
  }

  // Use profile data from Redux or fallback to auth context
  const firstName: string = profileData?.firstName || authUser?.firstName || authUser?.username || 'John';
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
                <Text style={styles.avatarEditText}>-</Text>
              </View>
            </View>

            <Text style={styles.name}>{firstName} {lastName}</Text>

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
                <Text style={styles.actionIcon}>Icon</Text>
              </View>
              <Text style={styles.actionText}>Order History</Text>
            </View>
            <Text style={styles.actionChevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, styles.logoutCard]} onPress={handleLogout}>
            <View style={styles.logoutIconWrap}>
              <Text style={styles.actionIcon}>Icon</Text>
            </View>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Background>
  );
};

export {ProfileScreen};
