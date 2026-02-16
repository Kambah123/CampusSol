import { hapticFeedback } from '@telegram-apps/sdk';

export const useHaptic = () => {
  const impact = (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'medium') => {
    try {
      if (hapticFeedback.impactOccurred.isSupported()) {
        hapticFeedback.impactOccurred(style);
      }
    } catch {
      // Ignore
    }
  };

  const notification = (type: 'error' | 'success' | 'warning') => {
    try {
      if (hapticFeedback.notificationOccurred.isSupported()) {
        hapticFeedback.notificationOccurred(type);
      }
    } catch {
      // Ignore
    }
  };

  const selection = () => {
    try {
      if (hapticFeedback.selectionChanged.isSupported()) {
        hapticFeedback.selectionChanged();
      }
    } catch {
      // Ignore
    }
  };

  return { impact, notification, selection };
};
