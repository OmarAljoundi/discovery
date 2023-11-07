import { BreadCrumbProps } from '@/components/common/bread-crumb'
import TourCard from '@/components/common/tour-card'
import TourRendering from '@/components/common/tour-rendering'
import { getTours } from '@/lib/operations'
import { FunctionComponent } from 'react'

interface TourListingPageProps {}

const TourListingPage: FunctionComponent<TourListingPageProps> = async () => {
  const tours = await getTours()
  return <TourRendering tours={tours || []} />
}

export default TourListingPage
