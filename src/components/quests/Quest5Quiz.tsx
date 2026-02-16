// Campus SOL Starter - Quest 5: Knowledge Quiz

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Brain, CheckCircle, XCircle, Trophy, ArrowRight } from 'lucide-react';
import { quizQuestions } from '@/data/quizQuestions';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface Quest5QuizProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const Quest5Quiz = ({ onComplete, onBack }: Quest5QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const questions = quizQuestions.slice(0, 10); // Get first 10 questions
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleSelectAnswer = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      toast.error('Please select an answer');
      return;
    }

    const isCorrect = selectedAnswer === question.correctAnswer;
    setAnswers([...answers, isCorrect]);

    if (isCorrect) {
      setScore(score + 1);
      toast.success('Correct!');
    } else {
      toast.error('Not quite right');
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const finalScore = score + (selectedAnswer === question.correctAnswer ? 1 : 0);
    setCompleted(true);

    if (finalScore >= 7) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#9945FF', '#14F195', '#FFD700', '#FF6B6B'],
      });
      toast.success(`Congratulations! You scored ${finalScore}/10`);
    } else {
      toast(`You scored ${finalScore}/10. Keep learning!`);
    }

    onComplete(finalScore);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return { message: 'Solana Master!', color: 'text-purple-400' };
    if (percentage >= 70) return { message: 'Great Job!', color: 'text-green-400' };
    if (percentage >= 50) return { message: 'Good Start!', color: 'text-yellow-400' };
    return { message: 'Keep Learning!', color: 'text-orange-400' };
  };

  if (completed) {
    const { message, color } = getScoreMessage();

    return (
      <div className="space-y-4 animate-in fade-in">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <Card className="border-2 border-yellow-500/30">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-yellow-500/20 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-yellow-400" />
            </div>

            <div>
              <h2 className={`text-3xl font-bold ${color}`}>{message}</h2>
              <p className="text-muted-foreground mt-2">
                You scored {score} out of {questions.length}
              </p>
            </div>

            <div className="space-y-2">
              <Progress value={(score / questions.length) * 100} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {score >= 7
                  ? 'You earned the full reward! +0.01 SOL'
                  : 'Complete all quests to earn your badge!'}
              </p>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {answers.map((correct, index) => (
                <div
                  key={index}
                  className={`h-8 rounded flex items-center justify-center ${
                    correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {correct ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                </div>
              ))}
            </div>

            <Button onClick={onBack} className="w-full">
              Continue to Badge
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
      <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Quests
      </Button>

      <Card className="border-2 border-yellow-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-yellow-400" />
                Quest 5: Knowledge Quiz
              </CardTitle>
              <CardDescription>
                Test your Solana knowledge
              </CardDescription>
            </div>
            <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
              +0.01 SOL
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>Score: {score}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium leading-relaxed">
              {question.question}
            </h3>

            <div className="space-y-2">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left rounded-lg border transition-all ${
                    selectedAnswer === index
                      ? showExplanation
                        ? index === question.correctAnswer
                          ? 'bg-green-500/20 border-green-500 text-green-400'
                          : 'bg-red-500/20 border-red-500 text-red-400'
                        : 'bg-purple-500/20 border-purple-500'
                      : showExplanation && index === question.correctAnswer
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : 'bg-muted/50 border-border hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showExplanation && index === question.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                    )}
                    {showExplanation && selectedAnswer === index && index !== question.correctAnswer && (
                      <XCircle className="w-5 h-5 text-red-400 ml-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`p-4 rounded-lg border animate-in fade-in ${
              selectedAnswer === question.correctAnswer
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-orange-500/10 border-orange-500/30'
            }`}>
              <p className="text-sm">
                <strong>{selectedAnswer === question.correctAnswer ? 'Correct!' : 'Not quite!'}</strong>{' '}
                {question.explanation}
              </p>
            </div>
          )}

          {/* Actions */}
          {!showExplanation ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="w-full"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Finish Quiz
                  <Trophy className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
