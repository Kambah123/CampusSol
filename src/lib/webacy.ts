// Campus SOL Starter - Webacy Security Integration
// Utility for wallet health and transaction risk analysis

import { WebacyClient, Chain } from '@webacy-xyz/sdk';

const apiKey = import.meta.env.VITE_WEBACY_API_KEY;

// Initialize Webacy Client
export const webacy = apiKey ? new WebacyClient({ apiKey }) : null;

export interface RiskStatus {
  status: 'Critical' | 'Medium' | 'Safe' | 'Unknown';
  score: number;
  color: string;
  message: string;
}

/**
 * Analyzes a Solana address for security risks using Webacy DD.xyz API
 */
export const checkWalletSafety = async (userAddress: string): Promise<RiskStatus> => {
  if (!webacy) {
    return {
      status: 'Unknown',
      score: 0,
      color: 'gray',
      message: 'Webacy API not configured.'
    };
  }

  try {
    const risk = await webacy.threat.addresses.analyze(userAddress, { chain: Chain.SOL });
    const score = risk.overallRisk || 0;

    if (score > 70) {
      return {
        status: 'Critical',
        score,
        color: 'red',
        message: 'Omo! This wallet is flagged. Use a fresh one for your safety.'
      };
    } else if (score > 30) {
      return {
        status: 'Medium',
        score,
        color: 'orange',
        message: 'Caution: Some risky history detected. Stay alert!'
      };
    }

    return {
      status: 'Safe',
      score,
      color: 'green',
      message: 'Your bag is secure! You are ready to explore the Solana ecosystem.'
    };
  } catch (error) {
    console.error("Webacy API Error:", error);
    return {
      status: 'Unknown',
      score: 0,
      color: 'gray',
      message: 'Unable to verify wallet safety at this time.'
    };
  }
};

/**
 * Checks for transaction risks (e.g., before swap or payment)
 */
export const analyzeTransactionRisk = async (toAddress: string): Promise<boolean> => {
  if (!webacy) return true; // Assume safe if not configured

  try {
    const risk = await webacy.threat.addresses.analyze(toAddress, { chain: Chain.SOL });
    const score = risk.overallRisk || 0;
    return score < 50; // Return true if relatively safe
  } catch (error) {
    console.error("Webacy Transaction Risk Error:", error);
    return true; // Default to allowing if API fails
  }
};
