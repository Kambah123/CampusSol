// Campus SOL Starter - Telegram Utilities

import type { TelegramUser } from '@/types';

// Check if running in Telegram
export const isTelegramEnvironment = (): boolean => {
  // Check for Telegram WebApp object
  return typeof window !== 'undefined' &&
    (window as any).Telegram?.WebApp !== undefined;
};

// Get Telegram user data
export const getTelegramUser = (): TelegramUser | null => {
  try {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      const user = tg.initDataUnsafe.user;
      return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        language_code: user.language_code,
        is_premium: user.is_premium,
      };
    }
    return null;
  } catch (error) {
    console.log('Not running in Telegram environment');
    return null;
  }
};

// Generate referral code
export const generateReferralCode = (userId: string): string => {
  return `CAMPUS${userId.slice(-6)}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
};

// Share message templates
export const getShareMessage = (username?: string, badgeName?: string): string => {
  const name = username || 'I';
  const badge = badgeName || 'my Campus SOL Pioneer badge';

  return encodeURIComponent(
    `🎓 ${name} just earned ${badge} on Campus SOL Starter!\n\n` +
    `🇳🇬 Learning Solana basics, earning real rewards, and joining Nigeria\'s Web3 campus revolution!\n\n` +
    `💰 Complete quests, earn SOL/USDC, and mint your NFT badge!\n\n` +
    `👉 Join now: https://t.me/CampusSolNaijaBot`
  );
};

// Share URLs
export const getShareUrls = (username?: string, badgeName?: string) => {
  const message = getShareMessage(username, badgeName);

  return {
    twitter: `https://twitter.com/intent/tweet?text=${message}`,
    whatsapp: `https://wa.me/?text=${message}`,
    telegram: `https://t.me/share/url?url=https://t.me/CampusSolNaijaBot&text=${message}`,
  };
};

// Storage helpers (with Telegram cloud storage fallback)
export const storage = {
  get: (key: string): any => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
};

// Progress storage keys
export const STORAGE_KEYS = {
  USER_PROGRESS: 'campus_sol_progress',
  LEADERBOARD: 'campus_sol_leaderboard',
  REFERRALS: 'campus_sol_referrals',
};
