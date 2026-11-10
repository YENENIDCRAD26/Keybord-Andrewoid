// Intelligent word prediction dictionaries and n-gram suggestions for Arabic and English

export interface SuggestionItem {
  word: string;
  isCompletion?: boolean;
}

// Common Arabic dictionary and predictive words
const ARABIC_COMMON_WORDS: string[] = [
  // Greetings & Religious
  'بسم', 'الله', 'الرحمن', 'الرحيم', 'السلام', 'عليكم', 'ورحمة', 'وبركاته', 'الحمد', 'لله', 'رب', 'العالمين',
  'صلى', 'عليه', 'وسلم', 'سبحان', 'أستغفر', 'تبارك', 'إن', 'شاء', 'ما', 'لا', 'إله', 'إلا',
  // Common pronouns & particles
  'في', 'من', 'على', 'إلى', 'عن', 'مع', 'هذا', 'هذه', 'ذلك', 'تلك', 'التي', 'الذي', 'الذين',
  'هو', 'هي', 'هم', 'نحن', 'أنا', 'أنت', 'أنتم', 'كل', 'بعض', 'غير', 'بين', 'حيث', 'كيف',
  'ماذا', 'لماذا', 'متى', 'أين', 'هل', 'نعم', 'كلا', 'بل', 'لكن', 'لأن', 'حتى', 'إذا', 'لو',
  // Verbs & Nouns
  'شكراً', 'جزيلاً', 'أهلاً', 'وسهلاً', 'مرحباً', 'صباح', 'الخير', 'مساء', 'النور',
  'كتابة', 'رسالة', 'مستند', 'خط', 'كلمة', 'جملة', 'تطبيق', 'هاتف', 'أندرويد', 'لوحة', 'مفاتيح',
  'كيبورد', 'جميل', 'ممتاز', 'سريع', 'ذكي', 'جديد', 'عمل', 'مشروع', 'مطور', 'موقع',
  'جامعة', 'مدرسة', 'طالب', 'أستاذ', 'دكتور', 'سعادة', 'المحترم', 'الموقر', 'تحياتي',
  'تقديري', 'احترامي', 'أرجو', 'أتمنى', 'أشكركم', 'بالتوفيق', 'مبارك', 'تهانينا',
  'اليوم', 'أمس', 'غداً', 'الآن', 'دائماً', 'أبداً', 'كثيراً', 'قليلاً', 'جداً',
  'العمل', 'العلم', 'الحياة', 'الوقت', 'الأمر', 'الناس', 'العالم', 'الدولة', 'الوطن',
  'العربية', 'السعودية', 'مصر', 'الإمارات', 'الكويت', 'قطر', 'عمان', 'الأردن', 'العراق'
];

// Common bigrams/contextual predictions for Arabic
const ARABIC_PAIRS: Record<string, string[]> = {
  'بسم': ['الله', 'الشعب', 'الوطن'],
  'الله': ['الرحمن', 'أكبر', 'تعالى', 'يبارك', 'يحفظك', 'يجزيك', 'المستعان'],
  'الرحمن': ['الرحيم'],
  'السلام': ['عليكم', 'ورحمة', 'العالمي'],
  'عليكم': ['ورحمة', 'السلام', 'جميعاً'],
  'ورحمة': ['الله'],
  'وبركاته': ['أما', 'بعد', 'وتحياتي'],
  'الحمد': ['لله', 'والشكر'],
  'لله': ['رب', 'تعالى', 'دائماً', 'وحده'],
  'رب': ['العالمين', 'اشرح', 'اغفر'],
  'العالمين': ['والصلاة', 'حمداً', 'كثيراً'],
  'صلى': ['الله'],
  'إن': ['شاء', 'الله', 'كنت', 'هذا'],
  'شاء': ['الله'],
  'صباح': ['الخير', 'النور', 'الورد', 'الياسمين'],
  'مساء': ['الخير', 'النور', 'السعادة'],
  'شكراً': ['جزيلاً', 'لك', 'لكم', 'على'],
  'جزيلاً': ['لك', 'لكم', 'على', 'جهودكم'],
  'أهلاً': ['وسهلاً', 'بك', 'بكم'],
  'وسهلاً': ['بكم', 'فيكم'],
  'سعادة': ['الأستاذ', 'الدكتور', 'المدير', 'الرئيس'],
  'الأستاذ': ['المحترم', 'الفاضل', 'الدكتور'],
  'المحترم': ['السلام', 'تحية', 'وبعد'],
  'تحياتي': ['الطيبه', 'واحترامي', 'وتقديري'],
  'لوحة': ['مفاتيح', 'التحكم', 'الكيبورد'],
  'مفاتيح': ['الجوال', 'ذكية', 'أندرويد'],
  'في': ['هذا', 'كل', 'الوقت', 'العمل', 'المستقبل', 'اليوم'],
  'من': ['أجل', 'خلال', 'هذا', 'فضلك', 'هنا'],
  'على': ['هذا', 'الخير', 'كل', 'النبي', 'التواصل'],
  'إلى': ['لقاء', 'الأمام', 'خير', 'السيد'],
  'هذا': ['الأمر', 'اليوم', 'التطبيق', 'المشروع', 'العمل'],
  'هذه': ['الرسالة', 'الخدمة', 'الفكرة', 'المعلومات'],
};

// Common English words
const ENGLISH_COMMON_WORDS: string[] = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
  'hello', 'thanks', 'thank', 'welcome', 'keyboard', 'android', 'phone', 'smart', 'font'
];

const ENGLISH_PAIRS: Record<string, string[]> = {
  'thank': ['you', 'very', 'much'],
  'thanks': ['for', 'a', 'lot'],
  'how': ['are', 'is', 'to', 'can'],
  'are': ['you', 'there', 'we', 'they'],
  'you': ['are', 'have', 'can', 'will', 'know'],
  'good': ['morning', 'afternoon', 'evening', 'night', 'job'],
  'i': ['am', 'have', 'will', 'can', 'think', 'would'],
  'in': ['the', 'this', 'a', 'my', 'our'],
  'on': ['the', 'my', 'your', 'this'],
  'to': ['the', 'be', 'have', 'do', 'get'],
  'we': ['are', 'will', 'have', 'can'],
  'what': ['is', 'are', 'do', 'time'],
};

// Helper: Strip Arabic diacritics / tashkeel for clean matching
function normalizeArabic(text: string): string {
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '') // remove tashkeel
    .replace(/[إأآا]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي');
}

/**
 * Get predictive suggestions based on current full text and cursor position
 */
export function getWordSuggestions(
  fullText: string,
  cursorPos: number,
  lang: 'ar' | 'en' = 'ar',
  maxSuggestions = 5
): string[] {
  const textBeforeCursor = fullText.slice(0, cursorPos);
  if (!textBeforeCursor) {
    return lang === 'ar'
      ? ['بسم', 'السلام', 'شكراً', 'أهلاً', 'مرحباً']
      : ['Hello', 'Thanks', 'Good', 'How', 'Please'];
  }

  // Check if cursor is right after a whitespace or punctuation
  const lastChar = textBeforeCursor.slice(-1);
  const isAfterSpace = /\s/.test(lastChar);

  // Split tokens before cursor
  const words = textBeforeCursor.trim().split(/\s+/);
  const currentToken = isAfterSpace ? '' : (words[words.length - 1] || '');
  const previousToken = isAfterSpace
    ? (words[words.length - 1] || '')
    : (words[words.length - 2] || '');

  const suggestions: string[] = [];

  // Case 1: User is currently typing a word (currentToken is not empty)
  // We want to auto-complete this word
  if (currentToken.length > 0) {
    if (lang === 'ar') {
      const normCurrent = normalizeArabic(currentToken);
      // Find matching words from dictionary
      for (const word of ARABIC_COMMON_WORDS) {
        const normWord = normalizeArabic(word);
        if (normWord.startsWith(normCurrent) && normWord !== normCurrent) {
          suggestions.push(word);
          if (suggestions.length >= maxSuggestions) break;
        }
      }

      // If we don't have enough, check if previous word has predictions starting with this
      if (previousToken && ARABIC_PAIRS[previousToken]) {
        for (const nextW of ARABIC_PAIRS[previousToken]) {
          const normW = normalizeArabic(nextW);
          if (normW.startsWith(normCurrent) && !suggestions.includes(nextW)) {
            suggestions.unshift(nextW);
          }
        }
      }
    } else {
      const lower = currentToken.toLowerCase();
      for (const word of ENGLISH_COMMON_WORDS) {
        if (word.startsWith(lower) && word !== lower) {
          suggestions.push(word);
          if (suggestions.length >= maxSuggestions) break;
        }
      }
      if (previousToken && ENGLISH_PAIRS[previousToken.toLowerCase()]) {
        for (const nextW of ENGLISH_PAIRS[previousToken.toLowerCase()]) {
          if (nextW.startsWith(lower) && !suggestions.includes(nextW)) {
            suggestions.unshift(nextW);
          }
        }
      }
    }
  } else {
    // Case 2: User just finished typing a word and pressed space (next-word prediction)
    if (lang === 'ar') {
      if (previousToken && ARABIC_PAIRS[previousToken]) {
        suggestions.push(...ARABIC_PAIRS[previousToken]);
      }
      // Fill remaining with popular words
      for (const w of ARABIC_COMMON_WORDS) {
        if (!suggestions.includes(w)) {
          suggestions.push(w);
          if (suggestions.length >= maxSuggestions) break;
        }
      }
    } else {
      const prevLower = previousToken.toLowerCase();
      if (prevLower && ENGLISH_PAIRS[prevLower]) {
        suggestions.push(...ENGLISH_PAIRS[prevLower]);
      }
      for (const w of ENGLISH_COMMON_WORDS) {
        if (!suggestions.includes(w)) {
          suggestions.push(w);
          if (suggestions.length >= maxSuggestions) break;
        }
      }
    }
  }

  // Fallbacks if fewer than 3
  if (suggestions.length < 3) {
    const defaults = lang === 'ar'
      ? ['الله', 'في', 'على', 'شكراً', 'نعم']
      : ['you', 'the', 'is', 'for', 'are'];
    for (const d of defaults) {
      if (!suggestions.includes(d)) suggestions.push(d);
      if (suggestions.length >= maxSuggestions) break;
    }
  }

  return suggestions.slice(0, maxSuggestions);
}
