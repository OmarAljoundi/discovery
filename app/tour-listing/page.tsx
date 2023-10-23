import TourCard from '@/components/common/tour-card'
import { getTours } from '@/lib/operations'
import { FunctionComponent } from 'react'

interface TourListingPageProps {}

const TourListingPage: FunctionComponent<TourListingPageProps> = async () => {
  const tours = await getTours()
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-6 xl:gap-8 gap-y-6">
      {tours?.map((tour) => (
        <TourCard tour={tour} key={tour.id} />
      ))}
    </div>
  )
}

export default TourListingPage
