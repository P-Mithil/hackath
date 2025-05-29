import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../../components/Text';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { ProgressBar } from '../../components/ProgressBar';
import { theme } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  isLocked: boolean;
  rewards: {
    starDust: number;
    knowledgeCrystals: number;
  };
}

const missions: Mission[] = [
  {
    id: '1',
    title: 'Triangle Quest',
    description: 'Master the properties of triangles and their angles',
    difficulty: 'beginner',
    progress: 70,
    isLocked: false,
    rewards: {
      starDust: 100,
      knowledgeCrystals: 1,
    },
  },
  {
    id: '2',
    title: 'Circle Challenge',
    description: 'Explore the mysteries of circles and their properties',
    difficulty: 'beginner',
    progress: 30,
    isLocked: false,
    rewards: {
      starDust: 150,
      knowledgeCrystals: 2,
    },
  },
  {
    id: '3',
    title: 'Polygon Puzzle',
    description: 'Solve complex problems with various polygons',
    difficulty: 'intermediate',
    progress: 0,
    isLocked: true,
    rewards: {
      starDust: 200,
      knowledgeCrystals: 3,
    },
  },
];

export const MissionsListScreen: React.FC = () => {
  const navigation = useNavigation();

  const getDifficultyColor = (difficulty: Mission['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return theme.colors.accent.emerald;
      case 'intermediate':
        return theme.colors.accent.yellow;
      case 'advanced':
        return theme.colors.accent.magenta;
    }
  };

  const renderMissionCard = ({ item: mission }: { item: Mission }) => (
    <TouchableOpacity
      style={styles.missionCard}
      onPress={() => !mission.isLocked && navigation.navigate('MissionDetails' as never, { missionId: mission.id } as never)}
      disabled={mission.isLocked}
    >
      <Card
        variant="elevated"
        style={[
          styles.card,
          { opacity: mission.isLocked ? 0.5 : 1 },
        ]}
      >
        <View style={styles.cardHeader}>
          <Text variant="h3">{mission.title}</Text>
          <Badge
            label={mission.difficulty}
            variant="default"
            size="medium"
          />
        </View>
        <Text variant="body" style={styles.description}>
          {mission.description}
        </Text>
        <ProgressBar
          progress={mission.progress / 100}
          variant="gradient"
          height={4}
          style={styles.progressBar}
        />
        <View style={styles.rewardsContainer}>
          <View style={styles.reward}>
            <Ionicons
              name="star"
              size={16}
              color={theme.colors.accent.yellow}
            />
            <Text variant="caption" style={styles.rewardText}>
              {mission.rewards.starDust} StarDust
            </Text>
          </View>
          <View style={styles.reward}>
            <Ionicons
              name="diamond"
              size={16}
              color={theme.colors.accent.aqua}
            />
            <Text variant="caption" style={styles.rewardText}>
              {mission.rewards.knowledgeCrystals} Crystals
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={missions}
        renderItem={renderMissionCard}
        keyExtractor={(mission) => mission.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  listContainer: {
    padding: theme.spacing.md,
  },
  missionCard: {
    marginBottom: theme.spacing.md,
  },
  card: {
    padding: theme.spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  description: {
    marginBottom: theme.spacing.md,
  },
  progressBar: {
    marginBottom: theme.spacing.md,
  },
  rewardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reward: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardText: {
    marginLeft: theme.spacing.xs,
    color: theme.colors.text.secondary,
  },
}); 