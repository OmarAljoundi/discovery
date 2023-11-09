import { getDestination, getTourTypes } from '@/lib/operations'
import HeroFilter from './hero-filter'
import HeroSlides from './hero-slides'

export default async function HeroSection() {
  const destination = await getDestination()
  const tourTypes = await getTourTypes()
  return (
    <div className="container">
      <div className="flex flex-col-reverse sm:grid sm:grid-cols-12">
        <div className="sm:mt-0 z-50 sm:z-0 col-span-12 sm:col-span-4 md:col-span-4 lg:col-span-4 ">
          <div className="w-full h-full">
            <HeroFilter destinations={destination?.results || []} types={tourTypes?.results || []} />
          </div>
        </div>
        <HeroSlides />
      </div>
    </div>
  )
}
