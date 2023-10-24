import BreadCrumb, { BreadCrumbProps } from '@/components/common/bread-crumb'
import TourCard from '@/components/common/tour-card'
import Filter from '@/components/filter'
import MobileSortFilterButtons from '@/components/filter/mobile-sort-filter-buttons'
import Sort from '@/components/filter/sort'
import { Separator } from '@/components/ui/separator'
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

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-6 xl:gap-8 gap-y-6">
      {tours?.slice(0, 10).map((tour) => (
        <TourCard tour={tour} key={tour.id} />
      ))}
    </div>
  )
}

export default TourDestinationSectionListingPage
