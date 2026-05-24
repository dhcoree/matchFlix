import { create } from 'zustand'
import type { Couple, CoupleMatch } from '@/types/couple'
import type { User } from '@/types/user'

interface CoupleState {
  couple: Couple | null
  partner: User | null
  matches: CoupleMatch[]
  setCouple: (couple: Couple | null) => void
  setPartner: (partner: User | null) => void
  addMatch: (match: CoupleMatch) => void
  setMatches: (matches: CoupleMatch[]) => void
}

export const useCoupleStore = create<CoupleState>((set) => ({
  couple: null,
  partner: null,
  matches: [],
  setCouple: (couple) => set({ couple }),
  setPartner: (partner) => set({ partner }),
  addMatch: (match) => set((state) => ({ matches: [match, ...state.matches] })),
  setMatches: (matches) => set({ matches }),
}))
