import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface Achievement {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  icon: string;
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface LearningProgress {
  userId: string;
  totalPoints: number;
  currentLevel: number;
  completedLessons: string[];
  achievements: Achievement[];
  streakDays: number;
  lastActiveDate: Date;
  timeSpent: number; // in minutes
}

interface LearningState {
  progress: LearningProgress;
  isLoading: boolean;
  error: string | null;
}

type LearningAction = 
  | { type: 'LESSON_COMPLETED'; lessonId: string; points: number }
  | { type: 'ACHIEVEMENT_UNLOCKED'; achievement: Achievement }
  | { type: 'STREAK_UPDATED'; days: number }
  | { type: 'TIME_TRACKED'; minutes: number }
  | { type: 'PROGRESS_LOADED'; progress: LearningProgress }
  | { type: 'ERROR'; error: string };

const initialState: LearningState = {
  progress: {
    userId: '',
    totalPoints: 0,
    currentLevel: 1,
    completedLessons: [],
    achievements: [],
    streakDays: 0,
    lastActiveDate: new Date(),
    timeSpent: 0
  },
  isLoading: false,
  error: null
};

function learningReducer(state: LearningState, action: LearningAction): LearningState {
  switch (action.type) {
    case 'LESSON_COMPLETED':
      const newPoints = state.progress.totalPoints + action.points;
      const newLevel = Math.floor(newPoints / 1000) + 1;
      
      return {
        ...state,
        progress: {
          ...state.progress,
          totalPoints: newPoints,
          currentLevel: newLevel,
          completedLessons: [...state.progress.completedLessons, action.lessonId]
        }
      };
      
    case 'ACHIEVEMENT_UNLOCKED':
      return {
        ...state,
        progress: {
          ...state.progress,
          achievements: [
            ...state.progress.achievements.filter(a => a.id !== action.achievement.id),
            { ...action.achievement, unlocked: true, unlockedAt: new Date() }
          ],
          totalPoints: state.progress.totalPoints + action.achievement.points
        }
      };
      
    case 'STREAK_UPDATED':
      return {
        ...state,
        progress: {
          ...state.progress,
          streakDays: action.days,
          lastActiveDate: new Date()
        }
      };
      
    case 'TIME_TRACKED':
      return {
        ...state,
        progress: {
          ...state.progress,
          timeSpent: state.progress.timeSpent + action.minutes
        }
      };
      
    case 'PROGRESS_LOADED':
      return {
        ...state,
        progress: action.progress,
        isLoading: false
      };
      
    case 'ERROR':
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
      
    default:
      return state;
  }
}

const LearningContext = createContext<{
  state: LearningState;
  dispatch: React.Dispatch<LearningAction>;
  completeLesson: (lessonId: string, points: number) => void;
  unlockAchievement: (achievement: Achievement) => void;
  trackTime: (minutes: number) => void;
} | null>(null);

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(learningReducer, initialState);

  // Load progress from localStorage or API
  useEffect(() => {
    const savedProgress = localStorage.getItem('react-bangla-progress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        dispatch({ type: 'PROGRESS_LOADED', progress });
      } catch (error) {
        dispatch({ type: 'ERROR', error: 'Failed to load progress' });
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('react-bangla-progress', JSON.stringify(state.progress));
  }, [state.progress]);

  const completeLesson = (lessonId: string, points: number) => {
    if (!state.progress.completedLessons.includes(lessonId)) {
      dispatch({ type: 'LESSON_COMPLETED', lessonId, points });
      
      // Check for achievements
      checkAchievements(state.progress.completedLessons.length + 1, state.progress.totalPoints + points);
    }
  };

  const unlockAchievement = (achievement: Achievement) => {
    dispatch({ type: 'ACHIEVEMENT_UNLOCKED', achievement });
  };

  const trackTime = (minutes: number) => {
    dispatch({ type: 'TIME_TRACKED', minutes });
  };

  const checkAchievements = (lessonsCompleted: number, totalPoints: number) => {
    const achievements: Achievement[] = [
      {
        id: 'first-lesson',
        title: 'First Steps',
        titleBn: 'প্রথম পদক্ষেপ',
        description: 'Complete your first lesson',
        descriptionBn: 'আপনার প্রথম পাঠ সম্পন্ন করুন',
        icon: '🎯',
        points: 100,
        unlocked: false
      },
      {
        id: 'react-novice',
        title: 'React Novice',
        titleBn: 'React নতুন',
        description: 'Complete 5 lessons',
        descriptionBn: '৫টি পাঠ সম্পন্ন করুন',
        icon: '🌱',
        points: 250,
        unlocked: false
      },
      {
        id: 'component-master',
        title: 'Component Master',
        titleBn: 'কম্পোনেন্ট মাস্টার',
        description: 'Complete all UI lessons',
        descriptionBn: 'সকল UI পাঠ সম্পন্ন করুন',
        icon: '🏗️',
        points: 500,
        unlocked: false
      }
    ];

    achievements.forEach(achievement => {
      let shouldUnlock = false;
      
      switch (achievement.id) {
        case 'first-lesson':
          shouldUnlock = lessonsCompleted >= 1;
          break;
        case 'react-novice':
          shouldUnlock = lessonsCompleted >= 5;
          break;
        case 'component-master':
          shouldUnlock = lessonsCompleted >= 10;
          break;
      }
      
      if (shouldUnlock && !state.progress.achievements.find(a => a.id === achievement.id)?.unlocked) {
        unlockAchievement(achievement);
      }
    });
  };

  return (
    <LearningContext.Provider value={{
      state,
      dispatch,
      completeLesson,
      unlockAchievement,
      trackTime
    }}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}

export type { Achievement, LearningProgress, LearningState };