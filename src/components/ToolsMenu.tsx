import React from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Vibrate,
  Type,
  Trash2,
  Copy,
  Layout,
  ListPlus,
  HelpCircle,
  X,
  FileText,
  Image as ImageIcon,
  Table as TableIcon,
  Smile,
  FileDown
} from 'lucide-react';
import { KeyboardSettings, InsertModalTab } from '../types';
import { QUICK_TEMPLATES } from '../data/keyboardLayouts';

interface ToolsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  settings: KeyboardSettings;
  onUpdateSettings: (newSettings: Partial<KeyboardSettings>) => void;
  onInsertText: (text: string) => void;
  onClearText: () => void;
  onCopyAll: () => void;
  onOpenFonts: () => void;
  onOpenHelp: () => void;
  onOpenInsertModal?: (tab: InsertModalTab) => void;
  onExportJpg?: () => void;
  onExportPdf?: () => void;
}

export const ToolsMenu: React.FC<ToolsMenuProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onInsertText,
  onClearText,
  onCopyAll,
  onOpenFonts,
  onOpenHelp,
  onOpenInsertModal,
  onExportJpg,
  onExportPdf,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="tools-menu-backdrop"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-xs p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        id="tools-menu-container"
        className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-amber-50/60">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>أدوات الكيبورد والوظائف الذكية</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3.5 max-h-[75vh] overflow-y-auto">
          {/* Media & Document Export Section */}
          <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 space-y-2">
            <p className="text-xs font-bold text-blue-900">
              إدراج الوسائط وحفظ المستند:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
              {onOpenInsertModal && (
                <>
                  <button
                    onClick={() => {
                      onOpenInsertModal('image');
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-white hover:bg-blue-100 border border-blue-200 text-blue-800 font-bold flex items-center gap-1.5 shadow-2xs"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                    <span>إدراج صورة</span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenInsertModal('table');
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-1.5 shadow-2xs"
                  >
                    <TableIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>إدراج جدول</span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenInsertModal('symbol');
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-white hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold flex items-center gap-1.5 shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>رموز وزخارف</span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenInsertModal('emoji');
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-white hover:bg-yellow-100 border border-yellow-200 text-yellow-900 font-bold flex items-center gap-1.5 shadow-2xs"
                  >
                    <Smile className="w-3.5 h-3.5 text-yellow-600" />
                    <span>إيموجي</span>
                  </button>
                </>
              )}

              {onExportJpg && (
                <button
                  onClick={() => {
                    onExportJpg();
                    onClose();
                  }}
                  className="p-2 rounded-lg bg-white hover:bg-indigo-100 border border-indigo-200 text-indigo-800 font-bold flex items-center gap-1.5 shadow-2xs"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                  <span>حفظ JPG</span>
                </button>
              )}

              {onExportPdf && (
                <button
                  onClick={() => {
                    onExportPdf();
                    onClose();
                  }}
                  className="p-2 rounded-lg bg-white hover:bg-rose-100 border border-rose-200 text-rose-800 font-bold flex items-center gap-1.5 shadow-2xs"
                >
                  <FileDown className="w-3.5 h-3.5 text-rose-600" />
                  <span>حفظ PDF</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                onUpdateSettings({ showSuggestionsBar: !settings.showSuggestionsBar });
                onClose();
              }}
              className={`p-2.5 rounded-xl border flex items-center gap-2 font-medium transition-all ${
                settings.showSuggestionsBar
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{settings.showSuggestionsBar ? 'إخفاء التنبؤ بالكلمات' : 'تفعيل التنبؤ بالكلمات'}</span>
            </button>

            <button
              onClick={() => {
                onUpdateSettings({ showTashkeelBar: !settings.showTashkeelBar });
                onClose();
              }}
              className={`p-2.5 rounded-xl border flex items-center gap-2 font-medium transition-all ${
                settings.showTashkeelBar
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Type className="w-4 h-4 text-blue-600" />
              <span>{settings.showTashkeelBar ? 'إخفاء شريط التشكيل' : 'إظهار شريط التشكيل'}</span>
            </button>

            <button
              onClick={() => {
                onOpenFonts();
                onClose();
              }}
              className="p-2.5 rounded-xl border bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 flex items-center gap-2 font-medium transition-all"
            >
              <FileText className="w-4 h-4 text-purple-600" />
              <span>الخطوط الـ 18 المعتمدة</span>
            </button>

            <button
              onClick={() => {
                onCopyAll();
                onClose();
              }}
              className="p-2.5 rounded-xl border bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2 font-medium"
            >
              <Copy className="w-4 h-4 text-emerald-600" />
              <span>نسخ النص كاملاً</span>
            </button>
          </div>

          {/* Audio & Haptic Toggles */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                {settings.soundEnabled ? <Volume2 className="w-4 h-4 text-blue-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                صوت نقرات المفاتيح:
              </span>
              <button
                onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  settings.soundEnabled ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    settings.soundEnabled ? 'left-1' : 'left-6'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <Vibrate className="w-4 h-4 text-purple-600" />
                الاهتزاز اللمسي (Haptic):
              </span>
              <button
                onClick={() => onUpdateSettings({ hapticEnabled: !settings.hapticEnabled })}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  settings.hapticEnabled ? 'bg-purple-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    settings.hapticEnabled ? 'left-1' : 'left-6'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Quick Phrases */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
              <ListPlus className="w-4 h-4 text-indigo-600" />
              <span>نصوص وعبارات سريعة بنقرة واحدة:</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto">
              {QUICK_TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onInsertText(tmpl + ' ');
                    onClose();
                  }}
                  className="w-full text-right p-2 text-xs bg-slate-50 hover:bg-blue-50 hover:text-blue-800 rounded-lg border border-slate-200 transition-colors"
                >
                  {tmpl}
                </button>
              ))}
            </div>
          </div>

          {/* Help & Shortcuts */}
          <button
            onClick={() => {
              onOpenHelp();
              onClose();
            }}
            className="w-full py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-indigo-200"
          >
            <HelpCircle className="w-4 h-4" />
            <span>دليل أوامر وخصائص الكيبورد الملحق</span>
          </button>
        </div>
      </div>
    </div>
  );
};
