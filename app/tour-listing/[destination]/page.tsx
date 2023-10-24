import BreadCrumb, { BreadCrumbProps } from '@/components/common/bread-crumb'
import TourCard from '@/components/common/tour-card'
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

  if (currentDest?.location_attributes && currentDest.location_attributes.length >= 2) {
    redirect(`${params.destination}/${currentDest.location_attributes[0].title}`)
  }

  currentDest?.location_attributes?.map((x) => {
    tours_ids = [...tours_ids, ...(x.location_tours?.map((g) => g.tour_id) ?? [])]
  })

  let response = await getTours()

  const tours = response?.filter((m) => tours_ids.includes(m.id!))

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-6 xl:gap-8 gap-y-6">
      {tours?.slice(0, 10).map((tour) => (
        <TourCard tour={tour} key={tour.id} />
      ))}
    </div>
  )
}

export default TourDestinationListingPage
