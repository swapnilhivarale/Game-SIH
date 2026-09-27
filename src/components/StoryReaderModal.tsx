import React, { useState } from 'react';
import { CHAPTERS_STORY } from '../data/chaptersData';
import { X, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface StoryReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialChapterId?: 1 | 2;
}

export const StoryReaderModal: React.FC<StoryReaderModalProps> = ({
  isOpen,
  onClose,
  initialChapterId = 1,
}) => {
  const [activeChapterId, setActiveChapterId] = useState<1 | 2>(initialChapterId);

  if (!isOpen) return null;

  const currentChapter = CHAPTERS_STORY.find((c) => c.id === activeChapterId) || CHAPTERS_STORY[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#22170f] border border-[#5d3f26] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] vintage-border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1a110a] border-b border-[#4d331e]">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#dca368]" />
            <h2 className="text-lg font-serif-title font-bold text-[#faedd9]">
              The Historical Archives (Original Text)
            </h2>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-1.5 text-[#b8a492] hover:text-[#faedd9] rounded-lg hover:bg-[#342216] transition-colors cursor-pointer"
            aria-label="Close story modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapter Switcher Tabs */}
        <div className="flex border-b border-[#422c1b] bg-[#1a110a] px-6 py-2 gap-2">
          {CHAPTERS_STORY.map((ch) => {
            const isActive = ch.id === activeChapterId;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  soundEffects.playClick();
                  setActiveChapterId(ch.id);
                }}
                className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-serif-title font-semibold transition-all text-center ${
                  isActive
                    ? 'bg-[#472c18] text-[#faedd9] border border-[#855127] shadow-sm'
                    : 'text-[#9c8978] hover:text-[#faedd9] hover:bg-[#2b1b11]'
                }`}
              >
                Chapter {ch.number}: {ch.title}
              </button>
            );
          })}
        </div>

        {/* Story Content Area (Styled like reading an archival book page) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#e8d7c5] bg-[#22170f]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#dca368] mb-1 uppercase tracking-wider">
              <span>BHAGAT SINGH / {currentChapter.number}</span>
              <span aria-hidden="true">·</span>
              <span>{currentChapter.subtitle}</span>
            </div>
            <h3 className="text-2xl font-serif-title font-bold text-[#faedd9]">
              {currentChapter.title}
            </h3>
          </div>

          {/* Pristine Original Paragraphs with classic serif font */}
          <div className="space-y-4 text-base sm:text-lg leading-relaxed font-serif-body text-[#faedd9] border-l-2 border-[#8c562c] pl-4 py-1">
            {currentChapter.originalText.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Key Facts Summary Box */}
          <div className="bg-[#1a120b] border border-[#523722] rounded-xl p-4 sm:p-5 shadow-inner">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#ebd3b9] uppercase tracking-wider mb-2.5">
              <Sparkles className="w-4 h-4 text-[#dca368]" />
              <span>Core Historical Takeaways</span>
            </div>
            <ul className="space-y-2">
              {currentChapter.keyTakeaways.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#d6c5b3] font-serif-body text-base">
                  <CheckCircle2 className="w-4 h-4 text-[#88ba54] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#1a110a] border-t border-[#422c1b] flex items-center justify-between">
          <span className="text-xs text-[#9c8978] italic font-serif-body text-sm">
            Faithfully transcribed from original historical text (Page {activeChapterId} of 2)
          </span>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="px-5 py-2 bg-[#a8642a] hover:bg-[#b97334] text-[#1c1209] font-bold text-xs sm:text-sm rounded-lg transition-all cursor-pointer shadow-md"
          >
            Return to Challenge
          </button>
        </div>
      </div>
    </div>
  );
};
