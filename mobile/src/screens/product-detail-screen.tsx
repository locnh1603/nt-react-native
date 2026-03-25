import React, {FC, useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Background from '../components/Background';
import type {ProductDetailScreenProps} from '../types/navigation';
import {styles} from './styles/product-detail-screen-styles.tsx';

export const ProductDetailScreen: FC<ProductDetailScreenProps> = ({
	navigation,
}) => {
	const handleGoBack = useCallback(() => {
		navigation.goBack();
	}, [navigation]);

	return (
		<Background>
			<View style={styles.page}>
				<View style={styles.card}>
					<Text style={styles.title}>Product Detail</Text>
					<Text style={styles.description}>
						This is a basic Product Detail screen template.
					</Text>

					<TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
						<Text style={styles.backButtonText}>Go Back</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Background>
	);
};
