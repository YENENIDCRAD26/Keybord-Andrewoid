export interface KeyDef {
  code: string;
  label: string;
  shiftLabel?: string;
  arSub?: string; // Arabic sub-character for English layout
  width?: string;
  type?: 'char' | 'action' | 'modifier' | 'space' | 'arrows';
  customClass?: string;
}

// Arabic Layout - Standard 101 matching screenshot 1 & 2
// Row 1: ` 1 2 3 4 5 6 7 8 9 0 . ± [Backspace / مسح]
// Row 2: Tab ض ص ث ق ف غ ع ه خ ح ج د
// Row 3: Caps ش س ي ب ل ا ت ن م ك ط [Enter ↵]
// Row 4: Shift ئ ء ؤ ر لا ى ة و ز ظ Shift
// Row 5: Ctrl [Alt - Purple] [🌐 EN/عربي - Green] [مسافة (Space)] [→] [↑↓] [←]
export const ARABIC_ROWS_NORMAL: KeyDef[][] = [
  // Row 1
  [
    { code: 'Backquote', label: '`', shiftLabel: 'ذ' },
    { code: 'Digit1', label: '1', shiftLabel: '!' },
    { code: 'Digit2', label: '2', shiftLabel: '@' },
    { code: 'Digit3', label: '3', shiftLabel: '#' },
    { code: 'Digit4', label: '4', shiftLabel: '$' },
    { code: 'Digit5', label: '5', shiftLabel: '%' },
    { code: 'Digit6', label: '6', shiftLabel: '^' },
    { code: 'Digit7', label: '7', shiftLabel: '&' },
    { code: 'Digit8', label: '8', shiftLabel: '*' },
    { code: 'Digit9', label: '9', shiftLabel: ')' },
    { code: 'Digit0', label: '0', shiftLabel: '(' },
    { code: 'Period', label: '.', shiftLabel: 'ـ' },
    { code: 'PlusMinus', label: '±', shiftLabel: '+' },
    { code: 'Backspace', label: 'مسح', type: 'action', customClass: 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100' },
  ],
  // Row 2
  [
    { code: 'Tab', label: 'Tab', type: 'action' },
    { code: 'KeyQ', label: 'ض', shiftLabel: 'َ' },
    { code: 'KeyW', label: 'ص', shiftLabel: 'ً' },
    { code: 'KeyE', label: 'ث', shiftLabel: 'ُ' },
    { code: 'KeyR', label: 'ق', shiftLabel: 'ٌ' },
    { code: 'KeyT', label: 'ف', shiftLabel: 'لإ' },
    { code: 'KeyY', label: 'غ', shiftLabel: 'إ' },
    { code: 'KeyU', label: 'ع', shiftLabel: '‘' },
    { code: 'KeyI', label: 'ه', shiftLabel: '÷' },
    { code: 'KeyO', label: 'خ', shiftLabel: '×' },
    { code: 'KeyP', label: 'ح', shiftLabel: '؛' },
    { code: 'BracketLeft', label: 'ج', shiftLabel: '<' },
    { code: 'BracketRight', label: 'د', shiftLabel: '>' },
  ],
  // Row 3
  [
    { code: 'CapsLock', label: 'Caps', type: 'modifier' },
    { code: 'KeyA', label: 'ش', shiftLabel: 'ِ' },
    { code: 'KeyS', label: 'س', shiftLabel: 'ٍ' },
    { code: 'KeyD', label: 'ي', shiftLabel: ']' },
    { code: 'KeyF', label: 'ب', shiftLabel: '[' },
    { code: 'KeyG', label: 'ل', shiftLabel: 'لأ' },
    { code: 'KeyH', label: 'ا', shiftLabel: 'أ' },
    { code: 'KeyJ', label: 'ت', shiftLabel: 'ـ' },
    { code: 'KeyK', label: 'ن', shiftLabel: '،' },
    { code: 'KeyL', label: 'م', shiftLabel: '/' },
    { code: 'Semicolon', label: 'ك', shiftLabel: ':' },
    { code: 'Quote', label: 'ط', shiftLabel: '"' },
    { code: 'Enter', label: '↵ Enter', type: 'action', customClass: 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700 shadow-sm' },
  ],
  // Row 4
  [
    { code: 'ShiftLeft', label: 'Shift', type: 'modifier' },
    { code: 'KeyZ', label: 'ئ', shiftLabel: '~' },
    { code: 'KeyX', label: 'ء', shiftLabel: 'ْ' },
    { code: 'KeyC', label: 'ؤ', shiftLabel: '}' },
    { code: 'KeyV', label: 'ر', shiftLabel: '{' },
    { code: 'KeyB', label: 'لا', shiftLabel: 'لآ' },
    { code: 'KeyN', label: 'ى', shiftLabel: 'آ' },
    { code: 'KeyM', label: 'ة', shiftLabel: '’' },
    { code: 'Comma', label: 'و', shiftLabel: ',' },
    { code: 'PeriodAr', label: 'ز', shiftLabel: '.' },
    { code: 'Slash', label: 'ظ', shiftLabel: '؟' },
    { code: 'ShiftRight', label: 'Shift', type: 'modifier' },
  ],
  // Row 5
  [
    { code: 'ControlLeft', label: 'Ctrl', type: 'modifier' },
    { code: 'AltLeft', label: 'Alt', type: 'modifier', customClass: 'bg-purple-600 text-white border-purple-700 hover:bg-purple-700' },
    { code: 'LangToggle', label: 'EN', type: 'action', customClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold hover:bg-emerald-200' },
    { code: 'Space', label: 'مسافة (Space)', type: 'space' },
    { code: 'ArrowRight', label: '→', type: 'action' },
    { code: 'ArrowCluster', label: '⇅', type: 'arrows' },
    { code: 'ArrowLeft', label: '←', type: 'action' },
  ],
];

// Arabic Shift Row 2,3,4 with Tashkeel
export const ARABIC_ROWS_SHIFT: KeyDef[][] = [
  // Row 1
  [
    { code: 'Backquote', label: 'ذ' },
    { code: 'Digit1', label: '!' },
    { code: 'Digit2', label: '@' },
    { code: 'Digit3', label: '#' },
    { code: 'Digit4', label: '$' },
    { code: 'Digit5', label: '%' },
    { code: 'Digit6', label: '^' },
    { code: 'Digit7', label: '&' },
    { code: 'Digit8', label: '*' },
    { code: 'Digit9', label: ')' },
    { code: 'Digit0', label: '(' },
    { code: 'Period', label: 'ـ' },
    { code: 'PlusMinus', label: '+' },
    { code: 'Backspace', label: 'مسح', type: 'action', customClass: 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100' },
  ],
  // Row 2
  [
    { code: 'Tab', label: 'Tab', type: 'action' },
    { code: 'KeyQ', label: 'َ' }, // Fatha
    { code: 'KeyW', label: 'ً' }, // Tanwin Fath
    { code: 'KeyE', label: 'ُ' }, // Damma
    { code: 'KeyR', label: 'ٌ' }, // Tanwin Damm
    { code: 'KeyT', label: 'لإ' },
    { code: 'KeyY', label: 'إ' },
    { code: 'KeyU', label: '‘' },
    { code: 'KeyI', label: '÷' },
    { code: 'KeyO', label: '×' },
    { code: 'KeyP', label: '؛' },
    { code: 'BracketLeft', label: '<' },
    { code: 'BracketRight', label: '>' },
  ],
  // Row 3
  [
    { code: 'CapsLock', label: 'Caps', type: 'modifier' },
    { code: 'KeyA', label: 'ِ' }, // Kasra
    { code: 'KeyS', label: 'ٍ' }, // Tanwin Kasr
    { code: 'KeyD', label: ']' },
    { code: 'KeyF', label: '[' },
    { code: 'KeyG', label: 'لأ' },
    { code: 'KeyH', label: 'أ' },
    { code: 'KeyJ', label: 'ـ' },
    { code: 'KeyK', label: '،' },
    { code: 'KeyL', label: '/' },
    { code: 'Semicolon', label: ':' },
    { code: 'Quote', label: '"' },
    { code: 'Enter', label: '↵ Enter', type: 'action', customClass: 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700' },
  ],
  // Row 4
  [
    { code: 'ShiftLeft', label: 'Shift', type: 'modifier', customClass: 'bg-blue-100 border-blue-400 text-blue-700 font-bold' },
    { code: 'KeyZ', label: '~' },
    { code: 'KeyX', label: 'ْ' }, // Sukun
    { code: 'KeyC', label: '}' },
    { code: 'KeyV', label: '{' },
    { code: 'KeyB', label: 'لآ' },
    { code: 'KeyN', label: 'آ' },
    { code: 'KeyM', label: '’' },
    { code: 'Comma', label: '،' },
    { code: 'PeriodAr', label: 'ّ' }, // Shaddah
    { code: 'Slash', label: '؟' },
    { code: 'ShiftRight', label: 'Shift', type: 'modifier', customClass: 'bg-blue-100 border-blue-400 text-blue-700 font-bold' },
  ],
  // Row 5
  [
    { code: 'ControlLeft', label: 'Ctrl', type: 'modifier' },
    { code: 'AltLeft', label: 'Alt', type: 'modifier', customClass: 'bg-purple-600 text-white border-purple-700 hover:bg-purple-700' },
    { code: 'LangToggle', label: 'EN', type: 'action', customClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold hover:bg-emerald-200' },
    { code: 'Space', label: 'مسافة (Space)', type: 'space' },
    { code: 'ArrowRight', label: '→', type: 'action' },
    { code: 'ArrowCluster', label: '⇅', type: 'arrows' },
    { code: 'ArrowLeft', label: '←', type: 'action' },
  ],
];

// English Layout matching screenshot 3
export const ENGLISH_ROWS_NORMAL: KeyDef[][] = [
  // Row 1
  [
    { code: 'Backquote', label: '`' },
    { code: 'Digit1', label: '1' },
    { code: 'Digit2', label: '2' },
    { code: 'Digit3', label: '3' },
    { code: 'Digit4', label: '4' },
    { code: 'Digit5', label: '5' },
    { code: 'Digit6', label: '6' },
    { code: 'Digit7', label: '7' },
    { code: 'Digit8', label: '8' },
    { code: 'Digit9', label: '9' },
    { code: 'Digit0', label: '0' },
    { code: 'Minus', label: '-' },
    { code: 'PlusMinus', label: '±' },
    { code: 'Backspace', label: 'مسح', type: 'action', customClass: 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100' },
  ],
  // Row 2
  [
    { code: 'Tab', label: 'Tab', type: 'action' },
    { code: 'KeyQ', label: 'q', arSub: 'ض' },
    { code: 'KeyW', label: 'w', arSub: 'ص' },
    { code: 'KeyE', label: 'e', arSub: 'ث' },
    { code: 'KeyR', label: 'r', arSub: 'ق' },
    { code: 'KeyT', label: 't', arSub: 'ف' },
    { code: 'KeyY', label: 'y', arSub: 'غ' },
    { code: 'KeyU', label: 'u', arSub: 'ع' },
    { code: 'KeyI', label: 'i', arSub: 'ه' },
    { code: 'KeyO', label: 'o', arSub: 'خ' },
    { code: 'KeyP', label: 'p', arSub: 'ح' },
    { code: 'BracketLeft', label: '[' },
    { code: 'BracketRight', label: ']' },
  ],
  // Row 3
  [
    { code: 'CapsLock', label: 'Caps', type: 'modifier' },
    { code: 'KeyA', label: 'a', arSub: 'ش' },
    { code: 'KeyS', label: 's', arSub: 'س' },
    { code: 'KeyD', label: 'd', arSub: 'ي' },
    { code: 'KeyF', label: 'f', arSub: 'ب' },
    { code: 'KeyG', label: 'g', arSub: 'ل' },
    { code: 'KeyH', label: 'h', arSub: 'ا' },
    { code: 'KeyJ', label: 'j', arSub: 'ت' },
    { code: 'KeyK', label: 'k', arSub: 'ن' },
    { code: 'KeyL', label: 'l', arSub: 'م' },
    { code: 'Semicolon', label: ';', arSub: 'ك' },
    { code: 'Quote', label: "'", arSub: 'ط' },
    { code: 'Enter', label: 'Enter', type: 'action', customClass: 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700' },
  ],
  // Row 4
  [
    { code: 'ShiftLeft', label: 'Shift', type: 'modifier' },
    { code: 'KeyZ', label: 'z', arSub: 'ئ' },
    { code: 'KeyX', label: 'x', arSub: 'ء' },
    { code: 'KeyC', label: 'c', arSub: 'ؤ' },
    { code: 'KeyV', label: 'v', arSub: 'ر' },
    { code: 'KeyB', label: 'b', arSub: 'لا' },
    { code: 'KeyN', label: 'n', arSub: 'ى' },
    { code: 'KeyM', label: 'm', arSub: 'ة' },
    { code: 'Comma', label: ',' },
    { code: 'Slash', label: '/' },
    { code: 'ShiftRight', label: 'Shift', type: 'modifier' },
  ],
  // Row 5
  [
    { code: 'ControlLeft', label: 'Ctrl', type: 'modifier' },
    { code: 'AltLeft', label: 'Alt', type: 'modifier', customClass: 'bg-purple-600 text-white border-purple-700 hover:bg-purple-700' },
    { code: 'LangToggle', label: 'عربي', type: 'action', customClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold hover:bg-emerald-200' },
    { code: 'Space', label: 'مسافة (Space)', type: 'space' },
    { code: 'ArrowRight', label: '→', type: 'action' },
    { code: 'ArrowCluster', label: '⇅', type: 'arrows' },
    { code: 'ArrowLeft', label: '←', type: 'action' },
  ],
];

// Tashkeel Diacritics dedicated list
export const TASHKEEL_MARKS = [
  { char: 'َ', name: 'فتحة' },
  { char: 'ً', name: 'تنوين فتح' },
  { char: 'ُ', name: 'ضمة' },
  { char: 'ٌ', name: 'تنوين ضم' },
  { char: 'ِ', name: 'كسرة' },
  { char: 'ٍ', name: 'تنوين كسر' },
  { char: 'ْ', name: 'سكون' },
  { char: 'ّ', name: 'شدة' },
  { char: 'ـ', name: 'تطويل' },
  { char: '؟', name: 'استفهام' },
  { char: '،', name: 'فاصلة' },
  { char: '؛', name: 'منقوطة' },
  { char: '«', name: 'قوس يمين' },
  { char: '»', name: 'قوس يسار' },
];

export const QUICK_TEMPLATES = [
  'بسم الله الرحمن الرحيم',
  'السلام عليكم ورحمة الله وبركاته',
  'جزاكم الله خيراً وبوركتم',
  'الحمد لله رب العالمين',
  'صلى الله عليه وسلم',
  'تحياتي الطيبة وخالص احترامي',
];
