export const theme = {
  colors: {
    // Dark space backgrounds
    background: {
      primary: '#0A0E17',    // Deep space black
      secondary: '#1A1F2E',  // Slightly lighter space
      tertiary: '#2A2F3E',   // For cards and elevated surfaces
    },
    // Vibrant neon accents
    accent: {
      aqua: '#00F5FF',       // Bright aqua
      magenta: '#FF00FF',    // Vibrant magenta
      yellow: '#FFD700',     // Solar yellow
      emerald: '#00FF9F',    // Emerald green
    },
    // Text colors
    text: {
      primary: '#FFFFFF',    // Pure white
      secondary: '#B3B3B3',  // Light gray
      tertiary: '#808080',   // Medium gray
    },
    // Status colors
    status: {
      success: '#00FF9F',    // Success green
      warning: '#FFD700',    // Warning yellow
      error: '#FF3366',      // Error red
    },
  },
  typography: {
    fontFamily: {
      primary: 'SpaceGrotesk-Regular',
      bold: 'SpaceGrotesk-Bold',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 8,
    },
  },
}; 