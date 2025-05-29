import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from './types';
import { ProfileOverviewScreen } from '../screens/profile/ProfileOverviewScreen';
import { AchievementsScreen } from '../screens/profile/AchievementsScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';
import { LearnerShipBayScreen } from '../screens/profile/LearnerShipBayScreen';
import { theme } from '../theme/theme';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background.secondary,
        },
        headerTintColor: theme.colors.text.primary,
        headerTitleStyle: {
          fontFamily: theme.typography.fontFamily.bold,
          fontSize: theme.typography.fontSize.lg,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="ProfileOverview"
        component={ProfileOverviewScreen}
        options={{
          title: 'AstraLearner Profile',
        }}
      />
      <Stack.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          title: 'Knowledge Crystals',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'LearnerShip Settings',
        }}
      />
      <Stack.Screen
        name="LearnerShipBay"
        component={LearnerShipBayScreen}
        options={{
          title: 'LearnerShip Bay',
        }}
      />
    </Stack.Navigator>
  );
}; 