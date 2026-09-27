import React from 'react';
import { Volume2, VolumeX, BookOpen, Trophy, Sparkles } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface NavbarProps {
  currentTab: 'game' | 'achievements' | 'story';
  setCurrentTab: (tab: 'game' | 'achievements' | 'story') => void;
  score: number;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  unlockedCount: number;
  totalAchievements: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  score,
  soundEnabled,
  setSoundEnabled,
  unlockedCount,
  totalAchievements
}) => {
  const toggleSound = () => {
    soundEffects.playClick();
    soundEffects.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1c130c]/95 backdrop-blur-md border-b border-[#5c3e24]/60 px-4 sm:px-8 py-3.5 transition-all shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand Wordmark */}
        <button
          onClick={() => {
            soundEffects.playClick();
            setCurrentTab('game');
          }}
          className="text-left font-serif-title text-base sm:text-xl font-bold tracking-wider text-[#faedd9] hover:text-[#e4a86b] transition-colors shrink-0"
        >
          BHAGAT SINGH <span className="text-[#c98a4b] font-light">· CHRONICLES</span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => {
              soundEffects.playClick();
              setCurrentTab('game');
            }}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              currentTab === 'game'
                ? 'bg-[#472c19] text-[#faedd9] border border-[#a26839]/60 shadow-sm'
                : 'text-[#d6c5b3] hover:text-[#faedd9] hover:bg-[#2e1d12]/70'
            }`}
          >
            Quest Journey
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setCurrentTab('story');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              currentTab === 'story'
                ? 'bg-[#472c19] text-[#faedd9] border border-[#a26839]/60 shadow-sm'
                : 'text-[#d6c5b3] hover:text-[#faedd9] hover:bg-[#2e1d12]/70'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#dca368]" />
            <span>Story Archives</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setCurrentTab('achievements');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              currentTab === 'achievements'
                ? 'bg-[#472c19] text-[#faedd9] border border-[#a26839]/60 shadow-sm'
                : 'text-[#d6c5b3] hover:text-[#faedd9] hover:bg-[#2e1d12]/70'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-[#dca368]" />
            <span className="hidden sm:inline">Achievements</span>
            <span className="text-xs text-[#dca368] font-mono">
              ({unlockedCount}/{totalAchievements})
            </span>
          </button>
        </nav>

        {/* Zone 3: Controls and Score Display */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Score Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#3b2314] to-[#25170d] border border-[#7f4f27]/70 rounded-lg text-xs sm:text-sm font-semibold text-[#faedd9] shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#e5a86a] animate-pulse" />
            <span className="font-mono tabular-nums tracking-wide">{score}</span>
            <span className="text-[11px] text-[#caa076] font-normal uppercase hidden xs:inline">pts</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className="p-1.5 text-[#cfbda9] hover:text-[#faedd9] hover:bg-[#342013] rounded-lg border border-[#5c3e24]/60 transition-colors"
            title={soundEnabled ? 'Sound On' : 'Sound Off'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#dca368]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#7d6957]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
