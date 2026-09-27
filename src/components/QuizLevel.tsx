import React, { useState } from 'react';
import { QuizQuestion, LevelConfig } from '../types/game';
import { soundEffects } from '../utils/audio';
import { Lightbulb, CheckCircle2, XCircle, ArrowRight, Sparkles, BookOpen, Flame } from 'lucide-react';

interface QuizLevelProps {
  level: LevelConfig;
  streak: number;
  onAnswerQuestion: (correct: boolean, usedHint: boolean) => void;
  onCompleteLevel: (levelScore: number) => void;
  onOpenStoryDrawer: () => void;
}

export const QuizLevel: React.FC<QuizLevelProps> = ({
  level,
  streak,
  onAnswerQuestion,
  onCompleteLevel,
  onOpenStoryDrawer
}) => {
  const questions: QuizQuestion[] = level.questions || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [usedHintOnThis, setUsedHintOnThis] = useState(false);
  const [levelPointsAccumulated, setLevelPointsAccumulated] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const currentQ = questions[currentIdx];

  if (!currentQ) {
    return null;
  }

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    let earnedThisRound = 0;

    if (isCorrect) {
      soundEffects.playCorrect();
      // Base points 100 + streak bonus (up to +50) - hint cost (20 if used)
      const base = 100;
      const streakBonus = Math.min(streak * 15, 60);
      const hintCost = usedHintOnThis ? 20 : 0;
      earnedThisRound = Math.max(base + streakBonus - hintCost, 40);
      setCorrectAnswersCount((prev) => prev + 1);
    } else {
      soundEffects.playWrong();
      earnedThisRound = 0;
    }

    setLevelPointsAccumulated((prev) => prev + earnedThisRound);
    onAnswerQuestion(isCorrect, usedHintOnThis);
  };

  const handleToggleHint = () => {
    soundEffects.playHint();
    setShowHint(true);
    setUsedHintOnThis(true);
  };

  const handleNext = () => {
    soundEffects.playClick();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
      setUsedHintOnThis(false);
    } else {
      // Completed all questions in level
      soundEffects.playVictory();
      onCompleteLevel(levelPointsAccumulated);
    }
  };

  return (
    <div className="w-full bg-[#241a12] border border-[#5d3f26] rounded-2xl p-4 sm:p-8 shadow-2xl relative overflow-hidden vintage-border">
      {/* Subtle warm amber/brown glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#a66838]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar: Level information & Streak */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#4d331e] gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#dca368] font-medium tracking-wide">
            <span>{level.subtitle}</span>
            <span aria-hidden="true">·</span>
            <span>Question {currentIdx + 1} of {questions.length}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-[#faedd9] mt-1">
            {level.title}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Streak indicator */}
          {streak > 1 && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#472915] border border-[#9a5b28]/60 rounded-lg text-xs font-semibold text-[#f5bd83] animate-pulse">
              <Flame className="w-4 h-4 text-[#e58235] fill-[#e58235]" />
              <span>{streak} Streak!</span>
            </div>
          )}

          {/* Quick story reader trigger */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenStoryDrawer();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#d6c5b3] hover:text-[#faedd9] bg-[#2e1d12] hover:bg-[#3d2719] border border-[#5c3e24] rounded-lg transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#dca368]" />
            <span className="hidden sm:inline">Read Story Excerpt</span>
          </button>
        </div>
      </div>

      {/* Question Text Box (Styled like an archival document card) */}
      <div className="mb-6 bg-[#1a120b] p-5 sm:p-6 rounded-xl border border-[#4a311d] shadow-inner relative">
        <span className="text-xs font-mono text-[#dca368] uppercase tracking-widest block mb-2 font-semibold">
          Historical Investigation · Chapter {level.chapterId}
        </span>
        <p className="text-base sm:text-lg font-serif-body text-[#faedd9] leading-relaxed font-normal">
          {currentQ.question}
        </p>
      </div>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {currentQ.options.map((opt, idx) => {
          let optionStyles = 'bg-[#1e150e] border-[#4a311d] text-[#e8d7c5] hover:border-[#a06a3c] hover:bg-[#2b1c11]';

          if (isAnswered) {
            if (idx === currentQ.correctIndex) {
              optionStyles = 'bg-[#222e17] border-[#658742] text-[#d6f0b8] shadow-md ring-1 ring-[#658742]/50';
            } else if (idx === selectedOption) {
              optionStyles = 'bg-[#3b1717] border-[#8a3333] text-[#f7c1c1] shadow-md';
            } else {
              optionStyles = 'bg-[#18100a] border-[#362315] text-[#786352] opacity-60';
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${optionStyles} ${
                !isAnswered ? 'cursor-pointer transform hover:-translate-y-0.5' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[#130b06]/60 border border-[#523722]/50 text-xs font-bold font-mono text-[#dca368] shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm sm:text-base leading-snug font-normal">{opt}</span>
              </div>

              {isAnswered && idx === currentQ.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-[#88ba54] shrink-0 mt-0.5" />
              )}
              {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                <XCircle className="w-5 h-5 text-[#d96666] shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Hint & Explanation Zone */}
      <div className="space-y-4">
        {/* Hint button & expanded hint */}
        {!isAnswered && (
          <div className="pt-2">
            {!showHint ? (
              <button
                onClick={handleToggleHint}
                className="flex items-center gap-2 text-xs sm:text-sm text-[#e5a86a] hover:text-[#faedd9] font-medium px-3.5 py-1.5 rounded-lg bg-[#3b2516]/60 hover:bg-[#4d301c] border border-[#6b4224] transition-all cursor-pointer"
              >
                <Lightbulb className="w-4 h-4 text-[#dca368]" />
                <span>Need a Hint from the original text? (-20 pts)</span>
              </button>
            ) : (
              <div className="p-4 bg-[#2b1b11] border border-[#7f4f2a] rounded-xl text-[#faedd9] text-sm animate-fadeIn shadow-md">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#e5a86a] mb-1">
                  <Lightbulb className="w-4 h-4 text-[#e5a86a]" />
                  <span>Archival Clue</span>
                </div>
                <p className="italic leading-relaxed font-serif-body text-base">{currentQ.hint}</p>
              </div>
            )}
          </div>
        )}

        {/* Explanation displayed after answer */}
        {isAnswered && (
          <div className="p-4 bg-[#19110a] border border-[#4d331e] rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-semibold tracking-wider text-[#dca368] uppercase">
                {selectedOption === currentQ.correctIndex ? 'Accurate Recall' : 'Historical Correction'}
              </span>
              <span className="text-xs text-[#9c8978]">Exact source excerpt</span>
            </div>
            <p className="text-sm text-[#e3d3c2] leading-relaxed font-serif-body text-base">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Action Button: Next or Finish */}
        {isAnswered && (
          <div className="flex justify-end pt-3">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#a8642a] to-[#c7823e] hover:from-[#b97334] hover:to-[#da954f] text-[#1c1209] font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-[#100803]/60 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'Complete Level'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
