import React, { useMemo } from 'react';
import { BookOpen, CheckCheck, X, Check, AlertCircle, Sparkles } from 'lucide-react';
import { analyzeArabicSpellAndGrammar, SpellCheckIssue } from '../utils/shortcutManager';

interface SpellCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  onUpdateText: (newText: string) => void;
}

export const SpellCheckModal: React.FC<SpellCheckModalProps> = ({
  isOpen,
  onClose,
  text,
  onUpdateText,
}) => {
  const issues = useMemo(() => analyzeArabicSpellAndGrammar(text), [text]);

  if (!isOpen) return null;

  const handleFixIssue = (issue: SpellCheckIssue) => {
    // Replace the specific instance
    const before = text.slice(0, issue.index);
    const after = text.slice(issue.index + issue.original.length);
    onUpdateText(before + issue.suggestion + after);
  };

  const handleFixAll = () => {
    let updatedText = text;
    // Apply fixes in reverse order of index to prevent index shifting
    const sortedReverse = [...issues].sort((a, b) => b.index - a.index);
    for (const issue of sortedReverse) {
      const before = updatedText.slice(0, issue.index);
      const after = updatedText.slice(issue.index + issue.original.length);
      updatedText = before + issue.suggestion + after;
    }
    onUpdateText(updatedText);
  };

  return (
    <div
      id="spell-check-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-3"
      onClick={onClose}
    >
      <div
        id="spell-check-container"
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
          <div className="flex items-center gap-2 font-bold text-sm">
            <BookOpen className="w-5 h-5 text-blue-200" />
            <span>التدقيق الإملائي والنحوي (F7)</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-blue-200 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {/* Summary Banner */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">
                {issues.length > 0
                  ? `تم اكتشاف (${issues.length}) ملاحظة إملائية أو نحوية:`
                  : 'النص سليم وخالٍ من الأخطاء الإملائية الشائعة!'}
              </span>
            </div>
            {issues.length > 0 && (
              <button
                onClick={handleFixAll}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1 shadow-2xs active:scale-95 transition-all"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>تصحيح الكل تلقائياً</span>
              </button>
            )}
          </div>

          {/* Issues List */}
          {issues.length > 0 ? (
            <div className="space-y-2">
              {issues.map((issue, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-50 transition-colors flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="line-through text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                        {issue.original}
                      </span>
                      <span className="text-slate-400">←</span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                        {issue.suggestion}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-amber-600" />
                      <span>{issue.reason}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleFixIssue(issue)}
                    className="px-2.5 py-1 bg-white hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-300 hover:border-emerald-600 font-bold rounded-lg transition-all active:scale-95 shadow-2xs"
                  >
                    تصحيح
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-2 text-slate-500">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <p className="font-bold text-slate-800 text-sm">ممتاز! النص سليم تماماً</p>
              <p className="text-xs text-slate-400 max-w-xs">
                تم فحص الهمزات، علامات الترقيم، الياء والألف المقصورة، والتاء المربوطة.
              </p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>مدقق سامسونج للغة العربية والإنجليزية (F7)</span>
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
