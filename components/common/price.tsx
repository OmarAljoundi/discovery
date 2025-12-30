'use client'
import { FC } from 'react'
import { useCurrency, Currency } from '@/hooks/use-currency'
import { cn } from '@/lib/utils'

interface PriceProps {
  amount: number
  fromCurrency?: Currency
  className?: string
  showSymbol?: boolean
}

const Price: FC<PriceProps> = ({ amount, fromCurrency = 'OMR', className, showSymbol = true }) => {
  const { formatPrice, convertPrice, mounted } = useCurrency()

  if (!mounted) {
    return <span className={cn('font-bold', className)}>{amount.toFixed(2)} ر.ع</span>
  }

  if (showSymbol) {
    return <span className={cn('font-bold', className)}>{formatPrice(amount, fromCurrency)}</span>
  }

  return <span className={cn('font-bold', className)}>{convertPrice(amount, fromCurrency).toFixed(2)}</span>
}

export default Price
