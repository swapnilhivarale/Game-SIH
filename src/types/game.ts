export type GameLevelType = 'quiz' | 'puzzle';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export interface MatchPair {
  id: string;
  term: string;
  description: string;
}

export interface WordScrambleItem {
  id: string;
  scrambled: string;
  solution: string;
  clue: string;
  hint: string;
}

export interface LevelConfig {
  id: number;
  chapterId: 1 | 2;
  levelNumberInChapter: 1 | 2 | 3;
  title: string;
  subtitle: string;
  type: GameLevelType;
  instructions: string;
  questions?: QuizQuestion[];
  matchPairs?: MatchPair[];
  scrambleItems?: WordScrambleItem[];
  quoteSentence?: {
    words: string[];
    solution: string;
    context: string;
    hint: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
  points: number;
}

export interface PlayerStats {
  score: number;
  streak: number;
  maxStreak: number;
  hintsUsed: number;
  completedLevels: number[];
  levelScores: Record<number, number>;
  unlockedAchievements: string[];
}
