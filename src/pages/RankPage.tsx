// Campus SOL Starter - Rank Page (Leaderboard)

import { useState } from 'react';
import { Trophy, Medal, Award, Users, Zap } from 'lucide-react';
import type { LeaderboardEntry } from '@/types';
import { getLeaderboard } from '@/hooks/useUserProgress';

export const RankPage = () => {
  const [leaderboard] = useState<LeaderboardEntry[]>(() => {
    const data = getLeaderboard();
    return [...data].sort((a, b) => b.totalRewards - a.totalRewards);
  });

  const [userRank] = useState<number | null>(() => {
    const mockUserId = 'guest_123';
    const rank = leaderboard.findIndex(u => u.userId === mockUserId);
    return rank !== -1 ? rank + 1 : null;
  });

  const totalStudents = leaderboard.length;
  const totalDistributed = leaderboard.reduce((sum, u) => sum + u.totalRewards, 0);
  const badgeHolders = leaderboard.filter(u => u.badgeMinted).length;

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 0:
        return 'bg-gradient-to-r from-yellow-500/20 to-transparent border-l-4 border-yellow-400';
      case 1:
        return 'bg-gradient-to-r from-gray-400/20 to-transparent border-l-4 border-gray-300';
      case 2:
        return 'bg-gradient-to-r from-orange-600/20 to-transparent border-l-4 border-orange-500';
      default:
        return 'bg-white/5';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 0:
        return (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-black" />
          </div>
        );
      case 1:
        return (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
            <Medal className="w-5 h-5 text-black" />
          </div>
        );
      case 2:
        return (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#64748B] font-bold">
            {rank + 1}
          </div>
        );
    }
  };

  return (
    <div className="animate-slide-up">
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
            <p className="text-[#A0AEC0] text-sm">Top Campus SOL Pioneers</p>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="glass-card p-4 text-center">
            <Users className="w-5 h-5 text-[#A855F7] mx-auto mb-2" />
            <p className="text-xl font-bold text-white">{totalStudents}</p>
            <p className="text-[#64748B] text-xs">Students</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Zap className="w-5 h-5 text-[#10B981] mx-auto mb-2" />
            <p className="text-xl font-bold text-white">{totalDistributed.toFixed(2)}</p>
            <p className="text-[#64748B] text-xs">SOL</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Award className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
            <p className="text-xl font-bold text-white">{badgeHolders}</p>
            <p className="text-[#64748B] text-xs">Badges</p>
          </div>
        </div>
      </section>

      {/* Leaderboard List */}
      <section className="px-4 pb-32">
        {leaderboard.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
            <p className="text-[#A0AEC0]">No entries yet</p>
            <p className="text-[#64748B] text-sm">Be the first to complete quests!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {leaderboard.slice(0, 20).map((entry, index) => (
              <div
                key={entry.userId}
                className={`flex items-center gap-4 p-4 rounded-2xl ${getRankStyle(index)}`}
              >
                {/* Rank */}
                {getRankIcon(index)}

                {/* Avatar */}
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.userId}`}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full bg-[#1A1A2E]"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-semibold truncate">
                      {entry.firstName || entry.username || 'Anonymous'}
                    </p>
                    {entry.badgeMinted && (
                      <Award className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-[#64748B] text-sm">
                    {entry.totalRewards.toFixed(4)} SOL earned
                  </p>
                </div>

                {/* SOL Amount */}
                <div className="text-right">
                  <span className="badge badge-purple">
                    {entry.totalRewards.toFixed(3)} SOL
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* User's Position (if outside top 10) */}
      {userRank && userRank > 10 && (
        <div className="fixed bottom-24 left-4 right-4 z-40">
          <div className="glass-card p-4 border border-[#A855F7]/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[#A855F7] font-bold">#{userRank}</span>
              <span className="text-white">Your Rank</span>
            </div>
            <span className="badge badge-purple">2.5 SOL</span>
          </div>
        </div>
      )}
    </div>
  );
};
