import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const QUESTIONS = [
  { q: 'What is 5 + 7?', options: ['10', '12', '13', '11'], answer: 1 },
  { q: 'Which planet is known as the Red Planet?', options: ['Earth', 'Venus', 'Mars', 'Jupiter'], answer: 2 },
  { q: 'Translate "Hello" to Spanish.', options: ['Bonjour', 'Hola', 'Ciao', 'Hallo'], answer: 1 },
];

export default function QuizScreen() {
  const [current, setCurrent] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [score, setScore] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);
  const router = useRouter();

  function submit() {
    if (selected === QUESTIONS[current].answer) setScore(score + 1);
    if (current + 1 < QUESTIONS.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  }

  if (showResult) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Complete!</Text>
        <Text style={styles.score}>Score: {score} / {QUESTIONS.length}</Text>
        <TouchableOpacity style={styles.ctaButton} onPress={restart}>
          <Text style={styles.ctaText}>Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = QUESTIONS[current];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz</Text>
      <Text style={styles.question}>{q.q}</Text>
      {q.options.map((opt, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.option, selected === i && styles.selected]}
          onPress={() => setSelected(i)}>
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.ctaButton} onPress={submit} disabled={selected === null}>
        <Text style={styles.ctaText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a40', padding: 16 },
  title: { fontSize: 28, color: '#fff', fontWeight: 'bold', marginBottom: 8 },
  question: { fontSize: 20, color: '#ffe066', marginBottom: 16, textAlign: 'center' },
  option: { backgroundColor: '#23235b', borderRadius: 12, padding: 12, marginVertical: 6, width: 250 },
  selected: { backgroundColor: '#ff61a6' },
  optionText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  ctaButton: { backgroundColor: '#a0e9ff', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 28, marginTop: 18 },
  ctaText: { color: '#1a1a40', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  score: { color: '#fff', fontSize: 22, marginBottom: 16 },
  backBtn: { backgroundColor: '#23235b', borderRadius: 12, padding: 8, paddingHorizontal: 20, marginTop: 12 },
  backText: { color: '#fff', fontSize: 16 },
});
