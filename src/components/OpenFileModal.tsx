import React, { useRef, useState, useEffect } from 'react';
import { FolderOpen, Upload, FileText, Trash2, X, Clock, Plus } from 'lucide-react';

interface SavedDraft {
  id: string;
  title: string;
  snippet: string;
  date: string;
  text: string;
}

interface OpenFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadText: (loadedText: string) => void;
}

export const OpenFileModal: React.FC<OpenFileModalProps> = ({
  isOpen,
  onClose,
  onLoadText,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [drafts, setDrafts] = useState<SavedDraft[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadSavedDrafts();
    }
  }, [isOpen]);

  const loadSavedDrafts = () => {
    try {
      const stored = localStorage.getItem('samsung_keyboard_saved_drafts');
      if (stored) {
        setDrafts(JSON.parse(stored));
      } else {
        // Pre-populate with sample drafts if none exist
        const initialDrafts: SavedDraft[] = [
          {
            id: 'sample-1',
            title: 'ملاحظة عمل ومستند Word نموذجي',
            snippet: 'بسم الله الرحمن الرحيم، هذا نموذج مستند تم تحريره بواسطة لوحة مفاتيح سامسونج...',
            date: '2026-09-21 10:15',
            text: 'بسم الله الرحمن الرحيم\nهذا نموذج مستند رسمي تم تحريره باستخدام لوحة مفاتيح سامسونج الذكية مع دعم كامل لاختصارات Word و Excel.\nالمجموع الإجمالي للمصروفات =SUM(1500, 2300, 450) = [4250] ريال.',
          },
          {
            id: 'sample-2',
            title: 'تقرير مبيعات وجدول إكسل',
            snippet: 'بيانات المبيعات الشهرية: تم تفعيل عوامل التصفية وإدراج التاريخ والوقت...',
            date: '2026-09-20 18:30',
            text: 'تقرير المبيعات الربع سنوي:\nالمنتج أ: 1200 وحدة\nالمنتج ب: 3400 وحدة\nالمنتج ج: 2100 وحدة\nالتاريخ: 2026-09-22\nالوقت: 14:00',
          },
        ];
        setDrafts(initialDrafts);
        localStorage.setItem('samsung_keyboard_saved_drafts', JSON.stringify(initialDrafts));
      }
    } catch {
      // ignore
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onLoadText(content);
        onClose();
      }
    };
    reader.readAsText(file);
  };

  const handleSelectDraft = (draft: SavedDraft) => {
    onLoadText(draft.text);
    onClose();
  };

  const handleDeleteDraft = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = drafts.filter((d) => d.id !== id);
    setDrafts(updated);
    localStorage.setItem('samsung_keyboard_saved_drafts', JSON.stringify(updated));
  };

  if (!isOpen) return null;

  return (
    <div
      id="open-file-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-3"
      onClick={onClose}
    >
      <div
        id="open-file-container"
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 text-white">
          <div className="flex items-center gap-2 font-bold text-sm">
            <FolderOpen className="w-5 h-5 text-amber-400" />
            <span>فتح ملف أو مستند محفوظ (Ctrl + O)</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* Upload File Box */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/50 hover:bg-blue-50 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all active:scale-[0.99] text-center"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".txt,.md,.doc,.docx,.json,.csv"
              className="hidden"
            />
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
              <Upload className="w-5 h-5" />
            </div>
            <p className="font-bold text-slate-800 text-xs">انقر لاستيراد ملف نصي من جهازك</p>
            <p className="text-[11px] text-slate-500 mt-0.5">يدعم ملفات TXT و MD و DOC و CSV و JSON</p>
          </div>

          {/* Saved Drafts List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>المستندات والمسودات المحفوظة:</span>
            </h4>

            {drafts.length > 0 ? (
              <div className="space-y-2">
                {drafts.map((draft) => (
                  <div
                    key={draft.id}
                    onClick={() => handleSelectDraft(draft)}
                    className="p-3 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50/60 hover:bg-blue-50/40 cursor-pointer transition-all flex items-center justify-between gap-3 text-xs group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-800 truncate group-hover:text-blue-700">
                          {draft.title}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{draft.date}</span>
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{draft.snippet}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={(e) => handleDeleteDraft(e, draft.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="حذف هذا الملف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-4">لا توجد مستندات محفوظة بعد.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg text-xs"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
