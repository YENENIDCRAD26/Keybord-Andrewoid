import React from 'react';
import { X, Palette, Bold, Italic, Underline, AlignRight, AlignCenter, AlignLeft, AlignJustify } from 'lucide-react';
import { KeyboardSettings } from '../types';

interface ColorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: KeyboardSettings;
  onUpdateSettings: (newSettings: Partial<KeyboardSettings>) => void;
}

const COLOR_PRESETS = [
  { name: 'أسود كلاسيكي', color: '#1e293b' },
  { name: 'أزرق ملكي', color: '#1d4ed8' },
  { name: 'كحلي داكن', color: '#0f172a' },
  { name: 'أخضر زمردي', color: '#047857' },
  { name: 'أحمر قاني', color: '#b91c1c' },
  { name: 'بنفسجي ملكي', color: '#6d28d9' },
  { name: 'عنابي دافئ', color: '#881337' },
  { name: 'بني شوكولاتة', color: '#78350f' },
  { name: 'ذهبي / كهرماني', color: '#b45309' },
  { name: 'رمادي احترافي', color: '#475569' },
  { name: 'أزرق سماوي', color: '#0284c7' },
  { name: 'وردي أنيق', color: '#db2777' },
];

export const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="color-modal-backdrop"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-xs p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        id="color-modal-container"
        className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-slate-800">تخصيص لون ونمط الخط</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Color Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              لوحة الألوان المعتمدة:
            </label>
            <div className="grid grid-cols-6 gap-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.color}
                  onClick={() => onUpdateSettings({ fontColor: preset.color })}
                  title={preset.name}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-105 border-2 shadow-xs ${
                    settings.fontColor === preset.color
                      ? 'border-blue-600 ring-2 ring-blue-300 scale-105'
                      : 'border-white'
                  }`}
                  style={{ backgroundColor: preset.color }}
                >
                  {settings.fontColor === preset.color && (
                    <span className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Hex Color */}
          <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
            <span className="text-xs font-medium text-slate-600">أو اختر لوناً مخصصاً:</span>
            <input
              type="color"
              value={settings.fontColor}
              onChange={(e) => onUpdateSettings({ fontColor: e.target.value })}
              className="w-10 h-8 rounded-lg cursor-pointer border border-slate-300"
            />
            <span className="font-mono text-xs text-slate-700 px-2 py-1 bg-slate-100 rounded border border-slate-200">
              {settings.fontColor}
            </span>
          </div>

          {/* Text Style: Bold, Italic, Underline */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              تنسيقات الخط (نمط النص):
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateSettings({ isBold: !settings.isBold })}
                className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 text-xs font-bold transition-all ${
                  settings.isBold
                    ? 'bg-blue-600 text-white border-blue-700'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Bold className="w-4 h-4" />
                عريض (Bold)
              </button>
              <button
                onClick={() => onUpdateSettings({ isItalic: !settings.isItalic })}
                className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 text-xs font-bold transition-all ${
                  settings.isItalic
                    ? 'bg-blue-600 text-white border-blue-700'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Italic className="w-4 h-4" />
                مائل (Italic)
              </button>
              <button
                onClick={() => onUpdateSettings({ isUnderline: !settings.isUnderline })}
                className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 text-xs font-bold transition-all ${
                  settings.isUnderline
                    ? 'bg-blue-600 text-white border-blue-700'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Underline className="w-4 h-4" />
                تسطير (Underline)
              </button>
            </div>
          </div>

          {/* Alignment */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              محاذاة النص:
            </label>
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => onUpdateSettings({ textAlign: 'right' })}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center text-xs gap-1 ${
                  settings.textAlign === 'right' ? 'bg-white shadow-xs font-bold text-blue-600' : 'text-slate-600'
                }`}
              >
                <AlignRight className="w-4 h-4" />
                يمين
              </button>
              <button
                onClick={() => onUpdateSettings({ textAlign: 'center' })}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center text-xs gap-1 ${
                  settings.textAlign === 'center' ? 'bg-white shadow-xs font-bold text-blue-600' : 'text-slate-600'
                }`}
              >
                <AlignCenter className="w-4 h-4" />
                وسط
              </button>
              <button
                onClick={() => onUpdateSettings({ textAlign: 'left' })}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center text-xs gap-1 ${
                  settings.textAlign === 'left' ? 'bg-white shadow-xs font-bold text-blue-600' : 'text-slate-600'
                }`}
              >
                <AlignLeft className="w-4 h-4" />
                يسار
              </button>
              <button
                onClick={() => onUpdateSettings({ textAlign: 'justify' })}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center text-xs gap-1 ${
                  settings.textAlign === 'justify' ? 'bg-white shadow-xs font-bold text-blue-600' : 'text-slate-600'
                }`}
              >
                <AlignJustify className="w-4 h-4" />
                ضبط
              </button>
            </div>
          </div>

          {/* Font Size slider */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex justify-between items-center mb-1 text-xs font-semibold text-slate-600">
              <span>حجم الخط الحالي:</span>
              <span className="text-blue-600 font-bold">{settings.fontSize}px</span>
            </div>
            <input
              type="range"
              min="14"
              max="48"
              step="1"
              value={settings.fontSize}
              onChange={(e) => onUpdateSettings({ fontSize: Number(e.target.value) })}
              className="w-full accent-blue-600"
            />
          </div>
        </div>

        <div className="p-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium text-xs shadow-xs hover:bg-blue-700"
          >
            تطبيق وإغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
