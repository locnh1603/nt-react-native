import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DemoUseContext from './src/screens/demo/demo-usecontext';
import MainNavigator from './src/screens/navigator/main-navigator';
import {Provider} from 'react-redux';
import store, {useAppSelector} from './src/stores/store';
import type {RootStackParamList} from './src/types/navigation';
import {FC} from 'react';
import {SignInScreen} from './src/screens/signin-screen';
import {ProductDetailScreen} from './src/screens/product-detail-screen';
import {selectIsAuthenticated} from './src/slices/auth-slice';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

const AppContent: FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated && (
          <>
            <Stack.Screen
              name="Main"
              component={MainNavigator}
              options={{title: 'ReactNativeStater'}}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
              options={{title: 'Product Detail'}}
            />
          </>
        )}
        {!isAuthenticated && (
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{title: 'ReactNativeStater'}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
