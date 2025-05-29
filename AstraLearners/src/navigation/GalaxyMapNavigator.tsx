import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GalaxyMapStackParamList } from './types';
import { GalaxyOverviewScreen } from '../screens/galaxy/GalaxyOverviewScreen';
import { SubjectDetailsScreen } from '../screens/galaxy/SubjectDetailsScreen';
import { TopicDetailsScreen } from '../screens/galaxy/TopicDetailsScreen';
import { theme } from '../theme/theme';

const Stack = createNativeStackNavigator<GalaxyMapStackParamList>();

export const GalaxyMapNavigator: React.FC = () => {
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
        name="GalaxyOverview"
        component={GalaxyOverviewScreen}
        options={{
          title: 'CogniVerse Map',
        }}
      />
      <Stack.Screen
        name="SubjectDetails"
        component={SubjectDetailsScreen}
        options={({ route }) => ({
          title: route.params.subjectName,
        })}
      />
      <Stack.Screen
        name="TopicDetails"
        component={TopicDetailsScreen}
        options={({ route }) => ({
          title: route.params.topicName,
        })}
      />
    </Stack.Navigator>
  );
}; 