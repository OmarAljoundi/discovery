'use client'
import { useEffect } from 'react'
import { useCurrencyStore } from '@/hooks/use-currency-store'

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const initialize = useCurrencyStore((state) => state.initialize)
  const mounted = useCurrencyStore((state) => state.mounted)

  useEffect(() => {
    if (!mounted) {
      initialize()
    }
  }, [initialize, mounted])

  return <>{children}</>
}
