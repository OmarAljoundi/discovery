'use client'
import { FunctionComponent } from 'react'
import DestinationListingMobile from './destination-listing-mobile'
import DestinationListing from './destination-listing'
import { getDestination } from '@/lib/operations'
import { useQuery } from '@tanstack/react-query'
import { REVALIDATE_LOCATION_LIST } from '@/lib/keys'

interface DestinationProps {}

const Destination: FunctionComponent<DestinationProps> = () => {
  const { data: destination } = useQuery({
    queryKey: [REVALIDATE_LOCATION_LIST],
    queryFn: async () => await getDestination(),
  })
  return (
    <>
      <DestinationListingMobile destinations={destination?.results || []} />
      <DestinationListing destinations={destination?.results || []} />
    </>
  )
}

export default Destination
