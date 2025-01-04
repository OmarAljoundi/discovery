import TourRendering from '@/components/common/tour-rendering'
import { REVALIDATE_CONTENT_LIST, REVALIDATE_LOCATION_LIST, REVALIDATE_TOUR_LIST, REVALIDATE_TOUR_TYPE } from '@/lib/keys'
import { getContentData, getDestination, getTourTypes, getTours } from '@/lib/operations'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { Metadata } from 'next'
import { FunctionComponent } from 'react'

interface TourListingPageProps {}

export async function generateMetadata(): Promise<Metadata> {
  const response = await getContentData()

  const { description, tags, title } = response?.best_tours?.seo || { title: '', description: '', tags: '' }
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      siteName: 'Discovery',
      url: `https://www.discovery-om.com/tour-listing`,
      images: [
        {
          url: `https://www.discovery-om.com/_next/image?url=/images/discovery-footer.png&w=384&q=100`,
          width: 120,
          height: 60,
          alt: 'Discovery Logo',
        },
      ],
      locale: 'ar_OM',
    },
    creator: 'Discovery tours',
    publisher: 'Discovery Inc.',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    keywords: tags,
  }
}
const TourListingPage: FunctionComponent<TourListingPageProps> = async () => {
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
    <HydrationBoundary state={dehydrate(query)}>
      <TourRendering />
    </HydrationBoundary>
  )
}

export default TourListingPage
