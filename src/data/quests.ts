// Campus SOL Starter - Quest Definitions

import type { Quest } from '@/types';

export const quests: Quest[] = [
  {
    id: 1,
    title: "Connect Your Wallet",
    description: "Link your Phantom or Solflare wallet to get started on your Solana journey!",
    reward: 0.001,
    rewardToken: 'SOL',
    completed: false,
    icon: "Wallet"
  },
  {
    id: 2,
    title: "Send Your First Transaction",
    description: "Send a micro-transaction (0.0001 SOL) to verify your wallet and learn how transfers work.",
    reward: 0.002,
    rewardToken: 'SOL',
    completed: false,
    icon: "Send"
  },
  {
    id: 3,
    title: "Swap to USDC",
    description: "Use Jupiter to swap some SOL to USDC stablecoin - your first step into stable digital dollars!",
    reward: 0.003,
    rewardToken: 'SOL',
    completed: false,
    icon: "ArrowLeftRight"
  },
  {
    id: 4,
    title: "Solana Pay Demo",
    description: "Generate a Solana Pay QR code and experience the future of instant payments.",
    reward: 0.004,
    rewardToken: 'SOL',
    completed: false,
    icon: "QrCode"
  },
  {
    id: 5,
    title: "Master the Quiz",
    description: "Test your knowledge about Solana, stablecoins, and remittances with 10 questions!",
    reward: 0.01,
    rewardToken: 'SOL',
    completed: false,
    icon: "Brain"
  }
];

export const getTotalRewards = (): number => {
  return quests.reduce((total, quest) => total + quest.reward, 0);
};

export const getQuestById = (id: number): Quest | undefined => {
  return quests.find(q => q.id === id);
};
