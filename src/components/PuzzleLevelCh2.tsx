import React, { useState } from 'react';
import { LevelConfig, MatchPair } from '../types/game';
import { soundEffects } from '../utils/audio';
import { CheckCircle2, Lightbulb, Puzzle, Sparkles, RotateCcw, BookOpen, Crown } from 'lucide-react';

interface PuzzleLevelCh2Props {
  level: LevelConfig;
  onCompleteLevel: (score: number) => void;
  onOpenStoryDrawer: () => void;
  onUseHint: () => void;
}

export const PuzzleLevelCh2: React.FC<PuzzleLevelCh2Props> = ({
  level,
  onCompleteLevel,
  onOpenStoryDrawer,
  onUseHint,
}) => {
  const matchPairs: MatchPair[] = level.matchPairs || [];
  const quoteData = level.quoteSentence || {
    words: [
      "Removing", "British", "rule", "was", "only", "one", "part", "of", "India's",
      "freedom.", "People", "also", "needed", "freedom", "from", "poverty", "and", "unfair", "treatment."
    ],
    solution: "Removing British rule was only one part of India's freedom. People also needed freedom from poverty and unfair treatment.",
    context: "Bhagat Singh's definition of true independence from Chapter 2",
    hint: "Start with 'Removing British rule' and conclude with 'poverty and unfair treatment.'"
  };

  // Matchmaker states
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [matchErrorId, setMatchErrorId] = useState<string | null>(null);
  const [activeMatchHint, setActiveMatchHint] = useState<string | null>(null);

  // Shuffled right-side descriptions
  const [shuffledDescriptions] = useState(() => {
    return [...matchPairs].sort(() => Math.random() - 0.5);
  });

  // Quote builder states
  // We shuffle available words with index tracking
  const [bankWords, setBankWords] = useState<{ id: number; text: string }[]>(() => {
    return quoteData.words
      .map((w, idx) => ({ id: idx, text: w }))
      .sort(() => Math.random() - 0.5);
  });

  const [placedWords, setPlacedWords] = useState<{ id: number; text: string }[]>([]);
  const [quoteError, setQuoteError] = useState(false);
  const [quoteSolved, setQuoteSolved] = useState(false);
  const [showQuoteHint, setShowQuoteHint] = useState(false);

  const allMatchesDone = matchedIds.length === matchPairs.length;
  const isEntirePuzzleDone = allMatchesDone && quoteSolved;

  // Matchmaker Handlers
  const handleSelectTerm = (id: string) => {
    if (matchedIds.includes(id)) return;
    soundEffects.playClick();
    setSelectedTerm(id);
  };

  const handleSelectDesc = (id: string) => {
    if (matchedIds.includes(id)) return;
    if (!selectedTerm) return;

    if (selectedTerm === id) {
      soundEffects.playCorrect();
      setMatchedIds((prev) => [...prev, id]);
      setSelectedTerm(null);
      setMatchErrorId(null);
    } else {
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
      setActiveMatchHint(`Hint: Connect "${unmatched.term}" with its core idea: "${unmatched.description.slice(0, 35)}..."`);
      onUseHint();
    }
  };

  // Quote Builder Handlers
  const handlePickWord = (wordObj: { id: number; text: string }) => {
    if (quoteSolved) return;
    soundEffects.playClick();
    setBankWords((prev) => prev.filter((item) => item.id !== wordObj.id));
    setPlacedWords((prev) => [...prev, wordObj]);
    setQuoteError(false);
  };

  const handleRemoveWord = (wordObj: { id: number; text: string }) => {
    if (quoteSolved) return;
    soundEffects.playClick();
    setPlacedWords((prev) => prev.filter((item) => item.id !== wordObj.id));
    setBankWords((prev) => [...prev, wordObj]);
    setQuoteError(false);
  };

  const handleResetQuote = () => {
    soundEffects.playClick();
    setBankWords(
      quoteData.words
        .map((w, idx) => ({ id: idx, text: w }))
        .sort(() => Math.random() - 0.5)
    );
    setPlacedWords([]);
    setQuoteError(false);
  };

  const handleVerifyQuote = () => {
    const constructedSentence = placedWords.map((w) => w.text).join(' ');
    if (constructedSentence === quoteData.solution) {
      soundEffects.playCorrect();
      setQuoteSolved(true);
      setQuoteError(false);
    } else {
      soundEffects.playWrong();
      setQuoteError(true);
      setTimeout(() => setQuoteError(false), 2000);
    }
  };

  const handleSentenceHint = () => {
    soundEffects.playHint();
    setShowQuoteHint(true);
    onUseHint();
  };

  const handleFinish = () => {
    soundEffects.playVictory();
    // Complete Level 6 with 350 points
    onCompleteLevel(350);
  };

  return (
    <div className="w-full bg-[#241a12] border border-[#5d3f26] rounded-2xl p-4 sm:p-8 shadow-2xl relative overflow-hidden vintage-border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#4d331e] gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#dca368] font-medium tracking-wide">
            <span>{level.subtitle}</span>
            <span aria-hidden="true">·</span>
            <span>Climactic Philosophy Puzzle</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-[#faedd9] mt-1 flex items-center gap-2">
            <Crown className="w-5 h-5 text-[#dca368]" />
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
        {level.instructions} Complete the Ideological Matrix and assemble the foundational creed of true freedom from Chapter 2.
      </p>

      {/* Part 1: Ideological Pillars Matchmaker */}
      <div className="mb-8 p-5 sm:p-6 bg-[#1a120b] border border-[#4d331e] rounded-xl shadow-inner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-[#472c18] border border-[#804f29] text-[#faedd9] text-xs font-mono font-bold flex items-center justify-center">
              1
            </span>
            <h4 className="text-base sm:text-lg font-serif-title font-semibold text-[#faedd9]">
              Ideological Pillars Matrix ({matchedIds.length}/{matchPairs.length} Connected)
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
          {/* Left Column: Pillars */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#b8a492] block mb-1">
              Philosophical Pillar / Landmark:
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
              Accurate Meaning from Chapter 2 Text:
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

      {/* Part 2: Historic Quote Architect */}
      <div className="mb-6 p-5 sm:p-6 bg-[#1a120b] border border-[#4d331e] rounded-xl shadow-inner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-[#472c18] border border-[#804f29] text-[#faedd9] text-xs font-mono font-bold flex items-center justify-center">
              2
            </span>
            <h4 className="text-base sm:text-lg font-serif-title font-semibold text-[#faedd9]">
              Quote Architect: Assemble Bhagat Singh&apos;s Definition of True Freedom
            </h4>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSentenceHint}
              className="flex items-center gap-1.5 text-xs text-[#e5a86a] hover:text-[#faedd9] cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Hint</span>
            </button>
            <button
              onClick={handleResetQuote}
              className="flex items-center gap-1.5 text-xs text-[#b8a492] hover:text-[#faedd9] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Tiles</span>
            </button>
          </div>
        </div>

        {showQuoteHint && (
          <div className="mb-4 p-3 bg-[#2d1b10] border border-[#7a4823] rounded-lg text-xs text-[#faedd9]">
            <span className="font-semibold text-[#e5a86a]">Quote Clue: </span>
            {quoteData.hint}
          </div>
        )}

        {/* Target Sentence Construction Area */}
        <div
          className={`min-h-[90px] p-4 rounded-xl border-2 border-dashed transition-all mb-4 ${
            quoteSolved
              ? 'bg-[#202917] border-[#658742]'
              : quoteError
              ? 'bg-[#3b1717] border-[#8a3333] animate-shake'
              : 'bg-[#150e08] border-[#4a311d]'
          }`}
        >
          {placedWords.length === 0 ? (
            <div className="h-full flex items-center justify-center text-[#877260] text-xs sm:text-sm italic font-serif-body text-base">
              Tap words from the historical archive below to assemble his famous declaration in sequence...
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {placedWords.map((word) => (
                <button
                  key={word.id}
                  disabled={quoteSolved}
                  onClick={() => handleRemoveWord(word)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border shadow-sm transition-all ${
                    quoteSolved
                      ? 'bg-[#29361c] border-[#658742] text-[#d6f0b8] cursor-default'
                      : 'bg-[#472c18] border-[#8c562c] text-[#faedd9] hover:bg-[#381616] hover:border-[#8f3939] cursor-pointer'
                  }`}
                  title="Click to remove from sentence"
                >
                  {word.text}
                </button>
              ))}
            </div>
          )}
        </div>

        {quoteSolved && (
          <div className="p-3 bg-[#202917] border border-[#56753c] rounded-lg text-xs sm:text-sm text-[#c6e69f] mb-4 flex items-center gap-2 font-serif-body text-base">
            <CheckCircle2 className="w-4 h-4 text-[#88ba54] shrink-0" />
            <span>
              Quote Perfectly Reconstructed: &ldquo;{quoteData.solution}&rdquo;
            </span>
          </div>
        )}

        {quoteError && (
          <div className="p-2.5 bg-[#3b1717] border border-[#8a3333] rounded-lg text-xs text-[#f7c1c1] mb-4">
            The sentence word order does not match the original text. Compare with the story excerpt or adjust tiles!
          </div>
        )}

        {/* Word Bank */}
        {!quoteSolved && (
          <div>
            <span className="text-xs font-mono text-[#b8a492] block mb-2">
              Word Bank (Tap to add in order):
            </span>
            <div className="flex flex-wrap gap-2 p-3 bg-[#130b06] rounded-xl border border-[#3b2516]">
              {bankWords.map((word) => (
                <button
                  key={word.id}
                  onClick={() => handlePickWord(word)}
                  className="px-3 py-1.5 bg-[#25180f] hover:bg-[#382315] text-[#faedd9] border border-[#54361e] rounded-lg text-xs sm:text-sm font-medium transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-sm"
                >
                  {word.text}
                </button>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <button
                disabled={placedWords.length !== quoteData.words.length}
                onClick={handleVerifyQuote}
                className={`px-5 py-2.5 font-bold text-xs sm:text-sm rounded-xl transition-all ${
                  placedWords.length === quoteData.words.length
                    ? 'bg-[#a8642a] hover:bg-[#b97334] text-[#1c1209] shadow-md cursor-pointer'
                    : 'bg-[#251910] text-[#695544] border border-[#382415] cursor-not-allowed'
                }`}
              >
                Verify Sentence Construction
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Completion Action */}
      {isEntirePuzzleDone ? (
        <div className="p-6 bg-gradient-to-r from-[#3b2314] to-[#24170d] border border-[#855127] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn shadow-2xl">
          <div>
            <div className="flex items-center gap-2 text-[#e5a86a] font-semibold text-base font-serif-title">
              <Sparkles className="w-5 h-5 text-[#e5a86a]" />
              <span>Full Quest Complete: Master of Both Chapters! (+350 pts)</span>
            </div>
            <p className="text-xs sm:text-sm text-[#d6c5b3] mt-1">
              You have completed all 6 levels across Chapter 1 and Chapter 2 with historical precision.
            </p>
          </div>
          <button
            onClick={handleFinish}
            className="px-6 py-3 bg-gradient-to-r from-[#a8642a] to-[#c7823e] hover:from-[#b97334] hover:to-[#da954f] text-[#1c1209] font-bold text-sm sm:text-base rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
          >
            Claim Grand Master Honors
          </button>
        </div>
      ) : (
        <div className="text-center text-xs text-[#9e8b7a] py-2">
          Solve both the Ideological Matrix and the Quote Architect to finish Level 6!
        </div>
      )}
    </div>
  );
};
