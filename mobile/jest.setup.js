import 'react-native-gesture-handler/jestSetup';

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (
			key,
			options,
		) => {
			const mockEnTranslations = require('./src/assets/translation/en.json');

			if (typeof key !== 'string') {
				return '';
			}

			if (Object.prototype.hasOwnProperty.call(mockEnTranslations, key)) {
				return mockEnTranslations[key];
			}

			return typeof options?.defaultValue === 'string' ? options.defaultValue : key;
		},
		i18n: {
			language: 'en',
			changeLanguage: jest.fn(() => Promise.resolve()),
		},
	}),
	Trans: ({children}) => children,
	initReactI18next: {
		type: '3rdParty',
		init: () => {},
	},
}));

jest.mock('@react-native-vector-icons/fontawesome', () => ({
	FontAwesome: () => null,
}));

jest.mock('@react-navigation/native', () => ({
	NavigationContainer: ({children}) => children,
	useNavigation: () => {
		if (!global.__TEST_NAVIGATION__) {
			global.__TEST_NAVIGATION__ = {
				navigate: jest.fn(),
				goBack: jest.fn(),
				dispatch: jest.fn(),
				setOptions: jest.fn(),
			};
		}

		return global.__TEST_NAVIGATION__;
	},
	useRoute: () => ({params: {}}),
}));

// Global Realm-related mocks shared across tests.
jest.mock('realm', () => ({
	__esModule: true,
	default: {
		open: jest.fn(async () => ({
			isClosed: false,
			close: jest.fn(),
			write: jest.fn(callback => callback()),
			create: jest.fn(),
			objects: jest.fn(() => ({
				sorted: jest.fn(() => []),
			})),
			delete: jest.fn(),
		})),
		UpdateMode: {
			Modified: 'modified',
		},
	},
}));

jest.mock('./src/services/storage/realm/realm-client', () => ({
	initializeRealm: jest.fn(),
	getRealm: jest.fn(),
	closeRealm: jest.fn(),
}));

jest.mock('./src/services/storage/realm/product-history-service', () => ({
	recordProductHistory: jest.fn(),
	getProductHistory: jest.fn(async () => []),
	clearProductHistory: jest.fn(),
}));
