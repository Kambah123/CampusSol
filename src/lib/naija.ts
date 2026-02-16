// Campus SOL Starter - Naija-Localized Utilities
// Localized UX for Nigerian users

// Mock NGN conversion rate (Parallel Market estimate)
// In production, this would come from an API
const SOL_TO_NGN_RATE = 285000; // ~$190 * ₦1,500 (parallel market rate)

// Convert SOL to Naira
export const solToNaira = (solAmount: number): number => {
  return Math.round(solAmount * SOL_TO_NGN_RATE);
};

// Format Naira amount
export const formatNaira = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Naija-flavored success messages
export const naijaMessages = {
  questCompleted: [
    "Oshey! Quest completed! 🎉",
    "Your bag is secured! 💰",
    "E choke! Reward don land! 🚀",
    "We meuve! Quest done! 💪",
    "Soft work! You did it! ✨",
  ],
  walletConnected: [
    "Wallet connected! You dey game! 🔥",
    "Connected! Let's make this money! 💸",
  ],
  badgeMinted: [
    "Certified Campus SOL Pioneer! Big flex! 🏆",
    "Your badge don land! You be boss! 👑",
    "NFT secured! You're now a Web3 Oga! 🎓",
  ],
  quizPassed: [
    "Brain full! You sabi this thing! 🧠",
    "Correct! Your head dey there! ✅",
  ],
  quizFailed: [
    "No wahala! Try again, you go get am! 💪",
    "Almost there! No give up! 🙌",
  ],
  referral: [
    "Share with your guys! Make una chop together! 🤝",
    "Tell your people! Let's grow the community! 🌍",
  ],
  transactionSuccess: [
    "Payment confirmed! Transaction don land! ✅",
    "Done deal! Your transfer complete! 🚀",
  ],
};

// Get random Naija message
export const getNaijaMessage = (type: keyof typeof naijaMessages): string => {
  const messages = naijaMessages[type];
  return messages[Math.floor(Math.random() * messages.length)];
};

// University list for Nigeria
export const nigerianUniversities = [
  "University of Lagos (UNILAG)",
  "University of Ibadan (UI)",
  "Obafemi Awolowo University (OAU)",
  "University of Nigeria, Nsukka (UNN)",
  "Ahmadu Bello University (ABU)",
  "University of Benin (UNIBEN)",
  "Lagos State University (LASU)",
  "Covenant University",
  "Babcock University",
  "University of Port Harcourt (UNIPORT)",
  "Federal University of Technology, Akure (FUTA)",
  "Federal University of Technology, Minna (FUTMINNA)",
  "Nnamdi Azikiwe University (UNIZIK)",
  "University of Calabar (UNICAL)",
  "University of Jos (UNIJOS)",
  "Other",
];

// Extract university short name
export const getUniversityShortName = (fullName: string): string => {
  const match = fullName.match(/\(([^)]+)\)/);
  return match ? match[1] : fullName;
};

// Pidgin/Local phrases for UI
export const localPhrases = {
  loading: "Loading... dey come",
  error: "Something don happen. Try again.",
  empty: "Nothing here yet. Start your journey!",
  comingSoon: "E dey come soon!",
  connectWallet: "Connect your wallet to start",
  earnRewards: "Complete quests, collect SOL",
  shareWithFriends: "Share with your guys!",
  viewOnExplorer: "Check am for Explorer",
  disconnect: "Comot wallet",
  yourProgress: "How far you don go",
  totalEarned: "Money wey you don make",
  questsCompleted: "Quests wey you finish",
  badgeLocked: "Lock dey here. Complete quests to open!",
  badgeUnlocked: "Your badge don ready! Mint am now!",
};
