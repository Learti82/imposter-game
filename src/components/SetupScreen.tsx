import { ArrowLeft, ArrowRight, Minus, Plus, Shield, Timer, UserRound, Users } from 'lucide-react'
import { CATEGORIES, WORD_DATABASE } from '../data/wordSeeds'
import { GameEngine } from '../lib/GameEngine'
import type { Difficulty, GameSettings } from '../types/game'

const timers = [60, 120, 180, 300, 420, 600]
const difficultyLabels: Record<Difficulty | 'random', string> = { easy: 'E lehtë', medium: 'Mesatare', hard: 'E vështirë', random: 'Random' }

function Counter({ value, min, max, onChange }: { value: number; min: number; max: number; onChange: (value: number) => void }) {
  return <div className="counter"><button onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Zvogëlo"><Minus /></button><strong>{value}</strong><button onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="Rrit"><Plus /></button></div>
}

export function SetupScreen({ settings, onChange, onBack, onStart }: { settings: GameSettings; onChange: (settings: GameSettings) => void; onBack: () => void; onStart: () => void }) {
  const maxImposters = GameEngine.maxImposters(settings.playerCount)
  const changePlayers = (playerCount: number) => onChange({ ...settings, playerCount, imposterCount: Math.min(settings.imposterCount, GameEngine.maxImposters(playerCount)) })
  return (
    <section className="setup-panel enter-up">
      <button className="back-button" onClick={onBack}><ArrowLeft /> Kthehu</button>
      <div className="section-heading"><span className="eyebrow">PËRGATIT LOJËN</span><h2>Kush po luan?</h2><p>Vendosni grupin dhe atmosferën e raundit.</p></div>
      <div className="setting-card">
        <div className="setting-top"><div className="setting-label"><span><Users /></span><div><strong>Lojtarë</strong><small>Nga 3 deri në 15 persona</small></div></div><Counter value={settings.playerCount} min={3} max={15} onChange={changePlayers} /></div>
        <div className="setting-divider" />
        <div className="setting-top"><div className="setting-label"><span className="danger-icon"><Shield /></span><div><strong>Impostorë</strong><small>Maksimumi {maxImposters} për këtë grup</small></div></div><Counter value={settings.imposterCount} min={1} max={maxImposters} onChange={(imposterCount) => onChange({ ...settings, imposterCount })} /></div>
      </div>
      <div className="setting-card stack-card">
        <label className="field-label" htmlFor="category">Kategoria <small>{WORD_DATABASE.length.toLocaleString('sq-AL')} terma</small></label>
        <select id="category" value={settings.category} onChange={(event) => onChange({ ...settings, category: event.target.value })}><option>Të gjitha kategoritë</option>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select>
        <span className="field-label">Vështirësia</span>
        <div className="segmented four">{(Object.keys(difficultyLabels) as (Difficulty | 'random')[]).map((level) => <button key={level} className={settings.difficulty === level ? 'active' : ''} onClick={() => onChange({ ...settings, difficulty: level })}>{difficultyLabels[level]}</button>)}</div>
      </div>
      <div className="setting-card stack-card">
        <div className="field-label"><span><Timer size={17} /> Koha e diskutimit</span><strong>{Math.round(settings.discussionSeconds / 60)} min</strong></div>
        <div className="timer-options">{timers.map((seconds) => <button key={seconds} className={settings.discussionSeconds === seconds ? 'active' : ''} onClick={() => onChange({ ...settings, discussionSeconds: seconds })}>{seconds / 60}m</button>)}</div>
        <label className="custom-time">Kohë custom <input type="number" min="1" max="30" value={Math.round(settings.discussionSeconds / 60)} onChange={(event) => onChange({ ...settings, discussionSeconds: Math.max(1, Math.min(30, Number(event.target.value))) * 60 })} /> min</label>
      </div>
      <div className="setting-card stack-card">
        <div className="field-label"><span><UserRound size={17} /> Emrat</span></div>
        <div className="segmented"><button className={!settings.customNames ? 'active' : ''} onClick={() => onChange({ ...settings, customNames: false })}>Quick mode</button><button className={settings.customNames ? 'active' : ''} onClick={() => onChange({ ...settings, customNames: true })}>Emra custom</button></div>
        {settings.customNames && <div className="names-grid">{Array.from({ length: settings.playerCount }, (_, index) => <label key={index}><span>{index + 1}</span><input maxLength={20} value={settings.playerNames[index] ?? ''} placeholder={`Lojtari ${index + 1}`} onChange={(event) => { const playerNames = [...settings.playerNames]; playerNames[index] = event.target.value; onChange({ ...settings, playerNames }) }} /></label>)}</div>}
      </div>
      <button className="primary-action sticky-action" onClick={onStart}>Fillo lojën <ArrowRight /></button>
    </section>
  )
}
