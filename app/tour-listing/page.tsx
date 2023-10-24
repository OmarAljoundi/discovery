import BreadCrumb, { BreadCrumbProps } from '@/components/common/bread-crumb'
import TourCard from '@/components/common/tour-card'
import Filter from '@/components/filter'
import MobileSortFilterButtons from '@/components/filter/mobile-sort-filter-buttons'
import Sort from '@/components/filter/sort'
import { Separator } from '@/components/ui/separator'
import { getTours } from '@/lib/operations'
import { FunctionComponent } from 'react'

interface TourListingPageProps {}
const breads: BreadCrumbProps = {
  items: [
    {
      name: 'جميع الرحلات',
    },
  ],
}
const TourListingPage: FunctionComponent<TourListingPageProps> = async () => {
  const tours = await getTours()
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-6 xl:gap-8 gap-y-6">
      {tours?.slice(0, 10).map((tour) => (
        <TourCard tour={tour} key={tour.id} />
      ))}
    </div>
  )
}

export default TourListingPage
