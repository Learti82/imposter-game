import { X } from 'lucide-react'

export function RulesModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <section className="modal-card enter-up" role="dialog" aria-modal="true" aria-labelledby="rules-title">
        <button className="modal-close" onClick={onClose} aria-label="Mbyll"><X /></button>
        <span className="eyebrow">RREGULLAT</span><h2 id="rules-title">Si luhet?</h2>
        <p>Të gjithë lojtarët, përveç impostorit, marrin të njëjtën fjalë. Imposteri merr vetëm një hint.</p>
        <ol><li>Kalojeni telefonin dhe shikoni rolin fshehurazi.</li><li>Përshkruajeni fjalën pa e thënë drejtpërdrejt.</li><li>Imposteri përpiqet të përshtatet dhe ta kuptojë fjalën.</li><li>Votoni personin që mendoni se po shtiret.</li></ol>
        <button className="primary-action" onClick={onClose}>E kuptova</button>
      </section>
    </div>
  )
}
