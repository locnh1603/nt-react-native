import React, {FC, useEffect} from 'react';
import {Text, View} from 'react-native';
import Background from '../components/Background';
import type {OrdersScreenProps} from '../types/navigation';
import {styles} from './styles/orders-screen-styles.tsx';
import { useAppDispatch } from '../stores/store.ts';

export const OrdersScreen: FC<OrdersScreenProps> = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
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
