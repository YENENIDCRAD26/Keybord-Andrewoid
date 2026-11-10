import React from 'react';
import { X, HelpCircle, Keyboard, Type, Palette, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="help-modal-backdrop"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-xs p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        id="help-modal-container"
        className="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-indigo-50/70">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <span>دليل مزايا ووظائف كيبورد الجوال الاحترافية</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-slate-700 leading-relaxed">
          {/* Feature 1: The 18 Fonts */}
          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm mb-1">
              <Type className="w-4 h-4 text-blue-600" />
              <span>الخطوط العربية الـ 18 المعتمدة</span>
            </div>
            <p className="text-slate-600">
              تم دمج جميع الخطوط الموضحة بالصور مع معاينة حية بالخط الحقيقي وتشمل: أميري، القاهرة، تجوال، المراعي، خط النسخ، خط الكوفي، ريم الكوفي، عارف رقعة، شهرزاد الجديد، لطيف، تشانغا، Traditional Arabic، Arial، Times New Roman، Calibri، Georgia، والمسيري، وليمونادا.
            </p>
          </div>

          {/* Feature 2: Size & Color */}
          <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200">
            <div className="flex items-center gap-2 text-purple-900 font-bold text-sm mb-1">
              <Palette className="w-4 h-4 text-purple-600" />
              <span>التحكم في حجم ولون ونمط الخط</span>
            </div>
            <p className="text-slate-600">
              يمكنك زيادة أو إنقاص حجم الخط بالبكسل، واختيار ألوان كلاسيكية وملكية، وتطبيق التنسيقات (عريض، مائل، تسطير، ومحاذاة اليمين والوسط واليسار والضبط).
            </p>
          </div>

          {/* Feature 3: Full Keyboard Layout & Controls */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-2">
              <Keyboard className="w-4 h-4 text-slate-700" />
              <span>أوامر ومفاتيح الكيبورد الرئيسية:</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600">
              <li>
                <strong className="text-slate-800">Alt البنفسجي:</strong> التبديل المساعد للمفاتيح الخاصة.
              </li>
              <li>
                <strong className="text-slate-800">🌐 EN / AR الأخضر:</strong> التبديل الفوري بين الإدخال العربي واللاتيني.
              </li>
              <li>
                <strong className="text-slate-800">Enter الأزرق (⏎):</strong> إدراج سطر جديد والتنفيذ.
              </li>
              <li>
                <strong className="text-slate-800">حذف Backspace (⌫):</strong> حذف الحرف السابق، ويدعم الضغط المطول للحذف المتواصل السريع.
              </li>
              <li>
                <strong className="text-slate-800">أسهم الاتجاهات (→ ← ↑ ↓):</strong> التنقل الدقيق لمؤشر الكتابة بين الأحرف والأسطر.
              </li>
              <li>
                <strong className="text-slate-800">شريط التشكيل:</strong> إضافة الحركات والتنوين والشدة والسكون بنقرة واحدة مباشرة.
              </li>
            </ul>
          </div>

          {/* Feature 4: Phone & Floating Modes */}
          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-1">
              <Smartphone className="w-4 h-4 text-amber-600" />
              <span>وضع إطار الهاتف والتثبيت</span>
            </div>
            <p className="text-slate-600">
              انقر على زر <span className="font-semibold text-slate-800">هاتف 📱</span> للتبديل بين شاشة الهاتف المحمول الواقعية أو نمط الشاشة الكاملة الموسعة مع دعم تصغير وإخفاء الكيبورد واستعادته بمرونة.
            </p>
          </div>
        </div>

        <div className="p-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium text-xs shadow-xs hover:bg-indigo-700"
          >
            فهمت ذلك
          </button>
        </div>
      </div>
    </div>
  );
};
