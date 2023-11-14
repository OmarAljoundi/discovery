import ImportDynamic from 'next/dynamic'
import { Suspense } from 'react'
import HeroLoading from './(components)/(hero)/hero-loading'
import DestinationLoading from './(components)/(first)/destination-loading'
import BestToursLoading from './(components)/(second)/best-tours-loading'
const HeroSection = ImportDynamic(() => import('./(components)/(hero)/hero-section').then((mod) => mod.default), {
  ssr: false,
  loading: () => <HeroLoading />,
})

const Destination = ImportDynamic(() => import('./(components)/(first)/destination').then((mod) => mod.default), {
  ssr: false,
  loading: () => <DestinationLoading />,
})

const BestTours = ImportDynamic(() => import('./(components)/(second)/best-tours').then((mod) => mod.default), {
  ssr: false,
  loading: () => <BestToursLoading />,
})
const TourTypesList = ImportDynamic(() => import('./(components)/(third)/tour-types-list').then((mod) => mod.default), {
  ssr: false,
})
const FaqList = ImportDynamic(() => import('./(components)/(fourth)/faq-list').then((mod) => mod.default), {
  ssr: false,
})
const CallToAction = ImportDynamic(() => import('./(components)/(fifth)/call-to-action').then((mod) => mod.default), {
  ssr: false,
})
export default async function Home() {
  return (
    <div>
      <Suspense fallback={<HeroLoading />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<DestinationLoading />}>
        <Destination />
      </Suspense>
      <Suspense fallback={<BestToursLoading />}>
        <BestTours />
      </Suspense>
      <TourTypesList />
      <FaqList />
      <CallToAction />
    </div>
  )
}
