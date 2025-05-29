import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { theme } from '../theme/theme';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getButtonStyles = () => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...styles[size],
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.accent.aqua,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.accent.magenta,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: theme.colors.accent.aqua,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyles = () => {
    const baseStyle: TextStyle = {
      ...styles.text,
      ...styles[`${size}Text`],
    };

    if (variant === 'outline') {
      return {
        ...baseStyle,
        color: theme.colors.accent.aqua,
      };
    }

    return {
      ...baseStyle,
      color: theme.colors.text.primary,
    };
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        getButtonStyles(),
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? theme.colors.accent.aqua : theme.colors.text.primary}
          size="small"
        />
      ) : (
        <Text style={[getTextStyles(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium,
  },
  small: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
  },
  medium: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  },
  large: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },
  text: {
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: '600',
  },
  smallText: {
    fontSize: theme.typography.fontSize.sm,
  },
  mediumText: {
    fontSize: theme.typography.fontSize.md,
  },
  largeText: {
    fontSize: theme.typography.fontSize.lg,
  },
  disabled: {
    opacity: 0.5,
  },
}); 