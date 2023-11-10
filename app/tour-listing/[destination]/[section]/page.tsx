import TourRendering from '@/components/common/tour-rendering'
import { getDestination, getTours } from '@/lib/operations'
import { Metadata } from 'next'
import { FunctionComponent } from 'react'

export async function generateMetadata({ params }: { params: { destination: string; section: string } }): Promise<Metadata> {
  const response = (await getDestination())?.results?.find((x) => x.slug == decodeURIComponent(params.destination))
  const attr = response?.location_attributes?.find((x) => x.title == decodeURIComponent(params.section.replaceAll('-', ' ')))
  if (!attr) {
    return {
      title: 'No section found',
    }
  }

  const { description, tags, title } = attr.seo || { title: '', description: '', tags: '' }
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
  var results: { destination: string; section: string }[] = []

  response?.results?.map((dest) => {
    if (dest.location_attributes && dest.location_attributes.length > 1) {
      dest.location_attributes?.map((attr) => {
        results.push({
          destination: dest.slug!,
          section: attr.title!.replaceAll(' ', '-'),
        })
      })
    }
  })

  return results
}
const TourDestinationSectionListingPage: FunctionComponent<{ params: { destination: string; section: string } }> = async ({ params }) => {
  const destination = await getDestination()
  const currentDest = destination.results?.find((x) => x.slug == decodeURIComponent(params.destination))

  const attr = currentDest?.location_attributes?.find((x) => x.title == decodeURIComponent(params.section.replaceAll('-', ' ')))
  let response = await getTours()
  const tours = response?.filter((m) => attr?.location_tours?.map((x) => x.tour_id!).includes(m.id!))

  return <TourRendering tours={tours || []} />
}

export default TourDestinationSectionListingPage
