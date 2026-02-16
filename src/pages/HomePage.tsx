// Campus SOL Starter - Home Page with Naija Localization

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
  Wallet,
  Target,
  Coins,
  TrendingUp,
  ChevronRight,
  Zap,
  Award,
  MapPin,
  Trophy
} from 'lucide-react';
import { useUserProgress } from '@/hooks/useUserProgress';
import { quests } from '@/data/quests';
import { shortenAddress } from '@/lib/solana';
import { solToNaira, formatNaira } from '@/lib/naija';
import type { TabType } from '@/App';

interface HomePageProps {
  onNavigate: (tab: TabType) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  const { connected, publicKey } = useWallet();
  const { progress, completedQuestsCount, totalRewards } = useUserProgress();

  const totalQuests = quests.length;
  const progressPercent = Math.round((completedQuestsCount / totalQuests) * 100);
  const nairaValue = solToNaira(totalRewards);

  return (
    <div className="animate-slide-up">
      {/* Header */}
      <header className="px-4 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-[2px]">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${progress?.userId || 'guest'}`}
              alt="Avatar"
              className="w-full h-full rounded-full bg-[#1A1A2E]"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">
                {progress?.firstName || 'Pioneer'}
              </span>
              <span className="badge badge-purple text-[10px]">
                <MapPin className="w-3 h-3" />
                Nigeria
              </span>
            </div>
            <span className="text-[#64748B] text-sm">
              {connected ? shortenAddress(publicKey?.toString() || '') : 'Not connected'}
            </span>
          </div>
        </div>
        <span className="badge badge-blue">
          <Zap className="w-3 h-3" />
          Devnet
        </span>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-6 text-center relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 relative z-10">
          Earn <span className="text-gradient">Rewards</span>
        </h1>
        <p className="text-[#A0AEC0] text-base max-w-md mx-auto mb-6 relative z-10">
          Complete quests, master crypto basics, and join Nigeria&apos;s Web3 campus revolution.
        </p>

        {!connected && (
          <div className="relative z-10">
            <p className="text-[#64748B] text-sm mb-3">Connect your wallet to start earning</p>
            <WalletMultiButton className="w-full max-w-sm mx-auto" />
          </div>
        )}
      </section>

      {/* Navigation Tabs */}
      <section className="px-4 mb-6">
        <div className="glass-card p-1 flex">
          {['Quests', 'Rewards', 'Badges'].map((tab, idx) => (
            <button
              key={tab}
              onClick={() => onNavigate(tab.toLowerCase() as TabType)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                idx === 0
                  ? 'bg-[#A855F7] text-white'
                  : 'text-[#A0AEC0] hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Progress Stats */}
      <section className="px-4 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Your Progress</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="glass-card p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-2">
              <Target className="w-5 h-5 text-[#A855F7]" />
            </div>
            <p className="text-2xl font-bold text-white">{completedQuestsCount}</p>
            <p className="text-[#64748B] text-xs">Quests Done</p>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-2">
              <Coins className="w-5 h-5 text-[#10B981]" />
            </div>
            <p className="text-2xl font-bold text-white">{totalRewards.toFixed(3)}</p>
            <p className="text-[#10B981] text-xs">~{formatNaira(nairaValue)}</p>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-[#06B6D4]" />
            </div>
            <p className="text-2xl font-bold text-white">{progressPercent}%</p>
            <p className="text-[#64748B] text-xs">Complete</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </section>

      {/* Featured Quests */}
      <section className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Featured Quests</h2>
          <button
            onClick={() => onNavigate('quests')}
            className="text-[#A855F7] text-sm font-medium flex items-center gap-1 hover:underline"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="scroll-container -mx-4 px-4">
          {quests.slice(0, 4).map((quest, idx) => {
            const isCompleted = progress?.questsCompleted.includes(quest.id);
            const isLocked = quest.id > 1 && !progress?.questsCompleted.includes(quest.id - 1);

            return (
              <div
                key={quest.id}
                onClick={() => !isLocked && onNavigate('quests')}
                className={`scroll-item w-[200px] glass-card p-4 cursor-pointer ${
                  isLocked ? 'opacity-50' : ''
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                  isCompleted
                    ? 'bg-green-500/20'
                    : isLocked
                      ? 'bg-gray-500/20'
                      : 'bg-purple-500/20'
                }`}>
                  {isCompleted ? (
                    <Award className="w-6 h-6 text-[#10B981]" />
                  ) : isLocked ? (
                    <Wallet className="w-6 h-6 text-[#64748B]" />
                  ) : (
                    <Target className="w-6 h-6 text-[#A855F7]" />
                  )}
                </div>
                <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
                  {quest.title}
                </h3>
                <p className="text-[#64748B] text-xs mb-3 line-clamp-2">
                  {quest.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="badge badge-purple">
                    +{quest.reward} SOL
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#64748B]" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 pb-24">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('rank')}
            className="glass-card p-4 text-left hover:border-[#A855F7]/50"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center mb-3">
              <Trophy className="w-5 h-5 text-[#A855F7]" />
            </div>
            <p className="text-white font-semibold">Rankings</p>
            <p className="text-[#64748B] text-xs">View leaderboard</p>
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="glass-card p-4 text-left hover:border-[#A855F7]/50"
          >
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center mb-3">
              <Award className="w-5 h-5 text-[#10B981]" />
            </div>
            <p className="text-white font-semibold">My Badge</p>
            <p className="text-[#64748B] text-xs">View progress</p>
          </button>
        </div>
      </section>
    </div>
  );
};
