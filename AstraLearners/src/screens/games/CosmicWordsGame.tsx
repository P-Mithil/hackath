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
const LETTER_WIDTH = (width - theme.spacing.md * 6) / 5;

interface Word {
  word: string;
  definition: string;
  category: 'planets' | 'stars' | 'spacecraft' | 'astronomy';
}

const words: Word[] = [
  {
    word: 'MARS',
    definition: 'The fourth planet from the Sun, known as the Red Planet.',
    category: 'planets',
  },
  {
    word: 'STAR',
    definition: 'A luminous sphere of plasma held together by its own gravity.',
    category: 'stars',
  },
  {
    word: 'ORBIT',
    definition: 'The path of one object around another in space.',
    category: 'astronomy',
  },
  {
    word: 'PROBE',
    definition: 'A spacecraft designed to explore space and gather information.',
    category: 'spacecraft',
  },
  {
    word: 'COMET',
    definition: 'A small icy object that releases gas when near the Sun.',
    category: 'astronomy',
  },
];

interface Letter {
  char: string;
  isUsed: boolean;
  position: number;
}

export const CosmicWordsGame: React.FC = () => {
  const navigation = useNavigation();
  const [currentWord, setCurrentWord] = useState<Word>(words[0]);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<Letter[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showDefinition, setShowDefinition] = useState(false);

  useEffect(() => {
    initializeLevel();
  }, [level]);

  const initializeLevel = () => {
    const word = words[level - 1];
    setCurrentWord(word);
    const shuffledLetters = word.word
      .split('')
      .map((char, index) => ({
        char,
        isUsed: false,
        position: index,
      }))
      .sort(() => Math.random() - 0.5);
    setLetters(shuffledLetters);
    setSelectedLetters([]);
    setShowDefinition(false);
  };

  const handleLetterPress = (letter: Letter) => {
    if (letter.isUsed) return;

    const newLetters = [...letters];
    const letterIndex = newLetters.findIndex(
      (l) => l.position === letter.position
    );
    newLetters[letterIndex].isUsed = true;
    setLetters(newLetters);

    const newSelectedLetters = [...selectedLetters, letter];
    setSelectedLetters(newSelectedLetters);

    const currentWord = newSelectedLetters
      .map((l) => l.char)
      .join('')
      .toUpperCase();

    if (currentWord === words[level - 1].word) {
      // Word completed
      setScore(score + 10);
      setShowDefinition(true);

      setTimeout(() => {
        if (level < words.length) {
          setLevel(level + 1);
        } else {
          setIsGameOver(true);
        }
      }, 2000);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setLevel(1);
    setIsGameOver(false);
    initializeLevel();
  };

  if (isGameOver) {
    return (
      <View style={styles.container}>
        <Card variant="elevated" style={styles.gameOverCard}>
          <Text variant="h2" style={styles.gameOverTitle}>
            Congratulations!
          </Text>
          <Text variant="h3" style={styles.finalScore}>
            Score: {score}
          </Text>
          <Text variant="body" style={styles.levelText}>
            Levels Completed: {level}
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
        <View style={styles.levelContainer}>
          <Ionicons
            name="trophy"
            size={24}
            color={theme.colors.accent.aqua}
          />
          <Text variant="h3" style={styles.level}>
            Level {level}
          </Text>
        </View>
      </View>

      {/* Word Display */}
      <Card variant="elevated" style={styles.wordCard}>
        <Text variant="h2" style={styles.word}>
          {selectedLetters.map((letter) => letter.char).join('')}
        </Text>
      </Card>

      {/* Definition */}
      {showDefinition && (
        <Card variant="elevated" style={styles.definitionCard}>
          <Text variant="h3" style={styles.definitionTitle}>
            {currentWord.word}
          </Text>
          <Text variant="body" style={styles.definition}>
            {currentWord.definition}
          </Text>
        </Card>
      )}

      {/* Letter Grid */}
      <View style={styles.letterGrid}>
        {letters.map((letter, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.letterButton,
              letter.isUsed && styles.letterUsed,
            ]}
            onPress={() => handleLetterPress(letter)}
            disabled={letter.isUsed}
          >
            <Text
              variant="h2"
              style={[
                styles.letter,
                letter.isUsed && styles.letterUsedText,
              ]}
            >
              {letter.char}
            </Text>
          </TouchableOpacity>
        ))}
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
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  level: {
    marginLeft: theme.spacing.sm,
  },
  wordCard: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
  },
  word: {
    letterSpacing: theme.spacing.md,
  },
  definitionCard: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  definitionTitle: {
    marginBottom: theme.spacing.sm,
  },
  definition: {
    color: theme.colors.text.secondary,
  },
  letterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  letterButton: {
    width: LETTER_WIDTH,
    height: LETTER_WIDTH,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    margin: theme.spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterUsed: {
    backgroundColor: theme.colors.accent.aqua,
  },
  letter: {
    color: theme.colors.text.primary,
  },
  letterUsedText: {
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
    marginBottom: theme.spacing.md,
  },
  levelText: {
    marginBottom: theme.spacing.xl,
    color: theme.colors.text.secondary,
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