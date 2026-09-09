import { ArrowRight, Eye, EyeOff, Fingerprint, ShieldAlert, Smartphone } from 'lucide-react'
import type { GameRound } from '../types/game'

export function PassPhoneScreen({ round, playerIndex, onReveal }: { round: GameRound; playerIndex: number; onReveal: () => void }) {
  const player = round.players[playerIndex]
  return (
    <section className="center-screen enter-up">
      <div className="progress-dots" aria-label={`Lojtari ${playerIndex + 1} nga ${round.players.length}`}>{round.players.map((item, index) => <span key={item.id} className={index < playerIndex ? 'done' : index === playerIndex ? 'current' : ''} />)}</div>
      <div className="phone-orbit"><Smartphone /><span /></div>
      <span className="eyebrow">TELEFONI TE</span><h2>{player.name}</h2>
      <p>Sigurohu që askush tjetër nuk po e sheh ekranin.</p>
      <div className="privacy-note"><Fingerprint /> Roli yt shfaqet vetëm për ty.</div>
      <button className="primary-action" onClick={onReveal}>Shiko rolin tim <ArrowRight /></button>
    </section>
  )
}

export function RoleRevealScreen({ round, playerIndex, visible, onToggle, onSeen }: { round: GameRound; playerIndex: number; visible: boolean; onToggle: () => void; onSeen: () => void }) {
  const player = round.players[playerIndex]
  return (
    <section className="center-screen role-screen enter-up">
      <span className="eyebrow">ROLI I {player.name.toLocaleUpperCase('sq')}</span>
      <button className={`secret-card ${visible ? 'revealed' : ''} ${player.isImposter ? 'imposter-card' : 'crew-card'}`} onClick={onToggle} aria-pressed={visible}>
        {!visible ? <><EyeOff size={42} /><strong>Prek për ta zbuluar</strong><span>Kontrollo që je vetëm</span></> : player.isImposter ? <><ShieldAlert size={48} /><span>Ti je</span><strong>IMPOSTERI</strong><small>Hint-i yt</small><b>{round.word.hint}</b></> : <><Eye size={44} /><span>Fjala sekrete</span><strong>{round.word.word}</strong><small>Mos e thuaj me zë.</small></>}
      </button>
      <p className="tap-hint">{visible ? 'Prek kartën për ta fshehur përsëri.' : 'Informacioni është i fshehur.'}</p>
      <button className="primary-action" disabled={!visible} onClick={onSeen}>E pashë <ArrowRight /></button>
    </section>
  )
}
