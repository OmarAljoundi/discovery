import { QueryString } from '@/lib/utils'
import { create } from 'zustand'

interface useFilterCustomerStore {
  filters?: QueryString
  onCreate: (filters: QueryString) => void
  onDestroy: () => void
}

export const useFilterCustomer = create<useFilterCustomerStore>((set) => ({
  filters: undefined,
  onCreate: (filters: QueryString) => set({ filters: filters }),
  onDestroy: () => set({ filters: undefined }),
}))
