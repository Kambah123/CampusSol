// Campus SOL Starter - Compressed NFT (cNFT) Utilities
// Cost-efficient NFT minting using Metaplex Bubblegum

import type { WalletAdapter } from '@solana/wallet-adapter-base';

// cNFT Cost Analysis for Grant Application
export const CNFT_COSTS = {
  // Cost to mint one cNFT on devnet (effectively free)
  // On mainnet: ~0.0001 SOL per cNFT
  perMint: 0.0001,

  // Cost comparison vs regular NFT
  regularNFT: 0.01, // ~0.01 SOL for regular NFT

  // Savings calculation
  getSavings: (count: number): number => {
    const cNFTCost = CNFT_COSTS.perMint * count;
    const regularCost = CNFT_COSTS.regularNFT * count;
    return regularCost - cNFTCost;
  },

  // Cost for 10,000 students (grant highlight)
  getBulkCost: (count: number): string => {
    const cost = CNFT_COSTS.perMint * count;
    return cost.toFixed(4);
  },
};

// Generate cNFT metadata
export const generateCNFTMetadata = (
  userName: string,
  university: string,
  level: number = 1
) => {
  const shortUni = university.split('(')[1]?.replace(')', '') || university;

  return {
    name: `Campus SOL Pioneer - ${shortUni}`,
    symbol: 'CSP',
    description: `Level ${level} certification for ${userName} from ${university}. Earned by completing the Campus SOL Starter program on Solana devnet.`,
    image: `https://api.dicebear.com/7.x/identicon/svg?seed=${userName}-${shortUni}`,
    attributes: [
      {
        trait_type: 'University',
        value: university,
      },
      {
        trait_type: 'Level',
        value: level.toString(),
      },
      {
        trait_type: 'Country',
        value: 'Nigeria',
      },
      {
        trait_type: 'Program',
        value: 'Campus SOL Starter',
      },
      {
        trait_type: 'Network',
        value: 'Devnet',
      },
    ],
    properties: {
      files: [
        {
          uri: `https://api.dicebear.com/7.x/identicon/svg?seed=${userName}-${shortUni}`,
          type: 'image/svg+xml',
        },
      ],
      category: 'image',
    },
  };
};

// Create cNFT badge (simulated for MVP)
export const createCNFTBadge = async (
  wallet: WalletAdapter,
  userName: string,
  university: string = 'Nigeria',
  level: number = 1
): Promise<{ signature: string | null; metadata: any; cost: number }> => {
  if (!wallet.publicKey) {
    return { signature: null, metadata: null, cost: 0 };
  }

  try {
    // Generate metadata
    const metadata = generateCNFTMetadata(userName, university, level);

    // Simulate minting delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate mock signature
    const signature = `cnft_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

    console.log('🎨 cNFT Metadata:', metadata);
    console.log('💰 Mint Cost:', CNFT_COSTS.perMint, 'SOL');
    console.log('💡 Savings vs Regular NFT:', CNFT_COSTS.getSavings(1).toFixed(4), 'SOL');

    return {
      signature,
      metadata,
      cost: CNFT_COSTS.perMint,
    };
  } catch (error) {
    console.error('Error creating cNFT:', error);
    return { signature: null, metadata: null, cost: 0 };
  }
};

// Grant application highlight text
export const getGrantHighlight = (studentCount: number = 10000): string => {
  const cost = CNFT_COSTS.getBulkCost(studentCount);
  const savings = CNFT_COSTS.getSavings(studentCount).toFixed(2);

  return `By using State Compression (cNFTs), we can onboard ${studentCount.toLocaleString()} students for only ${cost} SOL in minting costs - a ${savings} SOL savings compared to traditional NFTs!`;
};

// Export for debugging
(window as any).cNFTUtils = {
  CNFT_COSTS,
  generateCNFTMetadata,
  createCNFTBadge,
  getGrantHighlight,
};
