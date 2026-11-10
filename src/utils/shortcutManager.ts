// Comprehensive Word & Excel Shortcuts and Editing Utilities for Samsung Note 10+ Keyboard

export interface ShortcutDefinition {
  id: string;
  keys: string;
  titleArabic: string;
  descriptionArabic: string;
  category: 'common' | 'word' | 'excel';
  icon: string;
}

export const SHORTCUTS_LIST: ShortcutDefinition[] = [
  // 1. المشتركة (Word & Excel)
  {
    id: 'new_doc',
    keys: 'Ctrl + N',
    titleArabic: 'مستند أو مصنف جديد',
    descriptionArabic: 'فتح مستند جديد أو مصنف جديد وتفريغ صفحة العمل',
    category: 'common',
    icon: '📄',
  },
  {
    id: 'open_file',
    keys: 'Ctrl + O',
    titleArabic: 'فتح ملف محفوظ',
    descriptionArabic: 'فتح ملف محفوظ من الذاكرة أو استيراد ملف خارجي',
    category: 'common',
    icon: '📂',
  },
  {
    id: 'save_doc',
    keys: 'Ctrl + S',
    titleArabic: 'حفظ الملف أو المستند',
    descriptionArabic: 'حفظ التعديلات وتنزيل نسخة احتياطية من المستند',
    category: 'common',
    icon: '💾',
  },
  {
    id: 'print_doc',
    keys: 'Ctrl + P',
    titleArabic: 'طباعة المستند أو ورقة العمل',
    descriptionArabic: 'إرسال المستند أو ورقة العمل للطباعة أو التصدير PDF',
    category: 'common',
    icon: '🖨️',
  },
  {
    id: 'copy_text',
    keys: 'Ctrl + C',
    titleArabic: 'نسخ النص أو الخلايا',
    descriptionArabic: 'نسخ النص المحدد أو محتوى المحرر إلى الحافظة',
    category: 'common',
    icon: '📋',
  },
  {
    id: 'cut_text',
    keys: 'Ctrl + X',
    titleArabic: 'قص المحدد',
    descriptionArabic: 'قص النص المحدد إلى الحافظة وحذفه من المستند',
    category: 'common',
    icon: '✂️',
  },
  {
    id: 'paste_text',
    keys: 'Ctrl + V',
    titleArabic: 'لصق المحتوى',
    descriptionArabic: 'لصق المحتوى المنسوخ من الحافظة في موضع المؤشر',
    category: 'common',
    icon: '📥',
  },
  {
    id: 'select_all',
    keys: 'Ctrl + A',
    titleArabic: 'تحديد الكل',
    descriptionArabic: 'تحديد النص بالكامل أو كافة بيانات ورقة العمل',
    category: 'common',
    icon: '🔲',
  },
  {
    id: 'undo',
    keys: 'Ctrl + Z',
    titleArabic: 'التراجع',
    descriptionArabic: 'التراجع عن الإجراء الأخير واستعادة الحالة السابقة',
    category: 'common',
    icon: '↩️',
  },
  {
    id: 'redo',
    keys: 'Ctrl + Y',
    titleArabic: 'إعادة الإجراء',
    descriptionArabic: 'إعادة تنفيذ الإجراء الذي تم التراجع عنه',
    category: 'common',
    icon: '↪️',
  },
  {
    id: 'search',
    keys: 'Ctrl + F',
    titleArabic: 'البحث عن نص أو بيانات',
    descriptionArabic: 'فتح نافذة البحث السريع عن الكلمات أو الأرقام',
    category: 'common',
    icon: '🔍',
  },
  {
    id: 'replace',
    keys: 'Ctrl + H',
    titleArabic: 'البحث والاستبدال',
    descriptionArabic: 'فتح نافذة البحث واستبدال النصوص والبيانات',
    category: 'common',
    icon: '🔄',
  },

  // 2. اختصارات تنسيق النصوص (Word)
  {
    id: 'bold',
    keys: 'Ctrl + B',
    titleArabic: 'خط غامق (Bold)',
    descriptionArabic: 'جعل النص غامقاً أو العودة للخط العادي',
    category: 'word',
    icon: '𝗕',
  },
  {
    id: 'italic',
    keys: 'Ctrl + I',
    titleArabic: 'خط مائل (Italic)',
    descriptionArabic: 'جعل النص مائلاً أو العودة للوضع العادي',
    category: 'word',
    icon: '𝐼',
  },
  {
    id: 'underline',
    keys: 'Ctrl + U',
    titleArabic: 'تسطير (Underline)',
    descriptionArabic: 'وضع خط تحت النص المحدد أو تفعيل التسطير',
    category: 'word',
    icon: '<u>U</u>',
  },
  {
    id: 'spell_check',
    keys: 'F7',
    titleArabic: 'التدقيق الإملائي والنحوي',
    descriptionArabic: 'إجراء فحص إملائي ونحوي دقيق للنص والهمزات',
    category: 'word',
    icon: '📖',
  },

  // 3. اختصارات خاصة بإكسل (Excel)
  {
    id: 'edit_cell',
    keys: 'F2',
    titleArabic: 'تحرير الخلية / المحرر',
    descriptionArabic: 'تحرير الخلية المحددة أو التركيز على موضع الكتابة',
    category: 'excel',
    icon: '✏️',
  },
  {
    id: 'toggle_filters',
    keys: 'Ctrl + Shift + L',
    titleArabic: 'تفعيل/إلغاء التصفية (Filters)',
    descriptionArabic: 'تفعيل أو إلغاء عوامل تصفية الجداول وفرز البيانات',
    category: 'excel',
    icon: '⚡',
  },
  {
    id: 'insert_date',
    keys: 'Ctrl + ;',
    titleArabic: 'إدراج التاريخ الحالي',
    descriptionArabic: 'إدراج تاريخ اليوم في الخلية أو موضع المؤشر',
    category: 'excel',
    icon: '📅',
  },
  {
    id: 'insert_time',
    keys: 'Ctrl + Shift + :',
    titleArabic: 'إدراج الوقت الحالي',
    descriptionArabic: 'إدراج توقيت الساعة الحالي في الخلية أو المؤشر',
    category: 'excel',
    icon: '⏰',
  },
  {
    id: 'auto_sum',
    keys: 'Alt + =',
    titleArabic: 'دالة التجميع التلقائي (AutoSum)',
    descriptionArabic: 'إدراج دالة الجمع التلقائي =SUM() وحساب الأرقام فورياً',
    category: 'excel',
    icon: '∑',
  },
];

// Helper to get formatted current date
export function getFormattedCurrentDate(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper to get formatted current time
export function getFormattedCurrentTime(): string {
  const d = new Date();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// Helper to calculate or insert AutoSum from text
export function generateAutoSumSnippet(currentText: string, cursorPos: number): string {
  // Look for numbers before cursor or in the preceding lines
  const textBefore = currentText.slice(0, cursorPos);
  const lines = textBefore.split('\n');
  const recentLines = lines.slice(-5);
  const numbersFound: number[] = [];

  for (const line of recentLines) {
    const matches = line.match(/-?\d+(\.\d+)?/g);
    if (matches) {
      for (const m of matches) {
        const val = parseFloat(m);
        if (!isNaN(val)) numbersFound.push(val);
      }
    }
  }

  if (numbersFound.length >= 2) {
    const total = numbersFound.reduce((acc, n) => acc + n, 0);
    return ` =SUM(${numbersFound.join(', ')}) = [${total}] `;
  }

  return ` =SUM() `;
}

// Arabic spell and grammar inspector
export interface SpellCheckIssue {
  original: string;
  suggestion: string;
  type: 'hamza' | 'taa' | 'punctuation' | 'yaa' | 'space';
  reason: string;
  index: number;
}

export function analyzeArabicSpellAndGrammar(text: string): SpellCheckIssue[] {
  const issues: SpellCheckIssue[] = [];
  if (!text.trim()) return issues;

  // 1. Common Hamza corrections
  const hamzaRules = [
    { wrong: /\bالى\b/g, fixed: 'إلى', reason: 'همزة قطع مكسورة أسفل الألف' },
    { wrong: /\bاذا\b/g, fixed: 'إذا', reason: 'همزة قطع مكسورة' },
    { wrong: /\bان\b/g, fixed: 'إن', reason: 'همزة قطع مكسورة' },
    { wrong: /\bاحمد\b/g, fixed: 'أحمد', reason: 'اسم علم يبدأ بهمزة قطع مفتوحة' },
    { wrong: /\bابراهيم\b/g, fixed: 'إبراهيم', reason: 'همزة قطع مكسورة' },
    { wrong: /\bاسماعيل\b/g, fixed: 'إسماعيل', reason: 'همزة قطع مكسورة' },
    { wrong: /\bايام\b/g, fixed: 'أيام', reason: 'همزة قطع مفتوحة' },
    { wrong: /\bاكثر\b/g, fixed: 'أكثر', reason: 'همزة قطع على وزن أفعل' },
    { wrong: /\bافضل\b/g, fixed: 'أفضل', reason: 'همزة قطع على وزن أفعل' },
    { wrong: /\bاول\b/g, fixed: 'أول', reason: 'همزة قطع مفتوحة' },
    { wrong: /\bامكانية\b/g, fixed: 'إمكانية', reason: 'همزة قطع مكسورة لمصدر إفعلال' },
    { wrong: /\bاعلان\b/g, fixed: 'إعلان', reason: 'همزة قطع مكسورة لمصدر أعلن' },
    { wrong: /\bقران\b/g, fixed: 'قرآن', reason: 'ألف مد ممدودة' },
  ];

  for (const rule of hamzaRules) {
    let match: RegExpExecArray | null;
    while ((match = rule.wrong.exec(text)) !== null) {
      issues.push({
        original: match[0],
        suggestion: rule.fixed,
        type: 'hamza',
        reason: rule.reason,
        index: match.index,
      });
    }
  }

  // 2. Punctuation spacing (e.g. " ، " => "، ")
  const punctRules = [
    { wrong: /\s+([،؛.؟!])/g, fixed: '$1 ', reason: 'عدم ترك مسافة قبل علامة الترقيم' },
    { wrong: /([،؛.؟!])([^\s\d،؛.؟!])/g, fixed: '$1 $2', reason: 'وجوب وضع مسافة بعد علامة الترقيم' },
  ];

  for (const rule of punctRules) {
    let match: RegExpExecArray | null;
    while ((match = rule.wrong.exec(text)) !== null) {
      issues.push({
        original: match[0],
        suggestion: match[0].replace(rule.wrong, rule.fixed),
        type: 'punctuation',
        reason: rule.reason,
        index: match.index,
      });
    }
  }

  // 3. Taa Marbouta vs Haa (Common checks)
  const taaRules = [
    { wrong: /\bمدرسه\b/g, fixed: 'مدرسة', reason: 'تاء مربوطة وليست هاء' },
    { wrong: /\bجامعه\b/g, fixed: 'جامعة', reason: 'تاء مربوطة وليست هاء' },
    { wrong: /\bشركه\b/g, fixed: 'شركة', reason: 'تاء مربوطة وليست هاء' },
    { wrong: /\bحياه\b/g, fixed: 'حياة', reason: 'تاء مربوطة وليست هاء' },
    { wrong: /\bخدمه\b/g, fixed: 'خدمة', reason: 'تاء مربوطة وليست هاء' },
    { wrong: /\bطريقه\b/g, fixed: 'طريقة', reason: 'تاء مربوطة وليست هاء' },
  ];

  for (const rule of taaRules) {
    let match: RegExpExecArray | null;
    while ((match = rule.wrong.exec(text)) !== null) {
      issues.push({
        original: match[0],
        suggestion: rule.fixed,
        type: 'taa',
        reason: rule.reason,
        index: match.index,
      });
    }
  }

  // Sort by index ascending
  return issues.sort((a, b) => a.index - b.index);
}
