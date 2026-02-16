// Campus SOL Starter - Type Definitions

export interface UserProgress {
  userId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  walletAddress?: string;
  questsCompleted: number[];
  totalRewards: number;
  quizScore: number;
  badgeMinted: boolean;
  referralCode: string;
  referrals: string[];
  joinedAt: string;
  lastActive: string;
}

export interface Quest {
  id: number;
  title: string;
  description: string;
  reward: number;
  rewardToken: 'SOL' | 'USDC';
  completed: boolean;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  firstName: string;
  questsCompleted: number;
  totalRewards: number;
  badgeMinted: boolean;
}

export interface NFTBadge {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

export type QuestStep =
  | 'welcome'
  | 'quest1-connect'
  | 'quest2-webacy'
  | 'quest3-send'
  | 'quest4-swap'
  | 'quest5-pay'
  | 'quest6-quiz'
  | 'completion'
  | 'leaderboard';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}
