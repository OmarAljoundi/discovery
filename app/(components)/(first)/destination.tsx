import { FunctionComponent } from 'react'
import DestinationListingMobile from './destination-listing-mobile'
import DestinationListing from './destination-listing'
import { getDestination } from '@/lib/operations'

interface DestinationProps {}

const Destination: FunctionComponent<DestinationProps> = async () => {
  const response = await getDestination()
  return (
    <>
      <DestinationListingMobile destinations={response.results || []} />
      <DestinationListing destinations={response.results || []} />
    </>
  )
}

export default Destination
