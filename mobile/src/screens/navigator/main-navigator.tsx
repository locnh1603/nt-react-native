// src/navigation/MainNavigator.tsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../home-screen';
import {ProfileScreen} from '../profile-screen';
import {DemoScreen} from '../demo-screen';
import {Image, StyleSheet} from 'react-native';
import {useAuth} from '../../contexts/auth-context';
import {SignInScreen} from '../signin-screen';
import type {MainNavigatorProps, MainTabParamList} from '../../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator: React.FC<MainNavigatorProps> = () => {
  const {user} = useAuth();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../assets/images/home.png')}
              style={styles.icon}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Demo"
        component={DemoScreen}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../assets/images/list.png')}
              style={styles.icon}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={user ? ProfileScreen : SignInScreen}
        options={{
          tabBarLabel: user ? 'Profile' : 'Sign In',
          tabBarIcon: () => (
            <Image
              source={require('../../assets/images/person.png')}
              style={styles.icon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default MainNavigator;
