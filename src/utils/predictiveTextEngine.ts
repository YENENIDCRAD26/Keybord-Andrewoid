import { getWordSuggestions } from './predictiveText';

export interface TextSuggestion {
  text: string;
  type?: 'word' | 'formula' | 'shortcut';
  score?: number;
}

export function getPredictiveSuggestions(
  buffer: string,
  language: 'ar' | 'en' = 'ar',
  mode: 'word' | 'excel' = 'word',
  limit: number = 6
): TextSuggestion[] {
  if (!buffer || !buffer.trim()) {
    return [];
  }

  // If in excel mode and user started typing a formula (=)
  if (mode === 'excel' && buffer.trim().startsWith('=')) {
    const raw = buffer.trim().toUpperCase();
    const formulas = ['=SUM(', '=AVERAGE(', '=COUNT(', '=IF(', '=VLOOKUP(', '=MAX(', '=MIN('];
    const matched = formulas.filter(f => f.startsWith(raw));
    if (matched.length > 0) {
      return matched.map((f: string) => ({ text: f, type: 'formula' }));
    }
  }

  const rawWords: string[] = getWordSuggestions(buffer, buffer.length, language, limit);
  return rawWords.map((word: string) => ({
    text: word,
    type: 'word',
  }));
}
