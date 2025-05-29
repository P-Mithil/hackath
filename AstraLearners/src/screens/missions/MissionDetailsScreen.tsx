import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text } from '../../components/Text';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { ProgressBar } from '../../components/ProgressBar';
import { theme } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

interface MissionDetails {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  totalChallenges: number;
  completedChallenges: number;
  rewards: {
    starDust: number;
    knowledgeCrystals: number;
  };
  challenges: {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    isLocked: boolean;
  }[];
}

const mockMission: MissionDetails = {
  id: '1',
  title: 'Triangle Quest',
  description: 'Master the properties of triangles and their angles through interactive challenges and real-world applications.',
  difficulty: 'beginner',
  progress: 70,
  totalChallenges: 10,
  completedChallenges: 7,
  rewards: {
    starDust: 1000,
    knowledgeCrystals: 5,
  },
  challenges: [
    {
      id: '1',
      title: 'Triangle Types',
      description: 'Learn about different types of triangles and their properties',
      isCompleted: true,
      isLocked: false,
    },
    {
      id: '2',
      title: 'Angle Sum',
      description: 'Discover why the angles of a triangle always sum to 180°',
      isCompleted: true,
      isLocked: false,
    },
    {
      id: '3',
      title: 'Pythagorean Theorem',
      description: 'Master the famous theorem for right triangles',
      isCompleted: false,
      isLocked: false,
    },
  ],
};

export const MissionDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const getDifficultyColor = (difficulty: MissionDetails['difficulty']) => {
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Mission Header */}
      <Card variant="elevated" style={styles.headerCard}>
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Text variant="h2">{mockMission.title}</Text>
            <Badge
              label={mockMission.difficulty}
              variant="default"
              size="medium"
            />
          </View>
          <Text variant="body" style={styles.description}>
            {mockMission.description}
          </Text>
          <ProgressBar
            progress={mockMission.progress / 100}
            variant="gradient"
            height={8}
            style={styles.progressBar}
          />
          <Text variant="caption" style={styles.progressText}>
            {mockMission.completedChallenges} of {mockMission.totalChallenges} Challenges Completed
          </Text>
        </View>
      </Card>

      {/* Rewards Section */}
      <Card variant="elevated" style={styles.rewardsCard}>
        <Text variant="h3" style={styles.sectionTitle}>Mission Rewards</Text>
        <View style={styles.rewardsContainer}>
          <View style={styles.reward}>
            <Ionicons
              name="star"
              size={24}
              color={theme.colors.accent.yellow}
            />
            <View style={styles.rewardInfo}>
              <Text variant="h3" style={styles.rewardValue}>
                {mockMission.rewards.starDust}
              </Text>
              <Text variant="caption">StarDust</Text>
            </View>
          </View>
          <View style={styles.reward}>
            <Ionicons
              name="diamond"
              size={24}
              color={theme.colors.accent.aqua}
            />
            <View style={styles.rewardInfo}>
              <Text variant="h3" style={styles.rewardValue}>
                {mockMission.rewards.knowledgeCrystals}
              </Text>
              <Text variant="caption">Knowledge Crystals</Text>
            </View>
          </View>
        </View>
      </Card>

      {/* Challenges Section */}
      <View style={styles.challengesSection}>
        <Text variant="h3" style={styles.sectionTitle}>Challenges</Text>
        {mockMission.challenges.map((challenge) => (
          <TouchableOpacity
            key={challenge.id}
            style={styles.challengeCard}
            onPress={() => !challenge.isLocked && navigation.navigate('Quiz' as never, { quizId: challenge.id } as never)}
            disabled={challenge.isLocked}
          >
            <Card
              variant="elevated"
              style={[
                styles.challenge,
                { opacity: challenge.isLocked ? 0.5 : 1 },
              ]}
            >
              <View style={styles.challengeHeader}>
                <Text variant="h3" style={styles.challengeTitle}>
                  {challenge.title}
                </Text>
                {challenge.isCompleted ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={theme.colors.status.success}
                  />
                ) : (
                  <Ionicons
                    name={challenge.isLocked ? 'lock-closed' : 'arrow-forward'}
                    size={24}
                    color={challenge.isLocked ? theme.colors.text.secondary : theme.colors.accent.aqua}
                  />
                )}
              </View>
              <Text variant="body" style={styles.challengeDescription}>
                {challenge.description}
              </Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
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
  headerCard: {
    marginBottom: theme.spacing.lg,
  },
  headerContent: {
    padding: theme.spacing.lg,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  description: {
    marginBottom: theme.spacing.lg,
  },
  progressBar: {
    marginBottom: theme.spacing.sm,
  },
  progressText: {
    textAlign: 'center',
  },
  rewardsCard: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    marginBottom: theme.spacing.md,
  },
  rewardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  reward: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardInfo: {
    marginLeft: theme.spacing.sm,
  },
  rewardValue: {
    color: theme.colors.accent.aqua,
  },
  challengesSection: {
    marginBottom: theme.spacing.xl,
  },
  challengeCard: {
    marginBottom: theme.spacing.md,
  },
  challenge: {
    padding: theme.spacing.lg,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  challengeTitle: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  challengeDescription: {
    color: theme.colors.text.secondary,
  },
}); 