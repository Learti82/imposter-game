import type { GameRound, GameSettings, PlayerRole } from '../types/game'
import { shuffle } from './random'
import { WordEngine } from './WordEngine'

export class GameEngine {
  static maxImposters(playerCount: number): number {
    return Math.max(1, Math.min(5, Math.floor((playerCount - 1) / 2)))
  }

  static normalizeSettings(settings: GameSettings): GameSettings {
    const playerCount = Math.max(3, Math.min(15, settings.playerCount))
    return {
      ...settings,
      playerCount,
      imposterCount: Math.max(1, Math.min(settings.imposterCount, this.maxImposters(playerCount))),
      discussionSeconds: Math.max(30, Math.min(30 * 60, settings.discussionSeconds)),
    }
  }

  static createRound(rawSettings: GameSettings): GameRound {
    const settings = this.normalizeSettings(rawSettings)
    const names = Array.from({ length: settings.playerCount }, (_, index) => {
      const custom = settings.playerNames[index]?.trim()
      return settings.customNames && custom ? custom : `Lojtari ${index + 1}`
    })
    const imposterIds = new Set(shuffle(names.map((_, index) => index)).slice(0, settings.imposterCount))
    const players: PlayerRole[] = names.map((name, id) => ({ id, name, isImposter: imposterIds.has(id) }))
    return {
      word: WordEngine.getRandomWord({ category: settings.category, difficulty: settings.difficulty }),
      players,
    }
  }
}
