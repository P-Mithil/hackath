import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

const SHAPES = [
  { name: 'Square', color: '#ffe066' },
  { name: 'Triangle', color: '#a0e9ff' },
  { name: 'Circle', color: '#ff61a6' },
];

export default function GeoShifter() {
  const [score, setScore] = React.useState(0);
  const [current, setCurrent] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const router = useRouter();

  function next() {
    if (selected === current) setScore(score + 1);
    setCurrent(Math.floor(Math.random() * SHAPES.length));
    setSelected(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geo-Shifter</Text>
      <Text style={styles.subtitle}>Tap the matching shape!</Text>
      <View style={styles.shapeRow}>
        {SHAPES.map((shape, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.shape, { backgroundColor: shape.color, opacity: selected === i ? 0.5 : 1 }]}
            onPress={() => setSelected(i)}>
            <Text style={styles.shapeText}>{shape.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.ctaButton} onPress={next}>
        <Text style={styles.ctaText}>Submit</Text>
      </TouchableOpacity>
      <Text style={styles.score}>Score: {score}</Text>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a40', padding: 16 },
  title: { fontSize: 28, color: '#fff', fontWeight: 'bold', marginBottom: 8 },
  subtitle: { color: '#a0e9ff', marginBottom: 16 },
  shapeRow: { flexDirection: 'row', marginBottom: 16 },
  shape: { borderRadius: 12, padding: 24, marginHorizontal: 8, minWidth: 80, alignItems: 'center' },
  shapeText: { color: '#1a1a40', fontWeight: 'bold', fontSize: 16 },
  ctaButton: { backgroundColor: '#ff61a6', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 28, marginTop: 18 },
  ctaText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  score: { color: '#fff', fontSize: 22, marginBottom: 16 },
  backBtn: { backgroundColor: '#23235b', borderRadius: 12, padding: 8, paddingHorizontal: 20, marginTop: 12 },
  backText: { color: '#fff', fontSize: 16 },
});
