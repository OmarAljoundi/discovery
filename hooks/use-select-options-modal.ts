import { ReactNode } from 'react'
import { create } from 'zustand'

export type SelectOptionsProps = {
  title: string
  action?: () => ReactNode
}

interface useSelectOptionStore {
  selectOptions: SelectOptionsProps[]
  action?: () => ReactNode
  onCreate: (filter: SelectOptionsProps[]) => void
}

export const useSelectOptionsModal = create<useSelectOptionStore>((set) => ({
  selectOptions: [],
  action: undefined,
  onCreate: (options: SelectOptionsProps[]) => set({ selectOptions: options }),
}))
