'use client'
import { FunctionComponent } from 'react'
import SearchFilterLoading from './(components)/(hero)/search-filter-loading'
import { Button } from '@nextui-org/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import TourCardLoading from '@/components/common/tour-card-loading'
import { Skeleton } from '@/components/ui/skeleton'

interface MainLoadingProps {}

const MainLoading: FunctionComponent<MainLoadingProps> = () => {
  return (
    <>
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
          <div className="grid grid-cols-4 gap-x-4 mt-4">
            {[1, 2, 3, 4].map((_, index) => (
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
