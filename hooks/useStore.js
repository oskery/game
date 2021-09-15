import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      uid: null,
      setUid: (uid) => set((state) => ({ uid })),
      jumps: 0,
      increaseJumps: () => set((state) => ({ jumps: state.jumps + 1 })),
      pos: [0, 0, 0],
      setPos: (pos) => set(() => ({ pos }))
    }),
    {
      name: 'game'
    }
  )
)
