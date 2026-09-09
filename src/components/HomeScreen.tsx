import { ArrowRight, Eye, HelpCircle, ShieldQuestion, Sparkles, Trophy, Users } from 'lucide-react'
import type { GameStats } from '../types/game'

export function HomeScreen({ stats, onStart, onRules }: { stats: GameStats; onStart: () => void; onRules: () => void }) {
  return (
    <section className="home-card enter-up">
      <header className="brand-row"><div className="brand-mark"><Eye size={23} strokeWidth={2.4} /></div><span>IMPOSTORI</span></header>
      <div className="status-pill"><Sparkles size={15} /> Party game në shqip</div>
      <h1>Gjeje kush<br /><em>po shtiret.</em></h1>
      <p className="lede">Një fjalë. Disa lojtarë. Dikush s’e di. Kalojeni telefonin dhe mos u zbuloni.</p>
      <button className="primary-action" onClick={onStart}>Fillo lojën <ArrowRight size={22} /></button>
      <div className="feature-grid">
        <div><Users /><strong>3–15</strong><span>Lojtarë</span></div>
        <div><ShieldQuestion /><strong>1–5</strong><span>Impostorë</span></div>
      </div>
      {stats.gamesPlayed > 0 && <div className="mini-stat"><Trophy size={16} /> {stats.gamesPlayed} lojëra · {stats.crewWins} fitore të ekipit</div>}
      <button className="text-action" onClick={onRules}><HelpCircle size={17} /> Si luhet?</button>
    </section>
  )
}
