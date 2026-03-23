import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DemoUseContext from './src/screens/demo/demo-usecontext';
import {AuthProvider} from './src/contexts/auth-context';
import MainNavigator from './src/screens/navigator/main-navigator';
import {Provider} from 'react-redux';
import store from './src/stores/store';
import type {RootStackParamList} from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainNavigator}
          options={{ title: 'ReactNativeStater' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;