import type { GameSettings, GameStats } from '../types/game'

const KEYS = {
  settings: 'impostori:settings:v1',
  recentWords: 'impostori:recent-words:v1',
  stats: 'impostori:stats:v1',
} as const

export const DEFAULT_SETTINGS: GameSettings = {
  playerCount: 7,
  imposterCount: 2,
  category: 'Të gjitha kategoritë',
  difficulty: 'random',
  discussionSeconds: 180,
  customNames: false,
  playerNames: Array.from({ length: 15 }, (_, index) => `Lojtari ${index + 1}`),
  muted: false,
}

export const EMPTY_STATS: GameStats = { gamesPlayed: 0, crewWins: 0, imposterWins: 0, categories: {} }

function read<T>(key: string, fallback: T): T {
  try {
    if (typeof localStorage === 'undefined') return fallback
    const value = localStorage.getItem(key)
    return value ? { ...fallback, ...JSON.parse(value) } : fallback
  } catch {
    return fallback
  }
}

export const storage = {
  getSettings: () => read(KEYS.settings, DEFAULT_SETTINGS),
  saveSettings: (value: GameSettings) => {
    if (typeof localStorage !== 'undefined') localStorage.setItem(KEYS.settings, JSON.stringify(value))
  },
  getRecentWords: (): number[] => {
    try {
      if (typeof localStorage === 'undefined') return []
      return JSON.parse(localStorage.getItem(KEYS.recentWords) ?? '[]')
    }
    catch { return [] }
  },
  rememberWord: (id: number) => {
    if (typeof localStorage === 'undefined') return
    const recent = storage.getRecentWords().filter((item) => item !== id)
    localStorage.setItem(KEYS.recentWords, JSON.stringify([id, ...recent].slice(0, 80)))
  },
  getStats: () => read(KEYS.stats, EMPTY_STATS),
  saveStats: (value: GameStats) => {
    if (typeof localStorage !== 'undefined') localStorage.setItem(KEYS.stats, JSON.stringify(value))
  },
}
