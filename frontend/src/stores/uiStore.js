import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUIStore = create(
  persist(
    (set) => ({
      currentSection: 'dashboard',
      setCurrentSection: (section) => set({ currentSection: section }),
    }),
    { name: 'gym-dashboard-ui' }
  )
)