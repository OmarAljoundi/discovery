import { getDestination, getTourTypes, getTours } from '@/lib/operations'
import HeroSection from './(components)/(hero)/hero-section'
import BestToursList from './(components)/(second)/best-tours-list'
import DestinationListingMobile from './(components)/(first)/destination-listing-mobile'
import DestinationListing from './(components)/(first)/destination-listing'

export default async function Home() {
  var response = await Promise.all([getDestination(), getTourTypes(), getTours()])
  return (
    <div>
      <HeroSection destinations={response[0].results || []} types={response[1].results || []} />
      <DestinationListingMobile destinations={response[0].results || []} />
      <DestinationListing destinations={response[0].results || []} />
      <BestToursList data={response[2] || []} />
    </div>
  )
}
