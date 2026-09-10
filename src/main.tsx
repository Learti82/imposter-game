import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        updateViaCache: 'none',
      })

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        const refreshKey = 'impostori:sw-refreshed-v4'
        if (sessionStorage.getItem(refreshKey) === '1') return

        sessionStorage.setItem(refreshKey, '1')
        window.location.reload()
      })

      await registration.update()
    } catch {
      // The game remains fully playable if offline support cannot initialize.
    }
  })
}
