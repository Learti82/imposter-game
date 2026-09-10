import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static PWA build deployed by Vercel.
export default defineConfig({
  plugins: [react()],
})
