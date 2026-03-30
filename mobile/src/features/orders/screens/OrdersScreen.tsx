import React, {FC, useCallback, useEffect} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import Background from '../../../shared/components/Background';
import Header from '../../../shared/components/Header';
import ErrorDisplay from '../../../shared/components/ErrorDisplay';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {
  clearError,
  fetchOrders,
  selectActiveTab,
  selectFilteredOrders,
  selectOrdersError,
  selectOrdersLoading,
  setActiveTab,
} from '../ordersSlice';
import {OrderCard} from '../components/OrderCard';
import {OrderTabBar} from '../components/OrderTabBar';
import type {OrdersScreenProps} from '../../../types/navigation';
import {Order} from '../../../models/order';
import {styles} from './OrdersScreen.styles';

export const OrdersScreen: FC<OrdersScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const loading = useAppSelector(selectOrdersLoading);
  const error = useAppSelector(selectOrdersError);
  const activeTab = useAppSelector(selectActiveTab);
  const filteredOrders = useAppSelector(selectFilteredOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleTabChange = useCallback(
    (tab: 'all' | 'ongoing' | 'completed' | 'cancelled') => {
      dispatch(setActiveTab(tab));
    },
    [dispatch],
  );

  const handleRetry = useCallback(() => {
    dispatch(clearError());
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleReorder = useCallback(
    (order: Order) => {
      navigation.navigate('Home');
    },
    [navigation],
  );

  const handleViewDetails = useCallback(
    (order: Order) => {
      navigation.navigate('Home');
    },
    [navigation],
  );

  const handleSearch = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <Background>
      <View style={styles.container}>
        <Header
          title={t('orders.title')}
          onBack={navigation.goBack}
          rightIconName="search"
          onRightPress={handleSearch}
        />
        <OrderTabBar activeTab={activeTab} onTabChange={handleTabChange} />
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0DF2F2" />
            <Text style={styles.loadingText}>{t('orders.loading')}</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <ErrorDisplay
              title={t('orders.errorTitle')}
              message={error}
              onRetry={handleRetry}
            />
          </View>
        ) : filteredOrders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t('orders.empty')}</Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {filteredOrders.map(order => (
              <View key={order.id} style={styles.cardGap}>
                <OrderCard
                  order={order}
                  onReorder={handleReorder}
                  onViewDetails={handleViewDetails}
                  onTrackOrder={handleReorder}
                  onLeaveReview={handleViewDetails}
                  onBuyAgain={handleReorder}
                />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </Background>
  );
};
