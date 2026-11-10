import React, { useState } from 'react';
import {
  Mic,
  Smile,
  Settings,
  Globe,
  CornerDownLeft,
  Delete,
  Sparkles,
  Smartphone,
  Check,
  Zap,
  Palette
} from 'lucide-react';

interface NativeKeyboardProps {
  onSwitchToAttachedKeyboard: () => void;
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  onSpace: () => void;
  suggestions?: string[];
  onSelectSuggestion?: (word: string) => void;
}

export const NativeKeyboard: React.FC<NativeKeyboardProps> = ({
  onSwitchToAttachedKeyboard,
  onKeyPress,
  onBackspace,
  onEnter,
  onSpace,
  suggestions = ['الله', 'في', 'على', 'شكراً', 'أهلاً', 'جزيلاً'],
  onSelectSuggestion,
}) => {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [showTashkeel, setShowTashkeel] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const handleKeyClick = (char: string, id?: string) => {
    const keyId = id || char;
    setPressedKey(keyId);
    setTimeout(() => setPressedKey(null), 100);
    onKeyPress(char);
  };

  const handleActionClick = (action: () => void, id: string) => {
    setPressedKey(id);
    setTimeout(() => setPressedKey(null), 100);
    action();
  };

  const nativeRow1Ar = ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د'];
  const nativeRow2Ar = ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'];
  const nativeRow3Ar = ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ'];

  const nativeRow1En = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const nativeRow2En = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const nativeRow3En = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

  const tashkeelQuick = ['َ', 'ً', 'ُ', 'ٌ', 'ِ', 'ٍ', 'ْ', 'ّ', 'ـ'];

  return (
    <div
      id="samsung-native-keyboard"
      className="bg-[#212327] text-white flex flex-col border-t-2 border-slate-700 shadow-2xl select-none shrink-0 w-full animate-in slide-in-from-bottom duration-200"
      dir="rtl"
    >
      {/* 1. NATIVE SYSTEM NOTIFICATION & PRIMARY SWITCH BAR */}
      <div className="bg-[#18191c] px-3 py-1.5 border-b border-slate-700/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Smartphone className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="font-bold text-xs text-white">لوحة مفاتيح أندرويد الأصلية (Samsung Note IME)</span>
        </div>

        {/* PRIMARY SWITCH BUTTON */}
        <button
          onClick={onSwitchToAttachedKeyboard}
          className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-lg text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
          title="التبديل إلى الكيبورد الملحق المتقدم"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>التبديل للكريبورد الملحق (5.5 cm) ⌨️</span>
        </button>
      </div>

      {/* 2. SAMSUNG KEYBOARD TOOLBAR & PREDICTIVE WORDS ROW */}
      <div className="flex items-center justify-between px-2 py-1 bg-[#2b2d32] border-b border-slate-700/60 text-slate-300 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none flex-1">
          <span className="text-[10px] font-bold text-amber-400 shrink-0 flex items-center gap-1 pl-1 border-l border-slate-600">
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>اقتراحات:</span>
          </span>
          {suggestions.map((word, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (onSelectSuggestion) onSelectSuggestion(word);
                else onKeyPress(word + ' ');
              }}
              className="px-2.5 py-0.5 rounded bg-[#3a3d44] hover:bg-[#4a4d56] active:bg-blue-600 text-slate-200 text-xs font-semibold shadow-2xs transition active:scale-95 shrink-0"
            >
              {word}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0 pr-2 border-r border-slate-700">
          <button
            onClick={() => setShowTashkeel(!showTashkeel)}
            className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition ${
              showTashkeel ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold' : 'bg-[#383a40] text-slate-300 border-slate-600'
            }`}
            title="شريط التشكيل السريع"
          >
            تشكيل
          </button>
          <Smile className="w-4 h-4 cursor-pointer hover:text-white transition" />
          <Mic className="w-4 h-4 cursor-pointer hover:text-white transition" />
        </div>
      </div>

      {/* 2.1 TASHKEEL ROW IF TOGGLED */}
      {showTashkeel && (
        <div className="flex items-center justify-center gap-1 py-1 px-2 bg-[#1c1d20] border-b border-slate-700 overflow-x-auto scrollbar-none">
          {tashkeelQuick.map((char, i) => (
            <button
              key={i}
              onClick={() => onKeyPress(char)}
              className="min-w-[28px] h-7 px-1.5 bg-[#383a40] hover:bg-blue-600 text-white font-bold rounded text-sm flex items-center justify-center active:scale-95 shadow-2xs transition"
            >
              {char}
            </button>
          ))}
        </div>
      )}

      {/* 3. NATIVE KEYS MATRIX */}
      <div className="p-1.5 space-y-1 bg-[#212327]">
        {lang === 'ar' ? (
          <>
            {/* Row 1 */}
            <div className="flex items-center justify-center gap-1">
              {nativeRow1Ar.map((char) => (
                <button
                  key={char}
                  onClick={() => handleKeyClick(char)}
                  className={`flex-1 h-10 rounded-md text-white text-base font-bold flex items-center justify-center transition-all active:scale-95 shadow-2xs border-b border-black/30 ${
                    pressedKey === char ? 'bg-blue-600 scale-105 z-10' : 'bg-[#3a3d44] hover:bg-[#484c55]'
                  }`}
                >
                  {char}
                </button>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex items-center justify-center gap-1 px-1">
              {nativeRow2Ar.map((char) => (
                <button
                  key={char}
                  onClick={() => handleKeyClick(char)}
                  className={`flex-1 h-10 rounded-md text-white text-base font-bold flex items-center justify-center transition-all active:scale-95 shadow-2xs border-b border-black/30 ${
                    pressedKey === char ? 'bg-blue-600 scale-105 z-10' : 'bg-[#3a3d44] hover:bg-[#484c55]'
                  }`}
                >
                  {char}
                </button>
              ))}
            </div>

            {/* Row 3 with Backspace */}
            <div className="flex items-center justify-center gap-1">
              <button
                onClick={() => handleActionClick(onBackspace, 'backspace')}
                className={`flex-[1.5] h-10 rounded-md text-rose-300 hover:text-white flex items-center justify-center transition-all active:scale-95 shadow-2xs border border-rose-950/40 ${
                  pressedKey === 'backspace' ? 'bg-rose-600 scale-105 z-10' : 'bg-[#2d2f34] hover:bg-rose-900'
                }`}
                title="حذف (Backspace)"
              >
                <Delete className="w-4 h-4" />
              </button>

              {nativeRow3Ar.map((char) => (
                <button
                  key={char}
                  onClick={() => handleKeyClick(char)}
                  className={`flex-1 h-10 rounded-md text-white text-base font-bold flex items-center justify-center transition-all active:scale-95 shadow-2xs border-b border-black/30 ${
                    pressedKey === char ? 'bg-blue-600 scale-105 z-10' : 'bg-[#3a3d44] hover:bg-[#484c55]'
                  }`}
                >
                  {char}
                </button>
              ))}

              <button
                onClick={() => handleKeyClick('!', 'exclamation')}
                className={`flex-[0.8] h-10 rounded-md text-white text-sm font-bold flex items-center justify-center transition-all active:scale-95 ${
                  pressedKey === 'exclamation' ? 'bg-blue-600 scale-105 z-10' : 'bg-[#3a3d44] hover:bg-[#484c55]'
                }`}
              >
                !
              </button>
            </div>
          </>
        ) : (
          <>
            {/* English Row 1 */}
            <div className="flex items-center justify-center gap-1">
              {nativeRow1En.map((char) => (
                <button
                  key={char}
                  onClick={() => handleKeyClick(char)}
                  className={`flex-1 h-10 rounded-md text-white text-base font-bold flex items-center justify-center transition-all active:scale-95 shadow-2xs border-b border-black/30 ${
                    pressedKey === char ? 'bg-blue-600 scale-105 z-10' : 'bg-[#3a3d44] hover:bg-[#484c55]'
                  }`}
                >
                  {char}
                </button>
              ))}
            </div>

            {/* English Row 2 */}
            <div className="flex items-center justify-center gap-1 px-2">
              {nativeRow2En.map((char) => (
                <button
                  key={char}
                  onClick={() => handleKeyClick(char)}
                  className={`flex-1 h-10 rounded-md text-white text-base font-bold flex items-center justify-center transition-all active:scale-95 shadow-2xs border-b border-black/30 ${
                    pressedKey === char ? 'bg-blue-600 scale-105 z-10' : 'bg-[#3a3d44] hover:bg-[#484c55]'
                  }`}
                >
                  {char}
                </button>
              ))}
            </div>

            {/* English Row 3 */}
            <div className="flex items-center justify-center gap-1">
              <button
                onClick={() => handleActionClick(onBackspace, 'backspace')}
                className={`flex-[1.5] h-10 rounded-md text-rose-300 hover:text-white flex items-center justify-center transition-all active:scale-95 shadow-2xs border border-rose-950/40 ${
                  pressedKey === 'backspace' ? 'bg-rose-600 scale-105 z-10' : 'bg-[#2d2f34] hover:bg-rose-900'
                }`}
                title="حذف"
              >
                <Delete className="w-4 h-4" />
              </button>

              {nativeRow3En.map((char) => (
                <button
                  key={char}
                  onClick={() => handleKeyClick(char)}
                  className={`flex-1 h-10 rounded-md text-white text-base font-bold flex items-center justify-center transition-all active:scale-95 shadow-2xs border-b border-black/30 ${
                    pressedKey === char ? 'bg-blue-600 scale-105 z-10' : 'bg-[#3a3d44] hover:bg-[#484c55]'
                  }`}
                >
                  {char}
                </button>
              ))}

              <button
                onClick={() => handleKeyClick('?', 'question')}
                className={`flex-[0.8] h-10 rounded-md text-white text-sm font-bold flex items-center justify-center transition-all active:scale-95 ${
                  pressedKey === 'question' ? 'bg-blue-600 scale-105 z-10' : 'bg-[#3a3d44] hover:bg-[#484c55]'
                }`}
              >
                ?
              </button>
            </div>
          </>
        )}

        {/* Row 4: 123, Globe, Spacebar, Enter */}
        <div className="flex items-center justify-center gap-1 pt-0.5">
          <button
            onClick={() => handleKeyClick('123', 'symbols')}
            className={`flex-[1.5] h-10 rounded-md text-xs font-bold text-slate-300 flex items-center justify-center shadow-2xs transition-all active:scale-95 ${
              pressedKey === 'symbols' ? 'bg-blue-600 scale-105 z-10' : 'bg-[#2d2f34] hover:bg-[#383a40]'
            }`}
          >
            !؟123
          </button>

          <button
            onClick={() => handleActionClick(() => setLang(lang === 'ar' ? 'en' : 'ar'), 'lang')}
            className={`flex-[1.2] h-10 rounded-md text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95 shadow-2xs shrink-0 ${
              pressedKey === 'lang' ? 'bg-emerald-600 text-white scale-105 z-10' : 'bg-[#2d2f34] hover:bg-emerald-900 text-emerald-300 hover:text-white'
            }`}
            title="تبديل اللغة"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          <button
            onClick={() => handleActionClick(onSpace, 'space')}
            className={`flex-[4.8] h-10 rounded-md text-xs font-bold text-slate-200 flex items-center justify-center transition-all active:scale-95 shadow-2xs border-b border-black/30 ${
              pressedKey === 'space' ? 'bg-blue-600 scale-105 z-10 text-white' : 'bg-[#3a3d44] hover:bg-[#484c55]'
            }`}
          >
            {lang === 'ar' ? 'مسافة' : 'Space'}
          </button>

          <button
            onClick={() => handleKeyClick('.', 'dot')}
            className={`flex-[0.8] h-10 rounded-md text-sm font-bold flex items-center justify-center transition-all active:scale-95 ${
              pressedKey === 'dot' ? 'bg-blue-600 scale-105 z-10 text-white' : 'bg-[#3a3d44] hover:bg-[#484c55]'
            }`}
          >
            .
          </button>

          <button
            onClick={() => handleActionClick(onEnter, 'enter')}
            className={`flex-[2.5] h-10 rounded-md text-white flex items-center justify-center transition-all active:scale-95 font-bold shadow-2xs ${
              pressedKey === 'enter' ? 'bg-blue-500 scale-105 z-10 brightness-125' : 'bg-blue-600 hover:bg-blue-500'
            }`}
            title="إدخال (Enter)"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
