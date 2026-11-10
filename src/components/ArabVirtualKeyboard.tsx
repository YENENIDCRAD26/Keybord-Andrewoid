import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Minus, 
  ChevronUp, 
  Globe, 
  Delete, 
  CornerDownLeft,
  Keyboard as KeyboardIcon,
  Smartphone,
  Sparkles,
  Palette,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Zap,
  Check
} from 'lucide-react';
import { VirtualKeyboardState } from '../types';
import { getPredictiveSuggestions, TextSuggestion } from '../utils/predictiveTextEngine';

interface ArabVirtualKeyboardProps {
  state: VirtualKeyboardState;
  onUpdateState: (partial: Partial<VirtualKeyboardState>) => void;
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  onTab: () => void;
  onArrowKey?: (dir: 'up' | 'down' | 'left' | 'right') => void;
  onCommand?: (cmd: string) => void;
  onInsertText?: (text: string, replaceLength?: number) => void;
  mode: 'word' | 'excel';
}

// Tashkeel / Harakat list
const TASHKEEL_LIST = ['َ', 'ً', 'ُ', 'ٌ', 'ِ', 'ٍ', 'ْ', 'ّ', 'ـ'];

// Key row layout definitions for Arabic
const AR_ROW_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const AR_ROW_1 = ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د'];
const AR_ROW_2 = ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'];
const AR_ROW_3 = ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ'];

// English row definitions
const EN_ROW_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const EN_ROW_1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const EN_ROW_2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const EN_ROW_3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

export const ArabVirtualKeyboard: React.FC<ArabVirtualKeyboardProps> = ({
  state,
  onUpdateState,
  onKeyPress,
  onBackspace,
  onEnter,
  onTab,
  onArrowKey,
  onCommand,
  onInsertText,
  mode
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showExtraMenu, setShowExtraMenu] = useState(false);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [showShortcutsBar, setShowShortcutsBar] = useState(true);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);

  // Predictive Text State
  const [predictiveBuffer, setPredictiveBuffer] = useState<string>('');
  const [predictiveSuggestions, setPredictiveSuggestions] = useState<TextSuggestion[]>([]);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearPredictions = () => {
    setPredictiveBuffer('');
    setPredictiveSuggestions([]);
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (!predictiveBuffer.trim()) {
      setPredictiveSuggestions([]);
      return;
    }

    const suggestions = getPredictiveSuggestions(
      predictiveBuffer,
      state.language,
      mode,
      6
    );
    setPredictiveSuggestions(suggestions);

    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      clearPredictions();
    }, 7000);

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [predictiveBuffer, state.language, mode]);

  if (!state.isOpen) return null;

  const isNative = state.preferredInputMode === 'native';
  const autoSwitchEnabled = state.autoSwitch !== false;
  const layoutMode = state.layoutMode || 'standard';
  const numberType = state.numberType || 'eastern';

  const toggleInputMode = () => {
    onUpdateState({ preferredInputMode: isNative ? 'virtual' : 'native' });
  };

  const toggleAutoSwitch = () => {
    onUpdateState({ autoSwitch: !autoSwitchEnabled });
  };

  const toggleLanguage = () => {
    clearPredictions();
    onUpdateState({ language: state.language === 'ar' ? 'en' : 'ar' });
  };

  const toggleShift = () => {
    onUpdateState({ shiftActive: !state.shiftActive });
  };

  const toggleAlt = () => {
    onUpdateState({ altActive: !state.altActive });
  };

  const toggleCtrl = () => {
    onUpdateState({ ctrlActive: !state.ctrlActive });
  };

  const toggleLayoutMode = () => {
    onUpdateState({ layoutMode: layoutMode === 'standard' ? 'rtl' : 'standard' });
  };

  const toggleNumberType = () => {
    onUpdateState({ numberType: numberType === 'eastern' ? 'western' : 'eastern' });
  };

  const handleSelectSuggestion = (suggestion: TextSuggestion) => {
    const textToInsert = suggestion.text + (suggestion.text.endsWith(' ') || suggestion.text.endsWith('(') ? '' : ' ');
    const replaceLen = predictiveBuffer.length;

    if (onInsertText) {
      onInsertText(textToInsert, replaceLen);
    } else {
      for (let i = 0; i < replaceLen; i++) {
        onBackspace();
      }
      onKeyPress(textToInsert);
    }

    clearPredictions();
  };

  const handleKeyClick = (char: string) => {
    // 1. Alt combinations (e.g. Alt + = for AutoSum in Excel)
    if (state.altActive && (char === '=' || char === '+')) {
      onCommand?.('autoSum');
      onUpdateState({ altActive: false });
      clearPredictions();
      return;
    }

    // 2. Ctrl combinations with English and Arabic characters
    if (state.ctrlActive) {
      const lower = char.toLowerCase();
      if (lower === 'n' || char === 'ى') onCommand?.('new');
      else if (lower === 'o' || char === 'خ') onCommand?.('open');
      else if (lower === 's' || char === 'س') onCommand?.('save');
      else if (lower === 'p' || char === 'ح') onCommand?.('print');
      else if (lower === 'c' || char === 'ؤ') onCommand?.('copy');
      else if (lower === 'x' || char === 'ء') onCommand?.('cut');
      else if (lower === 'v' || char === 'ر') onCommand?.('paste');
      else if (lower === 'a' || char === 'ش') onCommand?.('selectAll');
      else if (lower === 'z' || char === 'ئ') onCommand?.('undo');
      else if (lower === 'y' || char === 'إ' || char === 'غ') onCommand?.('redo');
      else if (lower === 'f' || char === 'ب') onCommand?.('find');
      else if (lower === 'h' || char === 'ا' || char === 'أ') onCommand?.('replace');
      else if (lower === 'b' || char === 'لا') onCommand?.('bold');
      else if (lower === 'i' || char === 'ه') onCommand?.('italic');
      else if (lower === 'u' || char === 'ع') onCommand?.('underline');
      else if (lower === 'k' || char === 'ن') onCommand?.('insertLink');
      else if (char === ';' || char === 'ك' || char === '؛') onCommand?.('insertDate');
      
      onUpdateState({ ctrlActive: false });
      clearPredictions();
      return;
    }

    // Regular character typing
    let charToEmit = char;
    if (state.language === 'en') {
      charToEmit = state.shiftActive ? char.toUpperCase() : char.toLowerCase();
    }
    onKeyPress(charToEmit);
    setPredictiveBuffer((prev) => prev + charToEmit);
  };

  const isAr = state.language === 'ar';
  const rowNumbers = isAr ? AR_ROW_NUMBERS : EN_ROW_NUMBERS;
  const row1 = isAr ? AR_ROW_1 : EN_ROW_1;
  const row2 = isAr ? AR_ROW_2 : EN_ROW_2;
  const row3 = isAr ? AR_ROW_3 : EN_ROW_3;

  return (
    <div 
      className="w-full bg-[#1c1d22] text-white select-none border-t border-[#2e3138] shadow-2xl flex flex-col font-sans transition-all duration-200"
      dir="rtl"
    >
      {/* 1. Top Predictive Bar & Quick Toolbar */}
      <div className="bg-[#18191d] px-2 py-1.5 border-b border-[#2a2c33] flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        {/* Suggestions */}
        <div className="flex items-center gap-1.5 flex-1 overflow-x-auto no-scrollbar">
          {predictiveSuggestions.length > 0 ? (
            predictiveSuggestions.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSelectSuggestion(sug)}
                className="px-3 py-1 bg-[#252830] hover:bg-[#343844] active:bg-[#404654] text-sm text-cyan-300 font-medium rounded-full whitespace-nowrap transition-colors border border-[#373b45] flex items-center gap-1"
              >
                {sug.type === 'formula' && <Zap className="w-3 h-3 text-amber-400" />}
                {sug.text}
              </button>
            ))
          ) : (
            <div className="text-xs text-gray-400 flex items-center gap-1 px-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>جاهز للاقتراحات الذكية وكتابة النصوص والمستندات</span>
            </div>
          )}
        </div>

        {/* Quick Toggles */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onCommand?.('autoSum')}
            title="AutoSum (Alt + =)"
            className="px-2 py-0.5 bg-[#272a33] text-amber-300 text-xs font-bold rounded hover:bg-[#363a47] border border-[#3c414f]"
          >
            ∑ جمع
          </button>
          <button
            onClick={() => onCommand?.('bold')}
            title="Bold (Ctrl + B / لا)"
            className="px-2 py-0.5 bg-[#272a33] text-gray-200 text-xs font-bold rounded hover:bg-[#363a47] border border-[#3c414f]"
          >
            B
          </button>
          <button
            onClick={() => onCommand?.('save')}
            title="Save (Ctrl + S / س)"
            className="px-2 py-0.5 bg-[#272a33] text-emerald-300 text-xs font-bold rounded hover:bg-[#363a47] border border-[#3c414f]"
          >
            💾
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 text-gray-400 hover:text-white"
          >
            {isMinimized ? <ChevronUp className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="p-1 sm:p-1.5 flex flex-col gap-1 sm:gap-1.5">
          {/* 2. Tashkeel / Harakat Bar (Independent Prominent Bar) */}
          {isAr && (
            <div className="flex items-center justify-between gap-1 px-1 py-1 bg-[#15161a] rounded-lg border border-[#2b2e37] overflow-x-auto no-scrollbar">
              <span className="text-[10px] text-gray-400 font-bold px-1 shrink-0">تشكيل:</span>
              <div className="flex items-center justify-around flex-1 gap-1">
                {TASHKEEL_LIST.map((haraka, i) => (
                  <button
                    key={i}
                    onClick={() => handleKeyClick(haraka)}
                    className="flex-1 min-w-[28px] h-7 bg-[#23262f] hover:bg-[#353a47] active:bg-cyan-700 text-white font-bold rounded text-base flex items-center justify-center transition-colors border border-[#333742]"
                  >
                    {haraka}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Number Row */}
          <div className="flex gap-1 justify-between">
            {rowNumbers.map((num, i) => (
              <button
                key={i}
                onClick={() => handleKeyClick(num)}
                className="flex-1 h-11 bg-[#252830] hover:bg-[#353945] active:bg-blue-600 font-bold text-gray-200 rounded-lg text-base flex items-center justify-center shadow transition-all border border-[#353942]"
              >
                {num}
              </button>
            ))}
            <button
              onClick={onBackspace}
              className="px-3 h-11 bg-[#322329] hover:bg-[#482834] active:bg-rose-700 text-rose-300 rounded-lg flex items-center justify-center border border-[#482b36]"
              title="Backspace"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>

          {/* 4. Letter Row 1 */}
          <div className="flex gap-1 justify-between">
            <button
              onClick={onTab}
              className="px-2.5 h-11 bg-[#23262f] hover:bg-[#333742] text-xs font-semibold text-gray-300 rounded-lg flex items-center justify-center border border-[#333742]"
            >
              Tab
            </button>
            {row1.map((char, i) => (
              <button
                key={i}
                onClick={() => handleKeyClick(char)}
                className="flex-1 h-11 bg-[#2c2f38] hover:bg-[#3c414e] active:bg-blue-600 font-bold text-gray-100 rounded-lg text-lg flex items-center justify-center shadow transition-all border border-[#383d47]"
              >
                {char}
              </button>
            ))}
          </div>

          {/* 5. Letter Row 2 */}
          <div className="flex gap-1 justify-between px-2">
            {row2.map((char, i) => (
              <button
                key={i}
                onClick={() => handleKeyClick(char)}
                className="flex-1 h-11 bg-[#2c2f38] hover:bg-[#3c414e] active:bg-blue-600 font-bold text-gray-100 rounded-lg text-lg flex items-center justify-center shadow transition-all border border-[#383d47]"
              >
                {char}
              </button>
            ))}
          </div>

          {/* 6. Letter Row 3 with Shift */}
          <div className="flex gap-1 justify-between">
            <button
              onClick={toggleShift}
              className={`px-3 h-11 rounded-lg font-bold text-xs flex items-center justify-center transition-all border ${
                state.shiftActive 
                  ? 'bg-blue-600 text-white border-blue-400' 
                  : 'bg-[#23262f] text-gray-300 border-[#333742] hover:bg-[#333742]'
              }`}
            >
              Shift
            </button>
            {row3.map((char, i) => (
              <button
                key={i}
                onClick={() => handleKeyClick(char)}
                className="flex-1 h-11 bg-[#2c2f38] hover:bg-[#3c414e] active:bg-blue-600 font-bold text-gray-100 rounded-lg text-lg flex items-center justify-center shadow transition-all border border-[#383d47]"
              >
                {char}
              </button>
            ))}
            <button
              onClick={onEnter}
              className="px-4 h-11 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-lg flex items-center justify-center shadow-lg font-bold border border-blue-400"
              title="Enter"
            >
              <CornerDownLeft className="w-5 h-5" />
            </button>
          </div>

          {/* 7. Bottom Navigation & Action Row (Space, Ctrl, Alt, Language) */}
          <div className="flex gap-1 items-center justify-between pt-0.5">
            {/* Ctrl Key */}
            <button
              onClick={toggleCtrl}
              className={`px-3 h-11 rounded-lg font-bold text-xs flex items-center justify-center transition-all border ${
                state.ctrlActive
                  ? 'bg-purple-600 text-white border-purple-400 ring-2 ring-purple-300'
                  : 'bg-[#23262f] text-gray-300 border-[#333742] hover:bg-[#333742]'
              }`}
            >
              Ctrl
            </button>

            {/* Alt Key */}
            <button
              onClick={toggleAlt}
              className={`px-3 h-11 rounded-lg font-bold text-xs flex items-center justify-center transition-all border ${
                state.altActive
                  ? 'bg-amber-600 text-white border-amber-400 ring-2 ring-amber-300'
                  : 'bg-[#23262f] text-gray-300 border-[#333742] hover:bg-[#333742]'
              }`}
            >
              Alt
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 h-11 bg-[#23262f] hover:bg-[#333742] text-emerald-400 font-bold text-xs rounded-lg flex items-center gap-1 border border-[#333742]"
            >
              <Globe className="w-4 h-4" />
              <span>{state.language === 'ar' ? 'العربية' : 'English'}</span>
            </button>

            {/* Space Bar */}
            <button
              onClick={() => handleKeyClick(' ')}
              className="flex-1 h-11 bg-[#2c2f38] hover:bg-[#383d47] active:bg-blue-600 text-gray-400 font-medium rounded-lg text-sm flex items-center justify-center border border-[#383d47] shadow"
            >
              مسافة • Space
            </button>

            {/* Arrow Navigation */}
            <div className="flex gap-0.5">
              <button
                onClick={() => onArrowKey?.('right')}
                className="w-8 h-11 bg-[#23262f] hover:bg-[#333742] text-gray-300 rounded-lg flex items-center justify-center border border-[#333742]"
                title="Right"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onArrowKey?.('left')}
                className="w-8 h-11 bg-[#23262f] hover:bg-[#333742] text-gray-300 rounded-lg flex items-center justify-center border border-[#333742]"
                title="Left"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
