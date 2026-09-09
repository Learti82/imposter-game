type Cue = 'reveal' | 'start' | 'warning' | 'finish' | 'success'

const cueMap: Record<Cue, [number, number, OscillatorType]> = {
  reveal: [520, .08, 'sine'], start: [380, .12, 'triangle'], warning: [760, .06, 'square'],
  finish: [180, .35, 'sawtooth'], success: [640, .18, 'sine'],
}

export function playCue(cue: Cue, muted: boolean) {
  if (muted) return
  try {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const context = new AudioContextClass()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const [frequency, duration, type] = cueMap[cue]
    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, context.currentTime)
    gain.gain.setValueAtTime(.045, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + duration)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + duration)
    oscillator.addEventListener('ended', () => context.close())
  } catch { /* audio is an optional enhancement */ }
}

export function vibrate(pattern: number | number[]) {
  try { navigator.vibrate?.(pattern) } catch { /* unsupported */ }
}
