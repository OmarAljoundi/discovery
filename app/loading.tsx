'use client'
import { FunctionComponent } from 'react'
import SearchFilterLoading from './(components)/(hero)/search-filter-loading'
import { Button } from '@nextui-org/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import TourCardLoading from '@/components/common/tour-card-loading'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface MainLoadingProps {}

const MainLoading: FunctionComponent<MainLoadingProps> = () => {
  const DestinationCard = () => {
    return (
      <div className={cn('block citiesCard -type-1 d-block rounded-4 group hover:cursor-pointer col-span-6 lg:col-span-4')}>
        <div className={cn('h-80', 'citiesCard__image ratio')}>
          <div className="h-full aspect-w-1 aspect-h-1 w-full overflow-hidden  bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
            <Skeleton className="object-cover" />
          </div>
        </div>
        <div className="citiesCard__content flex flex-col justify-between text-center pt-8 pb-5 px-5">
          <div className="citiesCard__bg" />
          <div className="citiesCard__top">
            <div className="text-14 text-white fw-bold" dir="rtl">
              <Skeleton className="object-cover w-16 h-4" />
            </div>
          </div>
          <div className="citiesCard__bottom translate-y-16 group-hover:translate-y-0 transition-all">
            <figcaption
              className="absolute p-2 bottom-0 right-0 mx-auto w-fit  left-0  mb-16  sm:left-5 flex   justify-between  border border-white
          bg-white/75 rounded-xl shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm"
            >
              <h4 className="text-sm xl:text-xl md:text-xl text-black">
                {' '}
                <Skeleton className="object-cover w-16 h-4" />
              </h4>
            </figcaption>

            <Skeleton className="object-cover w-16 h-4" />
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      {/* Hero Loading */}
      <div className="container">
        <div className="flex flex-col-reverse sm:grid sm:grid-cols-12">
          <div className="-mt-[40px] sm:mt-0 z-50 sm:z-0 col-span-12 sm:col-span-4 md:col-span-4 lg:col-span-4 ">
            <div className="w-full h-full">
              <SearchFilterLoading />
            </div>
          </div>
          <div className="col-span-12 h-36 sm:h-64 lg:h-96 md:h-72 sm:col-span-8 md:col-span-8 lg:col-span-8 overflow-hidden">
            <div className="relative h-full group overflow-hidden">
              <Skeleton className="h-full rounded-none px-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Destination Loading */}
      <div className="container mt-10 mb-10 hidden md:block">
        <div className="flex justify-between items-end">
          <h1 className="text-xl">الوجهات السياحية</h1>
        </div>
        <Separator className="my-4" />
        <div className="lg:grid grid-cols-12 gap-4 hidden">
          {Array.from(new Array(9)).map((item, index) => (
            <DestinationCard key={index} />
          ))}
        </div>
        <div className="grid grid-cols-12 gap-4 lg:hidden">
          {Array.from(new Array(2)).map((item, index) => (
            <DestinationCard key={index} />
          ))}
        </div>
      </div>

      {/* Best Tours Loading*/}
      <div className="bg-[url(/images/best_seller_background.png)] bg-[#f1f6ff] bg-right-bottom bg-no-repeat bg-auto py-16">
        <div className="container">
          <div className="flex justify-between items-end">
            <h1 className="text-xl">أفضل الرحلات السياحة</h1>
            <div className="flex justify-end">
              <Button isIconOnly size="sm" className="group hover:text-primary duration-500 transition-all" variant="light">
                <ArrowRight className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />
              </Button>
              <Button isIconOnly size="sm" className="group hover:text-primary duration-500 transition-all" variant="light">
                <ArrowLeft className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />
              </Button>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-4 gap-x-4 mt-4">
            {Array.from(new Array(4)).map((_, index) => (
              <div key={index}>
                <TourCardLoading />
              </div>
            ))}
          </div>
          <div className="lg:hidden grid grid-cols-2 gap-x-4 mt-4">
            {Array.from(new Array(2)).map((_, index) => (
              <div key={index}>
                <TourCardLoading />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default MainLoading
