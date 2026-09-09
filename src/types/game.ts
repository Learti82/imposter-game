export type Difficulty = 'easy' | 'medium' | 'hard'

export interface WordEntry {
  id: number
  word: string
  hint: string
  category: string
  difficulty: Difficulty
}

export interface GameSettings {
  playerCount: number
  imposterCount: number
  category: string
  difficulty: Difficulty | 'random'
  discussionSeconds: number
  customNames: boolean
  playerNames: string[]
  muted: boolean
}

export interface PlayerRole {
  id: number
  name: string
  isImposter: boolean
}

export interface GameRound {
  word: WordEntry
  players: PlayerRole[]
}

export interface GameStats {
  gamesPlayed: number
  crewWins: number
  imposterWins: number
  categories: Record<string, number>
}

export type AppScreen = 'HOME' | 'SETUP' | 'PASS_PHONE' | 'ROLE_REVEAL' | 'DISCUSSION' | 'VOTING' | 'RESULTS'
