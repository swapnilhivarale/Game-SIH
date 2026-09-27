import React from 'react';
import { LevelConfig, Achievement } from '../types/game';
import { Trophy, Sparkles, ArrowRight, BookOpen, Crown, RotateCcw } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface VictoryModalProps {
  isOpen: boolean;
  level: LevelConfig;
  earnedPoints: number;
  totalScore: number;
  newAchievements: Achievement[];
  onNextLevel: () => void;
  onReplayLevel: () => void;
  onViewAchievements: () => void;
  onViewStory: () => void;
  isGrandFinale: boolean;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  level,
  earnedPoints,
  totalScore,
  newAchievements,
  onNextLevel,
  onReplayLevel,
  onViewAchievements,
  onViewStory,
  isGrandFinale,
}) => {
  if (!isOpen) return null;

  const isChapter1Complete = level.id === 3;
  const isChapter2Complete = level.id === 6;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#291e15] to-[#1c130c] border border-[#7f4f27] rounded-2xl shadow-2xl p-6 sm:p-8 text-center overflow-hidden vintage-border">
        {/* Decorative background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#c47b3b]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Crown or Trophy Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-[#9c5925] to-[#dca368] flex items-center justify-center text-[#180e07] shadow-lg shadow-[#120803]/80 border border-[#f0c294]/50">
          {isGrandFinale ? (
            <Crown className="w-9 h-9 stroke-[2.2] animate-bounce text-[#1c1209]" />
          ) : (
            <Trophy className="w-8 h-8 stroke-[2.2] text-[#1c1209]" />
          )}
        </div>

        {/* Header Title */}
        <div className="text-xs font-mono font-semibold text-[#dca368] uppercase tracking-widest mb-1">
          {isGrandFinale
            ? 'Grand Historical Triumph'
            : isChapter1Complete
            ? 'Chapter 1 Complete (3/3 Levels)'
            : isChapter2Complete
            ? 'Chapter 2 Complete (3/3 Levels)'
            : 'Level Completed'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#faedd9] mb-2">
          {isGrandFinale
            ? 'Both Chapters Conquered!'
            : isChapter1Complete
            ? 'Birth & Learning Mastered!'
            : isChapter2Complete
            ? 'Inspirations & Beliefs Mastered!'
            : `Victory in ${level.title}!`}
        </h2>

        <p className="text-xs sm:text-sm text-[#d6c5b3] max-w-md mx-auto mb-6 leading-relaxed font-serif-body text-base">
          {isGrandFinale
            ? 'You have navigated both chapters with impeccable historical accuracy, solving all 3 levels in Chapter 1 and all 3 levels in Chapter 2!'
            : isChapter1Complete
            ? 'You have successfully completed all 3 levels of Chapter 1: Birth & Learning! You can now explore Chapter 2 or review your results.'
            : isChapter2Complete
            ? 'You have conquered all 3 levels of Chapter 2: Inspirations & Beliefs, mastering Bhagat Singh\'s philosophy and ideals.'
            : `You earned +${earnedPoints} points by recalling facts faithfully from the original text.`}
        </p>

        {/* Score & Points Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 bg-[#160e08] p-4 rounded-xl border border-[#4d331e]">
          <div className="text-left border-r border-[#3b2717] pr-3">
            <span className="text-xs text-[#a38e7d] block font-mono">Points Earned</span>
            <span className="text-xl font-bold font-mono text-[#a3d16b]">
              +{earnedPoints}
            </span>
          </div>
          <div className="text-right pl-3">
            <span className="text-xs text-[#a38e7d] block font-mono">Total Journey Score</span>
            <span className="text-xl font-bold font-mono text-[#faedd9]">
              {totalScore} pts
            </span>
          </div>
        </div>

        {/* Newly Unlocked Achievements Callout */}
        {newAchievements.length > 0 && (
          <div className="mb-6 p-3.5 bg-[#3a2517]/70 border border-[#855127] rounded-xl text-left shadow-inner">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#e5a86a] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-[#dca368]" />
              <span>New Achievement Unlocked!</span>
            </div>
            {newAchievements.map((ach) => (
              <div key={ach.id} className="flex items-center justify-between text-xs text-[#faedd9] py-1">
                <span className="font-semibold text-[#ebd3b9]">{ach.title}</span>
                <span className="font-mono text-[#dca368]">+{ach.points} pts</span>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {!isGrandFinale ? (
            <button
              onClick={() => {
                soundEffects.playClick();
                onNextLevel();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-[#a8642a] to-[#c7823e] hover:from-[#b97334] hover:to-[#da954f] text-[#1c1209] font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-[#100702]/80 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>
                {isChapter1Complete
                  ? 'Proceed to Chapter 2 (Level 1)'
                  : isChapter2Complete
                  ? 'Proceed to Chapter 1 (Level 1)'
                  : 'Proceed to Next Level'}
              </span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : (
            <button
              onClick={() => {
                soundEffects.playClick();
                onViewAchievements();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-[#c47c34] to-[#e5a86a] hover:from-[#d68a3f] hover:to-[#f0b982] text-[#1c1209] font-bold text-sm sm:text-base rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Trophy className="w-5 h-5" />
              <span>Inspect All Achievements</span>
            </button>
          )}

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                soundEffects.playClick();
                onReplayLevel();
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#b8a492] hover:text-[#faedd9] bg-[#22170f] hover:bg-[#342216] rounded-lg border border-[#4d331e] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Level</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                onViewStory();
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#b8a492] hover:text-[#e5a86a] bg-[#22170f] hover:bg-[#342216] rounded-lg border border-[#4d331e] transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#dca368]" />
              <span>Read Story Excerpt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
