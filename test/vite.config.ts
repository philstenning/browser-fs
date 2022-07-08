import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
   if (mode === 'production') {
     return {
       plugins: [react()],
      //  base: '/browser-fs/'
     }
   }
  return { plugins: [react()] }
})
