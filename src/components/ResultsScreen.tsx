import { ArrowRight, Home, RotateCcw, ShieldAlert, Sparkles, Trophy, Users } from 'lucide-react'
import type { GameRound } from '../types/game'

export function ResultsScreen({ round, votes, onReplay, onSettings, onHome }: { round: GameRound; votes: number[]; onReplay: () => void; onSettings: () => void; onHome: () => void }) {
  const imposters = round.players.filter((player) => player.isImposter)
  const crewWon = imposters.every((player) => votes.includes(player.id))
  return (
    <section className="results-panel enter-up">
      <div className={`result-emblem ${crewWon ? 'win' : 'loss'}`}>{crewWon ? <Trophy /> : <ShieldAlert />}</div>
      <span className="eyebrow">REZULTATI</span><h2>{crewWon ? 'E kapët!' : 'Imposteri fitoi!'}</h2><p>{crewWon ? 'Grupi e lexoi lojën saktë.' : 'Imposteri u përzie pa u zbuluar.'}</p>
      <div className="reveal-grid"><article><span><Sparkles /> Fjala sekrete</span><strong>{round.word.word}</strong><small>{round.word.category} · {round.word.difficulty === 'easy' ? 'E lehtë' : round.word.difficulty === 'medium' ? 'Mesatare' : 'E vështirë'}</small></article><article><span><ShieldAlert /> Hint-i</span><strong className="hint-result">{round.word.hint}</strong></article></div>
      <div className="imposter-list"><span><Users /> {imposters.length === 1 ? 'Imposteri ishte' : 'Impostorët ishin'}</span>{imposters.map((player) => <strong key={player.id}>{player.name}</strong>)}</div>
      <button className="primary-action" onClick={onReplay}>Luaj përsëri <RotateCcw /></button>
      <div className="secondary-actions"><button onClick={onSettings}>Ndrysho cilësimet <ArrowRight /></button><button onClick={onHome}><Home /> Kryefaqja</button></div>
    </section>
  )
}
