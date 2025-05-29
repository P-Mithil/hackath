import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text } from '../../components/Text';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { theme } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

interface QuizResults {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  achievements: {
    id: string;
    title: string;
    description: string;
    isNew: boolean;
  }[];
}

const mockResults: QuizResults = {
  score: 8,
  totalQuestions: 10,
  timeSpent: 450, // in seconds
  achievements: [
    {
      id: '1',
      title: 'Perfect Score',
      description: 'Answered all questions correctly',
      isNew: true,
    },
    {
      id: '2',
      title: 'Speed Demon',
      description: 'Completed the quiz in under 8 minutes',
      isNew: true,
    },
  ],
};

export const ResultsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const results = mockResults; // In real app, get from route.params

  const scorePercentage = (results.score / results.totalQuestions) * 100;
  const minutes = Math.floor(results.timeSpent / 60);
  const seconds = results.timeSpent % 60;

  const getScoreColor = () => {
    if (scorePercentage >= 90) return theme.colors.status.success;
    if (scorePercentage >= 70) return theme.colors.accent.aqua;
    return theme.colors.status.error;
  };

  return (
    <View style={styles.container}>
      {/* Score Card */}
      <Card variant="elevated" style={styles.scoreCard}>
        <Text variant="h2" style={styles.scoreTitle}>
          Quiz Complete!
        </Text>
        <View style={styles.scoreContainer}>
          <Text
            variant="h1"
            style={[styles.scoreText, { color: getScoreColor() }]}
          >
            {results.score}/{results.totalQuestions}
          </Text>
          <Text variant="body" style={styles.scorePercentage}>
            {scorePercentage}%
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons
              name="time-outline"
              size={24}
              color={theme.colors.text.secondary}
            />
            <Text variant="body" style={styles.statText}>
              {minutes}m {seconds}s
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons
              name="star-outline"
              size={24}
              color={theme.colors.text.secondary}
            />
            <Text variant="body" style={styles.statText}>
              {results.achievements.length} Achievements
            </Text>
          </View>
        </View>
      </Card>

      {/* Achievements */}
      <View style={styles.achievementsContainer}>
        <Text variant="h3" style={styles.achievementsTitle}>
          Achievements
        </Text>
        {results.achievements.map((achievement) => (
          <Card key={achievement.id} variant="elevated" style={styles.achievementCard}>
            <View style={styles.achievementHeader}>
              <Text variant="h4">{achievement.title}</Text>
              {achievement.isNew && (
                <Badge
                  label="New"
                  variant="success"
                  size="small"
                />
              )}
            </View>
            <Text variant="body" style={styles.achievementDescription}>
              {achievement.description}
            </Text>
          </Card>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={20}
            color={theme.colors.text.primary}
          />
          <Text variant="body" style={styles.actionButtonText}>
            Back to Mission
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.primaryButton]}
          onPress={() => navigation.navigate('Home' as never)}
        >
          <Text variant="body" style={styles.primaryButtonText}>
            Return to Home
          </Text>
          <Ionicons
            name="home"
            size={20}
            color={theme.colors.text.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    padding: theme.spacing.md,
  },
  scoreCard: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  scoreTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  scorePercentage: {
    color: theme.colors.text.secondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: theme.spacing.sm,
    color: theme.colors.text.secondary,
  },
  achievementsContainer: {
    marginBottom: theme.spacing.lg,
  },
  achievementsTitle: {
    marginBottom: theme.spacing.md,
  },
  achievementCard: {
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  achievementDescription: {
    color: theme.colors.text.secondary,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.secondary,
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  actionButtonText: {
    marginLeft: theme.spacing.sm,
  },
  primaryButton: {
    backgroundColor: theme.colors.accent.aqua,
  },
  primaryButtonText: {
    marginRight: theme.spacing.sm,
  },
}); 