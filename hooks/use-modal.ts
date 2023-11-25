import { create } from 'zustand'

export interface useModalProp {
  isOpenTourType: boolean
  isOpenDestination: boolean
  isOpenDestinationTours: boolean
  isOpenSlide: boolean
  isOpenFaq: boolean
  isOpen: boolean
  isOpenHotel: boolean
  isCustomer: boolean
  isOpenCustomerReview: boolean
  data?: any
  onOpen: (data?: any) => void
  onOpenTourType: (data?: any) => void
  onOpenSlide: (data?: any) => void
  onOpenDestination: (data?: any) => void
  onOpenHotel: (data?: any) => void
  onOpenFaq: (data?: any) => void
  onOpenCustomerReview: (data?: any) => void
  onOpenDestinationTours: (data?: any) => void
  onOpenCustomer: (tourId: any) => void
  onClose: () => void
}

export const useModal = create<useModalProp>((set) => ({
  isOpen: false,
  isOpenHotel: false,
  isOpenTourType: false,
  isOpenDestination: false,
  isOpenDestinationTours: false,
  isCustomer: false,
  isOpenSlide: false,
  isOpenCustomerReview: false,
  isOpenFaq: false,
  onOpenHotel: (data?: any) => set({ isOpenHotel: true, data: data }),
  onOpenFaq: (data?: any) => set({ isOpenFaq: true, data: data }),
  onOpenCustomerReview: (data?: any) => set({ isOpenCustomerReview: true, data: data }),
  onOpenDestinationTours: (data?: any) => set({ isOpenDestinationTours: true, data: data }),
  onOpenDestination: (data?: any) => set({ isOpenDestination: true, data: data }),
  onOpenSlide: (data?: any) => set({ isOpenSlide: true, data: data }),
  onOpen: (data?: any) => set({ isOpen: true, data: data }),
  onOpenTourType: (data?: any) => set({ isOpenTourType: true, data: data }),
  onOpenCustomer: (tourId: any) => set({ isCustomer: true, data: tourId }),
  onClose: () =>
    set({
      isOpenFaq: false,
      isOpenCustomerReview: false,
      isOpenDestinationTours: false,
      isCustomer: false,
      isOpenTourType: false,
      isOpenDestination: false,
      isOpen: false,
      data: undefined,
      isOpenSlide: false,
      isOpenHotel: false,
    }),
}))
