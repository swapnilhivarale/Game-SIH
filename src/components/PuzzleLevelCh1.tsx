import React, { useState } from 'react';
import { LevelConfig, WordScrambleItem, MatchPair } from '../types/game';
import { soundEffects } from '../utils/audio';
import { CheckCircle2, Lightbulb, Puzzle, Sparkles, ArrowRight, RotateCcw, BookOpen } from 'lucide-react';

interface PuzzleLevelCh1Props {
  level: LevelConfig;
  onCompleteLevel: (score: number) => void;
  onOpenStoryDrawer: () => void;
  onUseHint: () => void;
}

export const PuzzleLevelCh1: React.FC<PuzzleLevelCh1Props> = ({
  level,
  onCompleteLevel,
  onOpenStoryDrawer,
  onUseHint,
}) => {
  const scrambleItems: WordScrambleItem[] = level.scrambleItems || [];
  const matchPairs: MatchPair[] = level.matchPairs || [];

  // Scramble states
  const [currentScrambleIdx, setCurrentScrambleIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [solvedScrambles, setSolvedScrambles] = useState<string[]>([]);
  const [scrambleError, setScrambleError] = useState(false);
  const [activeScrambleHint, setActiveScrambleHint] = useState(false);

  // Matchmaker states
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [matchErrorId, setMatchErrorId] = useState<string | null>(null);
  const [activeMatchHint, setActiveMatchHint] = useState<string | null>(null);

  // Shuffled right-side descriptions once on mount
  const [shuffledDescriptions] = useState(() => {
    return [...matchPairs].sort(() => Math.random() - 0.5);
  });

  const activeScramble = scrambleItems[currentScrambleIdx];
  const allScramblesDone = solvedScrambles.length === scrambleItems.length;
  const allMatchesDone = matchedIds.length === matchPairs.length;
  const isEntirePuzzleDone = allScramblesDone && allMatchesDone;

  // Handle checking word scramble
  const handleCheckScramble = () => {
    if (!activeScramble) return;
    const cleanInput = userInput.trim().toUpperCase();
    const cleanSolution = activeScramble.solution.toUpperCase();

    if (cleanInput === cleanSolution) {
      soundEffects.playCorrect();
      setScrambleError(false);
      setSolvedScrambles((prev) => [...prev, activeScramble.id]);
      setUserInput('');
      setActiveScrambleHint(false);

      if (currentScrambleIdx < scrambleItems.length - 1) {
        setCurrentScrambleIdx((prev) => prev + 1);
      }
    } else {
      soundEffects.playWrong();
      setScrambleError(true);
      setTimeout(() => setScrambleError(false), 1200);
    }
  };

  const handleScrambleHint = () => {
    soundEffects.playHint();
    setActiveScrambleHint(true);
    onUseHint();
  };

  // Handle Matchmaking
  const handleSelectTerm = (id: string) => {
    if (matchedIds.includes(id)) return;
    soundEffects.playClick();
    setSelectedTerm(id);
  };

  const handleSelectDesc = (id: string) => {
    if (matchedIds.includes(id)) return;
    if (!selectedTerm) return;

    if (selectedTerm === id) {
      // Correct match!
      soundEffects.playCorrect();
      setMatchedIds((prev) => [...prev, id]);
      setSelectedTerm(null);
      setMatchErrorId(null);
    } else {
      // Incorrect match
      soundEffects.playWrong();
      setMatchErrorId(id);
      setTimeout(() => {
        setMatchErrorId(null);
        setSelectedTerm(null);
      }, 900);
    }
  };

  const handleMatchHint = () => {
    soundEffects.playHint();
    const unmatched = matchPairs.find((p) => !matchedIds.includes(p.id));
    if (unmatched) {
      setActiveMatchHint(`Hint: Connect "${unmatched.term}" with the description: "${unmatched.description.slice(0, 35)}..."`);
      onUseHint();
    }
  };

  const handleFinish = () => {
    soundEffects.playVictory();
    // Complete with 280 points for puzzle mastery
    onCompleteLevel(280);
  };

  return (
    <div className="w-full bg-[#241a12] border border-[#5d3f26] rounded-2xl p-4 sm:p-8 shadow-2xl relative overflow-hidden vintage-border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#4d331e] gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#dca368] font-medium tracking-wide">
            <span>{level.subtitle}</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Chronicle Puzzle</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-[#faedd9] mt-1 flex items-center gap-2">
            <Puzzle className="w-5 h-5 text-[#dca368]" />
            <span>{level.title}</span>
          </h3>
        </div>

        <button
          onClick={() => {
            soundEffects.playClick();
            onOpenStoryDrawer();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#d6c5b3] hover:text-[#faedd9] bg-[#2e1d12] hover:bg-[#3d2719] border border-[#5c3e24] rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#dca368]" />
          <span>Read Story Excerpt</span>
        </button>
      </div>

      <p className="text-sm text-[#e0cfbe] font-serif-body text-base mb-6 leading-relaxed">
        {level.instructions} Complete both historical challenges below to weave together the story of Bhagat Singh&apos;s youth.
      </p>

      {/* Part 1: Word Scramble Cipher */}
      <div className="mb-8 p-5 sm:p-6 bg-[#1a120b] border border-[#4d331e] rounded-xl shadow-inner">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-[#472c18] border border-[#804f29] text-[#faedd9] text-xs font-mono font-bold flex items-center justify-center">
              1
            </span>
            <h4 className="text-base sm:text-lg font-serif-title font-semibold text-[#faedd9]">
              Unscramble Key Historical Terms ({solvedScrambles.length}/{scrambleItems.length})
            </h4>
          </div>
          <span className="text-xs text-[#dca368] font-mono">
            {allScramblesDone ? 'Completed' : `Term ${currentScrambleIdx + 1} of ${scrambleItems.length}`}
          </span>
        </div>

        {!allScramblesDone && activeScramble ? (
          <div className="space-y-4">
            <div className="p-4 bg-[#261910] border border-[#593b22] rounded-lg">
              <span className="text-xs text-[#b8a492] block mb-1">Historical Clue:</span>
              <p className="text-sm sm:text-base font-medium font-serif-body text-[#faedd9]">
                &ldquo;{activeScramble.clue}&rdquo;
              </p>
            </div>

            {/* Scrambled Letters Display */}
            <div className="flex flex-wrap items-center justify-center gap-2 py-3">
              {activeScramble.scrambled.split('').map((char, i) => (
                <span
                  key={i}
                  className={`w-9 h-11 flex items-center justify-center font-mono font-bold text-lg rounded-lg border shadow-md ${
                    char === ' '
                      ? 'w-4 border-transparent'
                      : 'bg-gradient-to-b from-[#3a2517] to-[#25170d] border-[#8c562c] text-[#faedd9]'
                  }`}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* Input form */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCheckScramble();
                  }}
                  placeholder="Type unscrambled name..."
                  className={`w-full px-4 py-2.5 bg-[#170f08] border rounded-xl font-medium tracking-wide text-[#faedd9] placeholder-[#806c5b] focus:outline-none focus:ring-2 focus:ring-[#ba7e44]/50 ${
                    scrambleError ? 'border-[#b53a3a] ring-2 ring-[#b53a3a]/40' : 'border-[#4a311d]'
                  }`}
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  onClick={handleCheckScramble}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#a8642a] hover:bg-[#b97334] text-[#1c1209] font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Verify
                </button>

                <button
                  onClick={handleScrambleHint}
                  className="px-3 py-2.5 bg-[#2a1c12] hover:bg-[#3d2719] text-[#e5a86a] border border-[#5c3e24] rounded-xl text-xs font-medium transition-colors cursor-pointer"
                  title="Show Clue Hint"
                >
                  <Lightbulb className="w-4 h-4" />
                </button>
              </div>
            </div>

            {scrambleError && (
              <p className="text-xs text-[#e87a7a] font-medium animate-shake">
                Incorrect unscramble! Re-read the clue carefully or use a hint.
              </p>
            )}

            {activeScrambleHint && (
              <div className="p-3 bg-[#2d1b10] border border-[#7a4823] rounded-lg text-xs text-[#faedd9]">
                <span className="font-semibold text-[#e5a86a]">Cipher Hint: </span>
                {activeScramble.hint}
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 bg-[#202917] border border-[#56753c] rounded-xl flex items-center justify-between text-[#c6e69f]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#88ba54]" />
              <span className="text-sm font-semibold">
                All Chapter 1 Key Terms Deciphered: Banga, Kishan Singh, Ajit Singh, Lala Lajpat Rai!
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Part 2: Fact Weaver Connection Matrix */}
      <div className="mb-6 p-5 sm:p-6 bg-[#1a120b] border border-[#4d331e] rounded-xl shadow-inner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-[#472c18] border border-[#804f29] text-[#faedd9] text-xs font-mono font-bold flex items-center justify-center">
              2
            </span>
            <h4 className="text-base sm:text-lg font-serif-title font-semibold text-[#faedd9]">
              Historical Fact Weaver Matrix ({matchedIds.length}/{matchPairs.length} Connected)
            </h4>
          </div>

          <button
            onClick={handleMatchHint}
            className="flex items-center gap-1.5 text-xs text-[#e5a86a] hover:text-[#faedd9] cursor-pointer self-start sm:self-auto"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Hint for connection</span>
          </button>
        </div>

        {activeMatchHint && (
          <div className="mb-4 p-3 bg-[#2d1b10] border border-[#7a4823] rounded-lg text-xs text-[#faedd9]">
            {activeMatchHint}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column: Entities */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#b8a492] block mb-1">
              Select an Entity / Landmark:
            </span>
            {matchPairs.map((pair) => {
              const isMatched = matchedIds.includes(pair.id);
              const isSelected = selectedTerm === pair.id;

              return (
                <button
                  key={pair.id}
                  disabled={isMatched}
                  onClick={() => handleSelectTerm(pair.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm font-medium ${
                    isMatched
                      ? 'bg-[#202917] border-[#4e6c34] text-[#b0d685] line-through opacity-70 cursor-default'
                      : isSelected
                      ? 'bg-[#472b17] border-2 border-[#dca368] text-[#faedd9] shadow-md'
                      : 'bg-[#1e150e] border-[#4a311d] text-[#e8d7c5] hover:border-[#966336] cursor-pointer'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{pair.term}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-[#88ba54] shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Descriptions */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#b8a492] block mb-1">
              Match with Historical Truth from Text:
            </span>
            {shuffledDescriptions.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isError = matchErrorId === item.id;

              return (
                <button
                  key={item.id}
                  disabled={isMatched || !selectedTerm}
                  onClick={() => handleSelectDesc(item.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm font-serif-body text-base ${
                    isMatched
                      ? 'bg-[#202917] border-[#4e6c34] text-[#b0d685] opacity-70 cursor-default'
                      : isError
                      ? 'bg-[#3b1717] border-[#8a3333] text-[#f7c1c1] animate-shake'
                      : selectedTerm
                      ? 'bg-[#22170f] border-[#664327] text-[#faedd9] hover:bg-[#312014] hover:border-[#a86e3f] cursor-pointer'
                      : 'bg-[#18100a] border-[#362315] text-[#786352] cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="leading-snug">{item.description}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-[#88ba54] shrink-0 ml-2" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Completion Action */}
      {isEntirePuzzleDone ? (
        <div className="p-6 bg-gradient-to-r from-[#3b2314] to-[#24170d] border border-[#855127] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-[#e5a86a] font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Chapter 1 Chronicle Solved! (+280 pts)</span>
            </div>
            <p className="text-xs text-[#d6c5b3] mt-1">
              You have mastered all 3 levels of Chapter 1: Birth & Learning. Ready to advance to Chapter 2?
            </p>
          </div>
          <button
            onClick={handleFinish}
            className="px-6 py-3 bg-gradient-to-r from-[#a8642a] to-[#c7823e] hover:from-[#b97334] hover:to-[#da954f] text-[#1c1209] font-bold text-sm sm:text-base rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
          >
            Claim Victory & Unlock Chapter 2
          </button>
        </div>
      ) : (
        <div className="text-center text-xs text-[#9e8b7a] py-2">
          Solve both parts above to complete Level 3 and conclude Chapter 1.
        </div>
      )}
    </div>
  );
};
