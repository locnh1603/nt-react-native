import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
	Main: undefined;
};

export type MainTabParamList = {
	Home: undefined;
	Demo: undefined;
	Account: undefined;
};

export type MainNavigatorProps = NativeStackScreenProps<
	RootStackParamList,
	'Main'
>;

export type HomeScreenProps = BottomTabScreenProps<MainTabParamList, 'Home'>;

export type DemoScreenProps = BottomTabScreenProps<MainTabParamList, 'Demo'>;

export type AccountScreenProps = BottomTabScreenProps<
	MainTabParamList,
	'Account'
>;
