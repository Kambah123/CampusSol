// Campus SOL Starter - User Progress Hook with Network Resiliency
// Saves progress to localStorage for Nigerian users with spotty internet

import { useState, useEffect, useCallback } from 'react';
import type { UserProgress, LeaderboardEntry } from '@/types';
import { generateReferralCode, getTelegramUser } from '@/lib/telegram';
import { saveProgress, loadProgress, saveLeaderboardEntry, loadLeaderboard } from '@/lib/storage';

const defaultProgress = (userId: string): UserProgress => ({
  userId,
  questsCompleted: [],
  totalRewards: 0,
  quizScore: 0,
  badgeMinted: false,
  referralCode: generateReferralCode(userId),
  referrals: [],
  joinedAt: new Date().toISOString(),
  lastActive: new Date().toISOString(),
});

export const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastActiveQuest, setLastActiveQuest] = useState<number | null>(null);

  // Initialize user progress with localStorage persistence
  useEffect(() => {
    const initProgress = () => {
      const telegramUser = getTelegramUser();
      const userId = telegramUser?.id?.toString() || `guest_${Date.now()}`;

      // Try to load from localStorage first (Network Resiliency)
      const stored = loadProgress();

      if (stored && stored.userId === userId) {
        // Restore progress from storage
        setProgress({
          ...stored,
          lastActive: new Date().toISOString(),
        });

        // Check if user was mid-quest
        const lastQuest = stored.questsCompleted.length > 0
          ? Math.max(...stored.questsCompleted)
          : 0;
        if (lastQuest < 5) {
          setLastActiveQuest(lastQuest + 1);
        }

        console.log('🔄 Restored progress from localStorage');
      } else {
        // Create new progress
        const newProgress = defaultProgress(userId);
        if (telegramUser) {
          newProgress.username = telegramUser.username;
          newProgress.firstName = telegramUser.first_name;
          newProgress.lastName = telegramUser.last_name;
        }
        setProgress(newProgress);
        saveProgress(newProgress);
        console.log('✨ Created new progress');
      }
      setLoading(false);
    };

    initProgress();
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    if (progress) {
      saveProgress(progress);
      saveLeaderboardEntry({
        userId: progress.userId,
        username: progress.username || 'Anonymous',
        firstName: progress.firstName || 'Campus',
        questsCompleted: progress.questsCompleted.length,
        totalRewards: progress.totalRewards,
        badgeMinted: progress.badgeMinted,
      });
    }
  }, [progress]);

  // Complete a quest
  const completeQuest = useCallback((questId: number, reward: number) => {
    setProgress((prev) => {
      if (!prev) return null;
      if (prev.questsCompleted.includes(questId)) return prev;

      const updated = {
        ...prev,
        questsCompleted: [...prev.questsCompleted, questId],
        totalRewards: prev.totalRewards + reward,
        lastActive: new Date().toISOString(),
      };

      // Immediately save to localStorage
      saveProgress(updated);
      console.log(`✅ Quest ${questId} completed and saved!`);

      return updated;
    });
  }, []);

  // Check if quest is completed
  const isQuestCompleted = useCallback((questId: number): boolean => {
    return progress?.questsCompleted.includes(questId) || false;
  }, [progress]);

  // Set wallet address
  const setWalletAddress = useCallback((address: string) => {
    setProgress((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        walletAddress: address,
        lastActive: new Date().toISOString(),
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  // Set quiz score
  const setQuizScore = useCallback((score: number) => {
    setProgress((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        quizScore: score,
        lastActive: new Date().toISOString(),
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  // Mark badge as minted
  const markBadgeMinted = useCallback(() => {
    setProgress((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        badgeMinted: true,
        lastActive: new Date().toISOString(),
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  // Add referral
  const addReferral = useCallback((referredUserId: string) => {
    setProgress((prev) => {
      if (!prev) return null;
      if (prev.referrals.includes(referredUserId)) return prev;

      const updated = {
        ...prev,
        referrals: [...prev.referrals, referredUserId],
        lastActive: new Date().toISOString(),
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  // Get completed quests count
  const completedQuestsCount = progress?.questsCompleted.length || 0;

  // Get total rewards
  const totalRewards = progress?.totalRewards || 0;

  return {
    progress,
    loading,
    lastActiveQuest,
    completeQuest,
    isQuestCompleted,
    setWalletAddress,
    setQuizScore,
    markBadgeMinted,
    addReferral,
    completedQuestsCount,
    totalRewards,
  };
};

// Get leaderboard from localStorage
export const getLeaderboard = (): LeaderboardEntry[] => {
  return loadLeaderboard();
};
