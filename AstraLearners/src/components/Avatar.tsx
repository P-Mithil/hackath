import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { theme } from '../theme/theme';

interface AvatarProps {
  source?: ImageSourcePropType;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'outlined' | 'glowing';
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 'medium',
  variant = 'default',
  style,
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 40;
      case 'large':
        return 80;
      default:
        return 60;
    }
  };

  const getBorderStyle = () => {
    switch (variant) {
      case 'outlined':
        return {
          borderWidth: 2,
          borderColor: theme.colors.accent.aqua,
        };
      case 'glowing':
        return {
          borderWidth: 2,
          borderColor: theme.colors.accent.aqua,
          shadowColor: theme.colors.accent.aqua,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.5,
          shadowRadius: 10,
          elevation: 5,
        };
      default:
        return {};
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: getSize(),
          height: getSize(),
          borderRadius: getSize() / 2,
        },
        getBorderStyle(),
        style,
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={[
            styles.image,
            {
              width: getSize(),
              height: getSize(),
              borderRadius: getSize() / 2,
            },
          ]}
        />
      ) : (
        <View
          style={[
            styles.placeholder,
            {
              width: getSize(),
              height: getSize(),
              borderRadius: getSize() / 2,
              backgroundColor: theme.colors.background.tertiary,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: theme.colors.background.secondary,
    ...theme.shadows.medium,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 