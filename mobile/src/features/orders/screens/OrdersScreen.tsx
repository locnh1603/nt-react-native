import React, {FC, useEffect} from 'react';
import {Text, View} from 'react-native';
import Background from '../../../shared/components/Background';
import type {OrdersScreenProps} from '../../../types/navigation';
import {styles} from './OrdersScreen.styles';
import {useAppDispatch} from '../../../app/hooks';

export const OrdersScreen: FC<OrdersScreenProps> = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Reserved for future orders bootstrapping side effects.
  }, [dispatch]);

  return (
    <Background>
      <View style={styles.page}>
        <View style={styles.card}>
          <Text style={styles.title}>Orders</Text>
        </View>
      </View>
    </Background>
  );
};
