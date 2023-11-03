import { Location, TourType } from '@/types/custom'
import HeroFilter from './hero-filter'
import HeroSlides from './hero-slides'

export default function HeroSection({ destinations, types }: { destinations: Location[]; types: TourType[] }) {
  return (
    <div className="container">
      <div className="flex flex-col-reverse sm:grid sm:grid-cols-12">
        <div className="sm:mt-0 z-50 sm:z-0 col-span-12 sm:col-span-4 md:col-span-4 lg:col-span-4 ">
          <div className="w-full h-full">
            <HeroFilter destinations={destinations} types={types} />
          </div>
        </div>
        <HeroSlides />
      </div>
    </div>
  )
}
