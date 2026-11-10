export interface EmojiCategory {
  id: string;
  nameArabic: string;
  emojis: string[];
}

export interface SymbolCategory {
  id: string;
  nameArabic: string;
  symbols: { char: string; name: string }[];
}

export interface ShapeItem {
  id: string;
  nameArabic: string;
  svgIcon: string;
  textSnippet: string;
  type: 'box' | 'divider' | 'badge' | 'arrow' | 'callout';
}

export const EMOJI_CATEGORIES: EmojiCategory[] = [
  {
    id: 'smileys',
    nameArabic: 'وجوه ومشاعـر 😀',
    emojis: [
      '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
      '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😋',
      '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐',
      '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌',
      '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧',
      '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐'
    ]
  },
  {
    id: 'gestures',
    nameArabic: 'أيدي وإشارات 👍',
    emojis: [
      '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉',
      '👆', '👇', '☝️', '✋', '🤚', '🖐️', '🖖', '👋', '🤙', '💪',
      '🙏', '🤝', '👏', '🙌', '👐', '🤲', '✍️', '💅', '🤳', '👂'
    ]
  },
  {
    id: 'hearts_stars',
    nameArabic: 'قلوب ونجوم ❤️',
    emojis: [
      '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
      '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '⭐',
      '🌟', '✨', '⚡', '🔥', '💥', '☀️', '🌙', '💫', '🎉', '🎊'
    ]
  },
  {
    id: 'work_tools',
    nameArabic: 'أعمال ومستندات 📁',
    emojis: [
      '📝', '📄', '📁', '📂', '📑', '📊', '📈', '📉', '📋', '📌',
      '📍', '📎', '📏', '📐', '✂️', '🖊️', '🖋️', '✒️', '✏️', '🖍️',
      '📱', '💻', '🖥️', '🖨️', '⌨️', '🖱️', '💾', '💿', '📀', '📞'
    ]
  },
  {
    id: 'status_badges',
    nameArabic: 'علامات وإشارات ✔️',
    emojis: [
      '✅', '☑️', '✔️', '❌', '❎', '➕', '➖', '➗', '✖️', '❓',
      '❔', '❕', '❗', '⚠️', '⛔', '🚫', '🔴', '🟢', '🔵', '🟡',
      '🟣', '🟠', '⚪', '⚫', '🔺', '🔻', '🔶', '🔷', '🔸', '🔹'
    ]
  }
];

export const SYMBOL_CATEGORIES: SymbolCategory[] = [
  {
    id: 'arabic_islamic',
    nameArabic: 'زخارف ورموز عربية وإسلامية 🕌',
    symbols: [
      { char: '﷽', name: 'البسملة كاملة' },
      { char: 'ﷻ', name: 'جل جلاله' },
      { char: 'ﷺ', name: 'صلى الله عليه وسلم' },
      { char: '۝', name: 'رمز نهاية الآية' },
      { char: '۞', name: 'رمز الحزب / الربع' },
      { char: '۩', name: 'رمز السجدة' },
      { char: '﴾', name: 'قوس قرآني أيمن' },
      { char: '﴿', name: 'قوس قرآني أيسر' },
      { char: '«', name: 'قوس تنصيص أيمن' },
      { char: '»', name: 'قوس تنصيص أيسر' },
      { char: '•', name: 'نقطة تعداد' },
      { char: '★', name: 'نجمة ممتلئة' },
      { char: '☆', name: 'نجمة مفرغة' },
      { char: '✦', name: 'نجمة براقة' },
      { char: '✧', name: 'نجمة بيضاء' },
      { char: '❂', name: 'زهرة شمس' },
      { char: '✿', name: 'وردة مفرغة' },
      { char: '❁', name: 'وردة ممتلئة' },
      { char: '❦', name: 'ورقة زخرفية' },
      { char: '❧', name: 'ورقة خضراء' },
      { char: '❈', name: 'زخرفة رباعية' },
      { char: '❉', name: 'زخرفة ثلجية' },
      { char: '❊', name: 'شعار مزخرف' },
      { char: '❋', name: 'زخرفة دائرية' }
    ]
  },
  {
    id: 'math_currency',
    nameArabic: 'رياضيات وعملات ﷼',
    symbols: [
      { char: '﷼', name: 'ريال' },
      { char: '$', name: 'دولار' },
      { char: '€', name: 'يورو' },
      { char: '£', name: 'جنيه استرليني' },
      { char: '¥', name: 'ين ياباني' },
      { char: 'د.إ', name: 'درهم إماراتي' },
      { char: 'د.ك', name: 'دينار كويتي' },
      { char: 'ج.م', name: 'جنيه مصري' },
      { char: '%', name: 'نسبة مئوية' },
      { char: '‰', name: 'في الألف' },
      { char: '±', name: 'زائد أو ناقص' },
      { char: '×', name: 'ضرب' },
      { char: '÷', name: 'قسمة' },
      { char: '=', name: 'يساوي' },
      { char: '≠', name: 'لا يساوي' },
      { char: '≈', name: 'تقريباً' },
      { char: '≤', name: 'أصغر من أو يساوي' },
      { char: '≥', name: 'أكبر من أو يساوي' },
      { char: '√', name: 'جذر تربيعي' },
      { char: '∞', name: 'ما لا نهاية' },
      { char: 'π', name: 'باي' },
      { char: '∑', name: 'مجموع' },
      { char: '¼', name: 'ربع' },
      { char: '½', name: 'نصف' },
      { char: '¾', name: 'ثلاثة أرباع' },
      { char: '°', name: 'درجة' }
    ]
  },
  {
    id: 'arrows_pointers',
    nameArabic: 'أسهم ومؤشرات ➔',
    symbols: [
      { char: '➔', name: 'سهم عريض' },
      { char: '➜', name: 'سهم سميك' },
      { char: '➝', name: 'سهم اتجاه' },
      { char: '➞', name: 'سهم يمين' },
      { char: '➡', name: 'سهم أبيض وأسود' },
      { char: '⬅', name: 'سهم يسار' },
      { char: '⬆', name: 'سهم أعلى' },
      { char: '⬇', name: 'سهم أسفل' },
      { char: '↗', name: 'سهم شمال شرق' },
      { char: '↘', name: 'سهم جنوب شرق' },
      { char: '↙', name: 'سهم جنوب غرب' },
      { char: '↖', name: 'سهم شمال غرب' },
      { char: '⇄', name: 'سهمين متبادلين' },
      { char: '⇅', name: 'سهمين متعاكسين رأسي' },
      { char: '⇆', name: 'سهمين متعاكسين أفقي' },
      { char: '↺', name: 'دوران عكس عقارب الساعة' },
      { char: '↻', name: 'دوران مع عقارب الساعة' },
      { char: '►', name: 'مثلث يمين' },
      { char: '◄', name: 'مثلث يسار' },
      { char: '▲', name: 'مثلث أعلى' },
      { char: '▼', name: 'مثلث أسفل' }
    ]
  }
];

export const SHAPES_LIST: ShapeItem[] = [
  {
    id: 'shape-divider-ornate',
    nameArabic: 'خط فاصل زخرفي ذهبي',
    svgIcon: 'divider-ornate',
    textSnippet: '\n──────── ✤ ✤ ────────\n',
    type: 'divider'
  },
  {
    id: 'shape-divider-stars',
    nameArabic: 'فاصل نجوم مذهبة',
    svgIcon: 'divider-stars',
    textSnippet: '\n★ ★ ★ ━━━━━━━━ ★ ★ ★\n',
    type: 'divider'
  },
  {
    id: 'shape-divider-islamic',
    nameArabic: 'فاصل قوسي إسلامي',
    svgIcon: 'divider-islamic',
    textSnippet: '\n═══ ﴿ ۞ ﴾ ═══\n',
    type: 'divider'
  },
  {
    id: 'shape-box-notice',
    nameArabic: 'مربع تنبيه وتأكيد',
    svgIcon: 'box-notice',
    textSnippet: '\n┌────────────────────────────┐\n│ 💡 ملاحظة هامة:            │\n│                            │\n└────────────────────────────┘\n',
    type: 'box'
  },
  {
    id: 'shape-badge-approved',
    nameArabic: 'شعار معتمد ومصدق',
    svgIcon: 'badge-approved',
    textSnippet: '【 معتمد ومصدق رسمياً ✓ 】',
    type: 'badge'
  },
  {
    id: 'shape-badge-confidential',
    nameArabic: 'شعار سري وهام',
    svgIcon: 'badge-confidential',
    textSnippet: '【 سري للغاية وشخصي 🔒 】',
    type: 'badge'
  },
  {
    id: 'shape-bullet-arrow',
    nameArabic: 'نقطة تعداد سهمية',
    svgIcon: 'bullet-arrow',
    textSnippet: '  ⯈ ',
    type: 'arrow'
  },
  {
    id: 'shape-bullet-star',
    nameArabic: 'نقطة تعداد نجمية',
    svgIcon: 'bullet-star',
    textSnippet: '  ✦ ',
    type: 'arrow'
  }
];
