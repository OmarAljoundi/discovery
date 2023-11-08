import { getDestination, getTourTypes, getTours } from '@/lib/operations'
import ImportDynamic from 'next/dynamic'

async function logPromiseExecutionTime() {
  // Log start time
  const startTime = new Date()

  try {
    const startPromiseTime = new Date()
    const response = await Promise.all([getDestination(), getTourTypes(), getTours()])
    const endPromiseTime = new Date()

    const elapsedTimeInSeconds = (endPromiseTime.getTime() - startPromiseTime.getTime()) / 1000

    console.log(`Elapsed Time: ${elapsedTimeInSeconds} seconds`)

    return response
  } catch (error) {
    // Handle errors if any of the promises reject
    console.error('Error:', error)
    throw error // Re-throw the error if needed
  }
}

const HeroSection = ImportDynamic(() => import('./(components)/(hero)/hero-section').then((mod) => mod.default), {
  ssr: true,
})
const DestinationListingMobile = ImportDynamic(() => import('./(components)/(first)/destination-listing-mobile').then((mod) => mod.default), {
  ssr: true,
})
const DestinationListing = ImportDynamic(() => import('./(components)/(first)/destination-listing').then((mod) => mod.default), {
  ssr: true,
})

const BestToursList = ImportDynamic(() => import('./(components)/(second)/best-tours-list').then((mod) => mod.default), {
  ssr: true,
})
const TourTypesList = ImportDynamic(() => import('./(components)/(third)/tour-types-list').then((mod) => mod.default), {
  ssr: true,
})
const FaqList = ImportDynamic(() => import('./(components)/(fourth)/faq-list').then((mod) => mod.default), {
  ssr: true,
})
const CallToAction = ImportDynamic(() => import('./(components)/(fifth)/call-to-action').then((mod) => mod.default), {
  ssr: true,
})
export default async function Home() {
  const response = await logPromiseExecutionTime()
  return (
    <div>
      <HeroSection destinations={response[0].results || []} types={response[1].results || []} />
      <DestinationListingMobile destinations={response[0].results || []} />
      <DestinationListing destinations={response[0].results || []} />
      <BestToursList data={response[2] || []} />
      <TourTypesList tourTypes={response[1].results || []} />
      <FaqList />
      <CallToAction />
    </div>
  )
}
