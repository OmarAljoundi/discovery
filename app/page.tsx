import { getDestination, getTourTypes, getTours } from '@/lib/operations'
import HeroSection from './(components)/(hero)/hero-section'
import BestToursList from './(components)/(second)/best-tours-list'

export default async function Home() {
  var response = await Promise.all([getDestination(), getTourTypes(), getTours()])
  return (
    <div>
      <HeroSection destinations={response[0].results || []} types={response[1].results || []} />
      <BestToursList data={response[2] || []} />
    </div>
  )
}
