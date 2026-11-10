import React from 'react';
import { Sparkles, Check } from 'lucide-react';

export interface SuggestionsBarProps {
  suggestions: string[];
  onSelectSuggestion: (word: string) => void;
  fontFamily?: string;
  lang?: 'ar' | 'en';
}

export const SuggestionsBar: React.FC<SuggestionsBarProps> = ({
  suggestions,
  onSelectSuggestion,
  fontFamily,
  lang = 'ar',
}) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div
      id="samsung-suggestions-bar"
      className="flex items-center px-2 py-1.5 bg-[#26282c] border-b border-slate-700/70 text-xs gap-1.5 overflow-x-auto scrollbar-none shadow-2xs select-none backdrop-blur-xs shrink-0 w-full"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Icon badge */}
      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 pl-1 shrink-0">
        <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
        <span className="hidden xs:inline text-[10px] text-slate-400">توقع:</span>
      </div>

      {/* Horizontally Scrollable Suggestion Buttons */}
      <div className="flex items-center gap-1.5 flex-1 overflow-x-auto scrollbar-none py-0.5">
        {suggestions.map((word, index) => {
          const isPrimary = index === 0;
          return (
            <button
              key={`${word}-${index}`}
              id={`samsung-suggestion-chip-${index}`}
              onClick={() => onSelectSuggestion(word)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-100 ease-out active:scale-95 shadow-md flex items-center gap-1.5 border cursor-pointer ${
                isPrimary
                  ? 'bg-blue-600 text-white border-blue-500 hover:bg-blue-500 ring-2 ring-blue-400/40 font-bold'
                  : 'bg-[#35383f] text-slate-200 border-slate-600/80 hover:bg-[#434750] hover:border-slate-500'
              }`}
              style={{
                fontFamily: lang === 'ar' && fontFamily ? fontFamily : 'inherit',
              }}
              title={`إدراج "${word}"`}
            >
              {isPrimary && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
              <span>{word}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Export alias for backward compatibility
export const SuggestionBar = SuggestionsBar;
