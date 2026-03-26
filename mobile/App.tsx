import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainNavigator from './src/navigation/MainNavigator';
import {Provider} from 'react-redux';
import store from './src/app/store';
import {useAppDispatch, useAppSelector} from './src/app/hooks';
import type {RootStackParamList} from './src/types/navigation';
import {FC, useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SignInScreen} from './src/features/auth';
import {ProductDetailScreen} from './src/features/products';
import {restoreUserSession, selectIsAuthenticated} from './src/features/auth';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </GestureHandlerRootView>
  );
};

const AppContent: FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [isSessionReady, setIsSessionReady] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const bootstrapSession = async (): Promise<void> => {
      await dispatch(restoreUserSession());
      if (isMounted) {
        setIsSessionReady(true);
      }
    };

    bootstrapSession();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (!isSessionReady) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#20D9DE" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated && (
          <>
            <Stack.Screen
              name="Main"
              component={MainNavigator}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
            />
          </>
        )}
        {!isAuthenticated && (
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
