import { Pause, Play, RotateCcw, Vote } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { playCue, vibrate } from '../lib/sound'

const formatTime = (seconds: number) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`

export function DiscussionScreen({ duration, muted, onVote }: { duration: number; muted: boolean; onVote: () => void }) {
  const [remaining, setRemaining] = useState(duration)
  const [running, setRunning] = useState(false)
  const warned = useRef(false)
  const finished = remaining === 0
  useEffect(() => { if (!running || finished) return; const interval = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000); return () => window.clearInterval(interval) }, [running, finished])
  useEffect(() => { if (remaining === 10 && !warned.current) { warned.current = true; playCue('warning', muted); vibrate([80, 60, 80]) } if (remaining === 0) { setRunning(false); playCue('finish', muted); vibrate([180, 80, 260]) } }, [remaining, muted])
  const toggle = () => { if (!running && remaining > 0) playCue('start', muted); setRunning((value) => !value) }
  const reset = () => { setRemaining(duration); setRunning(false); warned.current = false }
  return (
    <section className={`center-screen discussion-screen enter-up ${remaining <= 10 ? 'danger-time' : ''}`}>
      <span className="eyebrow">DISKUTIMI</span><h2>{finished ? 'Koha mbaroi!' : 'Kush po shtiret?'}</h2>
      <p>{finished ? 'Tani votoni impostorin.' : 'Përshkruajeni fjalën pa e thënë drejtpërdrejt.'}</p>
      <div className="timer-ring" style={{ '--progress': `${(remaining / duration) * 360}deg` } as CSSProperties}><div><strong>{formatTime(remaining)}</strong><span>{running ? 'në vazhdim' : finished ? 'mbaroi' : 'gati'}</span></div></div>
      <div className="timer-controls"><button className="round-button" onClick={reset} aria-label="Rifillo timer-in"><RotateCcw /></button><button className="play-button" onClick={toggle} disabled={finished} aria-label={running ? 'Ndalo përkohësisht' : 'Fillo'}>{running ? <Pause /> : <Play fill="currentColor" />}</button><button className="round-button" onClick={onVote} aria-label="Shko te votimi"><Vote /></button></div>
      {finished ? <button className="primary-action pulse" onClick={onVote}>Votoni impostorin <Vote /></button> : <button className="text-action" onClick={onVote}>Kalo te votimi më herët</button>}
    </section>
  )
}
