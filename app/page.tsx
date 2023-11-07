import { getDestination, getTourTypes, getTours } from '@/lib/operations'
import HeroSection from './(components)/(hero)/hero-section'
import BestToursList from './(components)/(second)/best-tours-list'
import DestinationListingMobile from './(components)/(first)/destination-listing-mobile'
import DestinationListing from './(components)/(first)/destination-listing'
import TourTypesList from './(components)/(third)/tour-types-list'
import FaqList from './(components)/(fourth)/faq-list'
import CallToAction from './(components)/(fifth)/call-to-action'

export default async function Home() {
  var response = await Promise.all([getDestination(), getTourTypes(), getTours()])
  return (
    <div>
      <HeroSection destinations={response[0].results || []} types={response[1].results || []} />
      <DestinationListingMobile destinations={response[0].results || []} />
      <DestinationListing destinations={response[0].results || []} />
      <BestToursList data={response[2] || []} />
      <TourTypesList tourTypes={response[1].results || []} />
      <FaqList />
      <CallToAction />
    </div>
  )
}
