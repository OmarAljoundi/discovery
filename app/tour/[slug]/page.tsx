import BreadCrumb, { BreadCrumbProps } from '@/components/common/bread-crumb'
import { getTours } from '@/lib/operations'
import { notFound } from 'next/navigation'
import { FunctionComponent } from 'react'

interface TourPageProps {}

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
    <div>
      <BreadCrumb items={[{ name: tour.name! }, ...BreadCrumbs.items]} />
      <div> TODO:ADD IMAGES </div>
    </div>
  )
}

export default TourPage
