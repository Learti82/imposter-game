import { WORD_DATABASE } from '../data/wordSeeds'
import type { Difficulty, WordEntry } from '../types/game'
import { randomInt, shuffle } from './random'
import { storage } from './storage'

export class WordEngine {
  static getRandomWord(options: { category: string; difficulty: Difficulty | 'random' }): WordEntry {
    const { category, difficulty } = options
    let pool = WORD_DATABASE.filter((entry) =>
      (category === 'Të gjitha kategoritë' || entry.category === category)
      && (difficulty === 'random' || entry.difficulty === difficulty),
    )

    if (!pool.length) pool = WORD_DATABASE

    const recentIds = new Set(storage.getRecentWords())
    const fresh = pool.filter((entry) => !recentIds.has(entry.id))
    const candidates = fresh.length >= Math.min(12, pool.length) ? fresh : pool
    const shuffled = shuffle(candidates)
    const shortlist = shuffled.slice(0, Math.min(24, shuffled.length))
    const selected = shortlist[randomInt(shortlist.length)]
    storage.rememberWord(selected.id)
    return selected
  }
}
