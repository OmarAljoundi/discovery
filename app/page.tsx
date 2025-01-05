import ImportDynamic from 'next/dynamic'
import { Suspense } from 'react'
import DestinationLoading from './(components)/(first)/destination-loading'
import BestToursLoading from './(components)/(second)/best-tours-loading'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { REVALIDATE_CONTENT_LIST } from '@/lib/keys'
import { getContentData } from '@/lib/operations'
import TourTypeLoading from './(components)/(third)/tour-type-loading'
import { Metadata } from 'next'
import HeroSlides from './(components)/(hero)/hero-slides'
import ArticlesLoading from './(components)/(sixth)/articles-loading'

const Destination = ImportDynamic(() => import('./(components)/(first)/destination'), {
  ssr: false,
  loading: () => <DestinationLoading />,
})

const BestTours = ImportDynamic(() => import('./(components)/(second)/best-tours'), {
  ssr: false,
  loading: () => <BestToursLoading />,
})

const Articles = ImportDynamic(() => import('./(components)/(sixth)/articles-list'), {
  ssr: false,
  loading: () => <ArticlesLoading />,
})
const TourTypes = ImportDynamic(() => import('./(components)/(third)/tour-type'), {
  ssr: false,
})

const CallToAction = ImportDynamic(() => import('./(components)/(fifth)/call-to-action'), {
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
      url: `https://www.discovery-om.com`,
      countryName: 'Oman',
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

export default async function Home() {
  const query = new QueryClient()
  await query.prefetchQuery({
    queryKey: [REVALIDATE_CONTENT_LIST],
    queryFn: getContentData,
  })

  return (
    <div>
      <HydrationBoundary state={dehydrate(query)}>
        <HeroSlides />
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

      <Suspense fallback={<ArticlesLoading />}>
        <Articles />
      </Suspense>
      <CallToAction />
    </div>
  )
}
