import React, { useState, useMemo, useCallback } from 'react';
import { KeyboardLayout, KeyItem } from './KeyboardLayout';
import { SuggestionBar } from './SuggestionBar';
import { getWordSuggestions } from '../utils/predictiveText';

export const KeyboardInputContainer: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [cursorPos, setCursorPos] = useState<number>(0);

  // Get predictive suggestions based on current text and cursor position
  const suggestions = useMemo(() => {
    return getWordSuggestions(text, cursorPos, 'ar', 8);
  }, [text, cursorPos]);

  const handleKeyPress = (key: KeyItem) => {
    setText((prev) => {
      const before = prev.slice(0, cursorPos);
      const after = prev.slice(cursorPos);
      const newText = before + key.label + after;
      setCursorPos(cursorPos + key.label.length);
      return newText;
    });
  };

  const handleDelete = () => {
    if (cursorPos === 0) return;
    setText((prev) => {
      const before = prev.slice(0, cursorPos - 1);
      const after = prev.slice(cursorPos);
      setCursorPos(Math.max(0, cursorPos - 1));
      return before + after;
    });
  };

  const handleSpace = () => {
    setText((prev) => {
      const before = prev.slice(0, cursorPos);
      const after = prev.slice(cursorPos);
      const newText = before + ' ' + after;
      setCursorPos(cursorPos + 1);
      return newText;
    });
  };

  const handleSelectSuggestion = useCallback((word: string) => {
    setText((prev) => {
      const textBeforeCursor = prev.slice(0, cursorPos);
      const textAfterCursor = prev.slice(cursorPos);

      const lastChar = textBeforeCursor.slice(-1);
      const isAfterSpace = /\s/.test(lastChar) || textBeforeCursor.length === 0;

      if (!isAfterSpace) {
        // Replace the current partial word
        const lastSpaceIndex = Math.max(
          textBeforeCursor.lastIndexOf(' '),
          textBeforeCursor.lastIndexOf('\n'),
          textBeforeCursor.lastIndexOf('\t')
        );
        const prefix = lastSpaceIndex === -1 ? '' : textBeforeCursor.slice(0, lastSpaceIndex + 1);
        const newText = prefix + word + ' ' + textAfterCursor;
        setCursorPos(prefix.length + word.length + 1);
        return newText;
      } else {
        // Just append the word
        const newText = textBeforeCursor + word + ' ' + textAfterCursor;
        setCursorPos(cursorPos + word.length + 1);
        return newText;
      }
    });
  }, [cursorPos]);

  return (
    <div className="flex flex-col h-full justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      {/* منطقة عرض النصوص المشابهة لملف input.xml */}
      <div 
        className="w-full min-h-[150px] p-4 bg-white border border-slate-300 rounded-md shadow-inner text-right text-lg outline-none focus:ring-2 focus:ring-blue-500 overflow-y-auto"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => {
          // Sync real input if user types with hardware keyboard
          const newText = e.currentTarget.innerText;
          setText(newText);
        }}
        onClick={(e) => {
          // Track cursor position on click
          const selection = window.getSelection();
          if (selection) {
            setCursorPos(selection.anchorOffset);
          }
        }}
      >
        {text}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {/* شريط الاقتراحات الذكي */}
        <SuggestionBar 
          suggestions={suggestions} 
          onSelectSuggestion={handleSelectSuggestion} 
          lang="ar"
        />

        {/* لوحة المفاتيح */}
        <KeyboardLayout 
          onKeyPress={handleKeyPress}
          onDelete={handleDelete}
          onSpace={handleSpace}
        />
      </div>
    </div>
  );
};
