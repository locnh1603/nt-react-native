import React, {FC} from 'react';
import {Text, View} from 'react-native';
import Background from '../components/Background';
import type {OrdersScreenProps} from '../types/navigation';
import {styles} from './styles/orders-screen-styles.tsx';

export const OrdersScreen: FC<OrdersScreenProps> = () => {
	return (
		<Background>
			<View style={styles.page}>
				<View style={styles.card}>
					<Text style={styles.title}>Orders</Text>
					<Text style={styles.description}>
						This is a basic Orders screen template.
					</Text>
				</View>
			</View>
		</Background>
	);
};
