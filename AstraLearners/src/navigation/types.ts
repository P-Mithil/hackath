import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Loading: undefined;
  Onboarding: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type MainTabParamList = {
  Home: undefined;
  GalaxyMap: undefined;
  Missions: undefined;
  Profile: undefined;
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  AvatarCustomization: undefined;
  LearnerShipSelection: undefined;
};

export type GalaxyMapStackParamList = {
  GalaxyOverview: undefined;
  SubjectDetails: {
    subjectId: string;
    subjectName: string;
  };
  TopicDetails: {
    topicId: string;
    topicName: string;
  };
};

export type MissionsStackParamList = {
  MissionsList: undefined;
  MissionDetails: {
    missionId: string;
    missionName: string;
  };
  Quiz: {
    quizId: string;
    quizName: string;
  };
  Results: {
    quizId: string;
    score: number;
  };
};

export type ProfileStackParamList = {
  ProfileOverview: undefined;
  Achievements: undefined;
  Settings: undefined;
  LearnerShipBay: undefined;
}; 