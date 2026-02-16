// Campus SOL Starter - Storage Utilities
// Network Resiliency: Persist quest progress for Nigerian users with spotty internet

import type { UserProgress } from '@/types';

const STORAGE_KEY = 'campus_sol_progress_v1';
const LEADERBOARD_KEY = 'campus_sol_leaderboard_v1';

// Save progress to localStorage
export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    console.log('💾 Progress saved to localStorage');
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

// Load progress from localStorage
export const loadProgress = (): UserProgress | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const progress = JSON.parse(stored) as UserProgress;
      console.log('📂 Progress loaded from localStorage');
      return progress;
    }
  } catch (error) {
    console.error('Failed to load progress:', error);
  }
  return null;
};

// Clear progress (for logout/reset)
export const clearProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('🗑️ Progress cleared from localStorage');
  } catch (error) {
    console.error('Failed to clear progress:', error);
  }
};

// Save leaderboard entry
export const saveLeaderboardEntry = (entry: any): void => {
  try {
    const existing = localStorage.getItem(LEADERBOARD_KEY);
    const leaderboard = existing ? JSON.parse(existing) : [];

    // Update or add entry
    const index = leaderboard.findIndex((e: any) => e.userId === entry.userId);
    if (index >= 0) {
      leaderboard[index] = entry;
    } else {
      leaderboard.push(entry);
    }

    // Sort by SOL earned
    leaderboard.sort((a: any, b: any) => b.totalRewards - a.totalRewards);

    // Keep top 100
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard.slice(0, 100)));
  } catch (error) {
    console.error('Failed to save leaderboard:', error);
  }
};

// Load leaderboard
export const loadLeaderboard = (): any[] => {
  try {
    const stored = localStorage.getItem(LEADERBOARD_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load leaderboard:', error);
    return [];
  }
};

// Check if user was mid-quest (for network recovery)
export const getLastActiveQuest = (): number | null => {
  const progress = loadProgress();
  if (progress && progress.questsCompleted.length > 0) {
    // Return the last completed quest + 1 (next quest)
    const lastCompleted = Math.max(...progress.questsCompleted);
    return lastCompleted < 5 ? lastCompleted + 1 : null;
  }
  return null;
};

// Export for debugging
(window as any).campusStorage = {
  saveProgress,
  loadProgress,
  clearProgress,
  getLastActiveQuest,
};
