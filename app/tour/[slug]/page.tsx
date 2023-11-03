import BreadCrumb, { BreadCrumbProps } from '@/components/common/bread-crumb'
import { getTours } from '@/lib/operations'
import { notFound } from 'next/navigation'
import { FunctionComponent } from 'react'
import TourSectionInfo from './tour-section-info'
import TourInitailInfo from './tour-initail-info'
import TourPlan from './tour-plan'
import TourBenfits from './tour-benfits'
import TourHotels from './tour-hotels'
import TourImages from './tour-images'
import TourRelated from './tour-related'

const BreadCrumbs: BreadCrumbProps = {
  items: [
    {
      name: 'جميع الرحلات',
      href: '/tour-listing',
    },
  ],
}

const TourPage: FunctionComponent<{ params: { slug: string } }> = async ({ params }) => {
  const tour = (await getTours())?.find((x) => x.slug == decodeURIComponent(params.slug))

  if (!tour) return notFound()

  return (
    <div className="container mb-10">
      <div className="space-y-4">
        <div className="shadow-medium p-3 rounded-md mt-4">
          <BreadCrumb items={[{ name: tour.name! }, ...BreadCrumbs.items]} />
        </div>
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
