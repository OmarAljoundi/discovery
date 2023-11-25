import ImportDynamic from 'next/dynamic'
import { Suspense } from 'react'
import HeroLoading from './(components)/(hero)/hero-loading'
import DestinationLoading from './(components)/(first)/destination-loading'
import BestToursLoading from './(components)/(second)/best-tours-loading'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { REVALIDATE_CONTENT_LIST, REVALIDATE_LOCATION_LIST, REVALIDATE_TOUR_LIST, REVALIDATE_TOUR_TYPE } from '@/lib/keys'
import { getContentData, getDestination, getTourTypes, getTours } from '@/lib/operations'
import HeroSection from './(components)/(hero)/hero-section'
import TourTypesList from './(components)/(third)/tour-types-list'
import TourTypeLoading from './(components)/(third)/tour-type-loading'
import { Metadata } from 'next'

const Destination = ImportDynamic(() => import('./(components)/(first)/destination').then((mod) => mod.default), {
  ssr: false,
  loading: () => <DestinationLoading />,
})

const BestTours = ImportDynamic(() => import('./(components)/(second)/best-tours').then((mod) => mod.default), {
  ssr: false,
  loading: () => <BestToursLoading />,
})
const TourTypes = ImportDynamic(() => import('./(components)/(third)/tour-type').then((mod) => mod.default), {
  ssr: false,
})

const CallToAction = ImportDynamic(() => import('./(components)/(fifth)/call-to-action').then((mod) => mod.default), {
  ssr: false,
})

export async function generateMetadata(): Promise<Metadata> {
  const response = await getContentData()

  const { description, tags, title } = response?.home?.seo || { title: '', description: '', tags: '' }
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      siteName: 'Discovery',
    },
    keywords: tags,
  }
}
export default async function Home() {
  const query = new QueryClient()
  await query.prefetchQuery({
    queryKey: [REVALIDATE_CONTENT_LIST],
    queryFn: getContentData,
  })

  return (
    <div>
      <HydrationBoundary state={dehydrate(query)}>
        <HeroSection />
      </HydrationBoundary>

      <Suspense fallback={<DestinationLoading />}>
        <Destination />
      </Suspense>

      <Suspense fallback={<BestToursLoading />}>
        <BestTours />
      </Suspense>

      <Suspense fallback={<TourTypeLoading />}>
        <TourTypes />
      </Suspense>

      <CallToAction />
    </div>
  )
}
