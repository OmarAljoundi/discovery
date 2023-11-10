import BlurImage from '@/components/common/blur-image'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Location } from '@/types/custom'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { FunctionComponent } from 'react'

interface DestinationListingProps {
  destinations: Location[]
}

const DestinationListing: FunctionComponent<DestinationListingProps> = ({ destinations }) => {
  function getTotalTours(location: Location) {
    var total = 0

    location.location_attributes?.map((x) => {
      total += x.location_tours?.length ?? 0
    })
    return total
  }
  return (
    <div className="container mt-10 mb-10 hidden md:block">
      <div className="flex justify-between items-end">
        <h1 className="text-xl">الوجهات السياحية</h1>
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-12 gap-4">
        {destinations
          ?.sort((a, b) => (a.image?.order || 0) - (b.image?.order || 0))
          .map((item) => (
            <Link
              href={`/tour-listing/${item.slug}`}
              className={cn(
                'block citiesCard -type-1 d-block rounded-4 group hover:cursor-pointer',
                item.image?.size.toString() == '1/6'
                  ? 'col-span-2'
                  : item.image?.size.toString() == '1/3'
                  ? 'col-span-3'
                  : item.image?.size.toString() == '1/4'
                  ? 'col-span-4'
                  : item.image?.size.toString() == '1/5'
                  ? 'col-span-5'
                  : item.image?.size.toString() == '1/2'
                  ? 'col-span-6'
                  : 'col-span-12',
              )}
              key={item.id}
            >
              <div className={cn(item.image?.size.toString() == '1/2' ? 'h-80' : 'aspect-[3/2]', 'citiesCard__image ratio')}>
                <BlurImage
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.image?.url}` || ''}
                  loading="eager"
                  alt=""
                  fill
                  className="object-cover rounded-none"
                  containerClassName="w-full h-full aspect-w-1 aspect-h-1 w-full overflow-hidden  bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 rounded-none"
                />
              </div>
              <div className="citiesCard__content flex flex-col justify-between text-center pt-8 pb-5 px-5">
                <div className="citiesCard__bg " />
                <div className="citiesCard__top">
                  <div className="text-14 text-white fw-bold" dir="rtl">
                    {getTotalTours(item)} رحلة ضمن هذا البرنامج
                  </div>
                </div>
                <div className="citiesCard__bottom translate-y-16 group-hover:translate-y-0 transition-all">
                  <figcaption
                    className="absolute p-2 bottom-0 right-0 mx-auto w-fit  left-0  mb-16  sm:left-5 flex   justify-between  border border-white
                  bg-white/75 rounded-xl shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm"
                  >
                    <h4 className="text-sm xl:text-xl md:text-xl text-black">{item.name}</h4>
                  </figcaption>

                  <Button color="primary" variant="shadow">
                    عرض الرحلات
                  </Button>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default DestinationListing
