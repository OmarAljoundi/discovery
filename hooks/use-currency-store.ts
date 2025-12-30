'use client'
import { create } from 'zustand'

export type Currency = 'OMR' | 'BHD'

export interface CurrencyInfo {
  code: Currency
  name: string
  symbol: string
  rate: number
}

export const CURRENCY_DATA: Record<Currency, CurrencyInfo> = {
  OMR: {
    code: 'OMR',
    name: 'ريال عماني',
    symbol: 'ر.ع',
    rate: 1,
  },
  BHD: {
    code: 'BHD',
    name: 'دينار بحريني',
    symbol: 'د.ب',
    rate: 1.03,
  },
}

// Cookie helpers
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null

  const nameEQ = `${name}=`
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

const setCookie = (name: string, value: string, days: number = 365) => {
  if (typeof document === 'undefined') return

  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=/`
}

interface CurrencyStore {
  currency: Currency
  mounted: boolean
  setCurrency: (currency: Currency) => void
  initialize: () => void
  convertPrice: (price: number, fromCurrency?: Currency) => number
  formatPrice: (price: number, fromCurrency?: Currency) => string
  getCurrencyInfo: () => CurrencyInfo
}

export const useCurrencyStore = create<CurrencyStore>((set, get) => ({
  currency: 'OMR',
  mounted: false,

  initialize: () => {
    const savedCurrency = getCookie('currency')
    if (savedCurrency && (savedCurrency === 'OMR' || savedCurrency === 'BHD')) {
      set({ currency: savedCurrency as Currency, mounted: true })
    } else {
      set({ mounted: true })
    }
  },

  setCurrency: (currency: Currency) => {
    set({ currency })
    setCookie('currency', currency, 365)
  },

  getCurrencyInfo: () => {
    const { currency } = get()
    return CURRENCY_DATA[currency]
  },

  convertPrice: (price: number, fromCurrency: Currency = 'OMR') => {
    const { currency } = get()
    // Convert from source currency to OMR first, then to target currency
    const priceInOMR = fromCurrency === 'OMR' ? price : price / CURRENCY_DATA[fromCurrency].rate
    const convertedPrice = priceInOMR * CURRENCY_DATA[currency].rate

    return Math.round(convertedPrice * 100) / 100 // Round to 2 decimal places
  },

  formatPrice: (price: number, fromCurrency: Currency = 'OMR') => {
    const { convertPrice, getCurrencyInfo } = get()
    const convertedPrice = convertPrice(price, fromCurrency)
    const currencyInfo = getCurrencyInfo()

    return `${convertedPrice.toFixed(2)} ${currencyInfo.symbol}`
  },
}))
