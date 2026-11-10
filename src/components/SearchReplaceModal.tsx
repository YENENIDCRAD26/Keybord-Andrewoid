import React, { useState, useEffect } from 'react';
import { Search, Replace, X, ChevronRight, ChevronLeft, Check, ArrowRightLeft } from 'lucide-react';

interface SearchReplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'search' | 'replace';
  text: string;
  onUpdateText: (newText: string) => void;
  onHighlightMatch?: (start: number, end: number) => void;
}

export const SearchReplaceModal: React.FC<SearchReplaceModalProps> = ({
  isOpen,
  onClose,
  mode: initialMode,
  text,
  onUpdateText,
  onHighlightMatch,
}) => {
  const [activeTab, setActiveTab] = useState<'search' | 'replace'>(initialMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [replaceQuery, setReplaceQuery] = useState('');
  const [matchCase, setMatchCase] = useState(false);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    setActiveTab(initialMode);
  }, [initialMode]);

  if (!isOpen) return null;

  // Find all match indices
  const getMatches = () => {
    if (!searchQuery) return [];
    const flags = matchCase ? 'g' : 'gi';
    try {
      const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, flags);
      const matches: { index: number; length: number }[] = [];
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({ index: match.index, length: match[0].length });
      }
      return matches;
    } catch {
      return [];
    }
  };

  const matches = getMatches();
  const totalMatches = matches.length;

  const handleNext = () => {
    if (totalMatches === 0) return;
    const nextIdx = (currentMatchIndex + 1) % totalMatches;
    setCurrentMatchIndex(nextIdx);
    if (onHighlightMatch && matches[nextIdx]) {
      onHighlightMatch(matches[nextIdx].index, matches[nextIdx].index + matches[nextIdx].length);
    }
  };

  const handlePrev = () => {
    if (totalMatches === 0) return;
    const prevIdx = (currentMatchIndex - 1 + totalMatches) % totalMatches;
    setCurrentMatchIndex(prevIdx);
    if (onHighlightMatch && matches[prevIdx]) {
      onHighlightMatch(matches[prevIdx].index, matches[prevIdx].index + matches[prevIdx].length);
    }
  };

  const handleReplaceSingle = () => {
    if (totalMatches === 0 || !matches[currentMatchIndex]) return;
    const targetMatch = matches[currentMatchIndex];
    const before = text.slice(0, targetMatch.index);
    const after = text.slice(targetMatch.index + targetMatch.length);
    const newText = before + replaceQuery + after;
    onUpdateText(newText);
    setStatusMessage('تم استبدال النتيجة بنجاح');
    setTimeout(() => setStatusMessage(''), 2000);
  };

  const handleReplaceAll = () => {
    if (totalMatches === 0) return;
    const flags = matchCase ? 'g' : 'gi';
    const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, flags);
    const newText = text.replace(regex, replaceQuery);
    onUpdateText(newText);
    setStatusMessage(`تم استبدال جميع النتائج (${totalMatches}) بنجاح`);
    setTimeout(() => setStatusMessage(''), 2500);
  };

  return (
    <div
      id="search-replace-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 bg-slate-900/40 backdrop-blur-xs p-3"
      onClick={onClose}
    >
      <div
        id="search-replace-container"
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header Tabs */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'search'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>بحث (Ctrl + F)</span>
            </button>
            <button
              onClick={() => setActiveTab('replace')}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'replace'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>استبدال (Ctrl + H)</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3">
          {/* Search Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span>البحث عن:</span>
              <span className="text-[11px] text-slate-500 font-normal">
                {searchQuery ? `${totalMatches > 0 ? currentMatchIndex + 1 : 0} من ${totalMatches} نتيجة` : 'أدخل كلمة البحث'}
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentMatchIndex(0);
                }}
                placeholder="اكتب كلمة أو رقم للبحث..."
                className="w-full text-xs px-3 py-2 pr-8 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white text-slate-800"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5" />
            </div>
          </div>

          {/* Replace Input (if tab is replace) */}
          {activeTab === 'replace' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">الاستبدال بـ:</label>
              <div className="relative">
                <input
                  type="text"
                  value={replaceQuery}
                  onChange={(e) => setReplaceQuery(e.target.value)}
                  placeholder="اكتب النص البديل..."
                  className="w-full text-xs px-3 py-2 pr-8 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-slate-800"
                />
                <Replace className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5" />
              </div>
            </div>
          )}

          {/* Match Case Option */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={matchCase}
                onChange={(e) => setMatchCase(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>مطابقة حالة الأحرف</span>
            </label>

            {/* Navigation buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                disabled={totalMatches === 0}
                className="p-1 rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-40 text-slate-700"
                title="النتيجة السابقة"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={totalMatches === 0}
                className="p-1 rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-40 text-slate-700"
                title="النتيجة التالية"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          {activeTab === 'replace' && (
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={handleReplaceSingle}
                disabled={totalMatches === 0}
                className="flex-1 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-xs border border-indigo-200 transition-all disabled:opacity-40 active:scale-95"
              >
                استبدال
              </button>
              <button
                onClick={handleReplaceAll}
                disabled={totalMatches === 0}
                className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-xs transition-all disabled:opacity-40 active:scale-95"
              >
                استبدال الكل ({totalMatches})
              </button>
            </div>
          )}

          {/* Status Message */}
          {statusMessage && (
            <div className="p-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold text-center animate-in fade-in flex items-center justify-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{statusMessage}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
