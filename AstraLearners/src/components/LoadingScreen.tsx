import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { Text } from './Text';
import { theme } from '../theme/theme';

const { width, height } = Dimensions.get('window');

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoadingComplete,
}) => {
  const spinValue = new Animated.Value(0);
  const scaleValue = new Animated.Value(0.8);
  const opacityValue = new Animated.Value(0);

  useEffect(() => {
    // Start the loading animation
    Animated.parallel([
      // Spinning animation
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ),
      // Scale animation
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 0.8,
          duration: 1000,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      // Fade in animation
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Simulate loading time and call onLoadingComplete
    const timer = setTimeout(() => {
      onLoadingComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [
              { rotate: spin },
              { scale: scaleValue },
            ],
            opacity: opacityValue,
          },
        ]}
      >
        <View style={styles.logo}>
          <View style={styles.planet} />
          <View style={styles.orbit} />
          <View style={styles.satellite} />
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: opacityValue,
            transform: [{ scale: scaleValue }],
          },
        ]}
      >
        <Text variant="h1" style={styles.title}>
          AstraLearners
        </Text>
        <Text variant="body" style={styles.subtitle}>
          Your cosmic journey to knowledge begins!
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    position: 'relative',
  },
  planet: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.accent.aqua,
    position: 'absolute',
    top: 20,
    left: 20,
    ...theme.shadows.large,
  },
  orbit: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: theme.colors.accent.magenta,
    position: 'absolute',
  },
  satellite: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.accent.yellow,
    position: 'absolute',
    top: 0,
    left: 50,
    ...theme.shadows.medium,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  title: {
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
}); 