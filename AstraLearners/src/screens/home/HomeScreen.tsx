import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../../components/Text';
import { Card } from '../../components/Card';
import { Avatar } from '../../components/Avatar';
import { Badge } from '../../components/Badge';
import { ProgressBar } from '../../components/ProgressBar';
import { theme } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* User Stats Section */}
      <View style={styles.userStatsContainer}>
        <View style={styles.avatarContainer}>
          <Avatar
            size="large"
            variant="glowing"
            source={require('../../assets/avatar-placeholder.png')}
          />
          <View style={styles.userInfo}>
            <Text variant="h2">Commander Alex</Text>
            <Badge
              label="Level 5 Explorer"
              variant="default"
              size="medium"
            />
          </View>
        </View>
        <View style={styles.statsGrid}>
          <Card variant="elevated" style={styles.statCard}>
            <Text variant="h3" style={styles.statValue}>2,450</Text>
            <Text variant="caption">StarDust</Text>
          </Card>
          <Card variant="elevated" style={styles.statCard}>
            <Text variant="h3" style={styles.statValue}>12</Text>
            <Text variant="caption">Knowledge Crystals</Text>
          </Card>
          <Card variant="elevated" style={styles.statCard}>
            <Text variant="h3" style={styles.statValue}>85%</Text>
            <Text variant="caption">Mission Success</Text>
          </Card>
        </View>
      </View>

      {/* Current Mission Section */}
      <Card variant="elevated" style={styles.missionCard}>
        <Text variant="h3" style={styles.sectionTitle}>Current Mission</Text>
        <Text variant="body" style={styles.missionTitle}>
          Exploring the Geometry Galaxy
        </Text>
        <ProgressBar
          progress={0.7}
          variant="gradient"
          height={8}
          style={styles.progressBar}
        />
        <Text variant="caption" style={styles.progressText}>
          7/10 Challenges Completed
        </Text>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Missions' as never)}
        >
          <Text variant="body" style={styles.buttonText}>
            Continue Mission
          </Text>
          <Ionicons
            name="arrow-forward"
            size={20}
            color={theme.colors.text.primary}
          />
        </TouchableOpacity>
      </Card>

      {/* Quick Access Section */}
      <View style={styles.quickAccessContainer}>
        <Text variant="h3" style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.quickAccessGrid}>
          <TouchableOpacity
            style={styles.quickAccessItem}
            onPress={() => navigation.navigate('GalaxyMap' as never)}
          >
            <Card variant="outlined" style={styles.quickAccessCard}>
              <Ionicons
                name="map"
                size={32}
                color={theme.colors.accent.aqua}
              />
              <Text variant="body" style={styles.quickAccessText}>
                Galaxy Map
              </Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAccessItem}
            onPress={() => navigation.navigate('Missions' as never)}
          >
            <Card variant="outlined" style={styles.quickAccessCard}>
              <Ionicons
                name="rocket"
                size={32}
                color={theme.colors.accent.magenta}
              />
              <Text variant="body" style={styles.quickAccessText}>
                Missions
              </Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAccessItem}
            onPress={() => navigation.navigate('Profile' as never)}
          >
            <Card variant="outlined" style={styles.quickAccessCard}>
              <Ionicons
                name="trophy"
                size={32}
                color={theme.colors.accent.yellow}
              />
              <Text variant="body" style={styles.quickAccessText}>
                Achievements
              </Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAccessItem}
            onPress={() => navigation.navigate('Profile' as never)}
          >
            <Card variant="outlined" style={styles.quickAccessCard}>
              <Ionicons
                name="settings"
                size={32}
                color={theme.colors.accent.emerald}
              />
              <Text variant="body" style={styles.quickAccessText}>
                Settings
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
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
  userStatsContainer: {
    marginBottom: theme.spacing.xl,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  userInfo: {
    marginLeft: theme.spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
    alignItems: 'center',
  },
  statValue: {
    color: theme.colors.accent.aqua,
    marginBottom: theme.spacing.xs,
  },
  missionCard: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    marginBottom: theme.spacing.md,
  },
  missionTitle: {
    marginBottom: theme.spacing.sm,
  },
  progressBar: {
    marginVertical: theme.spacing.sm,
  },
  progressText: {
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.accent.aqua,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  buttonText: {
    color: theme.colors.text.primary,
    marginRight: theme.spacing.sm,
  },
  quickAccessContainer: {
    marginBottom: theme.spacing.xl,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing.xs,
  },
  quickAccessItem: {
    width: '50%',
    padding: theme.spacing.xs,
  },
  quickAccessCard: {
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  quickAccessText: {
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
}); 