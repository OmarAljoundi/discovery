import { cookies } from 'next/headers'

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

/**
 * Get the current currency from cookies (Server-side)
 * Use this in Server Components and Server Actions
 */
export function getCurrency(): Currency {
  const cookieStore = cookies()
  const currencyCookie = cookieStore.get('currency')
  const currency = currencyCookie?.value as Currency

  // Validate and return, default to OMR if invalid
  if (currency === 'OMR' || currency === 'BHD') {
    return currency
  }

  return 'OMR'
}

/**
 * Get currency information object (Server-side)
 */
export function getCurrencyInfo(): CurrencyInfo {
  const currency = getCurrency()
  return CURRENCY_DATA[currency]
}

/**
 * Convert price from one currency to another (Server-side)
 */
export function convertPrice(
  price: number,
  fromCurrency: Currency = 'OMR',
  toCurrency?: Currency
): number {
  const targetCurrency = toCurrency || getCurrency()

  // Convert from source currency to OMR first, then to target currency
  const priceInOMR = fromCurrency === 'OMR' ? price : price / CURRENCY_DATA[fromCurrency].rate
  const convertedPrice = priceInOMR * CURRENCY_DATA[targetCurrency].rate

  return Math.round(convertedPrice * 100) / 100 // Round to 2 decimal places
}

/**
 * Format price with currency symbol (Server-side)
 */
export function formatPrice(price: number, fromCurrency: Currency = 'OMR', toCurrency?: Currency): string {
  const targetCurrency = toCurrency || getCurrency()
  const currencyInfo = CURRENCY_DATA[targetCurrency]
  const convertedPrice = convertPrice(price, fromCurrency, targetCurrency)

  return `${convertedPrice.toFixed(2)} ${currencyInfo.symbol}`
}

/**
 * Get all available currencies
 */
export function getAllCurrencies(): CurrencyInfo[] {
  return Object.values(CURRENCY_DATA)
}

/**
 * Check if a currency code is valid
 */
export function isValidCurrency(code: string): code is Currency {
  return code === 'OMR' || code === 'BHD'
}
