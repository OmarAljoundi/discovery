import BreadCrumb, { BreadCrumbProps } from '@/components/common/bread-crumb'
import TourCard from '@/components/common/tour-card'
import TourRendering from '@/components/common/tour-rendering'
import Filter from '@/components/filter'
import MobileSortFilterButtons from '@/components/filter/mobile-sort-filter-buttons'
import Sort from '@/components/filter/sort'
import { Separator } from '@/components/ui/separator'
import { getDestination, getTours } from '@/lib/operations'
import { redirect } from 'next/navigation'
import { FunctionComponent } from 'react'

const breads: BreadCrumbProps = {
  items: [
    {
      name: 'جميع الرحلات',
      href: '/tour-listing',
    },
  ],
}
const TourDestinationListingPage: FunctionComponent<{ params: { destination: string } }> = async ({ params }) => {
  let tours_ids: number[] = []
  const destination = await getDestination()
  const currentDest = destination.results?.find((x) => x.slug == decodeURIComponent(params.destination))

  currentDest?.location_attributes?.map((x) => {
    tours_ids = [...tours_ids, ...(x.location_tours?.map((g) => g.tour_id) ?? [])]
  })

  let response = await getTours()

  const tours = response?.filter((m) => tours_ids.includes(m.id!))

  return <TourRendering tours={tours || []} />
}

export default TourDestinationListingPage
