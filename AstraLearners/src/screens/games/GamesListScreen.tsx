import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../../components/Text';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { theme } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

interface Game {
  id: string;
  title: string;
  description: string;
  category: 'math' | 'science' | 'language' | 'logic';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  image: any;
  isLocked: boolean;
  rewards: {
    starDust: number;
    knowledgeCrystals: number;
  };
}

const games: Game[] = [
  {
    id: '1',
    title: 'Space Race',
    description: 'Race through space while solving math problems to power your ship!',
    category: 'math',
    difficulty: 'beginner',
    image: require('../../../assets/games/space-race.png'),
    isLocked: false,
    rewards: {
      starDust: 500,
      knowledgeCrystals: 2,
    },
  },
  {
    id: '2',
    title: 'Planet Puzzle',
    description: 'Match planets and learn about their properties in this memory game.',
    category: 'science',
    difficulty: 'beginner',
    image: require('../../../assets/games/planet-puzzle.png'),
    isLocked: false,
    rewards: {
      starDust: 400,
      knowledgeCrystals: 1,
    },
  },
  {
    id: '3',
    title: 'Cosmic Words',
    description: 'Build words from cosmic letters and learn space vocabulary.',
    category: 'language',
    difficulty: 'intermediate',
    image: require('../../../assets/games/cosmic-words.png'),
    isLocked: true,
    rewards: {
      starDust: 600,
      knowledgeCrystals: 3,
    },
  },
  {
    id: '4',
    title: 'Gravity Maze',
    description: 'Navigate through a maze using physics and gravity concepts.',
    category: 'science',
    difficulty: 'advanced',
    image: require('../../../assets/games/gravity-maze.png'),
    isLocked: true,
    rewards: {
      starDust: 800,
      knowledgeCrystals: 4,
    },
  },
  {
    id: '5',
    title: 'Number Nebula',
    description: 'Match numbers and solve equations in this cosmic number game.',
    category: 'math',
    difficulty: 'intermediate',
    image: require('../../../assets/games/number-nebula.png'),
    isLocked: false,
    rewards: {
      starDust: 550,
      knowledgeCrystals: 2,
    },
  },
];

const getCategoryColor = (category: Game['category']) => {
  switch (category) {
    case 'math':
      return theme.colors.accent.aqua;
    case 'science':
      return theme.colors.accent.emerald;
    case 'language':
      return theme.colors.accent.magenta;
    case 'logic':
      return theme.colors.accent.yellow;
  }
};

const getDifficultyColor = (difficulty: Game['difficulty']) => {
  switch (difficulty) {
    case 'beginner':
      return theme.colors.status.success;
    case 'intermediate':
      return theme.colors.accent.yellow;
    case 'advanced':
      return theme.colors.status.error;
  }
};

export const GamesListScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text variant="h2" style={styles.title}>Cosmic Games</Text>
      <Text variant="body" style={styles.subtitle}>
        Play and learn with these space-themed educational games!
      </Text>

      {games.map((game) => (
        <TouchableOpacity
          key={game.id}
          onPress={() => !game.isLocked && navigation.navigate('GameDetails' as never, { gameId: game.id } as never)}
          disabled={game.isLocked}
        >
          <Card
            variant="elevated"
            style={[styles.gameCard, game.isLocked && styles.lockedCard]}
          >
            <Image source={game.image} style={styles.gameImage} />
            <View style={styles.gameInfo}>
              <View style={styles.gameHeader}>
                <Text variant="h3" style={styles.gameTitle}>
                  {game.title}
                </Text>
                {game.isLocked && (
                  <Ionicons
                    name="lock-closed"
                    size={24}
                    color={theme.colors.text.secondary}
                  />
                )}
              </View>
              <Text variant="body" style={styles.gameDescription}>
                {game.description}
              </Text>
              <View style={styles.badgesContainer}>
                <Badge
                  label={game.category}
                  variant="default"
                  size="small"
                  style={{ backgroundColor: getCategoryColor(game.category) }}
                />
                <Badge
                  label={game.difficulty}
                  variant="default"
                  size="small"
                  style={{ backgroundColor: getDifficultyColor(game.difficulty) }}
                />
              </View>
              <View style={styles.rewardsContainer}>
                <View style={styles.reward}>
                  <Ionicons
                    name="star"
                    size={20}
                    color={theme.colors.accent.yellow}
                  />
                  <Text variant="caption" style={styles.rewardText}>
                    {game.rewards.starDust}
                  </Text>
                </View>
                <View style={styles.reward}>
                  <Ionicons
                    name="diamond"
                    size={20}
                    color={theme.colors.accent.aqua}
                  />
                  <Text variant="caption" style={styles.rewardText}>
                    {game.rewards.knowledgeCrystals}
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  contentContainer: {
    padding: theme.spacing.md,
  },
  title: {
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
  },
  gameCard: {
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
  },
  lockedCard: {
    opacity: 0.7,
  },
  gameImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  gameInfo: {
    padding: theme.spacing.md,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  gameTitle: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  gameDescription: {
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  badgesContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  rewardsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  reward: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing.md,
  },
  rewardText: {
    marginLeft: theme.spacing.xs,
    color: theme.colors.text.secondary,
  },
}); 