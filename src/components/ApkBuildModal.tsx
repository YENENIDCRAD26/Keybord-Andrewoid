import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Smartphone,
  Check,
  Copy,
  ExternalLink,
  QrCode,
  ShieldCheck,
  Terminal,
  Zap,
  Globe,
  HelpCircle,
  Sparkles,
  GitBranch,
} from 'lucide-react';

interface ApkBuildModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkBuildModal: React.FC<ApkBuildModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'pwa' | 'apk' | 'git' | 'cli'>('pwa');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installStatus, setInstallStatus] = useState<'idle' | 'installing' | 'installed'>('idle');

  // App URL: uses the actual current location or fallback production URL
  const appUrl = typeof window !== 'undefined' && window.location.href.startsWith('http')
    ? window.location.origin
    : 'https://ais-pre-nuelziuoqyhbrlutqenqm4-929971534693.europe-west2.run.app';

  // Listen to PWA beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      setInstallStatus('installing');
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setInstallStatus('installed');
        } else {
          setInstallStatus('idle');
        }
      } catch (err) {
        setInstallStatus('idle');
      }
      setDeferredPrompt(null);
    } else {
      // If deferredPrompt is unavailable (e.g. running in desktop or iframe), copy link and give instructions
      handleCopyLink();
    }
  };

  const pwaBuilderUrl = `https://www.pwabuilder.com/?site=${encodeURIComponent(appUrl)}`;

  return (
    <div
      id="apk-build-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs select-none"
      dir="rtl"
    >
      <div
        id="apk-build-modal-container"
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-linear-to-r from-slate-900 via-blue-950 to-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg border border-blue-400/30 text-white">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold">بناء وتحميل تطبيق الجوال (Android APK & PWA)</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-semibold">
                  جاهز للتحميل
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                تثبيت لوحة المفاتيح الملحقة (ارتفاع 5.5cm) كحزمة أندرويد حقيقية على هاتفك
              </p>
            </div>
          </div>
          <button
            id="close-apk-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QUICK LINK BAR */}
        <div className="px-4 sm:px-6 py-3 bg-blue-50 border-b border-blue-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs text-blue-900">
          <div className="flex items-center gap-2 truncate">
            <Globe className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-semibold shrink-0">رابط التطبيق المباشر:</span>
            <span className="font-mono text-[11px] text-blue-800 truncate bg-white px-2 py-1 rounded border border-blue-200 select-all" dir="ltr">
              {appUrl}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyLink}
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-white hover:bg-blue-100 border border-blue-300 font-semibold text-blue-800 flex items-center justify-center gap-1.5 shadow-2xs transition-all active:scale-95 text-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ!' : 'نسخ الرابط'}</span>
            </button>
            <a
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-1.5 shadow-2xs transition-all active:scale-95 text-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>فتح بجهازك</span>
            </a>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('pwa')}
            className={`pb-2.5 px-3 font-semibold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'pwa'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>التثبيت الفوري (WebAPK الأسرع)</span>
          </button>
          <button
            onClick={() => setActiveTab('apk')}
            className={`pb-2.5 px-3 font-semibold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'apk'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>توليد ملف APK (PWABuilder)</span>
          </button>
          <button
            onClick={() => setActiveTab('git')}
            className={`pb-2.5 px-3 font-semibold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'git'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <GitBranch className="w-4 h-4 text-indigo-600" />
            <span>مستودع GitHub والتصدير</span>
          </button>
          <button
            onClick={() => setActiveTab('cli')}
            className={`pb-2.5 px-3 font-semibold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'cli'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4 text-purple-600" />
            <span>بناء أندرويد يدوي (Bubblewrap)</span>
          </button>
        </div>

        {/* TAB CONTENTS */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-slate-700 text-xs sm:text-sm">
          {activeTab === 'pwa' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-900 text-sm">
                    تثبيت WebAPK مباشر على هواتف أندرويد وسامسونج (Samsung One UI)
                  </h3>
                  <p className="text-emerald-800 text-xs mt-1 leading-relaxed">
                    يدعم هذا التطبيق تقنية <strong>WebAPK المعتمدة من Google Android</strong>. عند التثبيت يقوم نظام أندرويد تلقائياً بتوليد حزمة APK حقيقية وتثبيتها في قائمة التطبيقات على شاشة هاتفك مع دعم العمل بدون اتصال بالإنترنت.
                  </p>
                </div>
              </div>

              {/* Install Trigger Button */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-slate-800">التثبيت بنقرة واحدة على جوالك</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {deferredPrompt
                      ? 'تم التعرف على جهازك! اضغط على الزر للتثبيت فوراً'
                      : 'افتح الرابط عبر متصفح الهاتف (Chrome أو Samsung Internet) للتثبيت المباشر'}
                  </p>
                </div>
                <button
                  id="pwa-install-action-btn"
                  onClick={handleInstallClick}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {installStatus === 'installed'
                      ? 'تم التثبيت بنجاح!'
                      : deferredPrompt
                      ? 'تثبيت التطبيق الآن على الجوال'
                      : 'نسخ الرابط لفتحه بالهاتف'}
                  </span>
                </button>
              </div>

              {/* 3 Simple Steps */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 text-xs">طريقة التثبيت على الهاتف في 3 خطوات بسيطة:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs space-y-1">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[11px]">
                      1
                    </span>
                    <p className="font-semibold text-slate-800">افتح الرابط في الهاتف</p>
                    <p className="text-slate-500 text-[11px] leading-snug">
                      افتح الرابط في متصفح Chrome أو متصفح سامسونج على هاتفك.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs space-y-1">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[11px]">
                      2
                    </span>
                    <p className="font-semibold text-slate-800">اضغط قائمة الخيارات (⋮)</p>
                    <p className="text-slate-500 text-[11px] leading-snug">
                      انقر على النقاط الثلاث بالأعلى أو بالأسفل في شريط المتصفح.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs space-y-1">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[11px]">
                      3
                    </span>
                    <p className="font-semibold text-slate-800">اختر "تثبيت التطبيق"</p>
                    <p className="text-slate-500 text-[11px] leading-snug">
                      اختر <strong>"تثبيت التطبيق" (Install App)</strong> أو <strong>"إضافة إلى الشاشة الرئيسية"</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Specs pill badge */}
              <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <span className="flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  أمان كامل بدون صلاحيات خطرة
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  ارتفاع الكيبورد: 6.3 cm
                </span>
                <span>•</span>
                <span className="font-medium">أيقونة مستقلة وتجربة شاشة كاملة Fullscreen</span>
              </div>
            </div>
          )}

          {activeTab === 'apk' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 text-sm">
                    توليد ملف APK جاهز للتثبيت عبر أداة PWABuilder الرسمية
                  </h3>
                  <p className="text-blue-800 text-xs mt-1 leading-relaxed">
                    منصة <strong>PWABuilder المدعومة رسمياً من Microsoft</strong> تحول تطبيق الويب PWA مباشرة إلى ملف <strong>APK أو AAB</strong> جاهز للنقل إلى الجوال والتثبيت الفوري (Sideload) أو الرفع إلى متجر Google Play.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-slate-800">تنزيل حزمة APK مباشرة</h4>
                    <p className="text-xs text-slate-500">تم تجهيز رابط التطبيق تلقائياً في أداة التوليد:</p>
                  </div>
                  <a
                    href={pwaBuilderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
                  >
                    <span>فتح PWABuilder وتحميل APK</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="border-t border-slate-100 pt-2 text-xs text-slate-500 space-y-1">
                  <p>1. انقر فوق الزر الأزرق أعلاه لفتح صفحة التوليد.</p>
                  <p>2. اضغط على <strong>"Package For Stores"</strong> ثم اختر <strong>"Android"</strong>.</p>
                  <p>3. اضغط <strong>"Generate Package"</strong> لتحميل ملف الـ APK المباشر لجهازك.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'git' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <GitBranch className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-indigo-950 text-sm">
                    تصدير ومزامنة الكود مع مستودع GitHub
                  </h3>
                  <p className="text-indigo-900 text-xs mt-1 leading-relaxed">
                    تم إنشاء وحفظ كامل كود لوحة المفاتيح في المستودع المحلي بنجاح (مع commits مسجلة). لرفع الكود إلى مستودعك الخاص <strong>YENENIDCRAD26/Kipord</strong>، اختر إحدى الطريقتين التاليتين:
                  </p>
                </div>
              </div>

              {/* Method 1: Push via Personal Access Token */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-[11px]">
                      1
                    </span>
                    <span>الرفع المباشر عبر رمز المصادقة (GitHub Personal Access Token):</span>
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  نظراً لأن GitHub يطلب توثيقاً آمناً (Personal Access Token)، يمكنك ربط رمز الوصول الخاص بك وتشغيل الأمر التالي:
                </p>
                <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto flex items-center justify-between gap-2" dir="ltr">
                  <code>git remote set-url origin https://&lt;YOUR_TOKEN&gt;@github.com/YENENIDCRAD26/Kipord.git && git push -u origin main</code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('git remote set-url origin https://<YOUR_TOKEN>@github.com/YENENIDCRAD26/Kipord.git && git push -u origin main');
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] shrink-0 flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>نسخ</span>
                  </button>
                </div>
              </div>

              {/* Method 2: AI Studio Built-in Export */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-[11px]">
                    2
                  </span>
                  <span>التصدير السريع التلقائي عبر قائمة Google AI Studio:</span>
                </h4>
                <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                  <p>• اضغط على أيقونة الإعدادات <strong>(Settings / Share)</strong> بأعلى يمين شاشة الاستوديو.</p>
                  <p>• اختر <strong>"Export to GitHub"</strong> لربط حساب GitHub ومزامنة المستودع بنقرة واحدة دون الحاجة لكتابة كلمات مرور.</p>
                  <p>• أو اختر <strong>"Download ZIP"</strong> لتحميل الحزمة كاملة على جهازك وفتحها في Android Studio لبناء APK نهائي.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cli' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-50/80 border border-purple-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-purple-900 text-sm">
                    بناء APK عبر Google Bubblewrap (الأداة الرسمية من Google Chrome)
                  </h3>
                  <p className="text-purple-800 text-xs mt-1 leading-relaxed">
                    إذا كان لديك سطر الأوامر (Terminal)، يمكنك إنشاء حزمة Android APK موقّعة وجاهزة فوراً باستخدام أداة Google الرسمية الموجهة لتطبيقات TWA/WebAPK.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-slate-700 text-xs">أمر البناء الفوري:</label>
                <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto flex items-center justify-between gap-2" dir="ltr">
                  <code>npx @bubblewrap/cli init --manifest={appUrl}/manifest.json</code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`npx @bubblewrap/cli init --manifest=${appUrl}/manifest.json\nnpx @bubblewrap/cli build`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] shrink-0 flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>نسخ</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto" dir="ltr">
                  <code>npx @bubblewrap/cli build</code>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="px-4 sm:px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Smartphone className="w-3.5 h-3.5 text-blue-600" />
            <span>يدعم أجهزة سامسونج وشاومي وهواوي وجميع هواتف أندرويد الحديثة</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 font-semibold text-slate-800 transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
