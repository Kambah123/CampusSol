// Campus SOL Starter - Leaderboard

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Trophy,
  Medal,
  Award,
  Users,
  TrendingUp
} from 'lucide-react';
import type { LeaderboardEntry } from '@/types';
import { getLeaderboard } from '@/hooks/useUserProgress';

interface LeaderboardProps {
  currentUserId?: string;
  onBack: () => void;
}

export const Leaderboard = ({ currentUserId, onBack }: LeaderboardProps) => {
  const [leaderboard] = useState<LeaderboardEntry[]>(() => getLeaderboard());

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center font-bold text-muted-foreground">{rank + 1}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 0:
        return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30';
      case 1:
        return 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 border-gray-500/30';
      case 2:
        return 'bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/30';
      default:
        return 'bg-muted/50';
    }
  };

  const topEarners = [...leaderboard].sort((a, b) => b.totalRewards - a.totalRewards).slice(0, 10);
  const badgeHolders = leaderboard.filter(u => u.badgeMinted).slice(0, 10);

  return (
    <div className="space-y-4 animate-in fade-in">
      <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to App
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="w-8 h-8 text-yellow-400" />
            Campus Leaderboard
          </CardTitle>
          <CardDescription>
            Top performers in the Campus SOL Starter program
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="quests" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="quests" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                By Quests
              </TabsTrigger>
              <TabsTrigger value="rewards" className="gap-2">
                <Award className="w-4 h-4" />
                By Rewards
              </TabsTrigger>
              <TabsTrigger value="badges" className="gap-2">
                <Users className="w-4 h-4" />
                Badge Holders
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quests" className="space-y-3 mt-4">
              {leaderboard.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No entries yet. Be the first!</p>
                </div>
              ) : (
                leaderboard.slice(0, 20).map((entry, index) => (
                  <div
                    key={entry.userId}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      entry.userId === currentUserId
                        ? 'border-purple-500 bg-purple-500/10'
                        : getRankStyle(index)
                    }`}
                  >
                    <div className="w-8 flex justify-center">
                      {getRankIcon(index)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {entry.firstName || entry.username || 'Anonymous'}
                        </span>
                        {entry.badgeMinted && (
                          <Award className="w-4 h-4 text-yellow-400" />
                        )}
                        {entry.userId === currentUserId && (
                          <div className="px-2 py-0.5 border rounded text-xs">You</div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">{entry.questsCompleted}</p>
                      <p className="text-xs text-muted-foreground">quests</p>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="rewards" className="space-y-3 mt-4">
              {topEarners.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No entries yet. Start earning!</p>
                </div>
              ) : (
                topEarners.map((entry, index) => (
                  <div
                    key={entry.userId}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      entry.userId === currentUserId
                        ? 'border-purple-500 bg-purple-500/10'
                        : getRankStyle(index)
                    }`}
                  >
                    <div className="w-8 flex justify-center">
                      {getRankIcon(index)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {entry.firstName || entry.username || 'Anonymous'}
                        </span>
                        {entry.badgeMinted && (
                          <Award className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-green-400">
                        {entry.totalRewards.toFixed(4)} SOL
                      </p>
                      <p className="text-xs text-muted-foreground">earned</p>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="badges" className="space-y-3 mt-4">
              {badgeHolders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No badge holders yet. Be the first to complete all quests!</p>
                </div>
              ) : (
                badgeHolders.map((entry) => (
                  <div
                    key={entry.userId}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      entry.userId === currentUserId
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'bg-yellow-500/10 border-yellow-500/30'
                    }`}
                  >
                    <div className="w-8 flex justify-center">
                      <Award className="w-5 h-5 text-yellow-400" />
                    </div>

                    <div className="flex-1">
                      <span className="font-medium">
                        {entry.firstName || entry.username || 'Anonymous'}
                      </span>
                      {entry.userId === currentUserId && (
                        <div className="px-2 py-0.5 border rounded text-xs ml-2 inline">You</div>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium text-yellow-400">Certified</p>
                      <p className="text-xs text-muted-foreground">Campus SOL Pioneer</p>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center p-4">
          <p className="text-2xl font-bold text-purple-400">{leaderboard.length}</p>
          <p className="text-xs text-muted-foreground">Total Students</p>
        </Card>
        <Card className="text-center p-4">
          <p className="text-2xl font-bold text-green-400">
            {leaderboard.reduce((sum, u) => sum + u.totalRewards, 0).toFixed(3)}
          </p>
          <p className="text-xs text-muted-foreground">SOL Distributed</p>
        </Card>
        <Card className="text-center p-4">
          <p className="text-2xl font-bold text-yellow-400">{badgeHolders.length}</p>
          <p className="text-xs text-muted-foreground">Badge Holders</p>
        </Card>
      </div>
    </div>
  );
};
