import TourRendering from '@/components/common/tour-rendering'
import { getDestination, getTours } from '@/lib/operations'
import { Metadata } from 'next'
import { FunctionComponent } from 'react'

export async function generateMetadata({ params }: { params: { destination: string } }): Promise<Metadata> {
  const response = (await getDestination())?.results?.find((x) => x.slug == decodeURIComponent(params.destination))
  if (!response) {
    return {
      title: 'No destination found',
    }
  }

  const { description, tags, title } = response.seo || { title: '', description: '', tags: '' }
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
export async function generateStaticParams() {
  const response = await getDestination()
  if (response.success && response.results && response.results.length > 0) {
    return response.results.map((dest) => ({
      destination: `${dest.slug}`,
    }))
  }
  return []
}

const TourDestinationListingPage: FunctionComponent<{ params: { destination: string } }> = async ({ params }) => {
  let tours_ids: number[] = []
  const destination = await getDestination()
  const currentDest = destination.results?.find((x) => x.slug == decodeURIComponent(params.destination))

  currentDest?.location_attributes?.map((x) => {
    tours_ids = [...tours_ids, ...(x.location_tours?.map((g) => g.tour_id) ?? [])]
  })

  let response = await getTours()

  const tours = response?.filter((m) => tours_ids.includes(m.id!))

  return <TourRendering tours={tours || []} />
}

export default TourDestinationListingPage
