import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Smartphone, LayoutGrid } from 'lucide-react';
import { APPROVED_FONTS } from './data/fonts';
import {
  KeyboardSettings,
  FontItem,
  InsertModalTab,
  ActiveKeyboardType
} from './types';
import { Keyboard } from './components/Keyboard';
import { NativeKeyboard } from './components/NativeKeyboard';
import { FeaturesDropdown } from './components/FeaturesDropdown';
import { FontsModal } from './components/FontsModal';
import { ColorPickerModal } from './components/ColorPickerModal';
import { ToolsMenu } from './components/ToolsMenu';
import { HelpModal } from './components/HelpModal';
import { InsertMediaModal } from './components/InsertMediaModal';
import { PhoneFrame } from './components/PhoneFrame';
import { ApkBuildModal } from './components/ApkBuildModal';
import { SearchReplaceModal } from './components/SearchReplaceModal';
import { SpellCheckModal } from './components/SpellCheckModal';
import { OpenFileModal } from './components/OpenFileModal';
import { ShortcutsModal } from './components/ShortcutsModal';
import { ChooseInputMethodModal } from './components/ChooseInputMethodModal';
import { ShortcutHudToast, ShortcutHudNotification } from './components/ShortcutHudToast';
import {
  getFormattedCurrentDate,
  getFormattedCurrentTime,
  generateAutoSumSnippet,
} from './utils/shortcutManager';
import { getWordSuggestions } from './utils/predictiveText';
import { exportElementAsJpg, exportElementAsPdf } from './utils/exportUtils';

const INITIAL_TEXT = `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
مرحباً بك في لوحة مفاتيح سامسونج نوت 10+ الملحقة.
يمكنك الآن الكتابة بالخطوط الـ 18 المعتمدة، إدراج الصور والجداول والرموز والإيموجي، وحفظ المستند بصيغة JPG و PDF.`;

export default function App() {
  const [text, setText] = useState<string>(INITIAL_TEXT);
  const [cursorPos, setCursorPos] = useState<number>(INITIAL_TEXT.length);
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  // Active keyboard state: 'attached' (Custom 3.5cm keyboard) or 'native' (Samsung Original Keyboard)
  const [activeKeyboard, setActiveKeyboard] = useState<ActiveKeyboardType>('attached');

  // Universal IME states
  const [isUniversalImeEnabled, setIsUniversalImeEnabled] = useState<boolean>(true);

  // Features Dropdown state
  const [isFeaturesDropdownOpen, setIsFeaturesDropdownOpen] = useState<boolean>(false);


  // Hidden document container ref for exporting even if user triggers export from Hub or Tools menu
  const hiddenCanvasRef = useRef<HTMLDivElement>(null);

  // Settings: Default font Amiri, editor paper is HIDDEN by default as requested
  const [settings, setSettings] = useState<KeyboardSettings>({
    soundEnabled: true,
    hapticEnabled: true,
    showTashkeelBar: true,
    showSuggestionsBar: true,
    showTopControlBar: false, // Default: Hide top control bar above number row as requested
    showEditorPaper: false, // Default is false: Hide editor paper as requested
    keyboardSize: 'samsungDefault',
    samsungDeviceModel: 'note10plus',
    keyboardDisplayMode: 'docked',
    autoSyncClipboard: true, // Automatically keeps Android clipboard updated
    fontSize: 22,
    fontColor: '#1e293b',
    fontFamily: "'Amiri', serif",
    fontFamilyName: 'أميري',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    textAlign: 'right',
    lineHeight: 1.7,
    activeLayout: 'standard101',
    isFloating: false,
    isMinimized: false,
  });

  // Auto-sync clipboard to control any Android app seamlessly
  useEffect(() => {
    if (settings.autoSyncClipboard && text && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {
        // Safe catch for permissions
      });
    }
  }, [text, settings.autoSyncClipboard]);

  // Modals state
  const [isFontsModalOpen, setIsFontsModalOpen] = useState<boolean>(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState<boolean>(false);
  const [isToolsModalOpen, setIsToolsModalOpen] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState<boolean>(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState<boolean>(false);
  const [insertModalTab, setInsertModalTab] = useState<InsertModalTab>('image');

  // Shortcuts & Office Tools Modals State
  const [isSearchReplaceModalOpen, setIsSearchReplaceModalOpen] = useState<boolean>(false);
  const [searchReplaceMode, setSearchReplaceMode] = useState<'search' | 'replace'>('search');
  const [isSpellCheckModalOpen, setIsSpellCheckModalOpen] = useState<boolean>(false);
  const [isOpenFileModalOpen, setIsOpenFileModalOpen] = useState<boolean>(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState<boolean>(false);
  const [isInputMethodModalOpen, setIsInputMethodModalOpen] = useState<boolean>(false);
  const [activeInputMethod, setActiveInputMethod] = useState<string>('ctrl_keyboard');
  const [showKeyboardButton, setShowKeyboardButton] = useState<boolean>(true);
  const [hudNotification, setHudNotification] = useState<ShortcutHudNotification | null>(null);

  // History state for Ctrl+Z (Undo) and Ctrl+Y (Redo)
  const [history, setHistory] = useState<string[]>([INITIAL_TEXT]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const isHistoryActionRef = useRef<boolean>(false);

  const triggerHud = useCallback((keys: string, message: string) => {
    setHudNotification({
      id: Date.now().toString(),
      keys,
      message,
      timestamp: Date.now(),
    });
  }, []);

  // Track text changes in history stack (debounced)
  useEffect(() => {
    if (isHistoryActionRef.current) {
      isHistoryActionRef.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setHistory((prev) => {
        if (prev[historyIndex] === text) return prev;
        const next = prev.slice(0, historyIndex + 1);
        return [...next, text];
      });
      setHistoryIndex((prev) => prev + 1);
    }, 400);

    return () => clearTimeout(timer);
  }, [text, historyIndex]);

  // Find active font object
  const activeFont: FontItem = APPROVED_FONTS.find(
    (f) => f.fontFamily === settings.fontFamily
  ) || APPROVED_FONTS[4]; // fallback to Amiri

  const updateSettings = (newSettings: Partial<KeyboardSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Predictive text suggestions based on text up to cursorPos
  const suggestions = useMemo(() => {
    return getWordSuggestions(text, cursorPos, 'ar', 6);
  }, [text, cursorPos]);

  // Insert or complete word when suggestion clicked
  const handleSelectSuggestion = useCallback((word: string) => {
    setText((prev) => {
      const textBeforeCursor = prev.slice(0, cursorPos);
      const textAfterCursor = prev.slice(cursorPos);

      const lastChar = textBeforeCursor.slice(-1);
      const isAfterSpace = /\s/.test(lastChar) || textBeforeCursor.length === 0;

      if (!isAfterSpace) {
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
        const newText = textBeforeCursor + word + ' ' + textAfterCursor;
        setCursorPos(cursorPos + word.length + 1);
        return newText;
      }
    });
  }, [cursorPos]);

  // Keyboard text insertion at cursor
  const handleKeyPress = useCallback((char: string) => {
    setText((prev) => {
      const before = prev.slice(0, cursorPos);
      const after = prev.slice(cursorPos);
      return before + char + after;
    });
    setCursorPos((prev) => prev + char.length);
  }, [cursorPos]);

  const handleBackspace = useCallback(() => {
    if (cursorPos === 0) return;
    setText((prev) => {
      const before = prev.slice(0, cursorPos - 1);
      const after = prev.slice(cursorPos);
      return before + after;
    });
    setCursorPos((prev) => Math.max(0, prev - 1));
  }, [cursorPos]);

  const handleEnter = useCallback(() => {
    handleKeyPress('\n');
  }, [handleKeyPress]);

  const handleSpace = useCallback(() => {
    handleKeyPress(' ');
  }, [handleKeyPress]);

  const handleTab = useCallback(() => {
    handleKeyPress('    ');
  }, [handleKeyPress]);

  const handleArrowMove = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    if (direction === 'left') {
      setCursorPos((prev) => Math.min(text.length, prev + 1));
    } else if (direction === 'right') {
      setCursorPos((prev) => Math.max(0, prev - 1));
    } else if (direction === 'up') {
      const lastNewline = text.lastIndexOf('\n', cursorPos - 1);
      if (lastNewline !== -1) {
        setCursorPos(lastNewline);
      } else {
        setCursorPos(0);
      }
    } else if (direction === 'down') {
      const nextNewline = text.indexOf('\n', cursorPos);
      if (nextNewline !== -1) {
        setCursorPos(nextNewline + 1);
      } else {
        setCursorPos(text.length);
      }
    }
  }, [cursorPos, text]);

  const handleSelectFont = (font: FontItem) => {
    updateSettings({
      fontFamily: font.fontFamily,
      fontFamilyName: font.nameArabic,
    });
  };

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback
    }
  };

  const toggleOrientation = () => {
    setOrientation((prev) => (prev === 'portrait' ? 'landscape' : 'portrait'));
  };

  // Open Insert Modal
  const handleOpenInsertModal = (tab: InsertModalTab = 'image') => {
    setInsertModalTab(tab);
    setIsInsertModalOpen(true);
  };


  const toggleActiveKeyboard = useCallback(() => {
    setActiveKeyboard((prev) => (prev === 'attached' ? 'native' : 'attached'));
  }, []);

  // Quick Export JPG
  const handleExportJpgGlobal = async () => {
    const el = document.getElementById('exportable-document-canvas') ||
      document.getElementById('target-app-doc-area') ||
      document.getElementById('phone-device-body');
    if (el) {
      await exportElementAsJpg(el, `مستند_كيبورد_${activeFont.nameArabic}.jpg`);
    }
  };

  // Quick Export PDF
  const handleExportPdfGlobal = async () => {
    const el = document.getElementById('exportable-document-canvas') ||
      document.getElementById('target-app-doc-area') ||
      document.getElementById('phone-device-body');
    if (el) {
      await exportElementAsPdf(el, `مستند_كيبورد_${activeFont.nameArabic}.pdf`);
    }
  };

  // Master Shortcut Execution Handler
  const handleExecuteShortcut = useCallback((shortcutId: string) => {
    switch (shortcutId) {
      case 'new_doc': {
        // Ctrl + N: فتح مستند جديد
        if (text.trim()) {
          try {
            const raw = localStorage.getItem('samsung_keyboard_saved_drafts');
            const drafts = raw ? JSON.parse(raw) : [];
            drafts.unshift({
              id: `draft-${Date.now()}`,
              title: text.slice(0, 30).trim() || 'مسودة سابقة',
              snippet: text.slice(0, 80).replace(/\n/g, ' '),
              date: new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }),
              text,
            });
            localStorage.setItem('samsung_keyboard_saved_drafts', JSON.stringify(drafts.slice(0, 20)));
          } catch {}
        }
        setText('');
        setCursorPos(0);
        triggerHud('Ctrl + N', '📄 مستند جديد — تم مسح المحرر وحفظ المسودة السابقة في الأرشيف');
        break;
      }

      case 'open_file': {
        // Ctrl + O: فتح ملف محفوظ
        setIsOpenFileModalOpen(true);
        triggerHud('Ctrl + O', '📂 فتح ملف محفوظ أو استرجاع مسودة سابقة');
        break;
      }

      case 'save_doc': {
        // Ctrl + S: حفظ الملف أو المستند
        try {
          const raw = localStorage.getItem('samsung_keyboard_saved_drafts');
          const drafts = raw ? JSON.parse(raw) : [];
          drafts.unshift({
            id: `draft-${Date.now()}`,
            title: text.slice(0, 30).trim() || 'مستند محفوظ',
            snippet: text.slice(0, 80).replace(/\n/g, ' '),
            date: new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }),
            text,
          });
          localStorage.setItem('samsung_keyboard_saved_drafts', JSON.stringify(drafts.slice(0, 20)));

          // Trigger file download
          const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `مستند_سامسونج_${new Date().toISOString().slice(0, 10)}.txt`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          triggerHud('Ctrl + S', '💾 تم حفظ المستند وتنزيل نسخة احتياطية بنجاح');
        } catch {
          triggerHud('Ctrl + S', '💾 تم حفظ المستند محلياً');
        }
        break;
      }

      case 'print_doc': {
        // Ctrl + P: طباعة المستند أو ورقة العمل
        triggerHud('Ctrl + P', '🖨️ بدء طباعة المستند أو ورقة العمل');
        setTimeout(() => window.print(), 250);
        break;
      }

      case 'copy_text': {
        // Ctrl + C: نسخ النص
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => {
            triggerHud('Ctrl + C', '📋 تم نسخ كامل محتوى المستند إلى الحافظة');
          }).catch(() => {
            triggerHud('Ctrl + C', '📋 تم النسخ');
          });
        }
        break;
      }

      case 'cut_text': {
        // Ctrl + X: قص المحدد
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => {
            setText('');
            setCursorPos(0);
            triggerHud('Ctrl + X', '✂️ تم قص المحتوى إلى الحافظة بنجاح');
          }).catch(() => {
            setText('');
            setCursorPos(0);
            triggerHud('Ctrl + X', '✂️ تم القص');
          });
        }
        break;
      }

      case 'paste_text': {
        // Ctrl + V: لصق المحتوى المنسوخ
        if (navigator.clipboard && navigator.clipboard.readText) {
          navigator.clipboard.readText().then((clip) => {
            if (clip) {
              handleKeyPress(clip);
              triggerHud('Ctrl + V', `📥 تم لصق (${clip.length}) حرف من الحافظة`);
            } else {
              triggerHud('Ctrl + V', '📥 الحافظة فارغة');
            }
          }).catch(() => {
            triggerHud('Ctrl + V', '📥 يمكنك اللصق بالنقر المطول داخل النص');
          });
        } else {
          triggerHud('Ctrl + V', '📥 يمكنك استخدام خيار اللصق السريع');
        }
        break;
      }

      case 'select_all': {
        // Ctrl + A: تحديد الكل
        const textarea = document.querySelector('textarea');
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(0, textarea.value.length);
        }
        triggerHud('Ctrl + A', '🔲 تم تحديد كامل النص في المستند');
        break;
      }

      case 'undo': {
        // Ctrl + Z: التراجع عن الإجراء الأخير
        if (historyIndex > 0) {
          isHistoryActionRef.current = true;
          const targetIndex = historyIndex - 1;
          setHistoryIndex(targetIndex);
          const prevContent = history[targetIndex] ?? '';
          setText(prevContent);
          setCursorPos(prevContent.length);
          triggerHud('Ctrl + Z', '↩️ التراجع عن الإجراء الأخير');
        } else {
          triggerHud('Ctrl + Z', '↩️ لا توجد إجراءات سابقة للتراجع عنها');
        }
        break;
      }

      case 'redo': {
        // Ctrl + Y: إعادة الإجراء
        if (historyIndex < history.length - 1) {
          isHistoryActionRef.current = true;
          const targetIndex = historyIndex + 1;
          setHistoryIndex(targetIndex);
          const nextContent = history[targetIndex] ?? '';
          setText(nextContent);
          setCursorPos(nextContent.length);
          triggerHud('Ctrl + Y', '↪️ إعادة الإجراء الذي تم التراجع عنه');
        } else {
          triggerHud('Ctrl + Y', '↪️ لا توجد إجراءات أخرى للإعادة');
        }
        break;
      }

      case 'search': {
        // Ctrl + F: البحث عن نص
        setSearchReplaceMode('search');
        setIsSearchReplaceModalOpen(true);
        triggerHud('Ctrl + F', '🔍 فتح نافذة البحث السريع في النص');
        break;
      }

      case 'replace': {
        // Ctrl + H: فتح نافذة البحث والاستبدال
        setSearchReplaceMode('replace');
        setIsSearchReplaceModalOpen(true);
        triggerHud('Ctrl + H', '🔄 فتح نافذة البحث والاستبدال');
        break;
      }

      case 'bold': {
        // Ctrl + B: جعل الخط غامقاً
        setSettings((prev) => {
          const nextBold = !prev.isBold;
          triggerHud('Ctrl + B', `𝗕 تم ${nextBold ? 'تفعيل' : 'إلغاء'} الخط الغامق (Bold)`);
          return { ...prev, isBold: nextBold };
        });
        break;
      }

      case 'italic': {
        // Ctrl + I: جعل الخط مائلاً
        setSettings((prev) => {
          const nextItalic = !prev.isItalic;
          triggerHud('Ctrl + I', `𝐼 تم ${nextItalic ? 'تفعيل' : 'إلغاء'} الخط المائل (Italic)`);
          return { ...prev, isItalic: nextItalic };
        });
        break;
      }

      case 'underline': {
        // Ctrl + U: وضع خط تحت النص
        setSettings((prev) => {
          const nextUnderline = !prev.isUnderline;
          triggerHud('Ctrl + U', `<u>U</u> تم ${nextUnderline ? 'تفعيل' : 'إلغاء'} التسطير (Underline)`);
          return { ...prev, isUnderline: nextUnderline };
        });
        break;
      }

      case 'spell_check': {
        // F7: التدقيق الإملائي والنحوي
        setIsSpellCheckModalOpen(true);
        triggerHud('F7', '📖 التدقيق الإملائي والنحوي للمستند');
        break;
      }

      case 'edit_cell': {
        // F2: تحرير الخلية / المحرر
        const textarea = document.querySelector('textarea');
        if (textarea) {
          textarea.focus();
        }
        triggerHud('F2', '✏️ تحرير الخلية النشطة أو التركيز على محرر النصوص');
        break;
      }

      case 'toggle_filters': {
        // Ctrl + Shift + L: تفعيل/إلغاء التصفية
        triggerHud('Ctrl + Shift + L', '⚡ تم تبديل عوامل التصفية (Filters)');
        break;
      }

      case 'insert_date': {
        // Ctrl + ; : إدراج تاريخ اليوم
        const dateStr = getFormattedCurrentDate();
        handleKeyPress(` ${dateStr} `);
        triggerHud('Ctrl + ;', `📅 تم إدراج التاريخ الحالي: ${dateStr}`);
        break;
      }

      case 'insert_time': {
        // Ctrl + Shift + : : إدراج الوقت الحالي
        const timeStr = getFormattedCurrentTime();
        handleKeyPress(` ${timeStr} `);
        triggerHud('Ctrl + Shift + :', `⏰ تم إدراج الوقت الحالي: ${timeStr}`);
        break;
      }

      case 'auto_sum': {
        // Alt + = : الجمع التلقائي
        const snippet = generateAutoSumSnippet(text, cursorPos);
        handleKeyPress(snippet);
        triggerHud('Alt + =', `∑ إدراج دالة الجمع التلقائي: ${snippet.trim()}`);
        break;
      }

      default:
        break;
    }
  }, [text, cursorPos, history, historyIndex, handleKeyPress, triggerHud]);

  // Physical/Hardware keyboard shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F7') {
        e.preventDefault();
        handleExecuteShortcut('spell_check');
        return;
      }
      if (e.key === 'F2') {
        e.preventDefault();
        handleExecuteShortcut('edit_cell');
        return;
      }
      if (e.altKey && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        handleExecuteShortcut('auto_sum');
        return;
      }
      if (e.ctrlKey || e.metaKey) {
        if (e.shiftKey && (e.key === 'L' || e.key === 'l')) {
          e.preventDefault();
          handleExecuteShortcut('toggle_filters');
          return;
        }
        if (e.shiftKey && (e.key === ':' || e.key === ';')) {
          e.preventDefault();
          handleExecuteShortcut('insert_time');
          return;
        }
        if (e.key === ';') {
          e.preventDefault();
          handleExecuteShortcut('insert_date');
          return;
        }
        const key = e.key.toLowerCase();
        const map: Record<string, string> = {
          n: 'new_doc',
          o: 'open_file',
          s: 'save_doc',
          p: 'print_doc',
          a: 'select_all',
          z: 'undo',
          y: 'redo',
          f: 'search',
          h: 'replace',
          b: 'bold',
          i: 'italic',
          u: 'underline',
        };
        if (map[key]) {
          e.preventDefault();
          handleExecuteShortcut(map[key]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleExecuteShortcut]);

  return (
    <PhoneFrame
      isPhoneFrame={isPhoneFrame}
      onToggleFrame={() => setIsPhoneFrame(!isPhoneFrame)}
      fontFamilyName={settings.fontFamilyName}
      orientation={orientation}
      onToggleOrientation={toggleOrientation}
      onOpenFeaturesDropdown={() => setIsInputMethodModalOpen(true)}
      activeKeyboard={activeKeyboard}
      onToggleKeyboard={toggleActiveKeyboard}
      onOpenApkModal={() => setIsApkModalOpen(true)}
    >
      {/* 
        The upper simulation area has been permanently removed.
        Only the Keyboard components are rendered within the frame.
      */}

      {/* 
        Upper Area: Transparent spacer to keep keyboard at the bottom
        as requested to "hide the top two-thirds" and show buttons only.
      */}
      <div className="flex-1 bg-transparent" />

      {/* 
        Lower Area: Automatic switching between Attached Keyboard (height 6.3cm) and Native Keyboard
      */}
      {activeKeyboard === 'attached' ? (
        <Keyboard
          settings={settings}
          onUpdateSettings={updateSettings}
          onKeyPress={handleKeyPress}
          onBackspace={handleBackspace}
          onEnter={handleEnter}
          onSpace={handleSpace}
          onTab={handleTab}
          onArrowMove={handleArrowMove}
          onOpenFonts={() => setIsFontsModalOpen(true)}
          onOpenColors={() => setIsColorModalOpen(true)}
          onOpenTools={() => setIsToolsModalOpen(true)}
          onTogglePhoneMode={() => setIsPhoneFrame(!isPhoneFrame)}
          isPhoneFrame={isPhoneFrame}
          orientation={orientation}
          onToggleOrientation={toggleOrientation}
          suggestions={suggestions}
          onSelectSuggestion={handleSelectSuggestion}
          onOpenInsertModal={handleOpenInsertModal}
          onOpenFeaturesDropdown={() => setIsFeaturesDropdownOpen(true)}
          onToggleNativeKeyboard={toggleActiveKeyboard}
          onShortcut={handleExecuteShortcut}
          onOpenShortcutsModal={() => setIsShortcutsModalOpen(true)}
          isUniversalImeEnabled={isUniversalImeEnabled}
          onToggleUniversalIme={() => setIsUniversalImeEnabled((prev) => !prev)}
        />
      ) : (
        <NativeKeyboard
          onSwitchToAttachedKeyboard={() => setActiveKeyboard('attached')}
          onKeyPress={handleKeyPress}
          onBackspace={handleBackspace}
          onEnter={handleEnter}
          onSpace={handleSpace}
          suggestions={suggestions}
          onSelectSuggestion={handleSelectSuggestion}
        />
      )}

      {/* Features Dropdown Menu (قائمة منسدلة للمزايا) */}
      <FeaturesDropdown
        isOpen={isFeaturesDropdownOpen}
        onClose={() => setIsFeaturesDropdownOpen(false)}
        onOpenFontsModal={() => {
          setIsFeaturesDropdownOpen(false);
          setIsFontsModalOpen(true);
        }}
        onOpenColorModal={() => {
          setIsFeaturesDropdownOpen(false);
          setIsColorModalOpen(true);
        }}
        onOpenInsertModal={(tab) => {
          setIsFeaturesDropdownOpen(false);
          handleOpenInsertModal(tab);
        }}
        onExportJpg={() => {
          setIsFeaturesDropdownOpen(false);
          handleExportJpgGlobal();
        }}
        onExportPdf={() => {
          setIsFeaturesDropdownOpen(false);
          handleExportPdfGlobal();
        }}
        onToggleKeyboard={() => {
          toggleActiveKeyboard();
          setIsFeaturesDropdownOpen(false);
        }}
        activeKeyboard={activeKeyboard}
        currentFontName={settings.fontFamilyName}
        onOpenApkModal={() => setIsApkModalOpen(true)}
      />

      {/* Insert Media Modal (صورة، جدول، شكل، رموز، إيموجي) */}
      <InsertMediaModal
        isOpen={isInsertModalOpen}
        onClose={() => setIsInsertModalOpen(false)}
        activeTab={insertModalTab}
        onInsertImage={() => {}}
        onInsertTable={() => {}}
        onInsertText={(snippet) => handleKeyPress(snippet)}
      />

      {/* 18 Approved Fonts Modal */}
      <FontsModal
        isOpen={isFontsModalOpen}
        onClose={() => setIsFontsModalOpen(false)}
        selectedFontId={activeFont.id}
        onSelectFont={handleSelectFont}
        currentFontSize={settings.fontSize}
        onFontSizeChange={(size) => updateSettings({ fontSize: size })}
      />

      {/* Color and Typography Modal */}
      <ColorPickerModal
        isOpen={isColorModalOpen}
        onClose={() => setIsColorModalOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
      />

      {/* Keyboard Tools and Quick Actions Menu */}
      <ToolsMenu
        isOpen={isToolsModalOpen}
        onClose={() => setIsToolsModalOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
        onInsertText={(t) => handleKeyPress(t)}
        onClearText={() => {
          setText('');
          setCursorPos(0);
        }}
        onCopyAll={handleCopyAll}
        onOpenFonts={() => setIsFontsModalOpen(true)}
        onOpenHelp={() => setIsHelpModalOpen(true)}
        onOpenInsertModal={handleOpenInsertModal}
        onExportJpg={handleExportJpgGlobal}
        onExportPdf={handleExportPdfGlobal}
      />

      {/* Full Capabilities & Help Modal */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      {/* APK Build and Download / PWA Install Modal */}
      <ApkBuildModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
      />

      {/* Search and Replace Modal (Ctrl + F & Ctrl + H) */}
      <SearchReplaceModal
        isOpen={isSearchReplaceModalOpen}
        onClose={() => setIsSearchReplaceModalOpen(false)}
        text={text}
        onUpdateText={(newText: string) => {
          setText(newText);
        }}
        mode={searchReplaceMode}
      />

      {/* Arabic Spell and Grammar Check Modal (F7) */}
      <SpellCheckModal
        isOpen={isSpellCheckModalOpen}
        onClose={() => setIsSpellCheckModalOpen(false)}
        text={text}
        onUpdateText={(correctedText: string) => {
          setText(correctedText);
          setCursorPos(correctedText.length);
        }}
      />

      {/* Open File & Saved Drafts Modal (Ctrl + O) */}
      <OpenFileModal
        isOpen={isOpenFileModalOpen}
        onClose={() => setIsOpenFileModalOpen(false)}
        onLoadText={(loadedText: string) => {
          setText(loadedText);
          setCursorPos(loadedText.length);
          triggerHud('Ctrl + O', '📂 تم استرجاع المستند من الأرشيف بنجاح');
        }}
      />

      {/* Shortcuts Guide & Test Modal */}
      <ShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
        onTriggerShortcut={(shortcutId: string) => {
          setIsShortcutsModalOpen(false);
          handleExecuteShortcut(shortcutId);
        }}
      />


      {/* Samsung One UI System Input Method Picker Dialog (Choose input method) */}
      <ChooseInputMethodModal
        isOpen={isInputMethodModalOpen}
        onClose={() => setIsInputMethodModalOpen(false)}
        activeMethod={activeInputMethod}
        onSelectMethod={(methodId) => {
          setActiveInputMethod(methodId);
          if (methodId === 'ctrl_keyboard') {
            setActiveKeyboard('attached');
          } else {
            setActiveKeyboard('native');
          }
          triggerHud('Input Method', `تم اختيار طريقة الإدخال: ${methodId}`);
          setIsInputMethodModalOpen(false);
        }}
        showKeyboardButton={showKeyboardButton}
        onToggleShowKeyboardButton={() => setShowKeyboardButton((prev) => !prev)}
        onOpenSettings={() => setIsToolsModalOpen(true)}
      />

      {/* Dynamic Shortcut HUD Toast */}
      <ShortcutHudToast
        notification={hudNotification}
        onDismiss={() => setHudNotification(null)}
      />
    </PhoneFrame>
  );
}
