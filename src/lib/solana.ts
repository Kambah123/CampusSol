// Campus SOL Starter - Solana Utilities

import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';
import type { WalletAdapter } from '@solana/wallet-adapter-base';

// Network configuration
export const NETWORK = import.meta.env.VITE_SOLANA_NETWORK || 'devnet';
export const RPC_ENDPOINT = import.meta.env.VITE_RPC_ENDPOINT || clusterApiUrl('devnet');
export const USDC_MINT = new PublicKey(import.meta.env.VITE_USDC_MINT || '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');

// Create connection
export const getConnection = (): Connection => {
  return new Connection(RPC_ENDPOINT, 'confirmed');
};

// Get wallet balance
export const getBalance = async (publicKey: PublicKey): Promise<number> => {
  const connection = getConnection();
  const balance = await connection.getBalance(publicKey);
  return balance / LAMPORTS_PER_SOL;
};

// Get USDC balance (simplified - would need SPL token account in production)
export const getUSDCBalance = async (_publicKey: PublicKey): Promise<number> => {
  // In production, this would check the associated token account
  // For MVP, we'll track this locally or use a mock
  return 0;
};

// Request airdrop (devnet only)
export const requestAirdrop = async (publicKey: PublicKey, amount: number = 1): Promise<string> => {
  const connection = getConnection();
  const signature = await connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
  await connection.confirmTransaction(signature, 'confirmed');
  return signature;
};

// Send SOL transaction
export const sendSOL = async (
  fromWallet: WalletAdapter,
  toAddress: string,
  amount: number
): Promise<string> => {
  if (!fromWallet.publicKey) throw new Error('Wallet not connected');

  const connection = getConnection();
  const toPublicKey = new PublicKey(toAddress);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromWallet.publicKey,
      toPubkey: toPublicKey,
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );

  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = fromWallet.publicKey;

  const signature = await fromWallet.sendTransaction(transaction, connection);
  await connection.confirmTransaction(signature, 'confirmed');

  return signature;
};

// Verify transaction
export const verifyTransaction = async (signature: string): Promise<boolean> => {
  try {
    const connection = getConnection();
    const status = await connection.getSignatureStatus(signature);
    return status.value?.confirmationStatus === 'confirmed' || status.value?.confirmationStatus === 'finalized';
  } catch (error) {
    console.error('Error verifying transaction:', error);
    return false;
  }
};

// Check if transaction exists and matches criteria
export const verifySendTransaction = async (
  signature: string,
  _expectedRecipient?: string
): Promise<{ valid: boolean; details?: any }> => {
  try {
    const connection = getConnection();
    const tx = await connection.getTransaction(signature, {
      commitment: 'confirmed',
      maxSupportedTransactionVersion: 0,
    });

    if (!tx) return { valid: false };

    return { valid: true, details: tx };
  } catch (error) {
    console.error('Error verifying send transaction:', error);
    return { valid: false };
  }
};

// Create NFT Badge (simplified for MVP)
export const createBadgeNFT = async (
  wallet: WalletAdapter,
  _userName: string,
  _university: string = 'Nigeria'
): Promise<string | null> => {
  if (!wallet.publicKey) return null;

  try {
    // For MVP, we'll simulate the NFT creation
    // In production, this would use Metaplex Bubblegum
    console.log('Minting badge NFT for:', wallet.publicKey.toString());

    // Simulate a transaction signature
    const mockSignature = Math.random().toString(36).substring(2, 15);
    return mockSignature;
  } catch (error) {
    console.error('Error creating NFT:', error);
    return null;
  }
};

// Get explorer URL
export const getExplorerUrl = (signature: string, type: 'tx' | 'address' = 'tx'): string => {
  const baseUrl = NETWORK === 'mainnet-beta'
    ? 'https://explorer.solana.com'
    : `https://explorer.solana.com/?cluster=${NETWORK}`;
  return `${baseUrl}/${type}/${signature}`;
};

// Shorten address for display
export const shortenAddress = (address: string, chars: number = 4): string => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};
