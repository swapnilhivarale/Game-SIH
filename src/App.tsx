/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProgressBar } from './components/ProgressBar';
import { QuizLevel } from './components/QuizLevel';
import { PuzzleLevelCh1 } from './components/PuzzleLevelCh1';
import { PuzzleLevelCh2 } from './components/PuzzleLevelCh2';
import { AchievementsView } from './components/AchievementsView';
import { StoryReaderModal } from './components/StoryReaderModal';
import { VictoryModal } from './components/VictoryModal';
import { GAME_LEVELS, INITIAL_ACHIEVEMENTS, CHAPTERS_STORY } from './data/chaptersData';
import { Achievement, PlayerStats } from './types/game';
import { BookOpen, Sparkles, Trophy, Lightbulb, Shield, Scroll, CheckCircle2 } from 'lucide-react';
import { soundEffects } from './utils/audio';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'game' | 'achievements' | 'story'>('game');
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [levelScores, setLevelScores] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);

  // Modals
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);
  const [storyModalChapter, setStoryModalChapter] = useState<1 | 2>(1);
  const [victoryData, setVictoryData] = useState<{
    isOpen: boolean;
    levelId: number;
    earnedPoints: number;
    newAchievements: Achievement[];
  } | null>(null);

  // Key to force reset level component when replaying
  const [levelInstanceKey, setLevelInstanceKey] = useState<number>(0);

  const currentLevelConfig = GAME_LEVELS.find((l) => l.id === currentLevelId) || GAME_LEVELS[0];

  // Helper to unlock achievements
  const checkAndUnlockAchievements = (
    newCompletedLevels: number[],
    currentStreakCount: number
  ): Achievement[] => {
    const newlyUnlocked: Achievement[] = [];

    const updated = achievements.map((ach) => {
      if (ach.unlocked) return ach;
      let shouldUnlock = false;

      if (ach.id === 'ach_first_step' && newCompletedLevels.includes(1)) {
        shouldUnlock = true;
      }
      if (ach.id === 'ach_inquisitive_mind' && newCompletedLevels.includes(2)) {
        shouldUnlock = true;
      }
      if (ach.id === 'ach_archive_master' && newCompletedLevels.includes(3)) {
        shouldUnlock = true;
      }
      if (
        ach.id === 'ach_chapter1_complete' &&
        newCompletedLevels.includes(1) &&
        newCompletedLevels.includes(2) &&
        newCompletedLevels.includes(3)
      ) {
        shouldUnlock = true;
      }
      if (ach.id === 'ach_amritsar_memory' && newCompletedLevels.includes(4)) {
        shouldUnlock = true;
      }
      if (ach.id === 'ach_socialist_vision' && newCompletedLevels.includes(5)) {
        shouldUnlock = true;
      }
      if (ach.id === 'ach_quote_architect' && newCompletedLevels.includes(6)) {
        shouldUnlock = true;
      }
      if (
        ach.id === 'ach_chapter2_complete' &&
        newCompletedLevels.includes(4) &&
        newCompletedLevels.includes(5) &&
        newCompletedLevels.includes(6)
      ) {
        shouldUnlock = true;
      }
      if (ach.id === 'ach_perfect_streak' && currentStreakCount >= 5) {
        shouldUnlock = true;
      }
      if (ach.id === 'ach_grand_historian' && newCompletedLevels.length >= 6) {
        shouldUnlock = true;
      }

      if (shouldUnlock) {
        const unlockedAch = {
          ...ach,
          unlocked: true,
          unlockedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        newlyUnlocked.push(unlockedAch);
        return unlockedAch;
      }
      return ach;
    });

    if (newlyUnlocked.length > 0) {
      setAchievements(updated);
      const bonusScore = newlyUnlocked.reduce((sum, a) => sum + a.points, 0);
      setScore((prev) => prev + bonusScore);
    }

    return newlyUnlocked;
  };

  // Handle Quiz question answering
  const handleAnswerQuestion = (correct: boolean, usedHint: boolean) => {
    if (usedHint) {
      setHintsUsed((prev) => prev + 1);
    }

    if (correct) {
      setStreak((prev) => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        checkAndUnlockAchievements(completedLevels, next);
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  // Handle single hint tracking in puzzles
  const handleUseHint = () => {
    setHintsUsed((prev) => prev + 1);
  };

  // Handle Level Completion
  const handleCompleteLevel = (levelScore: number) => {
    const updatedCompleted = completedLevels.includes(currentLevelId)
      ? completedLevels
      : [...completedLevels, currentLevelId];

    setCompletedLevels(updatedCompleted);
    setLevelScores((prev) => ({ ...prev, [currentLevelId]: levelScore }));
    setScore((prev) => prev + levelScore);

    const newlyEarnedAchievements = checkAndUnlockAchievements(updatedCompleted, streak);

    setVictoryData({
      isOpen: true,
      levelId: currentLevelId,
      earnedPoints: levelScore,
      newAchievements: newlyEarnedAchievements,
    });
  };

  // Modal navigation
  const handleNextLevel = () => {
    setVictoryData(null);
    if (!victoryData) return;
    const currentId = victoryData.levelId;

    if (currentId === 1) {
      setCurrentLevelId(2);
    } else if (currentId === 2) {
      setCurrentLevelId(3);
    } else if (currentId === 3) {
      // Completed Chapter 1 Level 3. Proceed to Chapter 2 Level 1 (id 4)
      const nextLvl = [4, 5, 6].find((id) => !completedLevels.includes(id)) || 4;
      setCurrentLevelId(nextLvl);
    } else if (currentId === 4) {
      setCurrentLevelId(5);
    } else if (currentId === 5) {
      setCurrentLevelId(6);
    } else if (currentId === 6) {
      // Completed Chapter 2 Level 3. If Chapter 1 has uncompleted levels, go to Chapter 1
      const nextLvl = [1, 2, 3].find((id) => !completedLevels.includes(id));
      if (nextLvl) {
        setCurrentLevelId(nextLvl);
      }
    }
    setLevelInstanceKey((prev) => prev + 1);
  };

  const handleReplayLevel = () => {
    setVictoryData(null);
    setLevelInstanceKey((prev) => prev + 1);
  };

  const handleSelectLevel = (levelId: number) => {
    setCurrentLevelId(levelId);
    setLevelInstanceKey((prev) => prev + 1);
  };

  const handleOpenStoryDrawer = (chapterId?: 1 | 2) => {
    setStoryModalChapter(chapterId || (currentLevelConfig.chapterId as 1 | 2));
    setIsStoryModalOpen(true);
  };

  const playerStats: PlayerStats = {
    score,
    streak,
    maxStreak,
    hintsUsed,
    completedLevels,
    levelScores,
    unlockedAchievements: achievements.filter((a) => a.unlocked).map((a) => a.id),
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="min-h-screen bg-[#1a120c] text-[#f2e8dc] flex flex-col font-sans selection:bg-[#8b5a2b]/40 selection:text-[#f8eddc]">
      {/* Strict Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        score={score}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        unlockedCount={unlockedCount}
        totalAchievements={achievements.length}
      />

      {/* Main Content Layout */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col">
        {/* Achievements Page View */}
        {currentTab === 'achievements' && (
          <AchievementsView
            achievements={achievements}
            stats={playerStats}
            onBackToGame={() => setCurrentTab('game')}
          />
        )}

        {/* Story Archives View */}
        {currentTab === 'story' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#5c3e24] gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#faedd9] flex items-center gap-2">
                  <BookOpen className="w-7 h-7 text-[#dca368]" />
                  <span>The Historical Chronicles</span>
                </h1>
                <p className="text-xs sm:text-sm text-[#beaa97] mt-1 font-serif-body text-base">
                  Complete text of Chapters 1 &amp; 2 from the life and freedom struggle of Bhagat Singh.
                </p>
              </div>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  setCurrentTab('game');
                }}
                className="px-5 py-2.5 bg-[#a8642a] hover:bg-[#b97334] text-[#1c1209] font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer self-start sm:self-auto shadow-md"
              >
                Resume Quest
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CHAPTERS_STORY.map((chapter) => (
                <div
                  key={chapter.id}
                  className="bg-[#241a12] border border-[#5d3f26] rounded-2xl p-6 shadow-xl flex flex-col justify-between vintage-border"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-semibold text-[#dca368] uppercase tracking-widest">
                        BHAGAT SINGH / {chapter.number}
                      </span>
                      <span className="text-xs text-[#a38e7d] font-mono">
                        Page {chapter.id} of 2
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-serif-title font-bold text-[#faedd9] mb-4">
                      {chapter.title}
                    </h2>

                    <div className="space-y-3.5 text-sm sm:text-base leading-relaxed text-[#e0cfbe] font-serif-body mb-6">
                      {chapter.originalText.map((p, pIdx) => (
                        <p key={pIdx} className="leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#452e1c]">
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setCurrentLevelId(chapter.id === 1 ? 1 : 4);
                        setCurrentTab('game');
                      }}
                      className="w-full py-2.5 bg-[#2f1f14] hover:bg-[#402a1b] hover:text-[#faedd9] text-[#d6c5b3] font-medium text-xs rounded-xl border border-[#5c3e24] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#dca368]" />
                      <span>Play Chapter {chapter.number} Levels</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Primary Interactive Game View */}
        {currentTab === 'game' && (
          <div className="flex flex-col flex-1">
            {/* Historical Hero Banner - Vintage Leather & Parchment Styling */}
            <div className="relative mb-6 rounded-2xl p-5 sm:p-7 bg-gradient-to-r from-[#2c1d12] via-[#24180f] to-[#1c120a] border border-[#6b472a] shadow-xl overflow-hidden vintage-border">
              <div className="absolute -top-12 -right-12 w-72 h-72 bg-[#b87333]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#dca368] mb-1.5 uppercase tracking-wider">
                    <span>Freedom Struggle Chronicles</span>
                    <span aria-hidden="true">·</span>
                    <span>1907 – 1931</span>
                  </div>
                  <h1 className="text-xl sm:text-3xl font-serif-title font-bold text-[#faedd9] tracking-tight leading-tight">
                    Bhagat Singh: Life, Learning &amp; Ideals
                  </h1>
                  <p className="text-xs sm:text-sm text-[#d6c5b3] mt-2 leading-relaxed font-serif-body text-base">
                    Journey through the formative childhood, educational inquiry, inspirations, and socialist philosophy of Shaheed Bhagat Singh, faithfully drawn from the historical record.
                  </p>
                </div>

                {/* Score & Chapter Progress Quick Ribbon */}
                <div className="flex items-center gap-3 shrink-0 self-start md:self-auto flex-wrap">
                  <div className="bg-[#181009]/95 border border-[#5d3f26] rounded-xl px-4 py-2.5 shadow-md">
                    <span className="text-[11px] font-mono text-[#a38e7d] block uppercase">
                      Chapter {currentLevelConfig.chapterId} Progress
                    </span>
                    <span className="text-lg font-mono font-bold text-[#e5a86a] tabular-nums">
                      {completedLevels.filter((id) => (currentLevelConfig.chapterId === 1 ? id >= 1 && id <= 3 : id >= 4 && id <= 6)).length} / 3 <span className="text-xs text-[#beaa97] font-normal">Levels</span>
                    </span>
                  </div>

                  <div className="bg-[#181009]/95 border border-[#5d3f26] rounded-xl px-4 py-2.5 shadow-md">
                    <span className="text-[11px] font-mono text-[#a38e7d] block uppercase">
                      Current Quest Score
                    </span>
                    <span className="text-lg font-mono font-bold text-[#faedd9] tabular-nums">
                      {score} <span className="text-xs text-[#dca368] font-normal">pts</span>
                    </span>
                  </div>

                  <div className="bg-[#181009]/95 border border-[#5d3f26] rounded-xl px-4 py-2.5 shadow-md">
                    <span className="text-[11px] font-mono text-[#a38e7d] block uppercase">
                      Hints Used
                    </span>
                    <span className="text-lg font-mono font-bold text-[#d6c5b3] tabular-nums">
                      {hintsUsed}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Level Journey Progress Bar Component */}
            <ProgressBar
              currentLevelId={currentLevelId}
              completedLevels={completedLevels}
              onSelectLevel={handleSelectLevel}
            />

            {/* Active Level Playground */}
            <div className="flex-1 flex flex-col">
              {currentLevelConfig.type === 'quiz' && (
                <QuizLevel
                  key={`${currentLevelId}-${levelInstanceKey}`}
                  level={currentLevelConfig}
                  streak={streak}
                  onAnswerQuestion={handleAnswerQuestion}
                  onCompleteLevel={handleCompleteLevel}
                  onOpenStoryDrawer={() => handleOpenStoryDrawer(currentLevelConfig.chapterId as 1 | 2)}
                />
              )}

              {currentLevelConfig.id === 3 && (
                <PuzzleLevelCh1
                  key={`${currentLevelId}-${levelInstanceKey}`}
                  level={currentLevelConfig}
                  onCompleteLevel={handleCompleteLevel}
                  onOpenStoryDrawer={() => handleOpenStoryDrawer(1)}
                  onUseHint={handleUseHint}
                />
              )}

              {currentLevelConfig.id === 6 && (
                <PuzzleLevelCh2
                  key={`${currentLevelId}-${levelInstanceKey}`}
                  level={currentLevelConfig}
                  onCompleteLevel={handleCompleteLevel}
                  onOpenStoryDrawer={() => handleOpenStoryDrawer(2)}
                  onUseHint={handleUseHint}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Story Excerpt Modal */}
      <StoryReaderModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        initialChapterId={storyModalChapter}
      />

      {/* Victory / Level Completion Modal */}
      {victoryData && (
        <VictoryModal
          isOpen={victoryData.isOpen}
          level={GAME_LEVELS.find((l) => l.id === victoryData.levelId) || GAME_LEVELS[0]}
          earnedPoints={victoryData.earnedPoints}
          totalScore={score}
          newAchievements={victoryData.newAchievements}
          onNextLevel={handleNextLevel}
          onReplayLevel={handleReplayLevel}
          onViewAchievements={() => {
            setVictoryData(null);
            setCurrentTab('achievements');
          }}
          onViewStory={() => {
            handleOpenStoryDrawer(currentLevelConfig.chapterId as 1 | 2);
          }}
          isGrandFinale={completedLevels.length >= 6}
        />
      )}

      {/* Clean Editorial Footer */}
      <footer className="mt-auto border-t border-[#4d331e] bg-[#140c07] px-4 sm:px-8 py-5 text-center text-xs text-[#9c8978]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif-title font-semibold text-[#ebd3b9]">
              Bhagat Singh Chronicles
            </span>
            <span aria-hidden="true">·</span>
            <span>Historical Quest &amp; Puzzle Experience</span>
          </div>

          <div className="flex items-center gap-3 text-[#9c8978]">
            <span>Chapter 1: Birth &amp; Learning</span>
            <span aria-hidden="true">·</span>
            <span>Chapter 2: Inspirations &amp; Beliefs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
