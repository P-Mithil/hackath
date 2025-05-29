import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Animated,
} from 'react-native';
import { theme } from '../theme/theme';

interface ProgressBarProps {
  progress: number; // 0 to 1
  variant?: 'default' | 'gradient';
  height?: number;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = 'default',
  height = 8,
  style,
}) => {
  const [width] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(width, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const getBackgroundColor = () => {
    switch (variant) {
      case 'gradient':
        return theme.colors.accent.aqua;
      default:
        return theme.colors.accent.magenta;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { height },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.progress,
          {
            width: width.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
            backgroundColor: getBackgroundColor(),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: theme.borderRadius.full,
  },
}); 