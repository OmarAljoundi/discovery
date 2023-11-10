import TourRendering from '@/components/common/tour-rendering'
import { getContentData, getTours } from '@/lib/operations'
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
    },
    keywords: tags,
  }
}
const TourListingPage: FunctionComponent<TourListingPageProps> = async () => {
  const tours = await getTours()
  return <TourRendering tours={tours || []} />
}

export default TourListingPage
