import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from './types';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import { AvatarCustomizationScreen } from '../screens/onboarding/AvatarCustomizationScreen';
import { LearnerShipSelectionScreen } from '../screens/onboarding/LearnerShipSelectionScreen';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="AvatarCustomization" component={AvatarCustomizationScreen} />
      <Stack.Screen name="LearnerShipSelection" component={LearnerShipSelectionScreen} />
    </Stack.Navigator>
  );
}; 