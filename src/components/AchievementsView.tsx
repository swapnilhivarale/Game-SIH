import React, { useState } from 'react';
import { Achievement, PlayerStats } from '../types/game';
import {
  Trophy,
  Compass,
  BookOpen,
  Puzzle,
  Award,
  Flame,
  Scale,
  Scroll,
  Crown,
  Zap,
  Sparkles,
  Lock,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface AchievementsViewProps {
  achievements: Achievement[];
  stats: PlayerStats;
  onBackToGame: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Compass,
  BookOpen,
  Puzzle,
  Award,
  Flame,
  Scale,
  Scroll,
  Crown,
  Zap,
  Sparkles,
};

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  achievements,
  stats,
  onBackToGame,
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const unlockedList = achievements.filter((a) => a.unlocked);
  const totalCount = achievements.length;
  const unlockedCount = unlockedList.length;
  const completionPercent = Math.round((unlockedCount / totalCount) * 100);
  const totalAchievementPoints = unlockedList.reduce((acc, curr) => acc + curr.points, 0);

  const filteredAchievements = achievements.filter((a) => {
    if (filter === 'unlocked') return a.unlocked;
    if (filter === 'locked') return !a.unlocked;
    return true;
  });

  // Calculate Title Rank based on unlocked count
  const getRank = () => {
    if (unlockedCount >= 9) return 'Shaheed\'s Chronicler';
    if (unlockedCount >= 6) return 'Philosophical Patriot';
    if (unlockedCount >= 3) return 'Inquisitive Scholar';
    return 'Eager Student of History';
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#5c3e24]">
        <div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onBackToGame();
            }}
            className="flex items-center gap-1.5 text-xs text-[#dca368] hover:text-[#faedd9] font-medium mb-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Game Quest</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#faedd9] flex items-center gap-2.5">
            <Trophy className="w-7 h-7 text-[#dca368]" />
            <span>Hall of Achievements</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#beaa97] mt-1 font-serif-body text-base">
            Historical milestones and intellectual mastery earned across the 2 chapters.
          </p>
        </div>

        {/* Rank & Stats Summary */}
        <div className="flex items-center gap-3">
          <div className="bg-[#241a12] border border-[#5d3f26] rounded-xl px-4 py-2.5 shadow-md vintage-border">
            <span className="text-[11px] font-mono text-[#a38e7d] uppercase tracking-wider block">
              Honorary Rank
            </span>
            <span className="text-sm font-serif-title font-bold text-[#e5a86a]">
              {getRank()}
            </span>
          </div>

          <div className="bg-[#241a12] border border-[#5d3f26] rounded-xl px-4 py-2.5 shadow-md text-right vintage-border">
            <span className="text-[11px] font-mono text-[#a38e7d] uppercase tracking-wider block">
              Honor Points
            </span>
            <span className="text-sm font-mono font-bold text-[#dca368] tabular-nums">
              +{totalAchievementPoints} pts
            </span>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-[#241a12] border border-[#5d3f26] rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden vintage-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#ebd3b9] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#dca368]" />
            <span>Medal Completion Rate</span>
          </div>
          <span className="text-xs sm:text-sm font-mono font-semibold text-[#beaa97]">
            {unlockedCount} of {totalCount} Trophies Unlocked ({completionPercent}%)
          </span>
        </div>

        <div className="w-full h-3 bg-[#170f08] rounded-full overflow-hidden border border-[#4d331e] mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#945524] via-[#b87333] to-[#e5a86a] transition-all duration-700 ease-out shadow-[0_0_12px_rgba(184,115,51,0.6)]"
            style={{ width: `${completionPercent}%` }}
          />
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between gap-2 pt-2">
          <div className="flex items-center gap-1.5 p-1 bg-[#19110a] rounded-lg border border-[#422c1a]">
            <button
              onClick={() => {
                soundEffects.playClick();
                setFilter('all');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-[#472c18] text-[#faedd9] shadow-sm border border-[#855127]'
                  : 'text-[#9c8978] hover:text-[#d6c5b3]'
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setFilter('unlocked');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'unlocked'
                  ? 'bg-[#2b3b1c] text-[#d6f0b8] shadow-sm border border-[#526b38]'
                  : 'text-[#9c8978] hover:text-[#d6c5b3]'
              }`}
            >
              Unlocked ({unlockedCount})
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setFilter('locked');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'locked'
                  ? 'bg-[#332216] text-[#beaa97] shadow-sm border border-[#543823]'
                  : 'text-[#9c8978] hover:text-[#d6c5b3]'
              }`}
            >
              Locked ({totalCount - unlockedCount})
            </button>
          </div>

          <div className="text-xs text-[#beaa97] font-mono hidden sm:block">
            Streak Record: <span className="text-[#e5a86a] font-bold">{stats.maxStreak}</span> in a row
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAchievements.map((ach) => {
          const IconComp = ICON_MAP[ach.iconName] || Trophy;

          return (
            <div
              key={ach.id}
              className={`relative rounded-2xl p-5 border transition-all flex items-start gap-4 ${
                ach.unlocked
                  ? 'bg-gradient-to-br from-[#2a1d13] to-[#20150d] border-[#7d4e27] shadow-lg shadow-[#100703]/50 ring-1 ring-[#a66838]/30'
                  : 'bg-[#18110a] border-[#362315] text-[#695544] opacity-60'
              }`}
            >
              {/* Badge Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                  ach.unlocked
                    ? 'bg-gradient-to-br from-[#4a2e18] to-[#2e1d11] border-[#ba7e44] text-[#faedd9] shadow-inner'
                    : 'bg-[#1e150e] border-[#3a2516] text-[#695544]'
                }`}
              >
                {ach.unlocked ? (
                  <IconComp className="w-6 h-6 stroke-[2]" />
                ) : (
                  <Lock className="w-5 h-5 stroke-[1.5]" />
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3
                    className={`text-base font-serif-title font-semibold truncate ${
                      ach.unlocked ? 'text-[#faedd9]' : 'text-[#877260]'
                    }`}
                  >
                    {ach.title}
                  </h3>
                  <span
                    className={`text-xs font-mono font-semibold shrink-0 ${
                      ach.unlocked ? 'text-[#dca368]' : 'text-[#695544]'
                    }`}
                  >
                    +{ach.points} pts
                  </span>
                </div>

                <p
                  className={`text-xs leading-relaxed font-serif-body text-base ${
                    ach.unlocked ? 'text-[#d6c5b3]' : 'text-[#6e5a4a]'
                  }`}
                >
                  {ach.description}
                </p>

                {ach.unlocked && (
                  <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-[#a3d16b] font-medium">
                    <CheckCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Unlocked & Achieved</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Inspirational Historical Quote Footer Banner */}
      <div className="p-6 bg-gradient-to-r from-[#2e1c11] via-[#24170d] to-[#1a1109] border border-[#5d3f26] rounded-2xl text-center vintage-border">
        <blockquote className="font-serif-title italic text-sm sm:text-base text-[#ebd3b9] max-w-2xl mx-auto">
          &ldquo;Removing British rule was only one part of India&apos;s freedom. People also needed freedom from poverty and unfair treatment.&rdquo;
        </blockquote>
        <div className="text-xs text-[#dca368] font-mono mt-2">
          — Bhagat Singh (Chapter 2: Inspirations & Beliefs)
        </div>
      </div>
    </div>
  );
};
