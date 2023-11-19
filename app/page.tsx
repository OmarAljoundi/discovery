import ImportDynamic from 'next/dynamic'
import { Suspense } from 'react'
import HeroLoading from './(components)/(hero)/hero-loading'
import DestinationLoading from './(components)/(first)/destination-loading'
import BestToursLoading from './(components)/(second)/best-tours-loading'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { REVALIDATE_CONTENT_LIST, REVALIDATE_LOCATION_LIST, REVALIDATE_TOUR_LIST, REVALIDATE_TOUR_TYPE } from '@/lib/keys'
import { getContentData, getDestination, getTourTypes, getTours } from '@/lib/operations'
import HeroSection from './(components)/(hero)/hero-section'

const Destination = ImportDynamic(() => import('./(components)/(first)/destination').then((mod) => mod.default), {
  ssr: false,
  loading: () => <DestinationLoading />,
})

const BestTours = ImportDynamic(() => import('./(components)/(second)/best-tours-list').then((mod) => mod.default), {
  ssr: false,
  loading: () => <BestToursLoading />,
})
const TourTypesList = ImportDynamic(() => import('./(components)/(third)/tour-types-list').then((mod) => mod.default), {
  ssr: false,
})
const FaqList = ImportDynamic(() => import('./(components)/(fourth)/faq-list').then((mod) => mod.default), {
  ssr: false,
})
const CallToAction = ImportDynamic(() => import('./(components)/(fifth)/call-to-action').then((mod) => mod.default), {
  ssr: false,
})
export default async function Home() {
  return (
    <div>
      <HeroSection />

      <Suspense fallback={<DestinationLoading />}>
        <Destination />
      </Suspense>

      <Suspense fallback={<BestToursLoading />}>
        <BestTours />
      </Suspense>

      <Suspense fallback={<h1>Loading..</h1>}>
        <TourTypesList />
      </Suspense>

      <FaqList />
      <CallToAction />
    </div>
  )
}
