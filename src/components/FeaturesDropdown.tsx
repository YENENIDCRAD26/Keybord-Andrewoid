import React, { useRef, useEffect } from 'react';
import {
  Sparkles,
  Maximize2,
  Smartphone,
  RefreshCw,
  Type,
  Palette,
  Image as ImageIcon,
  Table as TableIcon,
  Smile,
  FileDown,
  ClipboardCheck,
  Volume2,
  Sliders,
  CheckCircle2,
  ChevronDown,
  X,
  ExternalLink,
  Download,
  LayoutGrid,
} from 'lucide-react';
import { InsertModalTab, ActiveKeyboardType } from '../types';

interface FeaturesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFontsModal: () => void;
  onOpenColorModal: () => void;
  onOpenInsertModal: (tab: InsertModalTab) => void;
  onExportJpg: () => void;
  onExportPdf: () => void;
  onToggleKeyboard: () => void;
  activeKeyboard: ActiveKeyboardType;
  currentFontName: string;
  onOpenApkModal?: () => void;
}

export const FeaturesDropdown: React.FC<FeaturesDropdownProps> = ({
  isOpen,
  onClose,
  onOpenFontsModal,
  onOpenColorModal,
  onOpenInsertModal,
  onExportJpg,
  onExportPdf,
  onToggleKeyboard,
  activeKeyboard,
  currentFontName,
  onOpenApkModal,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const featuresList = [
    {
      id: 'height',
      icon: <Maximize2 className="w-4 h-4 text-emerald-600" />,
      title: 'ارتفاع الكيبورد القياسي (5.5 cm)',
      description: 'حجم هندسي دقيق بارتفاع 5.5 سم يوفر أزراراً مريحة للمس مع الحفاظ على المساحة لظهور واجهة التطبيق المستهدف بالجوال.',
      badge: 'مضبوط 5.5cm',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      actionLabel: 'فحص الارتفاع',
      onAction: () => {
        onClose();
      },
    },
    {
      id: 'apkBuild',
      icon: <Download className="w-4 h-4 text-emerald-600" />,
      title: 'بناء وتحميل حزمة APK وتثبيت التطبيق',
      description: 'تحميل ملف APK للهاتف أو التثبيت الفوري كـ WebAPK على هواتف أندرويد وسامسونج مع دعم العمل بدون إنترنت.',
      badge: 'Android APK / PWA',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      actionLabel: 'تحميل APK',
      onAction: () => {
        onOpenApkModal?.();
        onClose();
      },
    },
    {
      id: 'autoSwitch',
      icon: <RefreshCw className="w-4 h-4 text-amber-600" />,
      title: 'التبديل التلقائي مع لوحة الهاتف الأصلية',
      description: 'اختفاء لوحة المفاتيح الأصلية تلقائياً عند فتح الكيبورد الملحق، والتبديل السلس بينهما بنقرة واحدة.',
      badge: activeKeyboard === 'attached' ? 'الكيبورد الملحق نشط' : 'لوحة الهاتف نشطة',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      actionLabel: 'تبديل اللوحة',
      onAction: () => {
        onToggleKeyboard();
        onClose();
      },
    },
    {
      id: 'fonts',
      icon: <Type className="w-4 h-4 text-indigo-600" />,
      title: 'الـ 18 خطاً عربياً أصيلاً المعتمدة',
      description: `مكتبة الخطوط الكاملة (أميري، نسخ، رقعة، كوفي، ديواني، عثماني...). الخط الحالي: ${currentFontName}.`,
      badge: '18 خطاً عربياً',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      actionLabel: 'اختيار خط',
      onAction: () => {
        onClose();
        onOpenFontsModal();
      },
    },
    {
      id: 'styling',
      icon: <Palette className="w-4 h-4 text-purple-600" />,
      title: 'التحكم بالخط ولونه وحجمه وتنسيقه',
      description: 'تغيير دقيق لحجم الخط (12-48px)، لوحة ألوان سريعة ومخصصة، وتنسيقات غامق، مائل، وتسطير ومحاذاة.',
      badge: 'تحكم متقدم',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      actionLabel: 'ضبط الخط',
      onAction: () => {
        onClose();
        onOpenColorModal();
      },
    },
    {
      id: 'media',
      icon: <ImageIcon className="w-4 h-4 text-rose-600" />,
      title: 'إدراج الصور والجداول والرموز والإيموجي',
      description: 'إدراج صور قابلة لتعديل العرض والمحاذاة، وجداول بيانات تفاعلية بخلايا قابلة للتعديل، وزخارف إسلامية.',
      badge: 'وسائط متكاملة',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      actionLabel: 'إدراج صورة',
      onAction: () => {
        onClose();
        onOpenInsertModal('image');
      },
    },
    {
      id: 'export',
      icon: <FileDown className="w-4 h-4 text-teal-600" />,
      title: 'التصدير والحفظ كصورة JPG وملف PDF',
      description: 'حفظ وتصدير المستند بضغطة زر كملف PDF عالي الدقة للطباعة أو كصورة JPG نقية للمشاركة الفورية.',
      badge: 'حفظ JPG & PDF',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
      actionLabel: 'تصدير JPG',
      onAction: () => {
        onClose();
        onExportJpg();
      },
    },
    {
      id: 'clipboard',
      icon: <ClipboardCheck className="w-4 h-4 text-cyan-600" />,
      title: 'مزامنة تلقائية للحافظة مع نظام أندرويد',
      description: 'نسخ فوري وتلقائي للنص المكتوب إلى حافظة الهاتف للعمل المباشر في أي تطبيق بالجوال.',
      badge: 'مزامنة نشطة',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      actionLabel: 'تأكيد الحافظة',
      onAction: () => {
        onClose();
      },
    },
  ];

  return (
    <div
      ref={dropdownRef}
      className="absolute top-11 right-2 sm:right-4 w-[92vw] max-w-[390px] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150"
      dir="rtl"
    >
      {/* Dropdown Header */}
      <div className="px-4 py-2.5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <h3 className="font-bold text-xs">قائمة مزايا وخصائص الكيبورد</h3>
            <p className="text-[10px] text-slate-300">نظام أندرويد وسامسونج نوت 10 بلس</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-6 h-6 rounded-full hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          title="إغلاق"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Features Scrollable List */}
      <div className="p-2 space-y-1.5 max-h-[65vh] overflow-y-auto divide-y divide-slate-100">
        {featuresList.map((feat) => (
          <div key={feat.id} className="pt-2 first:pt-0 pb-1 flex items-start gap-2.5 hover:bg-slate-50 p-2 rounded-xl transition-colors">
            <div className="p-2 rounded-xl bg-slate-100 shrink-0 mt-0.5 border border-slate-200/80">
              {feat.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <h4 className="font-bold text-xs text-slate-800 truncate">{feat.title}</h4>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold border shrink-0 ${feat.badgeColor}`}>
                  {feat.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug mb-1.5">{feat.description}</p>

              <button
                onClick={feat.onAction}
                className="px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all active:scale-95"
              >
                <span>{feat.actionLabel}</span>
                <ChevronDown className="w-2.5 h-2.5 -rotate-90" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dropdown Footer */}
      <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
        <span className="flex items-center gap-1 font-semibold text-emerald-700">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>كافة المزايا مفعلة وجاهزة</span>
        </span>
        <button
          onClick={onClose}
          className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-[10px] font-bold"
        >
          تم
        </button>
      </div>
    </div>
  );
};
