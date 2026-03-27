import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ProfileScreen} from '../features/profile';
import {OrdersScreen} from '../features/orders';
import {HomeScreen} from '../features/products';
import type {MainNavigatorProps, MainTabParamList} from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator: React.FC<MainNavigatorProps> = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0DF2F2',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('mainTab.home'),
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/home.png')}
              style={focused ? styles.iconActive : styles.iconInactive}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarLabel: t('mainTab.orders'),
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/list.png')}
              style={focused ? styles.iconActive : styles.iconInactive}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: t('mainTab.profile'),
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/person.png')}
              style={focused ? styles.iconActive : styles.iconInactive}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconActive: {
    width: 24,
    height: 24,
    tintColor: '#0DF2F2',
  },
  iconInactive: {
    width: 24,
    height: 24,
    tintColor: '#8E8E93',
  },
});

export default MainNavigator;
