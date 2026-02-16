// Campus SOL Starter - Welcome Screen (Quest 0)

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Wallet, Coins, GraduationCap, Share2, Trophy, ArrowRight } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { shortenAddress } from '@/lib/solana';
import type { UserProgress } from '@/types';
import confetti from 'canvas-confetti';

interface WelcomeScreenProps {
  progress: UserProgress | null;
  onStartQuest: (questId: number) => void;
  completedQuestsCount: number;
  totalRewards: number;
}

export const WelcomeScreen = ({
  progress,
  onStartQuest,
  completedQuestsCount,
  totalRewards
}: WelcomeScreenProps) => {
  const { connected, publicKey } = useWallet();
  const [showConfetti, setShowConfetti] = useState(false);

  const totalQuests = 5;
  const progressPercentage = (completedQuestsCount / totalQuests) * 100;

  useEffect(() => {
    if (connected && !showConfetti) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#9945FF', '#14F195', '#FFD700'],
      });
      setShowConfetti(true);
    }
  }, [connected, showConfetti]);

  const features = [
    {
      icon: <Wallet className="w-5 h-5" />,
      title: 'Connect Wallet',
      desc: 'Link Phantom or Solflare',
    },
    {
      icon: <Coins className="w-5 h-5" />,
      title: 'Earn Rewards',
      desc: 'Get SOL & USDC for learning',
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: 'Learn Solana',
      desc: 'Master Web3 basics',
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      title: 'Mint Badge',
      desc: 'Get your NFT certificate',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-green-500/20 rounded-full border border-purple-500/30">
          <span className="text-2xl">🇳🇬</span>
          <span className="text-sm font-medium text-purple-300">Made for Nigerian Students</span>
        </div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-green-400 bg-clip-text text-transparent">
          Campus SOL Starter
        </h1>

        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Earn SOL & USDC while learning Solana! Complete quests, master crypto basics,
          and join Nigeria's Web3 campus revolution.
        </p>
      </div>

      {/* Progress Overview */}
      {completedQuestsCount > 0 && (
        <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Your Progress</span>
              <Badge variant="secondary">
                {completedQuestsCount}/{totalQuests} Quests
              </Badge>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Rewards Earned: {totalRewards.toFixed(4)} SOL</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wallet Connection */}
      <Card className="border-2 border-purple-500/30">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Wallet className="w-6 h-6 text-purple-400" />
            Connect Your Wallet
          </CardTitle>
          <CardDescription>
            Start your journey by connecting a Solana wallet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!connected ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-muted-foreground text-center">
                We recommend Phantom or Solflare wallets
              </p>
              <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-blue-600 hover:!from-purple-700 hover:!to-blue-700 !rounded-lg !px-6 !py-3 !font-semibold" />
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-center gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 font-medium">
                  Connected: {shortenAddress(publicKey?.toString() || '')}
                </span>
              </div>

              {!progress?.questsCompleted.includes(1) && (
                <Button
                  onClick={() => onStartQuest(1)}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Coins className="w-4 h-4 mr-2" />
                  Claim Welcome Reward (0.001 SOL)
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}

              {progress?.questsCompleted.includes(1) && (
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <Trophy className="w-5 h-5" />
                  <span>Quest 1 Completed! +0.001 SOL</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <Card key={index} className="bg-muted/50">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                {feature.icon}
              </div>
              <div>
                <p className="font-medium text-sm">{feature.title}</p>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-6 text-center">
        <div>
          <p className="text-2xl font-bold text-purple-400">5</p>
          <p className="text-xs text-muted-foreground">Quests</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-400">0.02+</p>
          <p className="text-xs text-muted-foreground">SOL Rewards</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-pink-400">10min</p>
          <p className="text-xs text-muted-foreground">To Complete</p>
        </div>
      </div>

      {/* Share */}
      <div className="flex justify-center">
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          Invite Friends & Earn More
        </Button>
      </div>
    </div>
  );
};
