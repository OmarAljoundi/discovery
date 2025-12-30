'use client'
import { useEffect } from 'react'
import { useCurrencyStore, Currency, CurrencyInfo, CURRENCY_DATA } from './use-currency-store'

export type { Currency, CurrencyInfo }
export { CURRENCY_DATA }

export const useCurrency = () => {
  const currency = useCurrencyStore((state) => state.currency)
  const mounted = useCurrencyStore((state) => state.mounted)
  const setCurrency = useCurrencyStore((state) => state.setCurrency)
  const convertPrice = useCurrencyStore((state) => state.convertPrice)
  const formatPrice = useCurrencyStore((state) => state.formatPrice)
  const getCurrencyInfo = useCurrencyStore((state) => state.getCurrencyInfo)
  const initialize = useCurrencyStore((state) => state.initialize)

  useEffect(() => {
    if (!mounted) {
      initialize()
    }
  }, [mounted, initialize])

  const currencyInfo = getCurrencyInfo()

  return {
    currency,
    currencyInfo,
    convertPrice,
    formatPrice,
    mounted,
    setCurrency,
  }
}
