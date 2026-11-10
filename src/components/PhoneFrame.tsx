import React, { useState, useEffect } from 'react';
import {
  Wifi,
  BatteryMedium,
  Signal,
  Smartphone,
  Maximize,
  RotateCw,
  Sparkles,
  SmartphoneNfc,
  ChevronDown,
  ChevronUp,
  Download
} from 'lucide-react';
import { ActiveKeyboardType } from '../types';

interface PhoneFrameProps {
  children: React.ReactNode;
  isPhoneFrame: boolean;
  onToggleFrame: () => void;
  fontFamilyName: string;
  orientation: 'portrait' | 'landscape';
  onToggleOrientation: () => void;
  onOpenFeaturesDropdown?: () => void;
  activeKeyboard?: ActiveKeyboardType;
  onToggleKeyboard?: () => void;
  onOpenApkModal?: () => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  isPhoneFrame,
  onToggleFrame,
  fontFamilyName,
  orientation,
  onToggleOrientation,
  onOpenFeaturesDropdown,
  activeKeyboard,
  onToggleKeyboard,
  onOpenApkModal,
}) => {
  const [time, setTime] = useState('');
  const [isBottomMenuOpen, setIsBottomMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('ar-SA', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // When not in phone frame mode (fullscreen responsive mode)
  if (!isPhoneFrame) {
    return (
      <div className="w-full h-screen flex flex-col bg-slate-100 overflow-hidden">
        {/* Top Desktop Bar */}
        <header
          className="h-12 bg-white border-b border-slate-200 px-4 flex items-center justify-between shadow-2xs shrink-0"
          dir="rtl"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              KB
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-800">
                لوحة مفاتيح الجوال الذكية (وضع سطح المكتب الموسع)
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden sm:inline">
              الخط النشط: <strong className="text-blue-700">{fontFamilyName}</strong>
            </span>
            <button
              id="frame-toggle-phone-btn"
              onClick={onToggleFrame}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-blue-200 active:scale-95"
              title="عرض داخل إطار هاتف أندرويد +7"
            >
              <Smartphone className="w-4 h-4" />
              <span>عرض إطار هاتف أندرويد</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-end overflow-hidden relative bg-[#1a1c1e]">
          {children}
        </div>
      </div>
    );
  }

  const isLandscape = orientation === 'landscape';

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-2 sm:p-4 flex flex-col items-center justify-center overflow-auto">
      {/* Android Device Body with Responsive Dimensions according to Orientation */}
      <div
        id="phone-device-body"
        className={`w-full transition-all duration-300 bg-slate-950 shadow-2xl border-4 border-slate-700 flex flex-col relative overflow-hidden ring-8 ring-black/40 ${
          isLandscape
            ? 'max-w-[880px] h-[520px] max-h-[96vh] rounded-[36px] p-2.5'
            : 'max-w-[430px] h-[860px] max-h-[92vh] rounded-[44px] p-3'
        }`}
      >
        {/* Device Screen Bezel */}
        <div
          className={`w-full h-full bg-white flex flex-col overflow-hidden relative shadow-inner ${
            isLandscape ? 'rounded-[26px]' : 'rounded-[34px]'
          }`}
        >
          {/* Android Status Bar (Samsung Galaxy Note 10+ One UI) */}
          <div className="h-6 sm:h-7 bg-slate-950 text-slate-300 px-4 flex items-center justify-between text-[11px] font-medium shrink-0 select-none z-20 border-b border-slate-800/80">
            {/* Left: Clock */}
            <span className="font-bold tracking-wider text-slate-200">{time || '12:30'}</span>

            {/* Center: Note 10+ Camera Punch-hole */}
            <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto ring-1 ring-slate-700/80 shrink-0" />

            {/* Right: Network & Battery Icons */}
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="text-[10px] text-slate-400 font-semibold hidden xs:inline">4G+</span>
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] font-bold">98%</span>
                <BatteryMedium className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Phone Inner Workspace (Active Android App + Keyboard) */}
          <div className="flex-1 flex flex-col justify-end overflow-hidden relative bg-[#1a1c1e]">
            {children}
          </div>

          {/* Hidden Collapsible Menu Below Keyboard (قائمة مخفية أسفل الكيبورد) */}
          <div className="bg-slate-900 border-t border-slate-800 text-xs text-slate-300 shrink-0 select-none transition-all duration-300 z-30" dir="rtl">
            {/* Collapsed Bar / Trigger */}
            <div className="px-3 py-1.5 flex items-center justify-between">
              <button
                id="toggle-bottom-menu-btn"
                onClick={() => setIsBottomMenuOpen(!isBottomMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 text-xs font-bold transition-all active:scale-95"
                title="إظهار / إخفاء قائمة خيارات النظام أسفل الكيبورد"
              >
                {isBottomMenuOpen ? (
                  <>
                    <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
                    <span>إخفاء القائمة السفلية</span>
                  </>
                ) : (
                  <>
                    <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
                    <span>⚙️ القائمة المخفية (خيارات الهاتف والنظام)</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-slate-300">Galaxy Note 10+</span>
                <span className="text-[10px] text-slate-500">One UI</span>
              </div>
            </div>

            {/* Expanded Hidden Controls Row */}
            {isBottomMenuOpen && (
              <div className="px-3 pb-2.5 pt-1 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 animate-in slide-in-from-bottom duration-200">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Features Dropdown Button (المزايا) */}
                  {onOpenFeaturesDropdown && (
                    <button
                      id="phone-features-dropdown-btn"
                      onClick={onOpenFeaturesDropdown}
                      className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg border border-amber-500/40 flex items-center gap-1.5 transition-all text-xs font-bold active:scale-95 shadow-xs"
                      title="فتح القائمة المنسدلة لمزايا الكيبورد"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>المزايا</span>
                      <ChevronDown className="w-3 h-3 text-amber-400" />
                    </button>
                  )}

                  {/* Toggle Native / Attached Keyboard */}
                  {onToggleKeyboard && (
                    <button
                      id="phone-toggle-keyboard-btn"
                      onClick={onToggleKeyboard}
                      className="px-2.5 py-1 bg-blue-600/30 hover:bg-blue-600/40 text-blue-300 rounded-lg border border-blue-500/40 flex items-center gap-1.5 transition-all text-xs font-medium active:scale-95"
                      title="التبديل التلقائي بين الكيبورد الملحق ولوحة الهاتف الأصلية"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                      <span>{activeKeyboard === 'attached' ? 'الكيبورد الملحق (6.3cm)' : 'لوحة الهاتف'}</span>
                    </button>
                  )}


                  {/* APK Build / Download Button */}
                  {onOpenApkModal && (
                    <button
                      id="phone-apk-build-btn"
                      onClick={onOpenApkModal}
                      className="px-2.5 py-1 bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 rounded-lg border border-emerald-500/40 flex items-center gap-1.5 transition-all text-xs font-bold active:scale-95 shadow-xs"
                      title="بناء وتحميل حزمة APK وتثبيت التطبيق على الجوال"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                      <span>تحميل APK</span>
                    </button>
                  )}

                  {/* Rotate Portrait / Landscape */}
                  <button
                    id="phone-rotate-btn"
                    onClick={onToggleOrientation}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-all text-xs font-semibold active:scale-95 shadow-xs"
                    title="تبديل وضع الاتجاه بين العمودي والأفقي"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isLandscape ? 'وضع عمودي' : 'وضع أفقي'}</span>
                  </button>

                  {/* Expand to Fullscreen */}
                  <button
                    id="phone-fullscreen-btn"
                    onClick={onToggleFrame}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-all text-xs active:scale-95"
                    title="توسيع ملء الشاشة"
                  >
                    <Maximize className="w-3.5 h-3.5" />
                    <span>ملء الشاشة</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Android Home Navigation Pill & Show Keyboard Button */}
          <div className="h-5 bg-slate-200/90 px-4 flex items-center justify-between shrink-0 border-t border-slate-300/60">
            <div className="w-6" /> {/* spacer */}
            <div className="w-20 sm:w-24 h-1 rounded-full bg-slate-400" />
            <button
              onClick={() => onOpenFeaturesDropdown && onOpenFeaturesDropdown()}
              className="p-1 hover:bg-slate-300 rounded text-slate-600 transition cursor-pointer flex items-center justify-center"
              title="Show Keyboard button (Choose Input Method)"
            >
              <span className="font-mono font-black text-xs tracking-tighter text-slate-700 leading-none">:::</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
