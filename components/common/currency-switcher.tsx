'use client'
import { FC } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCurrency } from '@/hooks/use-currency'
import { QueryClient, useQueryClient } from '@tanstack/react-query'

const CURRENCIES = [
  { code: 'OMR', name: 'ريال عماني', symbol: 'ر.ع' },
  { code: 'BHD', name: 'دينار بحريني', symbol: 'د.ب' },
]

interface CurrencySwitcherProps {
  variant?: 'default' | 'mobile'
}

const CurrencySwitcher: FC<CurrencySwitcherProps> = ({ variant = 'default' }) => {
  const { currency, setCurrency, mounted } = useCurrency()
  const queryClient = useQueryClient()

  const handleCurrencyChange = (value: string) => {
    if (value === 'OMR' || value === 'BHD') {
      setCurrency(value)
      queryClient.invalidateQueries()
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <Select value={currency} onValueChange={handleCurrencyChange}>
      <SelectTrigger className={variant === 'mobile' ? 'w-full' : 'w-[150px]'}>
        <SelectValue placeholder="اختر العملة" />
      </SelectTrigger>
      <SelectContent>
        {CURRENCIES.map((curr) => (
          <SelectItem key={curr.code} value={curr.code}>
            <div className="flex items-center gap-2">
              <span>{curr.symbol}</span>
              <span>{curr.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default CurrencySwitcher
