import React from 'react';
import {
  Text as RNText,
  StyleSheet,
  TextStyle,
  TextProps as RNTextProps,
} from 'react-native';
import { theme } from '../theme/theme';

interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  color?: keyof typeof theme.colors.text;
  style?: TextStyle;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  style,
  ...props
}) => {
  const getTextStyles = () => {
    const baseStyle: TextStyle = {
      color: theme.colors.text[color],
      fontFamily: theme.typography.fontFamily.primary,
    };

    switch (variant) {
      case 'h1':
        return {
          ...baseStyle,
          fontSize: theme.typography.fontSize['4xl'],
          fontFamily: theme.typography.fontFamily.bold,
        };
      case 'h2':
        return {
          ...baseStyle,
          fontSize: theme.typography.fontSize['3xl'],
          fontFamily: theme.typography.fontFamily.bold,
        };
      case 'h3':
        return {
          ...baseStyle,
          fontSize: theme.typography.fontSize['2xl'],
          fontFamily: theme.typography.fontFamily.bold,
        };
      case 'body':
        return {
          ...baseStyle,
          fontSize: theme.typography.fontSize.md,
        };
      case 'caption':
        return {
          ...baseStyle,
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.text.secondary,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <RNText
      style={[getTextStyles(), style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({}); 