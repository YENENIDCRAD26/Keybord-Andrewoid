import React, { useState, useRef } from 'react';
import {
  X, Image as ImageIcon, Table as TableIcon, Smile, Sparkles, Shapes,
  Upload, Check, Plus, Trash2, Sliders, Type, AlignRight, AlignCenter, AlignLeft,
  Search, ShieldCheck
} from 'lucide-react';
import { DocImage, DocTable, InsertModalTab } from '../types';
import { EMOJI_CATEGORIES, SYMBOL_CATEGORIES, SHAPES_LIST } from '../data/symbolsAndShapes';

interface InsertMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab?: InsertModalTab;
  onInsertImage: (image: DocImage) => void;
  onInsertTable: (table: DocTable) => void;
  onInsertText: (snippet: string) => void;
}

// Sample presets for fast, convenient insertion on mobile
const PRESET_IMAGES = [
  {
    name: 'شعار ذهبي معتمد',
    url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&auto=format&fit=crop&q=80',
    caption: 'شعار التوثيق والاعتماد الرسمي',
  },
  {
    name: 'ختم رسمي أحمر',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop&q=80',
    caption: 'معتمد ومصدق رسمياً',
  },
  {
    name: 'خلفية وثيقة فاخرة',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop&q=80',
    caption: 'إطار وثيقة رسمية',
  }
];

export const InsertMediaModal: React.FC<InsertMediaModalProps> = ({
  isOpen,
  onClose,
  activeTab: initialTab = 'image',
  onInsertImage,
  onInsertTable,
  onInsertText,
}) => {
  const [tab, setTab] = useState<InsertModalTab>(initialTab);

  // Image insertion state
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [imageName, setImageName] = useState<string>('صورة جديدة');
  const [imageCaption, setImageCaption] = useState<string>('');
  const [imageWidth, setImageWidth] = useState<number>(75);
  const [imageAlign, setImageAlign] = useState<'right' | 'center' | 'left'>('center');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Table insertion state
  const [tableRows, setTableRows] = useState<number>(3);
  const [tableCols, setTableCols] = useState<number>(3);
  const [hasHeader, setHasHeader] = useState<boolean>(true);
  const [tableCaption, setTableCaption] = useState<string>('جدول البيانات');

  // Search filter for symbols/emojis
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeEmojiCategory, setActiveEmojiCategory] = useState<string>('smileys');
  const [activeSymbolCategory, setActiveSymbolCategory] = useState<string>('arabic_islamic');

  // Notification for fast insertion
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 1800);
  };

  if (!isOpen) return null;

  // Handle local file upload (drag or click)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviewUrl(reader.result as string);
        setImageName(file.name.replace(/\.[^/.]+$/, ''));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmInsertImage = () => {
    if (!imagePreviewUrl) return;
    const newImage: DocImage = {
      id: 'img_' + Date.now(),
      url: imagePreviewUrl,
      name: imageName || 'صورة المستند',
      caption: imageCaption || undefined,
      widthPercent: imageWidth,
      align: imageAlign,
    };
    onInsertImage(newImage);
    setImagePreviewUrl('');
    setImageCaption('');
    onClose();
  };

  const handleConfirmInsertTable = () => {
    const rows: string[][] = [];
    const headers: string[] = [];

    for (let c = 0; c < tableCols; c++) {
      headers.push(`عمود ${c + 1}`);
    }

    for (let r = 0; r < tableRows; r++) {
      const row: string[] = [];
      for (let c = 0; c < tableCols; c++) {
        row.push(r === 0 && !hasHeader ? `بيانات ${r + 1}-${c + 1}` : `بيانات`);
      }
      rows.push(row);
    }

    const newTable: DocTable = {
      id: 'tbl_' + Date.now(),
      rows,
      headers,
      hasHeader,
      caption: tableCaption || undefined,
    };

    onInsertTable(newTable);
    onClose();
  };

  const handleQuickInsert = (text: string, label: string) => {
    onInsertText(text);
    showToast(`تم إدراج ${label}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden text-slate-800"
        dir="rtl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                إدراج عناصر ومحتوى للمستند
              </h2>
              <p className="text-[11px] text-slate-500">
                صور، جداول، إيموجي، رموز وزخارف إسلامية وعربية
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-3 pt-2 bg-slate-100 border-b border-slate-200 overflow-x-auto scrollbar-none shrink-0 text-xs">
          <button
            onClick={() => setTab('image')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg font-bold transition-all border-b-2 whitespace-nowrap ${
              tab === 'image'
                ? 'bg-white border-blue-600 text-blue-700 shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>إدراج صورة</span>
          </button>

          <button
            onClick={() => setTab('table')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg font-bold transition-all border-b-2 whitespace-nowrap ${
              tab === 'table'
                ? 'bg-white border-blue-600 text-blue-700 shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>إدراج جدول</span>
          </button>

          <button
            onClick={() => setTab('symbol')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg font-bold transition-all border-b-2 whitespace-nowrap ${
              tab === 'symbol'
                ? 'bg-white border-blue-600 text-blue-700 shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>رموز وزخارف</span>
          </button>

          <button
            onClick={() => setTab('emoji')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg font-bold transition-all border-b-2 whitespace-nowrap ${
              tab === 'emoji'
                ? 'bg-white border-blue-600 text-blue-700 shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Smile className="w-3.5 h-3.5 text-yellow-500" />
            <span>إيموجي</span>
          </button>

          <button
            onClick={() => setTab('shape')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg font-bold transition-all border-b-2 whitespace-nowrap ${
              tab === 'shape'
                ? 'bg-white border-blue-600 text-blue-700 shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Shapes className="w-3.5 h-3.5 text-purple-600" />
            <span>أشكال وفواصل</span>
          </button>
        </div>

        {/* Tab Body Contents */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
          {/* Toast feedback */}
          {toastMsg && (
            <div className="sticky top-0 z-30 p-2 bg-emerald-600 text-white text-xs font-bold rounded-lg text-center shadow-md animate-in fade-in">
              {toastMsg}
            </div>
          )}

          {/* 1. IMAGE TAB */}
          {tab === 'image' && (
            <div className="space-y-4">
              {/* File upload drag & drop area */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-xl p-4 sm:p-6 bg-blue-50/40 hover:bg-blue-50/80 cursor-pointer flex flex-col items-center justify-center gap-2 text-center transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    اضغط لاختيار صورة من جهازك أو اسحبها هنا
                  </p>
                  <p className="text-xs text-slate-500">
                    يدعم JPG و PNG و WebP و GIF
                  </p>
                </div>
              </div>

              {/* Ready Presets */}
              <div>
                <p className="text-xs font-bold text-slate-600 mb-2">
                  أو اختر من النماذج الجاهزة السريعة:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setImagePreviewUrl(preset.url);
                        setImageName(preset.name);
                        setImageCaption(preset.caption);
                      }}
                      className="border rounded-xl p-2 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-right transition-all flex flex-col items-center gap-1.5"
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-full h-16 object-cover rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[11px] font-semibold text-slate-800 text-center line-clamp-1">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview and Adjustment Options */}
              {imagePreviewUrl && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <p className="text-xs font-bold text-slate-700">
                    معاينة وضبط الصورة قبل الإدراج:
                  </p>
                  <div className="flex justify-center bg-white p-2 border border-slate-200 rounded-lg">
                    <img
                      src={imagePreviewUrl}
                      alt="معاينة"
                      className="max-h-40 rounded object-contain"
                      style={{ width: `${imageWidth}%` }}
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">
                        تعليق توضيحي أسفل الصورة:
                      </label>
                      <input
                        type="text"
                        value={imageCaption}
                        onChange={(e) => setImageCaption(e.target.value)}
                        placeholder="اكتب وصفاً للصورة (اختياري)..."
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-medium mb-1">
                        محاذاة الصورة:
                      </label>
                      <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-lg p-1">
                        <button
                          onClick={() => setImageAlign('right')}
                          className={`flex-1 py-1 rounded text-center font-bold flex items-center justify-center gap-1 ${
                            imageAlign === 'right' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <AlignRight className="w-3 h-3" />
                          <span>يمين</span>
                        </button>
                        <button
                          onClick={() => setImageAlign('center')}
                          className={`flex-1 py-1 rounded text-center font-bold flex items-center justify-center gap-1 ${
                            imageAlign === 'center' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <AlignCenter className="w-3 h-3" />
                          <span>وسط</span>
                        </button>
                        <button
                          onClick={() => setImageAlign('left')}
                          className={`flex-1 py-1 rounded text-center font-bold flex items-center justify-center gap-1 ${
                            imageAlign === 'left' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <AlignLeft className="w-3 h-3" />
                          <span>يسار</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Width slider */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span>عرض الصورة في المستند:</span>
                      <span className="font-bold text-blue-700">{imageWidth}%</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="100"
                      step="5"
                      value={imageWidth}
                      onChange={(e) => setImageWidth(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>

                  <button
                    onClick={handleConfirmInsertImage}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-transform"
                  >
                    <Check className="w-4 h-4" />
                    <span>تأكيد وإدراج الصورة في المستند</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 2. TABLE TAB */}
          {tab === 'table' && (
            <div className="space-y-4">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900">
                <p className="font-bold mb-1">📊 إدراج جدول احترافي متجاوب:</p>
                <p className="text-emerald-800">
                  يمكنك تخصيص عدد الصفوف والأعمدة وإضافة صف عناوين ملوّن، مع إمكانية تعديل الخلايا مباشرة من لوحة المفاتيح.
                </p>
              </div>

              {/* Grid presets */}
              <div>
                <p className="text-xs font-bold text-slate-700 mb-2">
                  نماذج جداول سريعة شائعة:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { r: 2, c: 2, label: '2×2 مصغر' },
                    { r: 3, c: 3, label: '3×3 قياسي' },
                    { r: 4, c: 4, label: '4×4 متوسط' },
                    { r: 5, c: 3, label: '5×3 عمودي' },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setTableRows(preset.r);
                        setTableCols(preset.c);
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        tableRows === preset.r && tableCols === preset.c
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold ring-2 ring-emerald-200'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs'
                      }`}
                    >
                      <div className="text-sm font-bold">{preset.label}</div>
                      <div className="text-[10px] text-slate-500">
                        {preset.r} صفوف × {preset.c} أعمدة
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Rows & Columns inputs */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    عدد الصفوف (Rows):
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTableRows(Math.max(1, tableRows - 1))}
                      className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-300 font-bold hover:bg-slate-200"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={tableRows}
                      onChange={(e) => setTableRows(Math.max(1, Number(e.target.value)))}
                      className="w-full text-center py-1 border border-slate-300 rounded-lg font-bold"
                    />
                    <button
                      onClick={() => setTableRows(tableRows + 1)}
                      className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-300 font-bold hover:bg-slate-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    عدد الأعمدة (Columns):
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTableCols(Math.max(1, tableCols - 1))}
                      className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-300 font-bold hover:bg-slate-200"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={tableCols}
                      onChange={(e) => setTableCols(Math.max(1, Number(e.target.value)))}
                      className="w-full text-center py-1 border border-slate-300 rounded-lg font-bold"
                    />
                    <button
                      onClick={() => setTableCols(tableCols + 1)}
                      className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-300 font-bold hover:bg-slate-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Header Toggle and Caption */}
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={hasHeader}
                    onChange={(e) => setHasHeader(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 accent-emerald-600"
                  />
                  <span>تضمين صف عناوين بارز ومميز في أعلى الجدول</span>
                </label>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    عنوان أو وصف الجدول (اختياري):
                  </label>
                  <input
                    type="text"
                    value={tableCaption}
                    onChange={(e) => setTableCaption(e.target.value)}
                    placeholder="مثال: جدول مقارنة المواصفات..."
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Table Live Preview Grid */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <p className="text-xs font-bold text-slate-600">معاينة تخطيط الجدول:</p>
                <div className="border border-slate-300 rounded-lg overflow-x-auto bg-white">
                  <table className="w-full text-center text-xs border-collapse">
                    {hasHeader && (
                      <thead className="bg-emerald-600 text-white">
                        <tr>
                          {Array.from({ length: tableCols }).map((_, c) => (
                            <th key={c} className="p-1.5 border border-emerald-700 font-bold">
                              عمود {c + 1}
                            </th>
                          ))}
                        </tr>
                      </thead>
                    )}
                    <tbody>
                      {Array.from({ length: tableRows }).map((_, r) => (
                        <tr key={r} className={r % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          {Array.from({ length: tableCols }).map((_, c) => (
                            <td key={c} className="p-1.5 border border-slate-200 text-slate-600 text-[11px]">
                              خلية {r + 1}-{c + 1}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <button
                onClick={handleConfirmInsertTable}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-transform"
              >
                <Check className="w-4 h-4" />
                <span>إدراج الجدول في المستند</span>
              </button>
            </div>
          )}

          {/* 3. SYMBOLS TAB */}
          {tab === 'symbol' && (
            <div className="space-y-3">
              {/* Category selector */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs">
                {SYMBOL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveSymbolCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors ${
                      activeSymbolCategory === cat.id
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cat.nameArabic}
                  </button>
                ))}
              </div>

              {/* Symbols Grid */}
              {SYMBOL_CATEGORIES.filter((c) => c.id === activeSymbolCategory).map((cat) => (
                <div key={cat.id} className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {cat.symbols.map((sym, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickInsert(sym.char, sym.name)}
                      className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-amber-50 hover:border-amber-300 flex flex-col items-center justify-center gap-1 active:scale-95 transition-all shadow-2xs group"
                      title={sym.name}
                    >
                      <span className="text-xl sm:text-2xl font-bold group-hover:scale-110 transition-transform">
                        {sym.char}
                      </span>
                      <span className="text-[10px] text-slate-400 group-hover:text-amber-800 text-center truncate max-w-full">
                        {sym.name}
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* 4. EMOJIS TAB */}
          {tab === 'emoji' && (
            <div className="space-y-3">
              {/* Emoji category buttons */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs">
                {EMOJI_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveEmojiCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors ${
                      activeEmojiCategory === cat.id
                        ? 'bg-yellow-100 text-yellow-900 border border-yellow-300'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cat.nameArabic}
                  </button>
                ))}
              </div>

              {/* Emojis Grid */}
              {EMOJI_CATEGORIES.filter((c) => c.id === activeEmojiCategory).map((cat) => (
                <div key={cat.id} className="grid grid-cols-6 sm:grid-cols-10 gap-1.5 sm:gap-2">
                  {cat.emojis.map((emoji, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickInsert(emoji, 'إيموجي')}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-slate-200 bg-white hover:bg-yellow-50 hover:border-yellow-300 text-xl sm:text-2xl flex items-center justify-center active:scale-90 transition-all shadow-2xs"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* 5. SHAPES AND DIVIDERS TAB */}
          {tab === 'shape' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 font-medium">
                اضغط على أي شكل أو فاصل لإدراجه فورياً في النص:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SHAPES_LIST.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => handleQuickInsert(shape.textSnippet, shape.nameArabic)}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-purple-50 hover:border-purple-300 text-right transition-all shadow-2xs group flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-purple-900">
                        {shape.nameArabic}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-semibold">
                        {shape.type}
                      </span>
                    </div>
                    <pre className="text-[11px] bg-slate-50 p-1.5 rounded border border-slate-100 text-slate-600 font-mono overflow-x-auto whitespace-pre">
                      {shape.textSnippet.trim()}
                    </pre>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs">
          <span className="text-slate-500">
            مستند متوافق مع نظام أندرويد وهواتف سامسونج
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-bold"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
