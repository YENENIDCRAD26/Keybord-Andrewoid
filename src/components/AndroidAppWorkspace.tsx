import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Edit3,
  FileText,
  Table,
  Send,
  Smartphone,
  CheckCircle2,
  Settings,
  Search,
  CornerDownLeft,
  ChevronDown,
  ChevronUp,
  Smile,
  Paperclip,
  Camera,
  Mic,
  Phone,
  Video,
  MoreVertical,
  Check,
  CheckCheck,
  ArrowRight,
  Globe,
  Share2,
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Sparkles,
  Download,
  Sliders,
  Type,
  ChevronRight,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { TargetAppType, FontItem, KeyboardSettings, ActiveKeyboardType } from '../types';

interface AndroidAppWorkspaceProps {
  activeApp: TargetAppType;
  onChangeApp: (app: TargetAppType) => void;
  text: string;
  onChangeText: (newText: string) => void;
  cursorPos: number;
  onCursorChange: (pos: number) => void;
  isKeyboardVisible: boolean;
  onToggleKeyboardVisible: () => void;
  onOpenInputMethodModal: () => void;
  onOpenApkModal?: () => void;
  onOpenFontsModal?: () => void;
  onOpenColorModal?: () => void;
  activeFont: FontItem;
  settings: KeyboardSettings;
  isUniversalImeEnabled: boolean;
  onToggleUniversalIme: () => void;
  activeKeyboard?: ActiveKeyboardType;
  onSelectKeyboard?: (type: ActiveKeyboardType) => void;
}

interface ChatMessage {
  id: string;
  sender: 'contact' | 'user';
  text: string;
  time: string;
}

export const AndroidAppWorkspace: React.FC<AndroidAppWorkspaceProps> = ({
  activeApp,
  onChangeApp,
  text,
  onChangeText,
  cursorPos,
  onCursorChange,
  isKeyboardVisible,
  onToggleKeyboardVisible,
  onOpenInputMethodModal,
  onOpenApkModal,
  onOpenFontsModal,
  onOpenColorModal,
  activeFont,
  settings,
  isUniversalImeEnabled,
  onToggleUniversalIme,
  activeKeyboard = 'attached',
  onSelectKeyboard,
}) => {
  // Samsung One UI Keyboard Settings States (Replicating exact user phone screen)
  const [isNote10Enabled, setIsNote10Enabled] = useState<boolean>(true);
  const [defaultKeyboardName, setDefaultKeyboardName] = useState<string>('لوحة مفاتيح سامسونج نوت 10+');
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
  const [showSetDefaultPrompt, setShowSetDefaultPrompt] = useState<boolean>(false);
  const [oneUiSwitches, setOneUiSwitches] = useState({
    samsungVoice: true,
    googleVoice1: true,
    googleVoice2: true,
    googleAutofill: false,
    sarabKeyboard: true,
    ctrlKeyboard: true,
    navbarKeyButton: true,
  });
  // WhatsApp sent messages history
  const [whatsappMessages, setWhatsappMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'contact',
      text: 'السلام عليكم أخي، هل لوحة مفاتيح سامسونج نوت 10+ متصلة بحقول النصوص الآن؟',
      time: '12:40 م',
    },
    {
      id: '2',
      sender: 'user',
      text: 'وعليكم السلام، نعم اللوحة تعمل بنظام Universal IME ومربوطة بجميع التطبيقات!',
      time: '12:41 م',
    },
  ]);

  // SMS sent messages history
  const [smsMessages, setSmsMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'contact',
      text: 'تم تفعيل خدمة لوحة المفاتيح في نظام أندرويد بنجاح. أرسل رسالة للتجربة.',
      time: '12:30 م',
    },
  ]);

  // Telegram messages
  const [telegramMessages, setTelegramMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'contact',
      text: 'مرحباً بك في تيليجرام عبر لوحة مفاتيح سامسونج Note 10+!',
      time: '12:35 م',
    },
  ]);

  // Excel active cell state
  const [activeCell, setActiveCell] = useState<{ row: number; col: number }>({ row: 2, col: 1 });
  const [excelData, setExcelData] = useState<string[][]>([
    ['المحتوى', 'الكمية', 'السعر', 'الإجمالي'],
    ['ملاحظات سامسونج', '1', '1200', '1200'],
    ['لوحة مفاتيح نوت 10+', '2', '350', '=SUM(B3*C3)'],
    ['حزمة أندرويد APK', '1', '500', '500'],
    ['الإجمالي الكلي', '4', '', '=SUM(D2:D4)'],
  ]);

  const inputAreaRef = useRef<HTMLDivElement>(null);

  // Send WhatsApp message handler
  const handleSendWhatsApp = () => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    setWhatsappMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        text: text,
        time: timeStr,
      },
    ]);
    onChangeText('');
    onCursorChange(0);
  };

  // Send SMS handler
  const handleSendSms = () => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    setSmsMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        text: text,
        time: timeStr,
      },
    ]);
    onChangeText('');
    onCursorChange(0);
  };

  // Send Telegram message
  const handleSendTelegram = () => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    setTelegramMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        text: text,
        time: timeStr,
      },
    ]);
    onChangeText('');
    onCursorChange(0);
  };

  // Excel update cell on text change
  useEffect(() => {
    if (activeApp === 'excelSheet' && text) {
      setExcelData((prev) => {
        const next = [...prev.map((r) => [...r])];
        if (next[activeCell.row] && next[activeCell.row][activeCell.col] !== undefined) {
          next[activeCell.row][activeCell.col] = text;
        }
        return next;
      });
    }
  }, [text, activeApp, activeCell]);

  const appsTabList: Array<{
    id: TargetAppType;
    label: string;
    icon: React.ReactNode;
    color: string;
  }> = [
    { id: 'whatsapp', label: 'واتساب', icon: <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />, color: 'emerald' },
    { id: 'samsungNotes', label: 'ملاحظات سامسونج', icon: <Edit3 className="w-3.5 h-3.5 text-amber-500" />, color: 'amber' },
    { id: 'wordDoc', label: 'Word', icon: <FileText className="w-3.5 h-3.5 text-blue-500" />, color: 'blue' },
    { id: 'excelSheet', label: 'Excel', icon: <Table className="w-3.5 h-3.5 text-teal-500" />, color: 'teal' },
    { id: 'messages', label: 'رسائل SMS', icon: <Smartphone className="w-3.5 h-3.5 text-indigo-500" />, color: 'indigo' },
    { id: 'telegram', label: 'تيليجرام', icon: <Send className="w-3.5 h-3.5 text-sky-500" />, color: 'sky' },
    { id: 'browser', label: 'بحث جوجل', icon: <Search className="w-3.5 h-3.5 text-rose-500" />, color: 'rose' },
    { id: 'systemSettings', label: 'إعدادات النظام', icon: <Settings className="w-3.5 h-3.5 text-purple-500" />, color: 'purple' },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 w-full overflow-hidden bg-slate-900 select-none" dir="rtl">
      {/* 1. TOP APP SWITCHER BAR (شريط التبديل السريع بين تطبيقات أندرويد) */}
      <div className="bg-slate-950/95 border-b border-slate-800 px-2 py-1.5 flex items-center justify-between gap-1.5 shrink-0 z-10 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 shrink-0 pl-1 border-l border-slate-800 text-[10px] text-slate-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="hidden xs:inline">التطبيق:</span>
        </div>

        {/* Scrollable app pills */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
          {appsTabList.map((tab) => {
            const isActive = activeApp === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onChangeApp(tab.id);
                  if (!isKeyboardVisible) onToggleKeyboardVisible();
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all active:scale-95 border cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-1 ring-blue-400/50'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Keyboard Toggle Button */}
        <button
          onClick={onToggleKeyboardVisible}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold shrink-0 border transition-all ${
            isKeyboardVisible
              ? 'bg-slate-800 text-amber-300 border-amber-500/40 hover:bg-slate-700'
              : 'bg-blue-600 text-white border-blue-500 hover:bg-blue-500 animate-pulse'
          }`}
          title={isKeyboardVisible ? 'إخفاء لوحة المفاتيح' : 'إظهار لوحة المفاتيح'}
        >
          <span>{isKeyboardVisible ? 'إخفاء ⌨️' : 'إظهار الكيبورد ⌨️'}</span>
        </button>
      </div>

      {/* 2. UNIVERSAL IME CONNECTION STATUS BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-3 py-1 border-b border-slate-800 text-[10px] flex items-center justify-between text-slate-300 shrink-0">
        <div className="flex items-center gap-1.5 truncate">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-semibold text-slate-200">خدمة الكيبورد (IME):</span>
          <span className="text-emerald-400 font-bold truncate">متصلة بحقل النص النشط تلقائياً</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenInputMethodModal}
            className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 hover:bg-blue-500/30"
          >
            تبديل اللوحة ⚙️
          </button>
        </div>
      </div>

      {/* 3. ACTIVE APPLICATION CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
        {/* ===================== A. WHATSAPP VIEW ===================== */}
        {activeApp === 'whatsapp' && (
          <div className="flex-1 flex flex-col min-h-0 bg-[#0b141a] text-slate-100">
            {/* WhatsApp Contact Header */}
            <div className="px-3 py-2 bg-[#202c33] flex items-center justify-between border-b border-[#222d34] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-xs text-white">
                    م
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#202c33]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-100">مروان الشمري (مهندس أندرويد)</h4>
                  <p className="text-[10px] text-emerald-400 font-medium leading-none">متصل الآن</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Video className="w-4 h-4 cursor-pointer hover:text-white" />
                <Phone className="w-4 h-4 cursor-pointer hover:text-white" />
                <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white" />
              </div>
            </div>

            {/* Chat Messages Body */}
            <div
              className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]"
              onClick={() => {
                if (!isKeyboardVisible) onToggleKeyboardVisible();
              }}
            >
              <div className="flex justify-center">
                <span className="text-[9px] bg-[#182229] text-slate-400 px-2.5 py-0.5 rounded-full border border-slate-700/50">
                  اليوم
                </span>
              </div>

              {whatsappMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-1.5 text-xs shadow-sm relative ${
                      msg.sender === 'user'
                        ? 'bg-[#005c4b] text-white rounded-br-xs'
                        : 'bg-[#202c33] text-slate-200 rounded-bl-xs'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-300/80">
                      <span>{msg.time}</span>
                      {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-sky-400" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp Live Input Field Bar (Directly Linked to Custom Keyboard) */}
            <div className="p-2 bg-[#202c33] border-t border-[#222d34] flex items-center gap-2 shrink-0">
              <div
                className="flex-1 min-h-[38px] max-h-[70px] bg-[#2a3942] rounded-2xl px-3 py-2 flex items-center gap-2 border border-slate-700/60 cursor-text overflow-hidden"
                onClick={() => {
                  if (!isKeyboardVisible) onToggleKeyboardVisible();
                }}
              >
                <Smile className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="flex-1 overflow-x-auto scrollbar-none whitespace-pre-wrap text-xs text-white font-sans">
                  {text ? (
                    <span>
                      {text}
                      <span className="inline-block w-0.5 h-3.5 bg-emerald-400 animate-pulse align-middle ml-0.5" />
                    </span>
                  ) : (
                    <span className="text-slate-400 text-xs">اكتب رسالة عبر كيبورد سامسونج...</span>
                  )}
                </div>
                <Paperclip className="w-4 h-4 text-slate-400 shrink-0" />
                <Camera className="w-4 h-4 text-slate-400 shrink-0" />
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendWhatsApp}
                className="w-9 h-9 rounded-full bg-[#00a884] hover:bg-[#008f72] text-white flex items-center justify-center shadow-md active:scale-95 transition-all shrink-0"
                title="إرسال"
              >
                {text.trim() ? (
                  <Send className="w-4 h-4 rotate-180" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* ===================== B. SAMSUNG NOTES VIEW ===================== */}
        {activeApp === 'samsungNotes' && (
          <div className="flex-1 flex flex-col min-h-0 bg-[#121212] text-slate-100">
            {/* Samsung Notes Header */}
            <div className="px-3.5 py-2.5 bg-[#1e1e1e] border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-600/30 border border-amber-500/50 flex items-center justify-center">
                  <Edit3 className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-white">ملاحظات سامسونج الذكية (Samsung Notes)</h3>
                  <p className="text-[10px] text-slate-400">Galaxy Note 10+ • الخط: {activeFont.nameArabic}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenFontsModal}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px] font-bold border border-slate-700"
                >
                  الخطوط الـ 18
                </button>
                <button
                  onClick={onOpenColorModal}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 text-[10px] font-bold border border-slate-700"
                >
                  اللون والتنسيق
                </button>
              </div>
            </div>

            {/* Note Canvas Area */}
            <div
              className="flex-1 p-4 overflow-y-auto space-y-2 cursor-text"
              onClick={() => {
                if (!isKeyboardVisible) onToggleKeyboardVisible();
              }}
            >
              <h2 className="text-base font-bold text-amber-400 border-b border-slate-800 pb-1.5 mb-2">
                مذكرة عمل جديدة — Note 10+
              </h2>

              <div
                className="text-slate-100 leading-relaxed min-h-[120px] outline-none"
                style={{
                  fontFamily: activeFont.fontFamily,
                  fontSize: `${settings.fontSize || 20}px`,
                  color: settings.fontColor || '#f8fafc',
                  fontWeight: settings.isBold ? 'bold' : 'normal',
                  fontStyle: settings.isItalic ? 'italic' : 'normal',
                  textDecoration: settings.isUnderline ? 'underline' : 'none',
                  textAlign: settings.textAlign || 'right',
                }}
              >
                {text || 'انقر هنا واكتب باستخدام أزرار لوحة المفاتيح والخطوط الـ 18 المعتمدة...'}
                <span className="inline-block w-0.5 h-4 bg-amber-400 animate-pulse align-middle ml-1" />
              </div>
            </div>

            {/* Note Stats Footer */}
            <div className="px-3 py-1.5 bg-[#181818] border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 shrink-0">
              <span>{text.length} حرف • {text.trim() ? text.trim().split(/\s+/).length : 0} كلمة</span>
              <span className="text-amber-400 font-semibold">{activeFont.nameArabic} ({settings.fontSize}px)</span>
            </div>
          </div>
        )}

        {/* ===================== C. WORD DOCUMENT VIEW ===================== */}
        {activeApp === 'wordDoc' && (
          <div className="flex-1 flex flex-col min-h-0 bg-[#1e293b] text-slate-100">
            {/* Word Ribbon Header */}
            <div className="px-3 py-2 bg-[#185abd] text-white flex items-center justify-between shrink-0 shadow-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-white" />
                <span className="font-bold text-xs">Word • مستند_رسمي.docx</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Undo2 className="w-3.5 h-3.5 cursor-pointer" />
                <Redo2 className="w-3.5 h-3.5 cursor-pointer" />
                <Share2 className="w-3.5 h-3.5 cursor-pointer" />
              </div>
            </div>

            {/* Quick Word Tools Bar */}
            <div className="px-2 py-1 bg-slate-800 border-b border-slate-700 flex items-center justify-between text-[11px] shrink-0">
              <div className="flex items-center gap-1.5">
                <span className={`px-1.5 py-0.5 rounded font-bold ${settings.isBold ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
                  B
                </span>
                <span className={`px-1.5 py-0.5 rounded italic font-serif ${settings.isItalic ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
                  I
                </span>
                <span className={`px-1.5 py-0.5 rounded underline ${settings.isUnderline ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
                  U
                </span>
                <span className="text-[10px] text-slate-400 border-r border-slate-700 pr-1.5 mr-1.5">
                  الخط: {activeFont.nameArabic}
                </span>
              </div>
              <span className="text-[9px] text-slate-400">Ctrl + S للحفظ</span>
            </div>

            {/* Word Paper Sheet Canvas */}
            <div
              className="flex-1 p-3 overflow-y-auto flex justify-center bg-slate-900/60 cursor-text"
              onClick={() => {
                if (!isKeyboardVisible) onToggleKeyboardVisible();
              }}
            >
              <div className="w-full max-w-md bg-white text-slate-900 rounded-lg shadow-xl p-4 min-h-[160px] border border-slate-300">
                <div
                  className="leading-relaxed outline-none min-h-[120px]"
                  style={{
                    fontFamily: activeFont.fontFamily,
                    fontSize: `${settings.fontSize || 18}px`,
                    color: settings.fontColor || '#1e293b',
                    fontWeight: settings.isBold ? 'bold' : 'normal',
                    fontStyle: settings.isItalic ? 'italic' : 'normal',
                    textDecoration: settings.isUnderline ? 'underline' : 'none',
                    textAlign: settings.textAlign || 'right',
                  }}
                >
                  {text || 'ابدأ كتابة المستند عبر لوحة المفاتيح بالخطوط الـ 18 المعتمدة...'}
                  <span className="inline-block w-0.5 h-4 bg-blue-600 animate-pulse align-middle ml-1" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== D. EXCEL SPREADSHEET VIEW ===================== */}
        {activeApp === 'excelSheet' && (
          <div className="flex-1 flex flex-col min-h-0 bg-[#0f172a] text-slate-100">
            {/* Excel Header */}
            <div className="px-3 py-1.5 bg-[#107c41] text-white flex items-center justify-between shrink-0 shadow-sm">
              <div className="flex items-center gap-1.5">
                <Table className="w-4 h-4 text-white" />
                <span className="font-bold text-xs">Excel • جداول_بيانات_سامسونج.xlsx</span>
              </div>
              <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                Alt + = للجمع
              </span>
            </div>

            {/* Formula Bar */}
            <div className="px-2 py-1 bg-slate-800 border-b border-slate-700 flex items-center gap-2 text-xs shrink-0">
              <span className="font-mono font-bold text-emerald-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">
                {String.fromCharCode(65 + activeCell.col)}{activeCell.row + 1}
              </span>
              <span className="text-slate-400 font-serif italic text-xs font-bold">fx</span>
              <div className="flex-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-700 font-mono text-xs text-white truncate">
                {excelData[activeCell.row]?.[activeCell.col] || text || ''}
              </div>
            </div>

            {/* Excel Grid Table */}
            <div className="flex-1 overflow-auto p-2 bg-slate-900">
              <table className="w-full text-xs border-collapse border border-slate-700 text-slate-200">
                <thead>
                  <tr className="bg-slate-800 text-slate-300">
                    <th className="p-1 border border-slate-700 w-8 text-center bg-slate-800/80">#</th>
                    <th className="p-1 border border-slate-700 text-center">A</th>
                    <th className="p-1 border border-slate-700 text-center">B</th>
                    <th className="p-1 border border-slate-700 text-center">C</th>
                    <th className="p-1 border border-slate-700 text-center">D</th>
                  </tr>
                </thead>
                <tbody>
                  {excelData.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-800/50">
                      <td className="p-1 border border-slate-700 text-center font-mono bg-slate-800/70 text-slate-400">
                        {rIdx + 1}
                      </td>
                      {row.map((val, cIdx) => {
                        const isSelected = activeCell.row === rIdx && activeCell.col === cIdx;
                        return (
                          <td
                            key={cIdx}
                            onClick={() => {
                              setActiveCell({ row: rIdx, col: cIdx });
                              if (!isKeyboardVisible) onToggleKeyboardVisible();
                            }}
                            className={`p-1.5 border border-slate-700 text-center cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-emerald-950/80 border-2 border-emerald-400 text-white font-bold ring-1 ring-emerald-400'
                                : 'hover:bg-slate-800'
                            }`}
                          >
                            <span className="truncate block max-w-[90px]">{val}</span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================== E. SMS MESSAGES VIEW ===================== */}
        {activeApp === 'messages' && (
          <div className="flex-1 flex flex-col min-h-0 bg-[#181a20] text-slate-100">
            {/* Messages Header */}
            <div className="px-3 py-2 bg-[#21242d] border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
                  SMS
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">رسائل الهاتف (Samsung Messages)</h4>
                  <p className="text-[10px] text-slate-400">شريحة SIM 1 • جاهز للإرسال</p>
                </div>
              </div>
            </div>

            {/* Messages List */}
            <div
              className="flex-1 p-3 overflow-y-auto space-y-2 cursor-text"
              onClick={() => {
                if (!isKeyboardVisible) onToggleKeyboardVisible();
              }}
            >
              {smsMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-1.5 text-xs shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <span className="text-[9px] text-slate-300 block text-left mt-1">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* SMS Input Box */}
            <div className="p-2 bg-[#21242d] border-t border-slate-800 flex items-center gap-2 shrink-0">
              <div
                className="flex-1 bg-slate-800 rounded-xl px-3 py-2 text-xs text-white border border-slate-700 cursor-text overflow-hidden"
                onClick={() => {
                  if (!isKeyboardVisible) onToggleKeyboardVisible();
                }}
              >
                {text ? (
                  <span>
                    {text}
                    <span className="inline-block w-0.5 h-3.5 bg-indigo-400 animate-pulse align-middle ml-0.5" />
                  </span>
                ) : (
                  <span className="text-slate-400 text-xs">نص رسالة SMS...</span>
                )}
              </div>
              <span className="text-[9px] text-slate-400 font-mono">{text.length}/160</span>
              <button
                onClick={handleSendSms}
                className="w-8 h-8 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shrink-0 active:scale-95"
                title="إرسال SMS"
              >
                <Send className="w-3.5 h-3.5 rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* ===================== F. TELEGRAM VIEW ===================== */}
        {activeApp === 'telegram' && (
          <div className="flex-1 flex flex-col min-h-0 bg-[#0e1621] text-slate-100">
            {/* Telegram Header */}
            <div className="px-3 py-2 bg-[#17212b] border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center font-bold text-xs text-white">
                  TG
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">قناة أخبار وتطوير أندرويد</h4>
                  <p className="text-[10px] text-sky-400">12,450 مشتركاً • متصل</p>
                </div>
              </div>
            </div>

            {/* Telegram Messages */}
            <div
              className="flex-1 p-3 overflow-y-auto space-y-2 cursor-text"
              onClick={() => {
                if (!isKeyboardVisible) onToggleKeyboardVisible();
              }}
            >
              {telegramMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-1.5 text-xs shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#2b5278] text-white'
                        : 'bg-[#182533] text-slate-200'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <span className="text-[9px] text-slate-300 block text-left mt-1">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Telegram Input Bar */}
            <div className="p-2 bg-[#17212b] border-t border-slate-800 flex items-center gap-2 shrink-0">
              <div
                className="flex-1 bg-[#242f3d] rounded-xl px-3 py-2 text-xs text-white border border-slate-700 cursor-text overflow-hidden"
                onClick={() => {
                  if (!isKeyboardVisible) onToggleKeyboardVisible();
                }}
              >
                {text ? (
                  <span>
                    {text}
                    <span className="inline-block w-0.5 h-3.5 bg-sky-400 animate-pulse align-middle ml-0.5" />
                  </span>
                ) : (
                  <span className="text-slate-400 text-xs">اكتب رسالة في تيليجرام...</span>
                )}
              </div>
              <button
                onClick={handleSendTelegram}
                className="w-8 h-8 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center shrink-0 active:scale-95"
                title="إرسال"
              >
                <Send className="w-3.5 h-3.5 rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* ===================== G. GOOGLE SEARCH / BROWSER VIEW ===================== */}
        {activeApp === 'browser' && (
          <div className="flex-1 flex flex-col min-h-0 bg-slate-900 text-slate-100 p-3 overflow-y-auto">
            {/* Google Search Card */}
            <div className="w-full max-w-md mx-auto space-y-3 pt-2">
              <div className="text-center font-bold text-lg text-white flex items-center justify-center gap-1.5">
                <span className="text-blue-500 font-extrabold text-xl">G</span>
                <span className="text-red-500 font-extrabold text-xl">o</span>
                <span className="text-yellow-500 font-extrabold text-xl">o</span>
                <span className="text-blue-500 font-extrabold text-xl">g</span>
                <span className="text-green-500 font-extrabold text-xl">l</span>
                <span className="text-red-500 font-extrabold text-xl">e</span>
              </div>

              {/* Search Bar Input linked to Keyboard */}
              <div
                className="w-full bg-slate-800 border-2 border-blue-500/80 rounded-full px-4 py-2.5 flex items-center gap-2 shadow-lg cursor-text"
                onClick={() => {
                  if (!isKeyboardVisible) onToggleKeyboardVisible();
                }}
              >
                <Search className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="flex-1 text-xs text-white truncate">
                  {text ? (
                    <span>
                      {text}
                      <span className="inline-block w-0.5 h-3.5 bg-blue-400 animate-pulse align-middle ml-0.5" />
                    </span>
                  ) : (
                    <span className="text-slate-400">ابحث في جوجل أو اكتب عنوان URL...</span>
                  )}
                </div>
                <Mic className="w-4 h-4 text-slate-400 shrink-0" />
              </div>

              {/* Quick Search Chips */}
              <div className="flex flex-wrap gap-1.5 justify-center pt-2">
                {['تحميل APK', 'سامسونج نوت 10+', 'أفضل لوحة مفاتيح عربية', 'اختصارات Excel'].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onChangeText(chip);
                      onCursorChange(chip.length);
                    }}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full text-[11px] border border-slate-700"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Simulated Search Result */}
              {text && (
                <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700 text-xs space-y-1 animate-in fade-in">
                  <span className="text-[10px] text-blue-400 block">نتائج البحث الفوري عن: &quot;{text}&quot;</span>
                  <h4 className="font-bold text-white text-xs hover:underline cursor-pointer">
                    لوحة مفاتيح سامسونج نوت 10 بلس الرسمية لنظام أندرويد
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    تطبيق إدخال هجين يدعم الـ 18 خطاً عربياً أصيلاً، شريط التشكيل، واختصارات Word و Excel المتقدمة مع الربط بنظام أندرويد.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== H. SYSTEM SETTINGS (إعدادات لوحة المفاتيح بالنظام - نسخة طبق الأصل من شاشة سامسونج One UI) ===================== */}
        {activeApp === 'systemSettings' && (
          <div className="flex-1 flex flex-col min-h-0 bg-[#f7f8fa] text-slate-900 p-3 overflow-y-auto space-y-3 font-sans select-none" dir="rtl">
            {/* Top One UI Header */}
            <div className="flex items-center justify-between pb-1 pt-0.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onChangeApp('whatsapp')}
                  className="p-1 rounded-full text-slate-800 hover:bg-slate-200/80 transition-colors cursor-pointer"
                  title="رجوع للتطبيقات"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
                <h2 className="font-bold text-base text-slate-900 tracking-tight">
                  قائمة لوحة المفاتيح والافتراضي
                </h2>
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-full">
                Samsung One UI
              </span>
            </div>

            {/* 1. TOP CARD: لوحة المفاتيح الافتراضية (Default Keyboard) */}
            <div
              onClick={onOpenInputMethodModal}
              className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/70 cursor-pointer hover:bg-slate-50/80 transition-all active:scale-[0.99]"
            >
              <div className="text-[12px] text-slate-600 font-semibold mb-0.5">
                لوحة المفاتيح الافتراضية
              </div>
              <div className="text-sm font-bold text-blue-600 flex items-center justify-between">
                <span>{defaultKeyboardName}</span>
                <span className="text-[11px] text-blue-500 font-semibold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                  تغيير ▾
                </span>
              </div>
            </div>

            {/* Section Label: الكل */}
            <div className="text-[12px] font-bold text-slate-500 px-2 pt-0.5">
              الكل
            </div>

            {/* 2. MAIN WHITE CARD: Keyboard list matching user screenshot */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200/70 divide-y divide-slate-100 overflow-hidden">
              {/* Row 1: لوحة مفاتيح Samsung (Stock) */}
              <div className="p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    لوحة مفاتيح Samsung
                  </div>
                  <div className="text-[11px] text-slate-500 font-normal">
                    English (US) والعربية
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  أساسية
                </span>
              </div>

              {/* Row 2: إدخال صوت Samsung */}
              <div className="p-3.5 flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-800">
                  إدخال صوت Samsung
                </div>
                <button
                  onClick={() =>
                    setOneUiSwitches((prev) => ({ ...prev, samsungVoice: !prev.samsungVoice }))
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 cursor-pointer ${
                    oneUiSwitches.samsungVoice ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      oneUiSwitches.samsungVoice ? '-translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Row 3: الكتابة بالصوت من Google (1) */}
              <div className="p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    الكتابة بالصوت من Google
                  </div>
                  <div className="text-[11px] text-slate-500 font-normal">تلقائي</div>
                </div>
                <button
                  onClick={() =>
                    setOneUiSwitches((prev) => ({ ...prev, googleVoice1: !prev.googleVoice1 }))
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 cursor-pointer ${
                    oneUiSwitches.googleVoice1 ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      oneUiSwitches.googleVoice1 ? '-translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Row 4: الكتابة بالصوت من Google (2) */}
              <div className="p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    الكتابة بالصوت من Google
                  </div>
                  <div className="text-[11px] text-slate-500 font-normal">تلقائي</div>
                </div>
                <button
                  onClick={() =>
                    setOneUiSwitches((prev) => ({ ...prev, googleVoice2: !prev.googleVoice2 }))
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 cursor-pointer ${
                    oneUiSwitches.googleVoice2 ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      oneUiSwitches.googleVoice2 ? '-translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Row 5: الملء التلقائي من Google */}
              <div className="p-3.5 flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-800">
                  الملء التلقائي من Google
                </div>
                <button
                  onClick={() =>
                    setOneUiSwitches((prev) => ({ ...prev, googleAutofill: !prev.googleAutofill }))
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 cursor-pointer ${
                    oneUiSwitches.googleAutofill ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      oneUiSwitches.googleAutofill ? '-translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Row 6: كيبورد السراب البعيد */}
              <div className="p-3.5 flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-800">
                  كيبورد السراب البعيد
                </div>
                <button
                  onClick={() =>
                    setOneUiSwitches((prev) => ({ ...prev, sarabKeyboard: !prev.sarabKeyboard }))
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 cursor-pointer ${
                    oneUiSwitches.sarabKeyboard ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      oneUiSwitches.sarabKeyboard ? '-translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Row 7: Keyboard with Ctrl key */}
              <div className="p-3.5 flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-800">
                  Keyboard with Ctrl key
                </div>
                <button
                  onClick={() =>
                    setOneUiSwitches((prev) => ({ ...prev, ctrlKeyboard: !prev.ctrlKeyboard }))
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 cursor-pointer ${
                    oneUiSwitches.ctrlKeyboard ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      oneUiSwitches.ctrlKeyboard ? '-translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Row 8: ⭐ لوحة مفاتيح سامسونج نوت 10+ (OUR KEYBOARD) ⭐ */}
              <div
                className={`p-3.5 flex items-center justify-between transition-all ${
                  isNote10Enabled
                    ? 'bg-blue-50/40 border-r-4 border-r-blue-600'
                    : 'bg-amber-50/50 border-r-4 border-r-amber-500 animate-pulse'
                }`}
              >
                <div className="min-w-0 pr-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">
                      لوحة مفاتيح سامسونج نوت 10+
                    </span>
                    {isNote10Enabled ? (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-700">
                        مفعلة
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 animate-bounce">
                        انقر للتفعيل 👆
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 font-normal truncate">
                    لوحة مفاتيح سامسونج نوت 10+ والإنجليزية (الولايات المتحدة)
                  </div>
                </div>

                {/* The One UI Toggle Switch for our keyboard */}
                <button
                  onClick={() => {
                    if (!isNote10Enabled) {
                      setShowWarningModal(true);
                    } else {
                      setIsNote10Enabled(false);
                      if (defaultKeyboardName === 'لوحة مفاتيح سامسونج نوت 10+') {
                        setDefaultKeyboardName('لوحة مفاتيح Samsung');
                      }
                    }
                  }}
                  className={`w-12 h-6.5 rounded-full transition-colors relative p-0.5 shrink-0 cursor-pointer shadow-inner ${
                    isNote10Enabled ? 'bg-blue-600 ring-2 ring-blue-300' : 'bg-slate-300'
                  }`}
                  title={isNote10Enabled ? 'تعطيل اللوحة' : 'تفعيل اللوحة'}
                >
                  <div
                    className={`w-5.5 h-5.5 rounded-full bg-white shadow-md transition-transform ${
                      isNote10Enabled ? '-translate-x-5.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* 3. BOTTOM CARD: زر لوحة المفاتيح على شريط التنقل */}
            <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-200/70 flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-800">
                زر لوحة المفاتيح على شريط التنقل
              </div>
              <button
                onClick={() =>
                  setOneUiSwitches((prev) => ({ ...prev, navbarKeyButton: !prev.navbarKeyButton }))
                }
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 cursor-pointer ${
                  oneUiSwitches.navbarKeyButton ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    oneUiSwitches.navbarKeyButton ? '-translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* 4. REAL PHONE INSTRUCTIONS GUIDE CARD (خطوات التفعيل في هاتفك سامسونج الحقيقي) */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-3.5 shadow-md border border-blue-900/60 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>كيفية تفعيل هذا الشكل كلوحة افتراضية في شاشة هاتفك أندرويد:</span>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-200 leading-relaxed">
                <div className="flex items-start gap-2 bg-white/10 p-2 rounded-xl">
                  <span className="w-4 h-4 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    في شاشة إعدادات هاتفك (الموضحة في صورتك)، اضغط على المفتاح المجاور لـ <strong>لوحة مفاتيح سامسونج نوت 10+</strong> ليتحول إلى أزرق (مفعل).
                  </span>
                </div>

                <div className="flex items-start gap-2 bg-white/10 p-2 rounded-xl">
                  <span className="w-4 h-4 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    ستظهر لك رسالة تنبيه أمنية نظامية، اضغط على <strong>موافق</strong> لتأكيد تفعيل اللوحة.
                  </span>
                </div>

                <div className="flex items-start gap-2 bg-white/10 p-2 rounded-xl">
                  <span className="w-4 h-4 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    اضغط على خيار <strong>لوحة المفاتيح الافتراضية</strong> بأعلى الشاشة، واختر <strong>لوحة مفاتيح سامسونج نوت 10+</strong>.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    const win = window as any;
                    if (win.AndroidKeyboardBridge && typeof win.AndroidKeyboardBridge.openInputMethodSettings === 'function') {
                      win.AndroidKeyboardBridge.openInputMethodSettings();
                    } else {
                      try {
                        window.location.href = 'intent:#Intent;action=android.settings.INPUT_METHOD_SETTINGS;end';
                      } catch {
                        onOpenInputMethodModal();
                      }
                    }
                  }}
                  className="py-2 px-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>فتح إعدادات الهاتف</span>
                </button>

                {onOpenApkModal && (
                  <button
                    onClick={onOpenApkModal}
                    className="py-2 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تنزيل حزمة APK</span>
                  </button>
                )}
              </div>
            </div>

            {/* ONE UI SYSTEM MODAL 1: Security Warning Dialog (رسالة تنبيه الأمان لنظام أندرويد) */}
            {showWarningModal && (
              <div
                className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in"
                onClick={() => setShowWarningModal(false)}
              >
                <div
                  className="w-full max-w-xs bg-white rounded-3xl shadow-2xl overflow-hidden p-5 text-slate-900 space-y-3.5 border border-slate-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    تنبيه
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    قد تتمكن طريقة الإدخال هذه من جمع كل النص الذي تكتبه، بما في ذلك البيانات الشخصية مثل كلمات المرور وأرقام بطاقات الائتمان. تأتي هذه الطريقة من تطبيق <strong>كيبورد سامسونج نوت 10+</strong>. هل تريد استخدامها؟
                  </p>
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => setShowWarningModal(false)}
                      className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={() => {
                        setIsNote10Enabled(true);
                        setShowWarningModal(false);
                        setShowSetDefaultPrompt(true);
                      }}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
                    >
                      موافق
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ONE UI SYSTEM MODAL 2: Set as Default Dialog (تعيين كلوحة افتراضية) */}
            {showSetDefaultPrompt && (
              <div
                className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in"
                onClick={() => setShowSetDefaultPrompt(false)}
              >
                <div
                  className="w-full max-w-xs bg-white rounded-3xl shadow-2xl overflow-hidden p-5 text-slate-900 space-y-3.5 border border-slate-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                      تعيين كلوحة افتراضية
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    تم تفعيل لوحة مفاتيح سامسونج نوت 10+ بنجاح! هل تريد جعلها <strong>لوحة المفاتيح الافتراضية</strong> لجميع تطبيقات الهاتف الآن؟
                  </p>
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => setShowSetDefaultPrompt(false)}
                      className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      لاحقاً
                    </button>
                    <button
                      onClick={() => {
                        setDefaultKeyboardName('لوحة مفاتيح سامسونج نوت 10+');
                        if (onSelectKeyboard) onSelectKeyboard('attached');
                        setShowSetDefaultPrompt(false);
                      }}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
                    >
                      تعيين كافتراضية
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
