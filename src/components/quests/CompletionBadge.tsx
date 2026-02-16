// Campus SOL Starter - Completion & Badge Minting

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  Award,
  Share2,
  Twitter,
  MessageCircle,
  CheckCircle,
  Loader2,
  ExternalLink,
  Copy,
  GraduationCap
} from 'lucide-react';
import { getShareUrls } from '@/lib/telegram';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface CompletionBadgeProps {
  progress: {
    questsCompleted: number[];
    totalRewards: number;
    quizScore: number;
    username?: string;
    firstName?: string;
    referralCode: string;
  } | null;
  onMintBadge: () => Promise<string | null>;
  onBack: () => void;
}

export const CompletionBadge = ({ progress, onMintBadge, onBack }: CompletionBadgeProps) => {
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);

  const totalQuests = 5;
  const completedQuests = progress?.questsCompleted.length || 0;
  const allCompleted = completedQuests >= totalQuests;

  const handleMint = async () => {
    if (!allCompleted) {
      toast.error('Complete all quests first!');
      return;
    }

    setMinting(true);
    try {
      const txSignature = await onMintBadge();
      if (txSignature) {
        setSignature(txSignature);
        setMinted(true);
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#9945FF', '#14F195', '#FFD700', '#FF6B6B', '#00D4AA'],
        });
        toast.success('Badge minted successfully!');
      } else {
        toast.error('Failed to mint badge');
      }
    } catch (error) {
      toast.error('Error minting badge');
    } finally {
      setMinting(false);
    }
  };

  const copyReferralCode = () => {
    if (progress?.referralCode) {
      navigator.clipboard.writeText(progress.referralCode);
      toast.success('Referral code copied!');
    }
  };

  const shareUrls = getShareUrls(
    progress?.username || progress?.firstName,
    'Campus SOL Pioneer Badge'
  );

  return (
    <div className="space-y-4 animate-in fade-in">
      <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to App
      </Button>

      {/* Achievement Overview */}
      <Card className="bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-blue-900/30 border-purple-500/30">
        <CardContent className="p-6 text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Campus SOL Pioneer
            </h2>
            <p className="text-muted-foreground">
              Nigeria Level 1 Certified
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-purple-400">{completedQuests}</p>
              <p className="text-xs text-muted-foreground">Quests Done</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-green-400">{progress?.totalRewards.toFixed(4)}</p>
              <p className="text-xs text-muted-foreground">SOL Earned</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-400">{progress?.quizScore || 0}</p>
              <p className="text-xs text-muted-foreground">Quiz Score</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Journey</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={(completedQuests / totalQuests) * 100} className="h-3" />

          <div className="space-y-2">
            {[
              { id: 1, name: 'Connect Wallet', completed: progress?.questsCompleted.includes(1) },
              { id: 2, name: 'Send Transaction', completed: progress?.questsCompleted.includes(2) },
              { id: 3, name: 'Swap to USDC', completed: progress?.questsCompleted.includes(3) },
              { id: 4, name: 'Solana Pay', completed: progress?.questsCompleted.includes(4) },
              { id: 5, name: 'Knowledge Quiz', completed: progress?.questsCompleted.includes(5) },
            ].map((quest) => (
              <div
                key={quest.id}
                className={`flex items-center justify-between p-2 rounded ${
                  quest.completed ? 'bg-green-500/10' : 'bg-muted/50'
                }`}
              >
                <span className="text-sm">{quest.name}</span>
                {quest.completed ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Badge Minting */}
      {allCompleted && !minted && (
        <Card className="border-2 border-yellow-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-400" />
              Mint Your NFT Badge
            </CardTitle>
            <CardDescription>
              Get your permanent certificate on Solana
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <p className="text-sm text-muted-foreground">
                This compressed NFT proves you completed the Campus SOL Starter program.
                It&apos;s yours forever on the Solana blockchain!
              </p>
            </div>

            <Button
              onClick={handleMint}
              disabled={minting}
              className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700"
            >
              {minting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Minting Your Badge...
                </>
              ) : (
                <>
                  <Award className="w-4 h-4 mr-2" />
                  Mint NFT Badge
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Minted Success */}
      {minted && (
        <Card className="border-2 border-green-500/30 animate-in fade-in">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-24 h-24 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl animate-pulse" />
              <div className="absolute inset-1 bg-background rounded-xl flex items-center justify-center">
                <Award className="w-12 h-12 text-yellow-400" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-400">Badge Minted!</h3>
              <p className="text-sm text-muted-foreground">
                Your NFT is now in your wallet
              </p>
            </div>

            {signature && (
              <a
                href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:underline"
              >
                View on Explorer
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </CardContent>
        </Card>
      )}

      {/* Share Section */}
      {allCompleted && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share Your Achievement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <a
                href={shareUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" className="w-full gap-2">
                  <Twitter className="w-4 h-4" />
                  Share on X
                </Button>
              </a>
              <a
                href={shareUrls.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" className="w-full gap-2">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </a>
            </div>

            {/* Referral Code */}
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Your Referral Code</p>
              <div className="flex gap-2">
                <code className="flex-1 p-2 bg-background rounded text-center font-mono">
                  {progress?.referralCode}
                </code>
                <Button variant="outline" size="icon" onClick={copyReferralCode}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Share this code! When friends complete Quest 1, you both earn bonus rewards.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Not Complete Message */}
      {!allCompleted && (
        <Card className="border-2 border-orange-500/30">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              Complete all {totalQuests} quests to mint your badge!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              You&apos;re {totalQuests - completedQuests} quest{totalQuests - completedQuests !== 1 ? 's' : ''} away.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
