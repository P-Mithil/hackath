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
const CARD_WIDTH = (width - theme.spacing.md * 3) / 2;

interface Planet {
  id: string;
  name: string;
  image: any;
  facts: string[];
}

const planets: Planet[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    image: require('../../../assets/planets/mercury.png'),
    facts: [
      'Smallest planet in our solar system',
      'Closest planet to the Sun',
      'Has no atmosphere',
    ],
  },
  {
    id: 'venus',
    name: 'Venus',
    image: require('../../../assets/planets/venus.png'),
    facts: [
      'Hottest planet in our solar system',
      'Rotates in the opposite direction',
      'Has a thick atmosphere',
    ],
  },
  {
    id: 'earth',
    name: 'Earth',
    image: require('../../../assets/planets/earth.png'),
    facts: [
      'Only planet known to have life',
      'Has one natural satellite',
      'Surface is 71% water',
    ],
  },
  {
    id: 'mars',
    name: 'Mars',
    image: require('../../../assets/planets/mars.png'),
    facts: [
      'Known as the Red Planet',
      'Has the largest volcano',
      'Has two small moons',
    ],
  },
];

interface CardState {
  id: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const PlanetPuzzleGame: React.FC = () => {
  const navigation = useNavigation();
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameCards = [...planets, ...planets]
      .map((planet, index) => ({
        id: `${planet.id}-${index}`,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);
    setCards(gameCards);
  };

  const handleCardPress = (index: number) => {
    if (
      flippedCards.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.id.split('-')[0] === secondCard.id.split('-')[0]) {
        // Match found
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);
        setScore(score + 10);
        setFlippedCards([]);

        // Check if game is complete
        if (newCards.every((card) => card.isMatched)) {
          setIsGameOver(true);
        }
      } else {
        // No match
        setTimeout(() => {
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleRestart = () => {
    setMoves(0);
    setScore(0);
    setIsGameOver(false);
    setFlippedCards([]);
    setSelectedPlanet(null);
    initializeGame();
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
          <Text variant="body" style={styles.movesText}>
            Moves: {moves}
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
        <View style={styles.movesContainer}>
          <Ionicons
            name="repeat"
            size={24}
            color={theme.colors.accent.aqua}
          />
          <Text variant="h3" style={styles.moves}>
            {moves}
          </Text>
        </View>
      </View>

      {/* Game Grid */}
      <View style={styles.grid}>
        {cards.map((card, index) => {
          const planet = planets.find(
            (p) => p.id === card.id.split('-')[0]
          );
          return (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.card,
                card.isFlipped && styles.cardFlipped,
                card.isMatched && styles.cardMatched,
              ]}
              onPress={() => handleCardPress(index)}
            >
              {card.isFlipped ? (
                <View style={styles.cardContent}>
                  <Image
                    source={planet?.image}
                    style={styles.planetImage}
                  />
                  <Text variant="body" style={styles.planetName}>
                    {planet?.name}
                  </Text>
                </View>
              ) : (
                <View style={styles.cardBack}>
                  <Ionicons
                    name="planet"
                    size={40}
                    color={theme.colors.accent.aqua}
                  />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Planet Info */}
      {selectedPlanet && (
        <Card variant="elevated" style={styles.infoCard}>
          <Text variant="h3" style={styles.infoTitle}>
            {selectedPlanet.name}
          </Text>
          {selectedPlanet.facts.map((fact, index) => (
            <Text key={index} variant="body" style={styles.fact}>
              • {fact}
            </Text>
          ))}
        </Card>
      )}
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
  movesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moves: {
    marginLeft: theme.spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.4,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
  },
  cardFlipped: {
    backgroundColor: theme.colors.accent.aqua,
  },
  cardMatched: {
    backgroundColor: theme.colors.status.success,
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
  },
  cardBack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planetImage: {
    width: CARD_WIDTH * 0.6,
    height: CARD_WIDTH * 0.6,
    resizeMode: 'contain',
    marginBottom: theme.spacing.sm,
  },
  planetName: {
    textAlign: 'center',
  },
  infoCard: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
  },
  infoTitle: {
    marginBottom: theme.spacing.sm,
  },
  fact: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.text.secondary,
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
  movesText: {
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