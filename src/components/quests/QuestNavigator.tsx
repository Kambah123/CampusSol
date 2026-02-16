// Campus SOL Starter - Quest Navigator (Sidebar/Bottom Nav)

import { Card, CardContent } from '@/components/ui/card';
import {
  Wallet,
  Send,
  ArrowLeftRight,
  QrCode,
  Brain,
  Award,
  Trophy,
  CheckCircle,
  Lock
} from 'lucide-react';

interface Quest {
  id: number;
  title: string;
  description: string;
  reward: number;
  rewardToken: string;
  completed: boolean;
  icon: string;
}

interface QuestNavigatorProps {
  quests: Quest[];
  currentQuest: number | null;
  onSelectQuest: (questId: number) => void;
  completedQuests: number[];
}

const iconMap: Record<string, React.ElementType> = {
  Wallet,
  Send,
  ArrowLeftRight,
  QrCode,
  Brain,
};

export const QuestNavigator = ({
  quests,
  currentQuest,
  onSelectQuest,
  completedQuests
}: QuestNavigatorProps) => {
  const getQuestStatus = (questId: number) => {
    if (completedQuests.includes(questId)) return 'completed';
    if (questId === 1 || completedQuests.includes(questId - 1)) return 'available';
    return 'locked';
  };

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardContent className="p-0 space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">
          Your Quests
        </h3>

        {quests.map((quest) => {
          const status = getQuestStatus(quest.id);
          const Icon = iconMap[quest.icon] || Wallet;
          const isActive = currentQuest === quest.id;

          return (
            <button
              key={quest.id}
              onClick={() => status !== 'locked' && onSelectQuest(quest.id)}
              disabled={status === 'locked'}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                status === 'locked'
                  ? 'opacity-50 cursor-not-allowed bg-muted/30'
                  : status === 'completed'
                  ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20'
                  : isActive
                  ? 'bg-purple-500/20 border-purple-500'
                  : 'bg-muted/50 border-border hover:border-purple-500/50 hover:bg-muted'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                status === 'completed'
                  ? 'bg-green-500/20 text-green-400'
                  : isActive
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {status === 'completed' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : status === 'locked' ? (
                  <Lock className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-medium text-sm truncate ${
                    status === 'completed' ? 'text-green-400' : ''
                  }`}>
                    {quest.id}. {quest.title}
                  </span>
                  {status === 'completed' && (
                    <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {quest.description}
                </p>
              </div>

              <div
                className={`text-xs flex-shrink-0 px-2 py-1 rounded ${
                  status === 'completed'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-purple-500/20 text-purple-400'
                }`}
              >
                +{quest.reward} {quest.rewardToken}
              </div>
            </button>
          );
        })}

        {/* Completion Badge */}
        <button
          onClick={() => onSelectQuest(0)}
          className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left mt-4 ${
            currentQuest === 0
              ? 'bg-yellow-500/20 border-yellow-500'
              : 'bg-muted/50 border-border hover:border-yellow-500/50'
          }`}
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            currentQuest === 0
              ? 'bg-yellow-500/20 text-yellow-400'
              : 'bg-muted text-muted-foreground'
          }`}>
            <Award className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <span className="font-medium text-sm">Your Badge</span>
            <p className="text-xs text-muted-foreground">
              View progress & mint NFT
            </p>
          </div>
        </button>

        {/* Leaderboard */}
        <button
          onClick={() => onSelectQuest(-1)}
          className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
            currentQuest === -1
              ? 'bg-blue-500/20 border-blue-500'
              : 'bg-muted/50 border-border hover:border-blue-500/50'
          }`}
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            currentQuest === -1
              ? 'bg-blue-500/20 text-blue-400'
              : 'bg-muted text-muted-foreground'
          }`}>
            <Trophy className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <span className="font-medium text-sm">Leaderboard</span>
            <p className="text-xs text-muted-foreground">
              See top performers
            </p>
          </div>
        </button>
      </CardContent>
    </Card>
  );
};
