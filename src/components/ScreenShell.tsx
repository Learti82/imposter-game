import type { ReactNode } from 'react'
import { Eye, Volume2, VolumeX } from 'lucide-react'

export function ScreenShell({ children, muted, onToggleMute, compact = false }: { children: ReactNode; muted: boolean; onToggleMute: () => void; compact?: boolean }) {
  return (
    <main className={`app-shell ${compact ? 'compact-shell' : ''}`}>
      <div className="noise" />
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <div className="mini-brand"><span><Eye size={18} /></span> IMPOSTORI</div>
        <button className="icon-button" onClick={onToggleMute} aria-label={muted ? 'Aktivizo zërin' : 'Çaktivizo zërin'}>{muted ? <VolumeX size={20} /> : <Volume2 size={20} />}</button>
      </header>
      <div className="screen-content">{children}</div>
    </main>
  )
}
