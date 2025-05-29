import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MissionsStackParamList } from './types';
import { MissionsListScreen } from '../screens/missions/MissionsListScreen';
import { MissionDetailsScreen } from '../screens/missions/MissionDetailsScreen';
import { QuizScreen } from '../screens/missions/QuizScreen';
import { ResultsScreen } from '../screens/missions/ResultsScreen';
import { theme } from '../theme/theme';

const Stack = createNativeStackNavigator<MissionsStackParamList>();

export const MissionsNavigator: React.FC = () => {
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
        name="MissionsList"
        component={MissionsListScreen}
        options={{
          title: 'Active Missions',
        }}
      />
      <Stack.Screen
        name="MissionDetails"
        component={MissionDetailsScreen}
        options={({ route }) => ({
          title: route.params.missionName,
        })}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={({ route }) => ({
          title: route.params.quizName,
          headerBackVisible: false,
        })}
      />
      <Stack.Screen
        name="Results"
        component={ResultsScreen}
        options={{
          title: 'Mission Results',
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}; 