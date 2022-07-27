import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// @ts-ignore - getting some errors in the config but compiles???
export default defineConfig(({ mode }) => {
  if (mode === 'production') {
    return {
      plugins: [react()],
      base: '/browser-fs/'
    }
  }
  return { plugins: [react()] }
})
