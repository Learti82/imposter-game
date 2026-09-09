import { useEffect, useState } from 'react'
import { DiscussionScreen } from './components/DiscussionScreen'
import { HomeScreen } from './components/HomeScreen'
import { PassPhoneScreen, RoleRevealScreen } from './components/RoleScreens'
import { ResultsScreen } from './components/ResultsScreen'
import { RulesModal } from './components/RulesModal'
import { ScreenShell } from './components/ScreenShell'
import { SetupScreen } from './components/SetupScreen'
import { VotingScreen } from './components/VotingScreen'
import { GameEngine } from './lib/GameEngine'
import { playCue } from './lib/sound'
import { storage } from './lib/storage'
import type { AppScreen, GameRound, GameSettings, GameStats } from './types/game'

export function App() {
  const [screen, setScreen] = useState<AppScreen>('HOME')
  const [settings, setSettings] = useState<GameSettings>(() => storage.getSettings())
  const [stats, setStats] = useState<GameStats>(() => storage.getStats())
  const [round, setRound] = useState<GameRound | null>(null)
  const [playerIndex, setPlayerIndex] = useState(0)
  const [roleVisible, setRoleVisible] = useState(false)
  const [votes, setVotes] = useState<number[]>([])
  const [rulesOpen, setRulesOpen] = useState(false)

  useEffect(() => { storage.saveSettings(settings) }, [settings])

  const startRound = () => {
    const normalized = GameEngine.normalizeSettings(settings)
    setSettings(normalized)
    setRound(GameEngine.createRound(normalized))
    setPlayerIndex(0)
    setVotes([])
    setRoleVisible(false)
    setScreen('PASS_PHONE')
  }

  const finishRole = () => {
    setRoleVisible(false)
    if (!round || playerIndex >= round.players.length - 1) setScreen('DISCUSSION')
    else { setPlayerIndex((value) => value + 1); setScreen('PASS_PHONE') }
  }

  const toggleVote = (id: number) => {
    if (!round) return
    const max = round.players.filter((player) => player.isImposter).length
    setVotes((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < max ? [...current, id] : [...current.slice(1), id])
  }

  const revealResults = () => {
    if (!round) return
    const crewWon = round.players.filter((player) => player.isImposter).every((player) => votes.includes(player.id))
    const nextStats = {
      ...stats,
      gamesPlayed: stats.gamesPlayed + 1,
      crewWins: stats.crewWins + (crewWon ? 1 : 0),
      imposterWins: stats.imposterWins + (crewWon ? 0 : 1),
      categories: { ...stats.categories, [round.word.category]: (stats.categories[round.word.category] ?? 0) + 1 },
    }
    setStats(nextStats)
    storage.saveStats(nextStats)
    playCue(crewWon ? 'success' : 'finish', settings.muted)
    setScreen('RESULTS')
  }

  const toggleMute = () => setSettings((value) => ({ ...value, muted: !value.muted }))

  return (
    <ScreenShell muted={settings.muted} onToggleMute={toggleMute} compact={screen !== 'HOME'}>
      {screen === 'HOME' && <HomeScreen stats={stats} onStart={() => setScreen('SETUP')} onRules={() => setRulesOpen(true)} />}
      {screen === 'SETUP' && <SetupScreen settings={settings} onChange={setSettings} onBack={() => setScreen('HOME')} onStart={startRound} />}
      {screen === 'PASS_PHONE' && round && <PassPhoneScreen round={round} playerIndex={playerIndex} onReveal={() => { setRoleVisible(false); setScreen('ROLE_REVEAL'); playCue('reveal', settings.muted) }} />}
      {screen === 'ROLE_REVEAL' && round && <RoleRevealScreen round={round} playerIndex={playerIndex} visible={roleVisible} onToggle={() => { setRoleVisible((value) => !value); playCue('reveal', settings.muted) }} onSeen={finishRole} />}
      {screen === 'DISCUSSION' && <DiscussionScreen duration={settings.discussionSeconds} muted={settings.muted} onVote={() => setScreen('VOTING')} />}
      {screen === 'VOTING' && round && <VotingScreen round={round} selected={votes} onToggle={toggleVote} onSubmit={revealResults} />}
      {screen === 'RESULTS' && round && <ResultsScreen round={round} votes={votes} onReplay={startRound} onSettings={() => setScreen('SETUP')} onHome={() => setScreen('HOME')} />}
      {rulesOpen && <RulesModal onClose={() => setRulesOpen(false)} />}
    </ScreenShell>
  )
}
