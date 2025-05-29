import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function NumberNova() {
  const [score, setScore] = React.useState(0);
  const [a, setA] = React.useState(0);
  const [b, setB] = React.useState(0);
  const [answer, setAnswer] = React.useState('');
  const [feedback, setFeedback] = React.useState('');

  React.useEffect(() => {
    nextQuestion();
  }, []);

  function nextQuestion() {
    setA(Math.floor(Math.random() * 10 + 1));
    setB(Math.floor(Math.random() * 10 + 1));
    setAnswer('');
    setFeedback('');
  }

  function checkAnswer() {
    if (parseInt(answer) === a + b) {
      setScore(score + 1);
      setFeedback('Correct! ✨');
    } else {
      setFeedback('Try again!');
    }
    setTimeout(nextQuestion, 1000);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Number Nova</Text>
      <Text style={styles.subtitle}>Add the numbers to make the star explode!</Text>
      <Text style={styles.question}>{a} + {b} = ?</Text>
      <View style={styles.inputRow}>
        <TouchableOpacity style={styles.inputBtn} onPress={() => setAnswer((answer + '1').slice(0,2))}><Text style={styles.inputText}>1</Text></TouchableOpacity>
        <TouchableOpacity style={styles.inputBtn} onPress={() => setAnswer((answer + '2').slice(0,2))}><Text style={styles.inputText}>2</Text></TouchableOpacity>
        <TouchableOpacity style={styles.inputBtn} onPress={() => setAnswer((answer + '3').slice(0,2))}><Text style={styles.inputText}>3</Text></TouchableOpacity>
        <TouchableOpacity style={styles.inputBtn} onPress={() => setAnswer('')}><Text style={styles.inputText}>C</Text></TouchableOpacity>
      </View>
      <Text style={styles.answer}>{answer}</Text>
      <TouchableOpacity style={styles.submitBtn} onPress={checkAnswer}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
      <Text style={styles.feedback}>{feedback}</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <TouchableOpacity style={styles.backBtn} onPress={() => useRouter().back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a40' },
  title: { fontSize: 28, color: '#fff', fontWeight: 'bold', marginBottom: 8 },
  subtitle: { color: '#a0e9ff', marginBottom: 16 },
  question: { fontSize: 32, color: '#ffe066', marginBottom: 12 },
  inputRow: { flexDirection: 'row', marginBottom: 8 },
  inputBtn: { backgroundColor: '#23235b', borderRadius: 8, margin: 4, padding: 12 },
  inputText: { color: '#fff', fontSize: 20 },
  answer: { fontSize: 28, color: '#fff', marginBottom: 8 },
  submitBtn: { backgroundColor: '#ff61a6', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 24, marginBottom: 8 },
  submitText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  feedback: { color: '#a0e9ff', fontSize: 18, marginBottom: 8 },
  score: { color: '#fff', fontSize: 18, marginBottom: 16 },
  backBtn: { backgroundColor: '#23235b', borderRadius: 12, padding: 8, paddingHorizontal: 20 },
  backText: { color: '#fff', fontSize: 16 },
});
