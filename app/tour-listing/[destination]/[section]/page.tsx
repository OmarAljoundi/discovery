import { BreadCrumbProps } from '@/components/common/bread-crumb'
import TourCard from '@/components/common/tour-card'
import TourRendering from '@/components/common/tour-rendering'
import { getDestination, getTours } from '@/lib/operations'
import { FunctionComponent } from 'react'

const breads: BreadCrumbProps = {
  items: [
    {
      name: 'جميع الرحلات',
      href: '/tour-listing',
    },
  ],
}
const TourDestinationSectionListingPage: FunctionComponent<{ params: { destination: string; section: string } }> = async ({ params }) => {
  const destination = await getDestination()
  const currentDest = destination.results?.find((x) => x.slug == decodeURIComponent(params.destination))

  const attr = currentDest?.location_attributes?.find((x) => x.title == decodeURIComponent(params.section.replaceAll('-', ' ')))
  let response = await getTours()
  const tours = response?.filter((m) => attr?.location_tours?.map((x) => x.tour_id!).includes(m.id!))

  return <TourRendering tours={tours || []} />
}

export default TourDestinationSectionListingPage
