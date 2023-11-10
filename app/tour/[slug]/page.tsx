import BreadCrumb, { BreadCrumbProps } from '@/components/common/bread-crumb'
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
  const response = (await getTours())?.find((x) => x.slug == decodeURIComponent(params.slug))
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
    },
    keywords: tags,
  }
}
export async function generateStaticParams() {
  const response = await getTours()
  if (response && response.length > 0) {
    return response.map((tour) => ({
      slug: `${tour.slug}`,
    }))
  }
  return []
}

const TourPage: FunctionComponent<{ params: { slug: string } }> = async ({ params }) => {
  const tour = (await getTours())?.find((x) => x.slug == decodeURIComponent(params.slug))

  if (!tour) return notFound()

  return (
    <div className="container mb-10">
      <div className="space-y-4">
        <TourBreadcrumb tourName={tour.name || ''} />
        <TourImages tour={tour} />
        <TourInitailInfo tour={tour} />
        <TourSectionInfo tour={tour} />
        <TourPlan tour={tour} />
        <TourBenfits tour={tour} />
        <TourHotels tour={tour} />
        <TourRelated tour={tour} />
      </div>
    </div>
  )
}

export default TourPage
