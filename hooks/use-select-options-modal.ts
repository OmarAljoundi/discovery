import { FunctionKeys } from '@/lib/utils'
import { ReactNode } from 'react'
import { create } from 'zustand'
import { useModalProp } from './use-modal'

export type SelectOptionsProps = {
  title: string
  action?: FunctionKeys<useModalProp>
  link?: string
  requireSelections: boolean
}

interface useSelectOptionStore {
  selectOptions: SelectOptionsProps[]
  onCreate: (filter: SelectOptionsProps[]) => void
}

export const useSelectOptionsModal = create<useSelectOptionStore>((set) => ({
  selectOptions: [],
  onCreate: (options: SelectOptionsProps[]) => set({ selectOptions: options }),
}))
