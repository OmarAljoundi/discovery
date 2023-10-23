'use client'
import TourCard from '@/components/common/tour-card'
import { getTours } from '@/lib/operations'
import BestTours from './(components)/best-tours'

export default function Home() {
  return (
    <div>
      <BestTours />
    </div>
  )
}
