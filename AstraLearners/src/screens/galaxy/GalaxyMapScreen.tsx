import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../../components/Text';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { theme } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const GALAXY_SIZE = width * 0.8;

interface Galaxy {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  isLocked: boolean;
  position: {
    x: number;
    y: number;
  };
}

const galaxies: Galaxy[] = [
  {
    id: '1',
    name: 'Geometry Galaxy',
    description: 'Master shapes, angles, and spatial reasoning',
    difficulty: 'beginner',
    progress: 70,
    isLocked: false,
    position: { x: 0.2, y: 0.3 },
  },
  {
    id: '2',
    name: 'Algebra Nebula',
    description: 'Explore equations and mathematical patterns',
    difficulty: 'intermediate',
    progress: 30,
    isLocked: false,
    position: { x: 0.6, y: 0.4 },
  },
  {
    id: '3',
    name: 'Calculus Cluster',
    description: 'Journey through derivatives and integrals',
    difficulty: 'advanced',
    progress: 0,
    isLocked: true,
    position: { x: 0.4, y: 0.7 },
  },
];

export const GalaxyMapScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedGalaxy, setSelectedGalaxy] = useState<Galaxy | null>(null);

  const getDifficultyColor = (difficulty: Galaxy['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return theme.colors.accent.emerald;
      case 'intermediate':
        return theme.colors.accent.yellow;
      case 'advanced':
        return theme.colors.accent.magenta;
    }
  };

  return (
    <View style={styles.container}>
      {/* Interactive Galaxy Map */}
      <View style={styles.mapContainer}>
        <View style={[styles.galaxyMap, { width: GALAXY_SIZE, height: GALAXY_SIZE }]}>
          {galaxies.map((galaxy) => (
            <TouchableOpacity
              key={galaxy.id}
              style={[
                styles.galaxyPoint,
                {
                  left: galaxy.position.x * GALAXY_SIZE,
                  top: galaxy.position.y * GALAXY_SIZE,
                  backgroundColor: getDifficultyColor(galaxy.difficulty),
                  opacity: galaxy.isLocked ? 0.5 : 1,
                },
              ]}
              onPress={() => !galaxy.isLocked && setSelectedGalaxy(galaxy)}
              disabled={galaxy.isLocked}
            >
              <Ionicons
                name="planet"
                size={24}
                color={theme.colors.text.primary}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Galaxy Details */}
      {selectedGalaxy && (
        <Card variant="elevated" style={styles.detailsCard}>
          <View style={styles.detailsHeader}>
            <Text variant="h2">{selectedGalaxy.name}</Text>
            <Badge
              label={selectedGalaxy.difficulty}
              variant="default"
              size="medium"
            />
          </View>
          <Text variant="body" style={styles.description}>
            {selectedGalaxy.description}
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => {
              navigation.navigate('Missions' as never);
              setSelectedGalaxy(null);
            }}
          >
            <Text variant="body" style={styles.buttonText}>
              Explore Galaxy
            </Text>
            <Ionicons
              name="rocket"
              size={20}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
  },
  galaxyMap: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    position: 'relative',
  },
  galaxyPoint: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -24 }, { translateY: -24 }],
  },
  detailsCard: {
    margin: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  description: {
    marginBottom: theme.spacing.lg,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.accent.aqua,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  buttonText: {
    color: theme.colors.text.primary,
    marginRight: theme.spacing.sm,
  },
}); 