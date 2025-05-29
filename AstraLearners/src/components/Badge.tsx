import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Text } from './Text';
import { theme } from '../theme/theme';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'medium',
  style,
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return theme.colors.status.success;
      case 'warning':
        return theme.colors.status.warning;
      case 'error':
        return theme.colors.status.error;
      default:
        return theme.colors.accent.aqua;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'warning':
        return theme.colors.text.primary;
      default:
        return theme.colors.text.primary;
    }
  };

  return (
    <View
      style={[
        styles.container,
        styles[size],
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`${size}Text`],
          { color: getTextColor() },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  small: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
  },
  medium: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  large: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  text: {
    fontWeight: '600',
  },
  smallText: {
    fontSize: theme.typography.fontSize.xs,
  },
  mediumText: {
    fontSize: theme.typography.fontSize.sm,
  },
  largeText: {
    fontSize: theme.typography.fontSize.md,
  },
}); 