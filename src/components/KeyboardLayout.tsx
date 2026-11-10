import React, { useState } from 'react';

export interface KeyItem {
  id: string;
  label: string;
  code: string;
  flexClass?: string;
  width?: string;
  isSpecial?: boolean;
}

export interface KeyboardLayoutProps {
  onKeyPress: (key: KeyItem) => void;
  onDelete: () => void;
  onSpace: () => void;
  customRows?: KeyItem[][];
}

// Samsung One UI 10-Unit Grid Flex-Grow Ratios Mapping
export const getKeyFlexClass = (key: KeyItem): string => {
  if (key.flexClass) return key.flexClass;
  if (key.code === 'ShiftLeft' || key.code === 'ShiftRight' || key.id === 'shift') {
    return 'flex-[1.5]';
  }
  if (key.code === 'Backspace' || key.id === 'delete') {
    return 'flex-[1.5]';
  }
  if (key.code === 'Space' || key.id === 'space' || key.width === 'flex-grow') {
    return 'flex-[4.8]';
  }
  if (key.code === 'Enter' || key.id === 'enter') {
    return 'flex-[2.5]';
  }
  if (key.code === 'SymbolToggle' || key.id === 'symbols') {
    return 'flex-[1.5]';
  }
  if (key.code === 'LangToggle' || key.id === 'lang') {
    return 'flex-[1.2]';
  }
  return 'flex-1';
};

export const defaultKeyboardRows: KeyItem[][] = [
  // Row 1: 10 keys (10 units total)
  [
    { id: 'q', label: 'ض', code: 'KeyQ', flexClass: 'flex-1' },
    { id: 'w', label: 'ص', code: 'KeyW', flexClass: 'flex-1' },
    { id: 'e', label: 'ث', code: 'KeyE', flexClass: 'flex-1' },
    { id: 'r', label: 'ق', code: 'KeyR', flexClass: 'flex-1' },
    { id: 't', label: 'ف', code: 'KeyT', flexClass: 'flex-1' },
    { id: 'y', label: 'غ', code: 'KeyY', flexClass: 'flex-1' },
    { id: 'u', label: 'ع', code: 'KeyU', flexClass: 'flex-1' },
    { id: 'i', label: 'ه', code: 'KeyI', flexClass: 'flex-1' },
    { id: 'o', label: 'خ', code: 'KeyO', flexClass: 'flex-1' },
    { id: 'p', label: 'ح', code: 'KeyP', flexClass: 'flex-1' },
  ],
  // Row 2: 9 keys (centered with padding to match Samsung One UI alignment)
  [
    { id: 'a', label: 'ش', code: 'KeyA', flexClass: 'flex-1' },
    { id: 's', label: 'س', code: 'KeyS', flexClass: 'flex-1' },
    { id: 'd', label: 'ي', code: 'KeyD', flexClass: 'flex-1' },
    { id: 'f', label: 'ب', code: 'KeyF', flexClass: 'flex-1' },
    { id: 'g', label: 'ل', code: 'KeyG', flexClass: 'flex-1' },
    { id: 'h', label: 'ا', code: 'KeyH', flexClass: 'flex-1' },
    { id: 'j', label: 'ت', code: 'KeyJ', flexClass: 'flex-1' },
    { id: 'k', label: 'ن', code: 'KeyK', flexClass: 'flex-1' },
    { id: 'l', label: 'م', code: 'KeyL', flexClass: 'flex-1' },
  ],
  // Row 3: Shift (1.5) + 7 letters (7.0) + Backspace (1.5) = 10 units
  [
    { id: 'shift', label: '⇧', code: 'ShiftLeft', flexClass: 'flex-[1.5]', isSpecial: true },
    { id: 'z', label: 'ئ', code: 'KeyZ', flexClass: 'flex-1' },
    { id: 'x', label: 'ء', code: 'KeyX', flexClass: 'flex-1' },
    { id: 'c', label: 'ؤ', code: 'KeyC', flexClass: 'flex-1' },
    { id: 'v', label: 'ر', code: 'KeyV', flexClass: 'flex-1' },
    { id: 'b', label: 'لا', code: 'KeyB', flexClass: 'flex-1' },
    { id: 'n', label: 'ى', code: 'KeyN', flexClass: 'flex-1' },
    { id: 'm', label: 'ة', code: 'KeyM', flexClass: 'flex-1' },
    { id: 'delete', label: '⌫', code: 'Backspace', flexClass: 'flex-[1.5]', isSpecial: true },
  ],
  // Row 4: Symbols (1.5) + Lang (1.2) + Space (4.8) + Enter (2.5) = 10 units
  [
    { id: 'symbols', label: '!؟123', code: 'SymbolToggle', flexClass: 'flex-[1.5]', isSpecial: true },
    { id: 'lang', label: '🌐', code: 'LangToggle', flexClass: 'flex-[1.2]', isSpecial: true },
    { id: 'space', label: 'مسافة', code: 'Space', flexClass: 'flex-[4.8]', isSpecial: true },
    { id: 'enter', label: 'إدخال ↵', code: 'Enter', flexClass: 'flex-[2.5]', isSpecial: true },
  ]
];

export const KeyboardLayout: React.FC<KeyboardLayoutProps> = ({
  onKeyPress,
  onDelete,
  onSpace,
  customRows
}) => {
  const [pressedKeyId, setPressedKeyId] = useState<string | null>(null);
  const rows = customRows || defaultKeyboardRows;

  const handleKeyClick = (key: KeyItem) => {
    setPressedKeyId(key.id);
    setTimeout(() => setPressedKeyId(null), 120);

    if (key.code === 'Backspace') {
      onDelete();
    } else if (key.code === 'Space') {
      onSpace();
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className="flex flex-col bg-[#1e1e1e] p-2 sm:p-3 rounded-t-2xl shadow-2xl select-none w-full max-w-2xl mx-auto gap-1.5 border-t border-gray-800">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex justify-center gap-1.5 w-full ${rowIndex === 1 ? 'px-3 sm:px-4' : ''}`}
        >
          {row.map((key) => {
            const isPressed = pressedKeyId === key.id;
            const flexStyle = getKeyFlexClass(key);

            return (
              <button
                key={key.id}
                onClick={() => handleKeyClick(key)}
                className={`relative overflow-hidden h-11 sm:h-12 rounded-lg font-semibold text-white transition-all duration-75 ease-out flex items-center justify-center shadow-md active:scale-95 active:shadow-inner ${flexStyle} ${
                  key.isSpecial 
                    ? 'bg-[#3b3b3b] hover:bg-[#484848] active:bg-[#555] text-xs sm:text-sm text-gray-200 font-bold' 
                    : 'bg-[#2d2d2d] hover:bg-[#383838] active:bg-[#11698e] text-base sm:text-lg'
                } ${
                  isPressed ? 'bg-blue-600 scale-105 brightness-125 z-20 shadow-lg ring-2 ring-blue-400/60' : ''
                }`}
              >
                {/* Samsung One UI Ripple Effect Overlay */}
                <span className="absolute inset-0 bg-white/20 opacity-0 active:opacity-100 transition-opacity pointer-events-none rounded-lg" />
                <span className="relative z-10">{key.label}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
