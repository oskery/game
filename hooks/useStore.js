import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      jumps: 0,
      increaseJumps: () => set((state) => ({ jumps: state.jumps + 1 }))
    }),
    {
      name: 'game'
    }
  )
)
