// Campus SOL Starter - Viral Share Component
// "Bragging Rights" button for grant-winning growth metrics

import { useState } from 'react';
import { Twitter, MessageCircle, Link2, Check, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface ShareBadgeProps {
  userName: string;
  university: string;
  badgeLevel: number;
  solEarned: number;
  questCount: number;
}

export const ShareBadge = ({
  university,
  badgeLevel,
  solEarned,
  questCount
}: ShareBadgeProps) => {
  const [copied, setCopied] = useState(false);

  const shortUni = university.split('(')[1]?.replace(')', '') || university;

  // Generate share text
  const getShareText = (platform: 'twitter' | 'whatsapp' | 'generic'): string => {
    const baseText = `I just became a @Solana Pioneer at ${shortUni}! 🚀🇳🇬\n\n`;
    const statsText = `✅ Completed ${questCount} quests\n💰 Earned ${solEarned.toFixed(3)} SOL\n🏆 Level ${badgeLevel} Certified\n\n`;
    const ctaText = platform === 'twitter'
      ? `Join the movement: https://t.me/CampusSolNaijaBot\n\n#Solana #Web3 #Nigeria #CampusSOL`
      : `Join the movement: https://t.me/CampusSolNaijaBot`;

    return baseText + statsText + ctaText;
  };

  // Share to Twitter/X
  const shareToTwitter = () => {
    const text = encodeURIComponent(getShareText('twitter'));
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank', 'width=600,height=400');

    toast.success('Opening Twitter...', {
      description: 'Share your achievement with the world!',
    });
  };

  // Share to WhatsApp
  const shareToWhatsApp = () => {
    const text = encodeURIComponent(getShareText('whatsapp'));
    const url = `https://wa.me/?text=${text}`;
    window.open(url, '_blank');

    toast.success('Opening WhatsApp...', {
      description: 'Share with your friends!',
    });
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    const text = getShareText('generic');
    navigator.clipboard.writeText(text);
    setCopied(true);

    toast.success('Copied to clipboard!', {
      description: 'Paste anywhere to share your achievement!',
    });

    setTimeout(() => setCopied(false), 3000);
  };

  // Share to Telegram
  const shareToTelegram = () => {
    const text = encodeURIComponent(getShareText('generic'));
    const url = `https://t.me/share/url?url=https://t.me/CampusSolNaijaBot&text=${text}`;
    window.open(url, '_blank');

    toast.success('Opening Telegram...');
  };

  return (
    <div className="glass-card p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-[#A855F7] to-[#10B981] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Share2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">Share Your Achievement!</h3>
        <p className="text-[#A0AEC0] text-sm">
          Let everyone know you&apos;re a Campus SOL Pioneer
        </p>
      </div>

      {/* Preview */}
      <div className="bg-white/5 rounded-xl p-4 mb-6">
        <p className="text-white text-sm whitespace-pre-line">
          {getShareText('generic')}
        </p>
      </div>

      {/* Share Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={shareToTwitter}
          className="flex items-center justify-center gap-2 p-3 bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 border border-[#1DA1F2]/30 rounded-xl transition-all"
        >
          <Twitter className="w-5 h-5 text-[#1DA1F2]" />
          <span className="text-white font-medium">Share on X</span>
        </button>

        <button
          onClick={shareToWhatsApp}
          className="flex items-center justify-center gap-2 p-3 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/30 rounded-xl transition-all"
        >
          <MessageCircle className="w-5 h-5 text-[#25D366]" />
          <span className="text-white font-medium">WhatsApp</span>
        </button>

        <button
          onClick={shareToTelegram}
          className="flex items-center justify-center gap-2 p-3 bg-[#0088cc]/20 hover:bg-[#0088cc]/30 border border-[#0088cc]/30 rounded-xl transition-all"
        >
          <Share2 className="w-5 h-5 text-[#0088cc]" />
          <span className="text-white font-medium">Telegram</span>
        </button>

        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
        >
          {copied ? (
            <Check className="w-5 h-5 text-[#10B981]" />
          ) : (
            <Link2 className="w-5 h-5 text-[#A0AEC0]" />
          )}
          <span className="text-white font-medium">
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-[#A855F7]">{questCount}</p>
            <p className="text-[#64748B] text-xs">Quests</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#10B981]">{solEarned.toFixed(3)}</p>
            <p className="text-[#64748B] text-xs">SOL</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-400">Lvl {badgeLevel}</p>
            <p className="text-[#64748B] text-xs">Badge</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Standalone share button for quest completion
export const QuickShareButton = ({
  questName,
  reward
}: {
  questName: string;
  reward: number;
}) => {
  const shareQuest = () => {
    const text = encodeURIComponent(
      `Just completed "${questName}" on Campus SOL Starter! 🚀\n` +
      `Earned ${reward} SOL! 💰\n\n` +
      `Join me: https://t.me/CampusSolNaijaBot\n` +
      `#Solana #Web3 #Nigeria`
    );
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank');

    toast.success('Share your progress!');
  };

  return (
    <button
      onClick={shareQuest}
      className="flex items-center gap-2 text-[#A855F7] hover:text-[#10B981] transition-colors text-sm"
    >
      <Twitter className="w-4 h-4" />
      <span>Share</span>
    </button>
  );
};
