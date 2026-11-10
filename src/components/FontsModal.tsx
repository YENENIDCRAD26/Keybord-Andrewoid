import React, { useState, useMemo } from 'react';
import { Search, Check, X, Type, Sparkles } from 'lucide-react';
import { FontItem } from '../types';
import { APPROVED_FONTS } from '../data/fonts';

interface FontsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFontId: string;
  onSelectFont: (font: FontItem) => void;
  currentFontSize: number;
  onFontSizeChange: (size: number) => void;
}

export const FontsModal: React.FC<FontsModalProps> = ({
  isOpen,
  onClose,
  selectedFontId,
  onSelectFont,
  currentFontSize,
  onFontSizeChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'arabic-traditional' | 'arabic-modern' | 'kufi-ruqaa' | 'standard'>('all');

  const filteredFonts = useMemo(() => {
    return APPROVED_FONTS.filter((font) => {
      const matchesSearch =
        font.nameArabic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        font.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
        font.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab = activeTab === 'all' || font.category === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  if (!isOpen) return null;

  return (
    <div
      id="fonts-modal-backdrop"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-xs transition-opacity p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        id="fonts-modal-container"
        className="w-full sm:max-w-xl max-h-[85vh] sm:max-h-[80vh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in fade-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Top Header matching Screenshot */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                قائمة الخطوط المعتمدة
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full border border-blue-200">
              18 خط
            </span>
            <button
              id="close-fonts-modal-btn"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar matching screenshot */}
        <div className="p-3 border-b border-slate-100 bg-white">
          <div className="relative">
            <input
              id="font-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن خط عربي أو إنجليزي..."
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              الكل (18)
            </button>
            <button
              onClick={() => setActiveTab('arabic-traditional')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === 'arabic-traditional'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              عربي أصيل
            </button>
            <button
              onClick={() => setActiveTab('arabic-modern')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === 'arabic-modern'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              حديث وعصري
            </button>
            <button
              onClick={() => setActiveTab('kufi-ruqaa')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === 'kufi-ruqaa'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              كوفي ورقعة
            </button>
            <button
              onClick={() => setActiveTab('standard')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === 'standard'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              قياسي / عالمي
            </button>
          </div>
        </div>

        {/* Quick Font Size adjustment bar */}
        <div className="px-4 py-2 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span className="font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            حجم الخط الفعّال في المستند والكيبورد:
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onFontSizeChange(Math.max(12, currentFontSize - 2))}
              className="w-6 h-6 rounded bg-white border border-slate-300 flex items-center justify-center hover:bg-slate-100 font-bold"
              title="تصغير"
            >
              -
            </button>
            <span className="font-bold text-blue-700 w-10 text-center">{currentFontSize} بكسل</span>
            <button
              onClick={() => onFontSizeChange(Math.min(48, currentFontSize + 2))}
              className="w-6 h-6 rounded bg-white border border-slate-300 flex items-center justify-center hover:bg-slate-100 font-bold"
              title="تكبير"
            >
              +
            </button>
          </div>
        </div>

        {/* Font List matching Screenshot */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 divide-y divide-slate-100">
          {filteredFonts.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Type className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>لم يتم العثور على خط يطابق بحثك</p>
            </div>
          ) : (
            filteredFonts.map((font) => {
              const isSelected = font.id === selectedFontId;
              return (
                <div
                  key={font.id}
                  id={`font-item-${font.id}`}
                  onClick={() => {
                    onSelectFont(font);
                    onClose();
                  }}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all border pt-3 ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-200 shadow-xs'
                      : 'border-transparent hover:bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-slate-900">
                          {font.nameArabic} ({font.nameEnglish} - {font.description})
                        </h3>
                      </div>
                      <p
                        className="mt-1.5 text-slate-700 transition-all select-none"
                        style={{
                          fontFamily: font.fontFamily,
                          fontSize: `${Math.max(18, currentFontSize)}px`,
                          lineHeight: '1.6',
                        }}
                      >
                        بسم الله الرحمن الرحيم - أبجد هوز
                      </p>
                    </div>

                    {isSelected && (
                      <div className="mt-1 text-blue-600 bg-white p-1 rounded-full shadow-xs border border-blue-200">
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer info */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 text-center text-xs text-slate-500">
          يتم تفعيل الخط فوراً على لوحة المفاتيح وصندوق التحرير والنصوص المكتوبة
        </div>
      </div>
    </div>
  );
};
