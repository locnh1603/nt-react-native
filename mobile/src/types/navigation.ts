import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
	Main: undefined;
	ProductDetail: {productId: number};
  ProductHistory: undefined;
  SignIn: undefined;
};

export type MainTabParamList = {
	Home: undefined;
	Orders: undefined;
	Profile: undefined;
};

export type MainNavigatorProps = NativeStackScreenProps<
	RootStackParamList,
	'Main'
>;

export type HomeScreenProps = BottomTabScreenProps<MainTabParamList, 'Home'>;

export type OrdersScreenProps = BottomTabScreenProps<MainTabParamList, 'Orders'>;

export type ProfileScreenProps = BottomTabScreenProps<
	MainTabParamList,
	'Profile'
>;

export type SignInScreenProps = NativeStackScreenProps<
	RootStackParamList,
	'SignIn'
>;

export type ProductDetailScreenProps = NativeStackScreenProps<
	RootStackParamList,
	'ProductDetail'
>;

export type ProductHistoryScreenProps = NativeStackScreenProps<
	RootStackParamList,
	'ProductHistory'
>;
