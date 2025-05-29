import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { HomeNavigator } from './HomeNavigator';
import { GalaxyMapNavigator } from './GalaxyMapNavigator';
import { MissionsNavigator } from './MissionsNavigator';
import { ProfileNavigator } from './ProfileNavigator';
import { theme } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background.secondary,
          borderTopColor: theme.colors.background.tertiary,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: theme.colors.accent.aqua,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarLabelStyle: {
          fontFamily: theme.typography.fontFamily.primary,
          fontSize: theme.typography.fontSize.xs,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="GalaxyMap"
        component={GalaxyMapNavigator}
        options={{
          tabBarLabel: 'Galaxy Map',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Missions"
        component={MissionsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="rocket" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}; 