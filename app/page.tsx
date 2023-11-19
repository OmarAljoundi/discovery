import ImportDynamic from 'next/dynamic'
import { Suspense } from 'react'
import HeroLoading from './(components)/(hero)/hero-loading'
import DestinationLoading from './(components)/(first)/destination-loading'
import BestToursLoading from './(components)/(second)/best-tours-loading'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { REVALIDATE_CONTENT_LIST, REVALIDATE_LOCATION_LIST, REVALIDATE_TOUR_LIST, REVALIDATE_TOUR_TYPE } from '@/lib/keys'
import { getContentData, getDestination, getTourTypes, getTours } from '@/lib/operations'
const HeroSection = ImportDynamic(() => import('./(components)/(hero)/hero-section').then((mod) => mod.default), {
  ssr: false,
  loading: () => <HeroLoading />,
})

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
  const query = new QueryClient()
  await Promise.allSettled([
    query.prefetchQuery({
      queryKey: [REVALIDATE_LOCATION_LIST],
      queryFn: getDestination,
    }),
    query.prefetchQuery({
      queryKey: [REVALIDATE_TOUR_LIST],
      queryFn: getTours,
    }),
    query.prefetchQuery({
      queryKey: [REVALIDATE_TOUR_TYPE],
      queryFn: getTourTypes,
    }),
    query.prefetchQuery({
      queryKey: [REVALIDATE_CONTENT_LIST],
      queryFn: getContentData,
    }),
  ])

  return (
    <div>
      <Suspense fallback={<HeroLoading />}>
        <HydrationBoundary state={dehydrate(query)}>
          <HeroSection />
        </HydrationBoundary>
      </Suspense>

      <Suspense fallback={<DestinationLoading />}>
        <HydrationBoundary state={dehydrate(query)}>
          <Destination />
        </HydrationBoundary>
      </Suspense>

      <Suspense fallback={<BestToursLoading />}>
        <HydrationBoundary state={dehydrate(query)}>
          <BestTours />
        </HydrationBoundary>
      </Suspense>

      <Suspense fallback={<h1>Loading..</h1>}>
        <HydrationBoundary state={dehydrate(query)}>
          <TourTypesList />
        </HydrationBoundary>
      </Suspense>

      <FaqList />
      <CallToAction />
    </div>
  )
}
