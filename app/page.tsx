'use client'
import { useEffect } from 'react'
import BestTours from './(components)/best-tours'
import HeroSection from './(components)/hero-section'
import { useFilterCustomer } from '@/hooks/use-customer-filter'

export default function Home() {
  const filter = useFilterCustomer()
  useEffect(() => {
    window.scroll({
      behavior: 'instant',
      left: 0,
      top: 0,
    })
    filter.onDestroy()
  }, [])
  return (
    <div>
      <HeroSection />
      <BestTours />
    </div>
  )
}
