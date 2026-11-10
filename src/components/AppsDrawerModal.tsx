import React, { useState } from 'react';
import {
  X,
  LayoutGrid,
  FileText,
  Table,
  Edit3,
  MessageSquare,
  Send,
  Mail,
  Globe,
  Plus,
  BookOpen,
  Sparkles,
  Smartphone,
  CheckCircle2,
  Sliders,
  Type,
  Printer,
  Download,
  Copy,
  FolderOpen,
  CheckSquare,
  Calculator,
} from 'lucide-react';
import { TargetAppType } from '../types';

interface AppsDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeApp: TargetAppType;
  onSelectApp: (app: TargetAppType) => void;
  text: string;
  onUpdateText: (newText: string) => void;
  onOpenInsertModal: () => void;
  onOpenFontsModal: () => void;
  onExportPdf: () => void;
  onExportJpg: () => void;
  isUniversalImeEnabled: boolean;
  onToggleUniversalIme: () => void;
}

export const AppsDrawerModal: React.FC<AppsDrawerModalProps> = ({
  isOpen,
  onClose,
  activeApp,
  onSelectApp,
  text,
  onUpdateText,
  onOpenInsertModal,
  onOpenFontsModal,
  onExportPdf,
  onExportJpg,
  isUniversalImeEnabled,
  onToggleUniversalIme,
}) => {
  const [activeTab, setActiveTab] = useState<'apps' | 'documentHub' | 'templates'>('apps');
  const [readingFontSize, setReadingFontSize] = useState<number>(18);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  // Text statistics for reading mode
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const lineCount = text.split('\n').length;
  const estimatedReadTimeMinutes = Math.max(1, Math.ceil(wordCount / 180));

  const appsList: Array<{
    id: TargetAppType;
    nameArabic: string;
    category: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
    description: string;
  }> = [
    {
      id: 'wordDoc',
      nameArabic: 'مستندات Word (محرر المستندات)',
      category: 'المكتب والإنتاجية',
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      color: 'text-blue-600',
      bg: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      description: 'قراءة، كتابة وإنشاء مستندات نصوص، حروف، أرقام، جداول وصور بالخطوط الـ 18',
    },
    {
      id: 'excelSheet',
      nameArabic: 'أوراق Excel (المصنفات والجداول)',
      category: 'المكتب والإنتاجية',
      icon: <Table className="w-6 h-6 text-emerald-600" />,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200',
      description: 'جداول بيانات، إدخال أرقام، حسابات تلقائية =SUM، فلاتر وصيغ متقدمة',
    },
    {
      id: 'samsungNotes',
      nameArabic: 'ملاحظات سامسونج (Samsung Notes)',
      category: 'المفكرة والتدوين',
      icon: <Edit3 className="w-6 h-6 text-amber-600" />,
      color: 'text-amber-600',
      bg: 'bg-amber-50 hover:bg-amber-100 border-amber-200',
      description: 'تدوين ملاحظات سريعة، قوائم مهام وقوائم مرجعية مع حفظ فوري',
    },
    {
      id: 'whatsapp',
      nameArabic: 'واتساب (WhatsApp)',
      category: 'المراسلة والمحادثات',
      icon: <MessageSquare className="w-6 h-6 text-emerald-500" />,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50/60 hover:bg-emerald-100/60 border-emerald-200',
      description: 'محادثات فورية، رسائل نصية منسقة وتشكيل كامل للحروف',
    },
    {
      id: 'telegram',
      nameArabic: 'تيليجرام (Telegram)',
      category: 'المراسلة والمحادثات',
      icon: <Send className="w-6 h-6 text-sky-500" />,
      color: 'text-sky-500',
      bg: 'bg-sky-50 hover:bg-sky-100 border-sky-200',
      description: 'قنوات، رسائل ومجموعات مع دعم الرموز والإيموجي المتطورة',
    },
    {
      id: 'messages',
      nameArabic: 'رسائل الهاتف (Messages SMS)',
      category: 'الاتصالات',
      icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
      color: 'text-blue-500',
      bg: 'bg-blue-50/70 hover:bg-blue-100/70 border-blue-200',
      description: 'إرسال واستقبال رسائل SMS مع لوحة المفاتيح الافتراضية',
    },
    {
      id: 'browser',
      nameArabic: 'المتصفح الذكي والبحث (Browser)',
      category: 'الإنترنت والبحث',
      icon: <Globe className="w-6 h-6 text-indigo-600" />,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
      description: 'شريط عناوين وبحث في الويب مع تفعيل فوري للكيبورد عند النقر',
    },
    {
      id: 'email',
      nameArabic: 'البريد الإلكتروني (Samsung Email)',
      category: 'المكتب والاتصالات',
      icon: <Mail className="w-6 h-6 text-red-500" />,
      color: 'text-red-500',
      bg: 'bg-red-50 hover:bg-red-100 border-red-200',
      description: 'إنشاء ومراسلة بريد إلكتروني رسمي مع عناوين ومرفقات',
    },
  ];

  const templates: Array<{
    title: string;
    category: string;
    targetApp: TargetAppType;
    icon: React.ReactNode;
    content: string;
  }> = [
    {
      title: 'مستند رسمي رسمي (Official Document)',
      category: 'Word',
      targetApp: 'wordDoc',
      icon: <FileText className="w-4 h-4 text-blue-600" />,
      content: `بسم الله الرحمن الرحيم\n\nالموضوع: تقرير العمل الدوري\nالتاريخ: ${new Date().toLocaleDateString('ar-EG')}\n\nسعادة المدير العام المحترم،،،\nالسلام عليكم ورحمة الله وبركاته،،،\n\nنود إحاطتكم علماً بأنه تم إنجاز المهام المطلوبة وفق أعلى معايير الجودة والإنتاجية.\n\nوتفضلوا بقبول فائق الاحترام والتقدير،،،`,
    },
    {
      title: 'موازنة مالية ومصروفات (Expense Sheet)',
      category: 'Excel',
      targetApp: 'excelSheet',
      icon: <Table className="w-4 h-4 text-emerald-600" />,
      content: `البند\tالكمية\tالسعر\tالإجمالي\nتطوير وتجهيز الكيبورد\t1\t5000\t5000\nخطوط عربية احترافية\t18\t200\t3600\nالمجموع =SUM(D2:D3)\t-\t-\t8600`,
    },
    {
      title: 'قائمة مهام يومية (Daily Checklist)',
      category: 'Notes',
      targetApp: 'samsungNotes',
      icon: <CheckSquare className="w-4 h-4 text-amber-600" />,
      content: `📋 قائمة المهام اليومية:\n[ ] مراجعة مستندات Word المنسقة\n[ ] فحص خلايا Excel وإجراء الجمع التلقائي\n[ ] تجربة لوحة المفاتيح مع حقول الإدخال المختلفة\n[ ] تصدير التقرير النهائي بصيغة PDF`,
    },
    {
      title: 'رسالة بريد احترافية (Professional Email)',
      category: 'Email',
      targetApp: 'email',
      icon: <Mail className="w-4 h-4 text-red-500" />,
      content: `تحية طيبة وبعد،،،\n\nيسرني التواصل معكم لمتابعة مستجدات المشروع. مرفق لكم التقرير المحدث والتفاصيل المطلوبة.\n\nنتطلع لملاحظاتكم الكريمة.\n\nمع أطيب التحيات،`,
    },
  ];

  const handleSelectAppItem = (appId: TargetAppType) => {
    onSelectApp(appId);
    onClose();
  };

  const handleApplyTemplate = (template: typeof templates[0]) => {
    onUpdateText(template.content);
    onSelectApp(template.targetApp);
    onClose();
  };

  const handleCopyText = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      id="apps-drawer-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-150"
      onClick={onClose}
      dir="rtl"
    >
      <div
        id="apps-drawer-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* HEADER */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                قائمة التطبيقات ومحطة المستندات
                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                  Samsung One UI
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                القراءة، الكتابة والإنشاء للنصوص والحروف والأرقام والكائنات المدرجة
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* UNIVERSAL IME STATUS BANNER */}
        <div className="px-5 py-2.5 bg-linear-to-r from-blue-50 to-indigo-50 border-b border-blue-100 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-semibold text-slate-700">
              وضع الكيبورد كلوحة أساسية للهاتف:
            </span>
            <span
              className={`font-bold px-2 py-0.5 rounded-full text-[11px] ${
                isUniversalImeEnabled
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {isUniversalImeEnabled ? 'مفعل تلقائياً (Universal IME)' : 'معطل'}
            </span>
          </div>
          <button
            onClick={onToggleUniversalIme}
            className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all shadow-2xs ${
              isUniversalImeEnabled
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isUniversalImeEnabled ? 'نشط مع أي حقل ✓' : 'تفعيل التوافق التلقائي'}
          </button>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex border-b border-slate-200 bg-slate-100 text-xs font-semibold px-4 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('apps')}
            className={`px-4 py-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'apps'
                ? 'border-blue-600 text-blue-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>قائمة التطبيقات ({appsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('documentHub')}
            className={`px-4 py-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'documentHub'
                ? 'border-blue-600 text-blue-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>مركز القراءة والكتابة</span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'templates'
                ? 'border-blue-600 text-blue-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>إنشاء مستند جديد من قالب</span>
          </button>
        </div>

        {/* TAB CONTENTS */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* TAB 1: APPS LIST */}
          {activeTab === 'apps' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>اختر التطبيق لفتحه والتحكم به بالكامل عبر الكيبورد:</span>
                <span className="font-semibold text-blue-600">التطبيق النشط: {appsList.find(a => a.id === activeApp)?.nameArabic}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {appsList.map((app) => {
                  const isActive = app.id === activeApp;
                  return (
                    <button
                      key={app.id}
                      onClick={() => handleSelectAppItem(app.id)}
                      className={`text-right p-3.5 rounded-xl border transition-all flex items-start gap-3 relative shadow-2xs group active:scale-[0.98] ${
                        isActive
                          ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-300'
                          : `${app.bg} border-slate-200`
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-white shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                        {app.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-slate-800 text-xs sm:text-sm truncate">
                            {app.nameArabic}
                          </h4>
                          {isActive && (
                            <span className="text-[10px] bg-blue-600 text-white font-bold px-1.5 py-0.2 rounded-full shrink-0">
                              نشط الآن
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                          {app.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: DOCUMENT READING, WRITING & OBJECTS HUB */}
          {activeTab === 'documentHub' && (
            <div className="space-y-4 text-slate-700 text-xs sm:text-sm">
              {/* Document Statistics Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                  <span className="text-xl font-bold text-blue-600">{wordCount}</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">عدد الكلمات</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                  <span className="text-xl font-bold text-emerald-600">{charCount}</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">عدد الحروف</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                  <span className="text-xl font-bold text-amber-600">{lineCount}</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">عدد الأسطر</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                  <span className="text-xl font-bold text-purple-600">~{estimatedReadTimeMinutes} دقيقة</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">وقت القراءة</p>
                </div>
              </div>

              {/* Reading Controls & Actions */}
              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-700">حجم خط القراءة:</span>
                  <button
                    onClick={() => setReadingFontSize((prev) => Math.max(12, prev - 2))}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-bold hover:bg-slate-50 flex items-center justify-center text-xs"
                  >
                    A-
                  </button>
                  <span className="font-mono text-xs font-bold text-blue-700 w-8 text-center">
                    {readingFontSize}px
                  </span>
                  <button
                    onClick={() => setReadingFontSize((prev) => Math.min(32, prev + 2))}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-bold hover:bg-slate-50 flex items-center justify-center text-xs"
                  >
                    A+
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopyText}
                    className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5 text-blue-600" />
                    <span>{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
                  </button>
                  <button
                    onClick={onExportPdf}
                    className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-2xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>تصدير PDF</span>
                  </button>
                  <button
                    onClick={onExportJpg}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>حفظ JPG</span>
                  </button>
                </div>
              </div>

              {/* Reader Preview Box */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-inner max-h-56 overflow-y-auto leading-relaxed text-slate-800">
                <p
                  style={{
                    fontSize: `${readingFontSize}px`,
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.7',
                  }}
                >
                  {text || 'لا يوجد نص حالياً للقراءة. ابدأ بالكتابة من خلال الكيبورد أو اختر قالباً جاهزاً.'}
                </p>
              </div>

              {/* Quick Objects Insertion Bar */}
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-blue-900 text-xs">إدراج الكائنات في المستند:</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onOpenInsertModal();
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إدراج صورة / جدول / رمز</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenFontsModal();
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-bold text-xs flex items-center gap-1"
                  >
                    <Type className="w-3.5 h-3.5 text-purple-600" />
                    <span>تغيير الخط (18 خط)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TEMPLATES & NEW CREATION */}
          {activeTab === 'templates' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                اختر قالباً جاهزاً لإنشاء مستند جديد مباشرة مع تفعيل لوحة المفاتيح والتحكم الكامل:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {templates.map((tmpl, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between gap-3 text-right"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                          {tmpl.icon}
                          <span>{tmpl.title}</span>
                        </div>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                          {tmpl.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed whitespace-pre-line">
                        {tmpl.content}
                      </p>
                    </div>

                    <button
                      onClick={() => handleApplyTemplate(tmpl)}
                      className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>استخدام هذا القالب والبدء</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>لوحة مفاتيح سامسونج نوت 10+ الملحقة • ارتفاع دقيق 6.3 سم</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
