// Campus SOL Starter - Quiz Questions (Nigeria-Focused)
// Topics: Stablecoins, Remittances, Solana Basics, Nigeria Context

import type { QuizQuestion } from '@/types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Why is USDC particularly useful for Nigerians receiving money from abroad?",
    options: [
      "It can only be used in Nigeria",
      "It's fast, stable, and avoids bank delays & high fees",
      "It's controlled by the Nigerian government",
      "It requires a special bank account"
    ],
    correctAnswer: 1,
    explanation: "USDC maintains a stable $1 value and settles in seconds, unlike traditional bank transfers that can take days with high fees."
  },
  {
    id: 2,
    question: "What is the main advantage of Solana for micro-transactions?",
    options: [
      "It requires minimum $100 transactions",
      "Transaction fees are less than $0.01",
      "It's only available in Nigeria",
      "It takes 3-5 business days"
    ],
    correctAnswer: 1,
    explanation: "Solana's ultra-low fees (fractions of a cent) make it perfect for small payments and micro-rewards."
  },
  {
    id: 3,
    question: "How does USDC protect against Naira volatility?",
    options: [
      "It's pegged to the Nigerian Naira",
      "It's pegged 1:1 to the US Dollar",
      "Its value changes daily",
      "It's backed by Nigerian banks"
    ],
    correctAnswer: 1,
    explanation: "USDC is a stablecoin pegged to the US Dollar, protecting your money from currency fluctuations."
  },
  {
    id: 4,
    question: "What is a 'public key' in Solana?",
    options: [
      "Your password to access the network",
      "Your wallet address that receives funds",
      "A secret code you must never share",
      "Your bank account number"
    ],
    correctAnswer: 1,
    explanation: "Your public key is like your account number - you can safely share it to receive SOL and tokens."
  },
  {
    id: 5,
    question: "Which of these is a Nigerian use case for Solana Pay?",
    options: [
      "Only for buying cars",
      "Instant payments at campus canteens & shops",
      "International wire transfers only",
      "Stock market trading"
    ],
    correctAnswer: 1,
    explanation: "Solana Pay enables instant, low-fee payments perfect for everyday campus transactions."
  },
  {
    id: 6,
    question: "What makes compressed NFTs special on Solana?",
    options: [
      "They cost hundreds of dollars to mint",
      "They're extremely cheap to create (less than $0.01)",
      "They can only be used once",
      "They require a physical card"
    ],
    correctAnswer: 1,
    explanation: "Compressed NFTs use state compression to make minting badges and collectibles affordable for everyone."
  },
  {
    id: 7,
    question: "What should you NEVER share with anyone?",
    options: [
      "Your public wallet address",
      "Your private key or seed phrase",
      "Your Telegram username",
      "Your university name"
    ],
    correctAnswer: 1,
    explanation: "Your private key controls your funds. Never share it - not even with support staff!"
  },
  {
    id: 8,
    question: "How can Solana help Nigerian freelancers?",
    options: [
      "It can't help freelancers",
      "Receive international payments instantly with low fees",
      "Only works for full-time employees",
      "Requires a US bank account"
    ],
    correctAnswer: 1,
    explanation: "Freelancers can receive payments from clients worldwide in seconds, not days, with minimal fees."
  },
  {
    id: 9,
    question: "What is 'devnet' in Solana?",
    options: [
      "The main network with real money",
      "A test network for learning without real funds",
      "A Nigerian-only network",
      "A type of cryptocurrency"
    ],
    correctAnswer: 1,
    explanation: "Devnet is a test environment where you can practice with free SOL that has no real value."
  },
  {
    id: 10,
    question: "Why might a student choose USDC over traditional savings?",
    options: [
      "Higher volatility for bigger gains",
      "Stability and easy access to global markets",
      "Required by all universities",
      "Only option for student loans"
    ],
    correctAnswer: 1,
    explanation: "USDC offers dollar stability and global accessibility, useful for students planning to study or work abroad."
  },
  {
    id: 11,
    question: "What happens when you complete all Campus SOL Starter quests?",
    options: [
      "You get a physical certificate",
      "You mint an exclusive NFT badge",
      "You receive $1000 automatically",
      "Nothing happens"
    ],
    correctAnswer: 1,
    explanation: "Completing all quests earns you a compressed NFT badge - a permanent proof of your Solana knowledge!"
  },
  {
    id: 12,
    question: "Which wallets are popular for Solana in Nigeria?",
    options: [
      "Only MetaMask",
      "Phantom and Solflare",
      "PayPal and Venmo",
      "Only bank apps"
    ],
    correctAnswer: 1,
    explanation: "Phantom and Solflare are the most popular Solana wallets, offering great mobile apps for Nigerians."
  }
];

export const getRandomQuestions = (count: number = 10): QuizQuestion[] => {
  const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
