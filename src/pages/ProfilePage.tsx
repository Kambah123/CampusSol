// Campus SOL Starter - Profile Page with cNFT & Sharing

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';
import {
  Wallet,
  Copy,
  CheckCircle,
  Award,
  Target,
  ExternalLink,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useUserProgress } from '@/hooks/useUserProgress';
import { quests } from '@/data/quests';
import { shortenAddress } from '@/lib/solana';
import { solToNaira, formatNaira, getNaijaMessage } from '@/lib/naija';
import { createCNFTBadge, CNFT_COSTS, getGrantHighlight } from '@/lib/cnft';
import { ShareBadge } from '@/components/ShareBadge';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

// Mock university selection - in production, this comes from user profile
const USER_UNIVERSITY = "University of Lagos (UNILAG)";

export const ProfilePage = () => {
  const { connected, publicKey, disconnect } = useWallet();
  const { progress, isQuestCompleted, completedQuestsCount, totalRewards, markBadgeMinted } = useUserProgress();
  const [minted, setMinted] = useState(false);
  const [minting, setMinting] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const allQuestsCompleted = completedQuestsCount === quests.length;
  const nairaValue = solToNaira(totalRewards);

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString());
      toast.success('Address copied!');
    }
  };

  const copyReferralCode = () => {
    if (progress?.referralCode) {
      navigator.clipboard.writeText(progress.referralCode);
      toast.success('Referral code copied!');
    }
  };

  const handleMintBadge = async () => {
    if (!allQuestsCompleted) {
      toast.error('Complete all quests first!');
      return;
    }

    setMinting(true);
    try {
      // Use wallet adapter instead of window.solana
      const mockWallet = {
        publicKey: publicKey,
        connected: connected,
      } as any;

      const result = await createCNFTBadge(
        mockWallet,
        progress?.firstName || 'Pioneer',
        USER_UNIVERSITY,
        1
      );

      if (result.signature) {
        setMinted(true);
        markBadgeMinted();

        // Show cNFT cost info
        toast.success(getNaijaMessage('badgeMinted'), {
          description: `Minted for only ${result.cost} SOL! ${getGrantHighlight(10000)}`,
        });

        // Confetti celebration
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#A855F7', '#10B981', '#FFD700'],
        });

        // Show share modal after minting
        setTimeout(() => setShowShare(true), 1000);
      }
    } catch (error) {
      toast.error('Failed to mint badge');
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="animate-slide-up">
      {/* User Card */}
      <section className="px-4 pt-6 pb-4">
        <div className="glass-card p-6 text-center">
          {/* Avatar */}
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-br from-[#A855F7] to-[#10B981]">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${progress?.userId || 'guest'}`}
                alt="Avatar"
                className="w-full h-full rounded-full bg-[#0F0F1E]"
              />
            </div>
            {allQuestsCompleted && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-[#0F0F1E]">
                <Award className="w-4 h-4 text-black" />
              </div>
            )}
          </div>

          {/* Name */}
          <h1 className="text-xl font-bold text-white mb-1">
            {progress?.firstName || progress?.username || 'Campus Pioneer'}
          </h1>

          {/* University Badge */}
          <div className="mb-3">
            <span className="badge badge-purple text-xs">
              {USER_UNIVERSITY}
            </span>
          </div>

          {/* Wallet Address */}
          {connected ? (
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#64748B] font-mono text-sm">
                {shortenAddress(publicKey?.toString() || '')}
              </span>
              <button
                onClick={copyAddress}
                className="text-[#64748B] hover:text-[#A855F7] transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <p className="text-[#64748B] text-sm mb-4">Connect wallet to start</p>
          )}

          {/* Connect/Disconnect Button */}
          {connected ? (
            <button
              onClick={disconnect}
              className="btn-secondary w-full"
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          ) : (
            <WalletMultiButton className="w-full" />
          )}
        </div>
      </section>

      {/* Statistics Grid */}
      <section className="px-4 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Statistics</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="glass-card p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-2">
              <Wallet className="w-5 h-5 text-[#10B981]" />
            </div>
            <p className="text-xl font-bold text-white">{totalRewards.toFixed(3)}</p>
            <p className="text-[#10B981] text-xs">{formatNaira(nairaValue)}</p>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-2">
              <Target className="w-5 h-5 text-[#A855F7]" />
            </div>
            <p className="text-xl font-bold text-white">{completedQuestsCount}</p>
            <p className="text-[#64748B] text-xs">Quests Done</p>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-xl font-bold text-white">{minted ? 1 : 0}</p>
            <p className="text-[#64748B] text-xs">Badges</p>
          </div>
        </div>
      </section>

      {/* Badge Section */}
      <section className="px-4 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Your Badge</h2>

        {allQuestsCompleted ? (
          <div className="relative">
            {/* Animated Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#A855F7] via-[#10B981] to-[#A855F7] rounded-3xl animate-pulse opacity-50" />

            <div className="relative glass-card p-8 text-center m-[2px]">
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-[#A855F7] to-[#EC4899] rounded-3xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Sparkles className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Campus SOL Pioneer</h3>
              <p className="text-[#A0AEC0] text-sm mb-2">{USER_UNIVERSITY}</p>
              <p className="text-[#64748B] text-xs mb-4">Level 1 Certified</p>

              {/* cNFT Cost Info */}
              <div className="p-3 bg-white/5 rounded-xl mb-4">
                <p className="text-[#A0AEC0] text-xs">
                  💰 Mint cost: <span className="text-[#10B981]">{CNFT_COSTS.perMint} SOL</span>
                </p>
                <p className="text-[#64748B] text-[10px] mt-1">
                  {getGrantHighlight(10000)}
                </p>
              </div>

              {minted ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-[#10B981]">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Minted on Solana</span>
                  </div>
                  <button
                    onClick={() => setShowShare(true)}
                    className="btn-primary w-full"
                  >
                    Share Your Achievement
                  </button>
                </div>
              ) : (
                <button
                  className="btn-primary w-full"
                  onClick={handleMintBadge}
                  disabled={minting}
                >
                  {minting ? 'Minting...' : 'Mint NFT Badge'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="glass-card p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-white/5 rounded-3xl flex items-center justify-center">
              <Award className="w-12 h-12 text-[#64748B]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Badge Locked</h3>
            <p className="text-[#64748B] text-sm mb-4">
              Complete all {quests.length} quests to unlock your badge
            </p>

            {/* Progress */}
            <div className="progress-bar mb-2">
              <div
                className="progress-fill"
                style={{ width: `${(completedQuestsCount / quests.length) * 100}%` }}
              />
            </div>
            <p className="text-[#64748B] text-xs">
              {completedQuestsCount}/{quests.length} quests completed
            </p>
          </div>
        )}
      </section>

      {/* Share Badge Modal */}
      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md">
            <ShareBadge
              userName={progress?.firstName || 'Pioneer'}
              university={USER_UNIVERSITY}
              badgeLevel={1}
              solEarned={totalRewards}
              questCount={completedQuestsCount}
            />
            <button
              onClick={() => setShowShare(false)}
              className="btn-secondary w-full mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Quest Progress */}
      <section className="px-4 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Quest Progress</h2>
        <div className="scroll-container -mx-4 px-4">
          {quests.map((quest) => {
            const completed = isQuestCompleted(quest.id);
            return (
              <div
                key={quest.id}
                className={`scroll-item w-[140px] glass-card p-4 ${
                  completed ? 'border-green-500/30' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  completed ? 'bg-green-500/20' : 'bg-white/5'
                }`}>
                  {completed ? (
                    <CheckCircle className="w-5 h-5 text-[#10B981]" />
                  ) : (
                    <Target className="w-5 h-5 text-[#64748B]" />
                  )}
                </div>
                <p className={`text-sm font-medium truncate ${
                  completed ? 'text-green-400' : 'text-white'
                }`}>
                  {quest.title}
                </p>
                {completed && (
                  <p className="text-[#10B981] text-xs mt-1">Completed</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Referral Code */}
      <section className="px-4 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Refer Friends</h2>
        <div className="glass-card p-4">
          <p className="text-[#64748B] text-sm mb-3">Your Referral Code</p>
          <div className="flex gap-2">
            <code className="flex-1 p-3 bg-white/5 rounded-xl font-mono text-white text-center">
              {progress?.referralCode}
            </code>
            <button
              onClick={copyReferralCode}
              className="btn-secondary px-4"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[#64748B] text-xs mt-3">
            Share with your guys! You both earn bonus rewards when they complete Quest 1.
          </p>
        </div>
      </section>

      {/* Actions */}
      <section className="px-4 pb-32">
        <h2 className="text-lg font-semibold text-white mb-4">Actions</h2>
        <div className="space-y-3">
          <a
            href={`https://explorer.solana.com/address/${publicKey?.toString()}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-4 flex items-center justify-between hover:border-[#A855F7]/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-[#06B6D4]" />
              </div>
              <span className="text-white font-medium">View on Explorer</span>
            </div>
            <ExternalLink className="w-5 h-5 text-[#64748B]" />
          </a>
        </div>
      </section>
    </div>
  );
};
