import React from 'react';
import { GAME_LEVELS } from '../data/chaptersData';
import { Check, Lock, Sparkles, BookOpen, Crown } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface ProgressBarProps {
  currentLevelId: number;
  completedLevels: number[];
  onSelectLevel: (levelId: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentLevelId,
  completedLevels,
  onSelectLevel,
}) => {
  const activeChapterId: 1 | 2 = currentLevelId <= 3 ? 1 : 2;

  // Chapter 1 Levels: IDs 1, 2, 3
  const ch1Levels = GAME_LEVELS.filter((l) => l.chapterId === 1);
  const ch1Completed = completedLevels.filter((id) => id >= 1 && id <= 3).length;
  const ch1Percent = Math.round((ch1Completed / 3) * 100);

  // Chapter 2 Levels: IDs 4, 5, 6
  const ch2Levels = GAME_LEVELS.filter((l) => l.chapterId === 2);
  const ch2Completed = completedLevels.filter((id) => id >= 4 && id <= 6).length;
  const ch2Percent = Math.round((ch2Completed / 3) * 100);

  // Active Chapter Stats (Independent tracking 0/3)
  const currentChapterCompleted = activeChapterId === 1 ? ch1Completed : ch2Completed;
  const currentChapterPercent = activeChapterId === 1 ? ch1Percent : ch2Percent;

  // Independent level unlocks:
  // Each chapter has its own independent Level 1 to 3 progression
  const isLevelUnlocked = (levelId: number) => {
    // CHAPTER 1 (Independent):
    if (levelId === 1) return true;
    if (levelId === 2) return completedLevels.includes(1) || completedLevels.includes(2) || currentLevelId === 2;
    if (levelId === 3) return completedLevels.includes(2) || completedLevels.includes(3) || currentLevelId === 3;

    // CHAPTER 2 (Independent):
    // Level 1 of Chapter 2 (id: 4) is unlocked by default!
    if (levelId === 4) return true;
    if (levelId === 5) return completedLevels.includes(4) || completedLevels.includes(5) || currentLevelId === 5;
    if (levelId === 6) return completedLevels.includes(5) || completedLevels.includes(6) || currentLevelId === 6;

    return completedLevels.includes(levelId);
  };

  return (
    <div className="w-full bg-[#241a12]/90 backdrop-blur border border-[#5d3f26] rounded-2xl p-4 sm:p-6 mb-6 shadow-xl vintage-border">
      {/* Top row: Active Chapter Progress tracker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#dca368] font-medium tracking-wider uppercase">
            <span>Independent Chapter Quest</span>
            <span aria-hidden="true">·</span>
            <span>Chapter {activeChapterId} Active</span>
          </div>
          <h2 className="text-lg sm:text-xl font-serif-title font-bold text-[#faedd9] mt-0.5">
            {activeChapterId === 1 ? 'Chapter 1: Birth & Learning' : 'Chapter 2: Inspirations & Beliefs'}
          </h2>
        </div>

        {/* 0/3 Levels Tracker */}
        <div className="flex items-center gap-3">
          <div className="text-left sm:text-right bg-[#181009] px-3.5 py-1.5 rounded-xl border border-[#4d331e]">
            <span className="text-xs text-[#beaa97] block">
              Chapter {activeChapterId} Progress
            </span>
            <span className="text-sm sm:text-base font-semibold text-[#e5a86a] font-mono tabular-nums">
              {currentChapterCompleted} / 3 Levels ({currentChapterPercent}%)
            </span>
          </div>
        </div>
      </div>

      {/* Progress Track Bar for the Active Chapter (0 to 3) */}
      <div className="relative w-full h-2.5 bg-[#181009] rounded-full overflow-hidden mb-5 border border-[#4d331e]">
        <div
          className="h-full bg-gradient-to-r from-[#945524] via-[#b87333] to-[#e5a86a] transition-all duration-700 ease-out shadow-[0_0_12px_rgba(184,115,51,0.6)]"
          style={{ width: `${currentChapterPercent}%` }}
        />
      </div>

      {/* Interactive Chapter Selector Buttons (Chapter 1 & Chapter 2 each show 0/3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <button
          onClick={() => {
            soundEffects.playClick();
            // Switch to Chapter 1
            const nextLvl = [1, 2, 3].find((id) => !completedLevels.includes(id)) || 1;
            onSelectLevel(nextLvl);
          }}
          className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
            activeChapterId === 1
              ? 'bg-[#3d2615] border-[#ba7e44] text-[#faedd9] shadow-md ring-1 ring-[#ba7e44]/40'
              : 'bg-[#1c130d] border-[#4d331e] text-[#beaa97] hover:bg-[#2b1c11] hover:text-[#faedd9]'
          }`}
        >
          <div className="flex items-center gap-2.5 text-left">
            <div className={`p-1.5 rounded-lg ${activeChapterId === 1 ? 'bg-[#5a371e] text-[#faedd9]' : 'bg-[#291b11] text-[#dca368]'}`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-[#dca368] block uppercase">Chapter 1</span>
              <span className="font-serif-title font-bold text-xs sm:text-sm">Birth & Learning</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[#181009] border border-[#5d3f26] text-[#e5a86a]">
              {ch1Completed} / 3 Levels
            </span>
          </div>
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            // Switch to Chapter 2
            const nextLvl = [4, 5, 6].find((id) => !completedLevels.includes(id)) || 4;
            onSelectLevel(nextLvl);
          }}
          className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
            activeChapterId === 2
              ? 'bg-[#3d2615] border-[#ba7e44] text-[#faedd9] shadow-md ring-1 ring-[#ba7e44]/40'
              : 'bg-[#1c130d] border-[#4d331e] text-[#beaa97] hover:bg-[#2b1c11] hover:text-[#faedd9]'
          }`}
        >
          <div className="flex items-center gap-2.5 text-left">
            <div className={`p-1.5 rounded-lg ${activeChapterId === 2 ? 'bg-[#5a371e] text-[#faedd9]' : 'bg-[#291b11] text-[#dca368]'}`}>
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-[#dca368] block uppercase">Chapter 2</span>
              <span className="font-serif-title font-bold text-xs sm:text-sm">Inspirations & Beliefs</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[#181009] border border-[#5d3f26] text-[#e5a86a]">
              {ch2Completed} / 3 Levels
            </span>
          </div>
        </button>
      </div>

      {/* Chapters & Level Nodes (Both chapters have independent 1 to 3 levels) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Chapter 1 Group (Levels 1 to 3) */}
        <div className={`rounded-xl p-3.5 border transition-all ${
          activeChapterId === 1 ? 'bg-[#21160e] border-[#7d4e28] shadow-md' : 'bg-[#1c130d]/80 border-[#4d331e]'
        }`}>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#ebd3b9] font-serif-title">
              <BookOpen className="w-3.5 h-3.5 text-[#dca368]" />
              <span>Chapter 1: Birth & Learning</span>
            </div>
            <span className="text-[11px] text-[#e5a86a] font-mono font-semibold">
              {ch1Completed} / 3 Done
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {ch1Levels.map((lvl) => {
              const isCompleted = completedLevels.includes(lvl.id);
              const isCurrent = currentLevelId === lvl.id;
              const unlocked = isLevelUnlocked(lvl.id);

              return (
                <button
                  key={lvl.id}
                  disabled={!unlocked}
                  onClick={() => {
                    soundEffects.playClick();
                    onSelectLevel(lvl.id);
                  }}
                  className={`relative flex flex-col items-center justify-center p-2.5 rounded-lg text-center transition-all ${
                    isCurrent
                      ? 'bg-[#4a2e18] border-2 border-[#dca368] shadow-md text-[#faedd9]'
                      : isCompleted
                      ? 'bg-[#212918] border border-[#526b38] text-[#c2df9e] hover:bg-[#2c3720] cursor-pointer'
                      : unlocked
                      ? 'bg-[#291e15] border border-[#593d25] text-[#d6c5b3] hover:border-[#a86e3f] cursor-pointer'
                      : 'bg-[#18110a] border border-[#342214] text-[#695544] cursor-not-allowed opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full mb-1">
                    {isCompleted ? (
                      <Check className="w-4 h-4 text-[#a3d16b] stroke-[3]" />
                    ) : isCurrent ? (
                      <Sparkles className="w-4 h-4 text-[#e5a86a] animate-spin" />
                    ) : unlocked ? (
                      <span className="text-xs font-bold font-mono text-[#d6c5b3]">
                        {lvl.levelNumberInChapter}
                      </span>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-[#735d4b]" />
                    )}
                  </div>
                  <span className="text-[11px] font-semibold tracking-tight truncate w-full">
                    Level {lvl.levelNumberInChapter}: {lvl.type === 'puzzle' ? 'Puzzle' : 'Quiz'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chapter 2 Group (Levels 1 to 3) */}
        <div className={`rounded-xl p-3.5 border transition-all ${
          activeChapterId === 2 ? 'bg-[#21160e] border-[#7d4e28] shadow-md' : 'bg-[#1c130d]/80 border-[#4d331e]'
        }`}>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#ebd3b9] font-serif-title">
              <Crown className="w-3.5 h-3.5 text-[#dca368]" />
              <span>Chapter 2: Inspirations & Beliefs</span>
            </div>
            <span className="text-[11px] text-[#e5a86a] font-mono font-semibold">
              {ch2Completed} / 3 Done
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {ch2Levels.map((lvl) => {
              const isCompleted = completedLevels.includes(lvl.id);
              const isCurrent = currentLevelId === lvl.id;
              const unlocked = isLevelUnlocked(lvl.id);

              return (
                <button
                  key={lvl.id}
                  disabled={!unlocked}
                  onClick={() => {
                    soundEffects.playClick();
                    onSelectLevel(lvl.id);
                  }}
                  className={`relative flex flex-col items-center justify-center p-2.5 rounded-lg text-center transition-all ${
                    isCurrent
                      ? 'bg-[#4a2e18] border-2 border-[#dca368] shadow-md text-[#faedd9]'
                      : isCompleted
                      ? 'bg-[#212918] border border-[#526b38] text-[#c2df9e] hover:bg-[#2c3720] cursor-pointer'
                      : unlocked
                      ? 'bg-[#291e15] border border-[#593d25] text-[#d6c5b3] hover:border-[#a86e3f] cursor-pointer'
                      : 'bg-[#18110a] border border-[#342214] text-[#695544] cursor-not-allowed opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full mb-1">
                    {isCompleted ? (
                      <Check className="w-4 h-4 text-[#a3d16b] stroke-[3]" />
                    ) : isCurrent ? (
                      <Sparkles className="w-4 h-4 text-[#e5a86a] animate-spin" />
                    ) : unlocked ? (
                      <span className="text-xs font-bold font-mono text-[#d6c5b3]">
                        {lvl.levelNumberInChapter}
                      </span>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-[#735d4b]" />
                    )}
                  </div>
                  <span className="text-[11px] font-semibold tracking-tight truncate w-full">
                    Level {lvl.levelNumberInChapter}: {lvl.type === 'puzzle' ? 'Puzzle' : 'Quiz'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
