import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../theme/theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  onPress?: () => void;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  onPress,
  style,
}) => {
  const getCardStyles = () => {
    const baseStyle: ViewStyle = {
      ...styles.card,
    };

    switch (variant) {
      case 'elevated':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.background.tertiary,
          ...theme.shadows.large,
        };
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.colors.accent.aqua,
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: theme.colors.background.secondary,
          ...theme.shadows.medium,
        };
    }
  };

  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer
      onPress={onPress}
      style={[getCardStyles(), style]}
    >
      {children}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    margin: theme.spacing.sm,
  },
}); 