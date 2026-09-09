import { ArrowRight, Check, Vote } from 'lucide-react'
import type { GameRound } from '../types/game'

export function VotingScreen({ round, selected, onToggle, onSubmit }: { round: GameRound; selected: number[]; onToggle: (id: number) => void; onSubmit: () => void }) {
  const target = round.players.filter((player) => player.isImposter).length
  return (
    <section className="setup-panel voting-panel enter-up">
      <div className="section-heading centered"><div className="vote-icon"><Vote /></div><span className="eyebrow">VOTIMI</span><h2>Kush është imposteri?</h2><p>Zgjidhni {target === 1 ? 'një person' : `${target} persona`}. Vendosni si grup.</p></div>
      <div className="vote-list">{round.players.map((player, index) => { const active = selected.includes(player.id); return <button key={player.id} className={active ? 'selected' : ''} onClick={() => onToggle(player.id)}><span>{index + 1}</span><strong>{player.name}</strong><i>{active ? <Check /> : null}</i></button> })}</div>
      <div className="selection-count"><span>{selected.length}/{target}</span> të zgjedhur</div>
      <button className="primary-action sticky-action" disabled={selected.length !== target} onClick={onSubmit}>Zbulo rezultatin <ArrowRight /></button>
    </section>
  )
}
