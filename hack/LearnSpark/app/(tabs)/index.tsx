import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, View, Text, TextInput, Modal, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const NAV_ITEMS = [
  { label: 'Home', route: '/' },
  { label: 'Study Tools', route: '/quiz' },
  { label: 'Subjects', route: '/mini-game-number-nova' },
  { label: 'Leaderboards', route: '/mini-game-geo-shifter' },
];

export default function TabOneScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [nickname, setNickname] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [activeNav, setActiveNav] = useState('Home');

  function handleJoin() {
    setModalVisible(false);
    router.push('/quiz');
  }

  return (
    <View style={styles.page}>
      {/* Navigation Bar */}
      <View style={styles.navbar}>
        <Image source={require('@/assets/images/icon.png')} style={styles.navLogo} />
        <Text style={styles.navTitle}>LearnSpark</Text>
        <View style={styles.navItems}>
          {NAV_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.navItem, activeNav === item.label && styles.navItemActive]}
              onPress={() => {
                setActiveNav(item.label);
                router.push(item.route as any);
              }}>
              <Text style={[styles.navItemText, activeNav === item.label && styles.navItemTextActive]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
      </View>
      {/* Hero Section */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>How do you want to study?</Text>
          <Text style={styles.heroSubtitle}>Master Math, Science, and Languages with LearnSpark’s interactive quizzes, games, and study adventures.</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.ctaText}>Sign up for free</Text>
          </TouchableOpacity>
          <Text style={styles.teacherLink}>I’m a teacher</Text>
        </View>
        {/* Card Row */}
        <View style={styles.cardRow}>
          <View style={[styles.card, { backgroundColor: '#b3e6ff' }]}> {/* Learn */}
            <Text style={styles.cardTitle}>Learn</Text>
            <Image source={require('@/assets/images/splash-icon.png')} style={styles.cardImg} />
            <Text style={styles.cardDesc}>Type the answer and level up your knowledge!</Text>
          </View>
          <View style={[styles.card, { backgroundColor: '#e6c6ff' }]}> {/* Study Guides */}
            <Text style={styles.cardTitle}>Study Guides</Text>
            <Image source={require('@/assets/images/adaptive-icon.png')} style={styles.cardImg} />
            <Text style={styles.cardDesc}>Quick reference guides for every subject.</Text>
          </View>
          <View style={[styles.card, { backgroundColor: '#bfc6ff' }]}> {/* Flashcards */}
            <Text style={styles.cardTitle}>Flashcards</Text>
            <Image source={require('@/assets/images/favicon.png')} style={styles.cardImg} />
            <Text style={styles.cardDesc}>Practice with interactive flashcards.</Text>
          </View>
          <View style={[styles.card, { backgroundColor: '#ffe6b3' }]}> {/* Practice Tests */}
            <Text style={styles.cardTitle}>Practice Tests</Text>
            <Image source={require('@/assets/images/icon.png')} style={styles.cardImg} />
            <Text style={styles.cardDesc}>Test your skills and track your progress.</Text>
          </View>
        </View>
        <Text style={styles.footer}>Let LearnSpark ignite your curiosity across the universe!</Text>
      </ScrollView>
      {/* Modal for Join/Login */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Join Game</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Nickname"
              placeholderTextColor="#a0e9ff"
              value={nickname}
              onChangeText={setNickname}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Game Code"
              placeholderTextColor="#a0e9ff"
              value={gameCode}
              onChangeText={setGameCode}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.ctaButton} onPress={handleJoin}>
              <Text style={styles.ctaText}>Join</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.backText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    elevation: 2,
    zIndex: 10,
  },
  navLogo: {
    width: 36,
    height: 36,
    marginRight: 8,
  },
  navTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4f4fff',
    marginRight: 24,
  },
  navItems: {
    flexDirection: 'row',
    flex: 1,
  },
  navItem: {
    marginHorizontal: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: '#e6e6ff',
  },
  navItemText: {
    color: '#333',
    fontSize: 16,
  },
  navItemTextActive: {
    color: '#4f4fff',
    fontWeight: 'bold',
  },
  loginBtn: {
    backgroundColor: '#4f4fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 22,
    marginLeft: 12,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  hero: {
    alignItems: 'center',
    marginTop: 36,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 18,
    textAlign: 'center',
    maxWidth: 500,
  },
  ctaButton: {
    backgroundColor: '#4f4fff',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 10,
    marginTop: 8,
  },
  ctaText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
    textAlign: 'center',
  },
  teacherLink: {
    color: '#4f4fff',
    fontSize: 16,
    marginTop: 6,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  card: {
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 8,
    marginBottom: 12,
    alignItems: 'center',
    width: 180,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  cardImg: {
    width: 60,
    height: 60,
    marginBottom: 8,
    borderRadius: 12,
  },
  cardDesc: {
    color: '#333',
    fontSize: 15,
    textAlign: 'center',
  },
  footer: {
    color: '#a0e9ff',
    fontSize: 16,
    marginTop: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: 320,
  },
  modalTitle: {
    color: '#4f4fff',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f7f8fa',
    color: '#222',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    width: 220,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#4f4fff',
  },
  backBtn: {
    backgroundColor: '#e6e6e6',
    borderRadius: 12,
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  backText: {
    color: '#333',
    fontSize: 16,
  },
});
