import type { WordEntry } from '../types/game'
import { GENERATED_WORD_ROWS } from './generatedDictionary'

const EXTRA_WORDS: Omit<WordEntry, 'id'>[] = [
  {
    word: 'doktor',
    hint: 'Kujdeset për shëndetin e njerëzve.',
    category: 'Profesione',
    difficulty: 'easy',
  },
]

export const WORD_DATABASE: WordEntry[] = [
  ...EXTRA_WORDS,
  ...GENERATED_WORD_ROWS.map(([word, hint, category, difficulty]) => ({
    word,
    hint,
    category,
    difficulty,
  })),
].map((entry, index) => ({ ...entry, id: index + 1 }))

export const CATEGORIES = [...new Set(WORD_DATABASE.map((entry) => entry.category))]
  .sort((a, b) => a.localeCompare(b, 'sq'))
