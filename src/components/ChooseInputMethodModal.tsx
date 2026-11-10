import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';

interface ChooseInputMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeMethod: string;
  onSelectMethod: (methodId: string) => void;
  showKeyboardButton: boolean;
  onToggleShowKeyboardButton: () => void;
  onOpenSettings?: () => void;
}

export const ChooseInputMethodModal: React.FC<ChooseInputMethodModalProps> = ({
  isOpen,
  onClose,
  activeMethod,
  onSelectMethod,
  showKeyboardButton,
  onToggleShowKeyboardButton,
  onOpenSettings,
}) => {
  if (!isOpen) return null;

  const methods = [
    { id: 'ctrl_keyboard', label: 'Keyboard with Ctrl key', isArabic: false },
    { id: 'samsung_voice', label: 'إدخال صوت Samsung', isArabic: true },
    { id: 'sarab_keyboard', label: 'كيبورد السراب البعيد', isArabic: true },
    { id: 'samsung_keyboard', label: 'لوحة مفاتيح Samsung', isArabic: true, hasSettings: true },
    { id: 'google_voice', label: 'الكتابة بالصوت من Google', isArabic: true },
  ];

  return (
    <div
      id="choose-input-method-backdrop"
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in select-none"
      onClick={onClose}
    >
      <div
        id="choose-input-method-card"
        className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-900"
        onClick={(e) => e.stopPropagation()}
        dir="ltr"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Choose input method
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="py-2 px-3 space-y-1">
          {methods.map((item) => {
            const isSelected = activeMethod === item.id;
            return (
              <label
                key={item.id}
                onClick={() => {
                  onSelectMethod(item.id);
                }}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl cursor-pointer transition-all ${
                  isSelected ? 'bg-blue-50/60' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Radio Circle */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-base font-semibold truncate ${
                      item.isArabic ? 'font-sans' : 'font-sans'
                    } ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-800'}`}
                    dir={item.isArabic ? 'rtl' : 'ltr'}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Optional Gear / Settings icon */}
                {item.hasSettings && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenSettings) onOpenSettings();
                    }}
                    className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors ml-2"
                    title="Settings"
                  >
                    <Settings className="w-5 h-5 stroke-[2]" />
                  </button>
                )}
              </label>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-200 mx-6 my-2" />

        {/* Bottom Toggle: Show Keyboard button */}
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-base font-bold text-slate-900 leading-tight">
              Show Keyboard button
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Show <span className="font-mono text-slate-700 font-bold">:::</span> on the navigation bar.
            </span>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={onToggleShowKeyboardButton}
            className={`w-12 h-7 rounded-full transition-colors relative p-1 shrink-0 cursor-pointer ${
              showKeyboardButton ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                showKeyboardButton ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
