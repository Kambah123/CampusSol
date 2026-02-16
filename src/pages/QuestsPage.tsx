// Campus SOL Starter - Quests Page with Naija Flavor

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  Target,
  CheckCircle,
  Lock,
  ChevronRight,
  Coins,
  Wallet,
  Send,
  ArrowLeftRight,
  QrCode,
  Brain,
  X
} from 'lucide-react';
import { useUserProgress } from '@/hooks/useUserProgress';
import { quests } from '@/data/quests';
import { quizQuestions } from '@/data/quizQuestions';
import { shortenAddress } from '@/lib/solana';
import { getNaijaMessage } from '@/lib/naija';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';
import { encodeURL } from '@solana/pay';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { BigNumber } from 'bignumber.js';

const iconMap: Record<string, React.ElementType> = {
  Wallet,
  Send,
  ArrowLeftRight,
  QrCode,
  Brain,
};

const categories = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export const QuestsPage = () => {
  const { connected, publicKey } = useWallet();
  const { completeQuest, isQuestCompleted } = useUserProgress();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeQuest, setActiveQuest] = useState<number | null>(null);
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    selectedAnswer: null as number | null,
    showExplanation: false,
    score: 0,
    completed: false,
  });
  const [qrData, setQrData] = useState({ amount: '0.001', label: 'Campus Payment', message: 'Thanks!' });

  const handleCompleteQuest = (questId: number) => {
    const quest = quests.find(q => q.id === questId);
    if (quest && !isQuestCompleted(questId)) {
      completeQuest(questId, quest.reward);

      // Naija-flavored success message
      const message = getNaijaMessage('questCompleted');
      toast.success(message, {
        description: `You earned ${quest.reward} SOL! Your bag is getting heavier! 💰`,
      });
    }
    setActiveQuest(null);
  };

  const getQuestStatus = (questId: number) => {
    if (isQuestCompleted(questId)) return 'completed';
    if (questId === 1 || isQuestCompleted(questId - 1)) return 'available';
    return 'locked';
  };

  const filteredQuests = activeCategory === 'All'
    ? quests
    : quests.filter((_, idx) => {
        if (activeCategory === 'Beginner') return idx < 2;
        if (activeCategory === 'Intermediate') return idx >= 2 && idx < 4;
        return idx >= 4;
      });

  // Quiz handlers
  const handleQuizAnswer = (index: number) => {
    if (quizState.showExplanation) return;
    setQuizState({ ...quizState, selectedAnswer: index });
  };

  const submitQuizAnswer = () => {
    if (quizState.selectedAnswer === null) return;
    const question = quizQuestions[quizState.currentQuestion];
    const isCorrect = quizState.selectedAnswer === question.correctAnswer;

    setQuizState({
      ...quizState,
      showExplanation: true,
      score: isCorrect ? quizState.score + 1 : quizState.score,
    });
  };

  const nextQuestion = () => {
    if (quizState.currentQuestion < 9) {
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion + 1,
        selectedAnswer: null,
        showExplanation: false,
      });
    } else {
      setQuizState({ ...quizState, completed: true });
      if (quizState.score >= 5) {
        handleCompleteQuest(5);
      }
    }
  };

  return (
    <div className="animate-slide-up">
      {/* Header */}
      <header className="px-4 pt-6 pb-4 text-center">
        <h1 className="text-2xl font-bold text-white mb-1">Quests</h1>
        <p className="text-[#A0AEC0] text-sm">Complete quests to earn SOL rewards</p>
      </header>

      {/* Category Filters */}
      <section className="px-4 mb-6">
        <div className="scroll-container">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`scroll-item px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#A855F7] text-white'
                  : 'bg-white/5 text-[#A0AEC0] hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Quests List */}
      <section className="px-4 pb-24">
        <div className="space-y-3">
          {filteredQuests.map((quest) => {
            const status = getQuestStatus(quest.id);
            const Icon = iconMap[quest.icon] || Target;
            const isCompleted = status === 'completed';
            const isLocked = status === 'locked';

            return (
              <div
                key={quest.id}
                onClick={() => !isLocked && setActiveQuest(quest.id)}
                className={`glass-card p-4 flex items-center gap-4 cursor-pointer ${
                  isCompleted ? 'border-green-500/30' : ''
                } ${isLocked ? 'opacity-60' : ''}`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  isCompleted
                    ? 'bg-green-500/20'
                    : isLocked
                      ? 'bg-gray-500/20'
                      : 'bg-purple-500/20'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-8 h-8 text-[#10B981]" />
                  ) : isLocked ? (
                    <Lock className="w-7 h-7 text-[#64748B]" />
                  ) : (
                    <Icon className="w-7 h-7 text-[#A855F7]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold truncate ${
                      isCompleted ? 'text-green-400' : 'text-white'
                    }`}>
                      {quest.title}
                    </h3>
                    {isCompleted && (
                      <span className="badge badge-green text-[10px]">Done</span>
                    )}
                  </div>
                  <p className="text-[#64748B] text-sm line-clamp-1">
                    {quest.description}
                  </p>
                </div>

                {/* Reward & Arrow */}
                <div className="flex items-center gap-3">
                  <span className="badge badge-purple">
                    <Coins className="w-3 h-3" />
                    +{quest.reward}
                  </span>
                  {!isLocked && (
                    <ChevronRight className="w-5 h-5 text-[#64748B]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quest Modal */}
      {activeQuest && (
        <QuestModal
          questId={activeQuest}
          onClose={() => setActiveQuest(null)}
          connected={connected}
          publicKey={publicKey}
          onComplete={handleCompleteQuest}
          quizState={quizState}
          handleQuizAnswer={handleQuizAnswer}
          submitQuizAnswer={submitQuizAnswer}
          nextQuestion={nextQuestion}
          qrData={qrData}
          setQrData={setQrData}
        />
      )}
    </div>
  );
};

// Quest Modal Component
interface QuestModalProps {
  questId: number;
  onClose: () => void;
  connected: boolean;
  publicKey: any;
  onComplete: (id: number) => void;
  quizState: any;
  handleQuizAnswer: (idx: number) => void;
  submitQuizAnswer: () => void;
  nextQuestion: () => void;
  qrData: any;
  setQrData: any;
}

const QuestModal = ({
  questId,
  onClose,
  connected,
  publicKey,
  onComplete,
  quizState,
  handleQuizAnswer,
  submitQuizAnswer,
  nextQuestion,
  qrData,
  setQrData
}: QuestModalProps) => {
  const quest = quests.find(q => q.id === questId);
  if (!quest) return null;

  switch (questId) {
    case 1:
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Connect Wallet</h2>
              <button onClick={onClose} className="text-[#64748B] hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-[#A0AEC0] mb-6">
              Connect your Phantom or Solflare wallet to get started on your Solana journey!
            </p>

            {connected ? (
              <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/30 mb-6">
                <div className="flex items-center gap-2 text-green-400 mb-1">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">{getNaijaMessage('walletConnected')}</span>
                </div>
                <p className="text-[#64748B] text-sm font-mono">
                  {shortenAddress(publicKey?.toString() || '')}
                </p>
              </div>
            ) : (
              <p className="text-[#64748B] mb-6">Please connect your wallet to continue.</p>
            )}

            <button
              className="btn-primary w-full"
              disabled={!connected}
              onClick={() => onComplete(1)}
            >
              Claim Reward (+0.001 SOL)
            </button>
          </div>
        </div>
      );

    case 2:
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Send Transaction</h2>
              <button onClick={onClose} className="text-[#64748B] hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-[#A0AEC0] mb-4">
              Send 0.0001 SOL to verify your wallet and learn how transfers work.
            </p>

            <div className="p-4 bg-white/5 rounded-xl mb-6">
              <p className="text-[#64748B] text-sm mb-1">Verification Address</p>
              <p className="text-white font-mono text-sm">
                {shortenAddress(publicKey?.toString() || '', 10)}
              </p>
            </div>

            <button
              className="btn-primary w-full"
              onClick={() => onComplete(2)}
            >
              Verify & Complete
            </button>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Swap to USDC</h2>
              <button onClick={onClose} className="text-[#64748B] hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-[#A0AEC0] mb-6">
              Use Jupiter aggregator to swap SOL to USDC stablecoin.
            </p>

            <a
              href="https://jup.ag/swap/SOL-USDC"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full mb-3 block text-center"
            >
              <ArrowLeftRight className="w-5 h-5" />
              Open Jupiter
            </a>

            <button
              className="btn-secondary w-full"
              onClick={() => onComplete(3)}
            >
              I&apos;ve Completed the Swap
            </button>
          </div>
        </div>
      );

    case 4:
      const payUrl = publicKey ? encodeURL({
        recipient: publicKey,
        amount: new BigNumber(parseFloat(qrData.amount) * LAMPORTS_PER_SOL),
        label: qrData.label,
        message: qrData.message,
      }).toString() : '';

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Solana Pay</h2>
              <button onClick={onClose} className="text-[#64748B] hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-[#A0AEC0] mb-4">
              Generate a Solana Pay QR code for instant payments.
            </p>

            <input
              type="text"
              value={qrData.amount}
              onChange={(e) => setQrData({...qrData, amount: e.target.value})}
              placeholder="Amount (SOL)"
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white mb-4 focus:border-[#A855F7] focus:outline-none"
            />

            {payUrl && (
              <div className="flex justify-center p-6 bg-white rounded-2xl mb-4">
                <QRCodeSVG value={payUrl} size={200} />
              </div>
            )}

            <button
              className="btn-primary w-full"
              onClick={() => onComplete(4)}
            >
              Complete Quest
            </button>
          </div>
        </div>
      );

    case 5:
      if (quizState.completed) {
        const passed = quizState.score >= 7;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="glass-card w-full max-w-md p-6 text-center animate-slide-up">
              <div className={`w-20 h-20 ${passed ? 'bg-green-500/20' : 'bg-yellow-500/20'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Brain className={`w-10 h-10 ${passed ? 'text-green-400' : 'text-yellow-400'}`} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
              <p className="text-[#A0AEC0] mb-2">You scored {quizState.score}/10</p>
              <p className="text-[#64748B] text-sm mb-6">
                {passed ? getNaijaMessage('quizPassed') : getNaijaMessage('quizFailed')}
              </p>

              {passed && (
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="badge badge-green">+0.01 SOL Earned!</span>
                </div>
              )}

              <button
                className="btn-primary w-full"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        );
      }

      const question = quizQuestions[quizState.currentQuestion];
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#A855F7] font-semibold">
                Question {quizState.currentQuestion + 1}/10
              </span>
              <button onClick={onClose} className="text-[#64748B] hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="progress-bar mb-6">
              <div
                className="progress-fill"
                style={{ width: `${((quizState.currentQuestion + 1) / 10) * 100}%` }}
              />
            </div>

            <p className="text-white text-lg mb-6">{question.question}</p>

            <div className="space-y-2 mb-6">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuizAnswer(idx)}
                  disabled={quizState.showExplanation}
                  className={`w-full p-4 text-left rounded-xl border transition-all ${
                    quizState.selectedAnswer === idx
                      ? quizState.showExplanation
                        ? idx === question.correctAnswer
                          ? 'bg-green-500/20 border-green-500'
                          : 'bg-red-500/20 border-red-500'
                        : 'bg-purple-500/20 border-[#A855F7]'
                      : quizState.showExplanation && idx === question.correctAnswer
                      ? 'bg-green-500/20 border-green-500'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-white">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {quizState.showExplanation && (
              <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/30 mb-4">
                <p className="text-blue-400 text-sm">{question.explanation}</p>
              </div>
            )}

            {!quizState.showExplanation ? (
              <button
                className="btn-primary w-full"
                disabled={quizState.selectedAnswer === null}
                onClick={submitQuizAnswer}
              >
                Submit Answer
              </button>
            ) : (
              <button
                className="btn-primary w-full"
                onClick={nextQuestion}
              >
                {quizState.currentQuestion < 9 ? 'Next Question' : 'Finish Quiz'}
              </button>
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
};
