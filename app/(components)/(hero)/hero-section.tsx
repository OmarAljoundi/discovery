'use client'
import { getDestination, getTourTypes } from '@/lib/operations'
import HeroFilter from './hero-filter'
import HeroSlides from './hero-slides'
import { useQuery } from '@tanstack/react-query'
import { REVALIDATE_LOCATION_LIST, REVALIDATE_TOUR_TYPE } from '@/lib/keys'

export default function HeroSection() {
  const { data: tourTypes } = useQuery({
    queryKey: [REVALIDATE_TOUR_TYPE],
    queryFn: async () => await getTourTypes(),
  })

  const { data: destination } = useQuery({
    queryKey: [REVALIDATE_LOCATION_LIST],
    queryFn: async () => await getDestination(),
  })

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
