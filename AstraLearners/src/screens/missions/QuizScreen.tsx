import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text } from '../../components/Text';
import { Card } from '../../components/Card';
import { ProgressBar } from '../../components/ProgressBar';
import { theme } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

const mockQuestions: Question[] = [
  {
    id: '1',
    text: 'What is the sum of the interior angles of a triangle?',
    options: [
      { id: 'a', text: '90°', isCorrect: false },
      { id: 'b', text: '180°', isCorrect: true },
      { id: 'c', text: '270°', isCorrect: false },
      { id: 'd', text: '360°', isCorrect: false },
    ],
    explanation: 'The sum of the interior angles of any triangle is always 180°. This is a fundamental property of triangles in Euclidean geometry.',
  },
  {
    id: '2',
    text: 'Which of the following is a right triangle?',
    options: [
      { id: 'a', text: 'A triangle with sides 3, 4, 5', isCorrect: true },
      { id: 'b', text: 'A triangle with sides 2, 3, 4', isCorrect: false },
      { id: 'c', text: 'A triangle with sides 5, 5, 5', isCorrect: false },
      { id: 'd', text: 'A triangle with sides 6, 7, 8', isCorrect: false },
    ],
    explanation: 'A 3-4-5 triangle is a right triangle because it satisfies the Pythagorean theorem: 3² + 4² = 5² (9 + 16 = 25).',
  },
];

export const QuizScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = mockQuestions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / mockQuestions.length;

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setShowExplanation(true);

    const isCorrect = currentQuestion.options.find(
      (option) => option.id === optionId
    )?.isCorrect;

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      navigation.navigate('Results' as never, {
        quizId: route.params?.quizId,
        score: score,
      } as never);
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <ProgressBar
          progress={progress}
          variant="gradient"
          height={8}
          style={styles.progressBar}
        />
        <Text variant="caption" style={styles.progressText}>
          Question {currentQuestionIndex + 1} of {mockQuestions.length}
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Question Card */}
        <Card variant="elevated" style={styles.questionCard}>
          <Text variant="h3" style={styles.questionText}>
            {currentQuestion.text}
          </Text>
        </Card>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                selectedOption === option.id && styles.selectedOption,
                showExplanation &&
                  option.isCorrect &&
                  styles.correctOption,
                showExplanation &&
                  selectedOption === option.id &&
                  !option.isCorrect &&
                  styles.incorrectOption,
              ]}
              onPress={() => !showExplanation && handleOptionSelect(option.id)}
              disabled={showExplanation}
            >
              <Text
                variant="body"
                style={[
                  styles.optionText,
                  selectedOption === option.id && styles.selectedOptionText,
                ]}
              >
                {option.text}
              </Text>
              {showExplanation && option.isCorrect && (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={theme.colors.status.success}
                />
              )}
              {showExplanation &&
                selectedOption === option.id &&
                !option.isCorrect && (
                  <Ionicons
                    name="close-circle"
                    size={24}
                    color={theme.colors.status.error}
                  />
                )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Explanation */}
        {showExplanation && (
          <Card variant="elevated" style={styles.explanationCard}>
            <Text variant="h3" style={styles.explanationTitle}>
              Explanation
            </Text>
            <Text variant="body" style={styles.explanationText}>
              {currentQuestion.explanation}
            </Text>
          </Card>
        )}
      </ScrollView>

      {/* Next Button */}
      {showExplanation && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text variant="body" style={styles.nextButtonText}>
            {currentQuestionIndex < mockQuestions.length - 1
              ? 'Next Question'
              : 'View Results'}
          </Text>
          <Ionicons
            name="arrow-forward"
            size={20}
            color={theme.colors.text.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  progressContainer: {
    padding: theme.spacing.md,
  },
  progressBar: {
    marginBottom: theme.spacing.xs,
  },
  progressText: {
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.spacing.md,
  },
  questionCard: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
  },
  questionText: {
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: theme.spacing.lg,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  selectedOption: {
    backgroundColor: theme.colors.accent.aqua,
  },
  correctOption: {
    backgroundColor: theme.colors.status.success,
  },
  incorrectOption: {
    backgroundColor: theme.colors.status.error,
  },
  optionText: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  selectedOptionText: {
    color: theme.colors.text.primary,
  },
  explanationCard: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
  },
  explanationTitle: {
    marginBottom: theme.spacing.sm,
  },
  explanationText: {
    color: theme.colors.text.secondary,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.accent.aqua,
    padding: theme.spacing.md,
    margin: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  nextButtonText: {
    color: theme.colors.text.primary,
    marginRight: theme.spacing.sm,
  },
}); 