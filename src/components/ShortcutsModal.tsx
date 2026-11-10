import React from 'react';
import { Command, X, Sparkles, FileText, Table, Check, Play } from 'lucide-react';
import { SHORTCUTS_LIST, ShortcutDefinition } from '../utils/shortcutManager';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerShortcut: (shortcutId: string) => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({
  isOpen,
  onClose,
  onTriggerShortcut,
}) => {
  if (!isOpen) return null;

  const commonShortcuts = SHORTCUTS_LIST.filter((s) => s.category === 'common');
  const wordShortcuts = SHORTCUTS_LIST.filter((s) => s.category === 'word');
  const excelShortcuts = SHORTCUTS_LIST.filter((s) => s.category === 'excel');

  const renderSection = (title: string, icon: React.ReactNode, list: ShortcutDefinition[], badgeColor: string) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
        {icon}
        <h4 className="text-xs font-bold text-slate-800">{title}</h4>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${badgeColor}`}>
          {list.length} اختصارات
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {list.map((sc) => (
          <div
            key={sc.id}
            className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-blue-50/50 hover:border-blue-300 transition-all flex items-center justify-between gap-2 text-xs group"
          >
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <span className="text-base">{sc.icon}</span>
                <span className="truncate">{sc.titleArabic}</span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">{sc.descriptionArabic}</p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono text-[11px] font-bold text-blue-700 shadow-2xs whitespace-nowrap">
                {sc.keys}
              </span>
              <button
                onClick={() => {
                  onTriggerShortcut(sc.id);
                  onClose();
                }}
                className="p-1 rounded bg-blue-100 hover:bg-blue-600 text-blue-700 hover:text-white transition-colors active:scale-95"
                title="تجربة وتنفيذ هذا الاختصار فوراً"
              >
                <Play className="w-3 h-3 fill-current" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      id="shortcuts-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-3"
      onClick={onClose}
    >
      <div
        id="shortcuts-modal-container"
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 text-white">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Command className="w-5 h-5 text-blue-400" />
            <span>دليل واختصارات لوحة المفاتيح الذكية (Word & Excel)</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-5">
          {/* Instructions banner */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              يمكنك استخدام هذه الاختصارات مباشرة عبر الكيبورد الملحق بالنقر على زر <strong>Ctrl</strong> أو <strong>Alt</strong> ثم الحرف المطلوب، أو من لوحة المفاتيح الفيزيائية المتصلة بالجهاز!
            </span>
          </div>

          {/* 1. Common */}
          {renderSection(
            'الاختصارات العامة المشتركة (Word & Excel)',
            <Command className="w-4 h-4 text-blue-600" />,
            commonShortcuts,
            'bg-blue-100 text-blue-800'
          )}

          {/* 2. Word */}
          {renderSection(
            'اختصارات تنسيق النصوص (Word)',
            <FileText className="w-4 h-4 text-indigo-600" />,
            wordShortcuts,
            'bg-indigo-100 text-indigo-800'
          )}

          {/* 3. Excel */}
          {renderSection(
            'اختصارات خاصة ببرنامج إكسل (Excel)',
            <Table className="w-4 h-4 text-emerald-600" />,
            excelShortcuts,
            'bg-emerald-100 text-emerald-800'
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>لوحة مفاتيح سامسونج نوت 10+ • دعم كامل للأجهزة واللمس</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-xs"
          >
            تم، العودة للكيبورد
          </button>
        </div>
      </div>
    </div>
  );
};
