import { getTours } from '@/lib/operations'
import { notFound } from 'next/navigation'
import { FunctionComponent } from 'react'
import TourBreadcrumb from './tour-breadcrumb'
import TourImages from './tour-images'
import TourInitailInfo from './tour-initail-info'
import TourSectionInfo from './tour-section-info'
import TourPlan from './tour-plan'
import TourBenfits from './tour-benfits'
import TourHotels from './tour-hotels'
import TourRelated from './tour-related'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const response = (await getTours())?.find((x) => x.slug == decodeURIComponent(params.slug) && x.is_active)
  if (!response) {
    return {
      title: 'No tour found',
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
      url: `https://www.discovery-om.com/tour/${decodeURIComponent(params.slug)}`,
      images: response?.images?.map((image) => {
        return {
          url: `${process.env.NEXT_PUBLIC_IMAGE_URL}${image}`,
          width: 640,
          height: 427,
          alt: response?.name,
        }
      }),
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
export async function generateStaticParams() {
  const response = await getTours()
  if (response && response.length > 0) {
    return response
      .filter((x) => x.is_active)
      .map((tour) => ({
        slug: `${tour.slug}`,
      }))
  }
  return []
}

const TourPage: FunctionComponent<{ params: { slug: string } }> = async ({ params }) => {
  const tour = (await getTours())?.find((x) => x.slug == decodeURIComponent(params.slug) && x.is_active)

  if (!tour) return notFound()

  return (
    <div className="container mb-10">
      <div className="space-y-4">
        <TourBreadcrumb tourName={tour.name || ''} file={tour.external_file} tourId={tour.id!} />
        <TourImages tour={tour} />
        <TourInitailInfo tour={tour} />
        <TourSectionInfo tour={tour} />
        <TourPlan tour={tour} />
        <TourBenfits tour={tour} />
        {tour?.tour_hotels && tour?.tour_hotels.length > 0 && <TourHotels tour={tour} />}
        <TourRelated tour={tour} />
      </div>
    </div>
  )
}

export default TourPage
