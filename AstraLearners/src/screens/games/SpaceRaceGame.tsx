import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../../components/Text';
import { Card } from '../../components/Card';
import { theme } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface MathProblem {
  question: string;
  answer: number;
  options: number[];
}

const generateProblem = (): MathProblem => {
  const operations = ['+', '-', '*'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  let num1, num2, answer;

  switch (operation) {
    case '+':
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
      answer = num1 + num2;
      break;
    case '-':
      num1 = Math.floor(Math.random() * 50) + 26;
      num2 = Math.floor(Math.random() * 25) + 1;
      answer = num1 - num2;
      break;
    case '*':
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;
      answer = num1 * num2;
      break;
  }

  const options = [answer];
  while (options.length < 4) {
    const option = answer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 5) + 1);
    if (!options.includes(option)) {
      options.push(option);
    }
  }

  return {
    question: `${num1} ${operation} ${num2} = ?`,
    answer,
    options: options.sort(() => Math.random() - 0.5),
  };
};

export const SpaceRaceGame: React.FC = () => {
  const navigation = useNavigation();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentProblem, setCurrentProblem] = useState<MathProblem>(generateProblem());
  const [shipPosition] = useState(new Animated.Value(0));
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const moveShip = (distance: number) => {
    Animated.timing(shipPosition, {
      toValue: distance,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === currentProblem.answer) {
      setScore(score + 10);
      moveShip(shipPosition._value + 50);
    } else {
      moveShip(Math.max(0, shipPosition._value - 30));
    }
    setCurrentProblem(generateProblem());
  };

  const handleRestart = () => {
    setScore(0);
    setTimeLeft(60);
    setCurrentProblem(generateProblem());
    setIsGameOver(false);
    shipPosition.setValue(0);
  };

  if (isGameOver) {
    return (
      <View style={styles.container}>
        <Card variant="elevated" style={styles.gameOverCard}>
          <Text variant="h2" style={styles.gameOverTitle}>
            Game Over!
          </Text>
          <Text variant="h3" style={styles.finalScore}>
            Final Score: {score}
          </Text>
          <TouchableOpacity
            style={styles.restartButton}
            onPress={handleRestart}
          >
            <Text variant="body" style={styles.restartButtonText}>
              Play Again
            </Text>
            <Ionicons
              name="refresh"
              size={20}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.exitButton}
            onPress={() => navigation.goBack()}
          >
            <Text variant="body" style={styles.exitButtonText}>
              Exit Game
            </Text>
            <Ionicons
              name="exit"
              size={20}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Game Header */}
      <View style={styles.header}>
        <View style={styles.scoreContainer}>
          <Ionicons
            name="star"
            size={24}
            color={theme.colors.accent.yellow}
          />
          <Text variant="h3" style={styles.score}>
            {score}
          </Text>
        </View>
        <View style={styles.timerContainer}>
          <Ionicons
            name="time"
            size={24}
            color={theme.colors.accent.aqua}
          />
          <Text variant="h3" style={styles.timer}>
            {timeLeft}s
          </Text>
        </View>
      </View>

      {/* Game Area */}
      <View style={styles.gameArea}>
        <Animated.View
          style={[
            styles.ship,
            {
              transform: [
                {
                  translateX: shipPosition.interpolate({
                    inputRange: [0, width - 100],
                    outputRange: [0, width - 100],
                  }),
                },
              ],
            },
          ]}
        >
          <Ionicons
            name="rocket"
            size={40}
            color={theme.colors.accent.aqua}
          />
        </Animated.View>
      </View>

      {/* Problem Card */}
      <Card variant="elevated" style={styles.problemCard}>
        <Text variant="h2" style={styles.problemText}>
          {currentProblem.question}
        </Text>
        <View style={styles.optionsContainer}>
          {currentProblem.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
            >
              <Text variant="h3" style={styles.optionText}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    marginLeft: theme.spacing.sm,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timer: {
    marginLeft: theme.spacing.sm,
  },
  gameArea: {
    height: 100,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
    overflow: 'hidden',
  },
  ship: {
    position: 'absolute',
    bottom: 30,
    left: 0,
  },
  problemCard: {
    padding: theme.spacing.lg,
  },
  problemText: {
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '48%',
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
  },
  optionText: {
    color: theme.colors.text.primary,
  },
  gameOverCard: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  gameOverTitle: {
    marginBottom: theme.spacing.lg,
  },
  finalScore: {
    marginBottom: theme.spacing.xl,
  },
  restartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.accent.aqua,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  restartButtonText: {
    marginRight: theme.spacing.sm,
  },
  exitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  exitButtonText: {
    marginRight: theme.spacing.sm,
  },
}); 