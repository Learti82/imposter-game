import { describe, expect, it } from 'vitest'
import { GameEngine } from './GameEngine'
import { DEFAULT_SETTINGS } from './storage'

describe('GameEngine', () => {
  it('kufizon impostorët në kombinime të luajtshme', () => {
    expect(GameEngine.maxImposters(3)).toBe(1)
    expect(GameEngine.maxImposters(6)).toBe(2)
    expect(GameEngine.maxImposters(15)).toBe(5)
  })

  it('gjeneron numrin e saktë të roleve', () => {
    const round = GameEngine.createRound({ ...DEFAULT_SETTINGS, playerCount: 8, imposterCount: 3 })
    expect(round.players).toHaveLength(8)
    expect(round.players.filter((player) => player.isImposter)).toHaveLength(3)
  })
})
