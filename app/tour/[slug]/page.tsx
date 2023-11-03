import BreadCrumb, { BreadCrumbProps } from '@/components/common/bread-crumb'
import { getTours } from '@/lib/operations'
import { notFound } from 'next/navigation'
import { FunctionComponent } from 'react'
import dynamic from 'next/dynamic'

const BreadCrumbs: BreadCrumbProps = {
  items: [
    {
      name: 'جميع الرحلات',
      href: '/tour-listing',
    },
  ],
}
const TourSectionInfo = dynamic(() => import('./tour-section-info').then((mod) => mod.default), {
  ssr: false,
})
const TourInitailInfo = dynamic(() => import('./tour-initail-info').then((mod) => mod.default), {
  ssr: false,
})
const TourPlan = dynamic(() => import('./tour-plan').then((mod) => mod.default), {
  ssr: false,
})
const TourBenfits = dynamic(() => import('./tour-benfits').then((mod) => mod.default), {
  ssr: false,
})
const TourHotels = dynamic(() => import('./tour-hotels').then((mod) => mod.default), {
  ssr: false,
})
const TourImages = dynamic(() => import('./tour-images').then((mod) => mod.default), {
  ssr: false,
})
const TourRelated = dynamic(() => import('./tour-related').then((mod) => mod.default), {
  ssr: false,
})

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
