import { Button } from '@nextui-org/react'
import Image from 'next/image'
import { FunctionComponent } from 'react'
import HeroFilter from './hero-filter'
import { useSetting } from '@/hooks/use-setting'
import ReactIdSwiper from 'react-id-swiper'
import { motion } from 'framer-motion'
import BlurImage from '@/components/common/blur-image'
import { useQuery } from 'react-query'
import { getDestination, getTourTypes } from '@/lib/operations'
import SearchFilterLoading from './search-filter-loading'
import { Skeleton } from '@/components/ui/skeleton'
interface HeroSectionProps {}

const HeroSection: FunctionComponent<HeroSectionProps> = () => {
  const config = useSetting((x) => x.setting?.home?.sliders ?? [])
  const swiperParams = {
    slidesPerView: 1,

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  }

  const { data: response, isLoading } = useQuery(['LocationsAndTypes'], async () => await Promise.all([getDestination(), getTourTypes()]), {
    refetchInterval: false,
    refetchOnWindowFocus: true,
  })

  if (isLoading) {
    return (
      <div className="container">
        <div className="flex flex-col-reverse sm:grid sm:grid-cols-12">
          <div className="-mt-[40px] sm:mt-0 z-50 sm:z-0 col-span-12 sm:col-span-4 md:col-span-4 lg:col-span-4 ">
            <div className="w-full h-full">
              <SearchFilterLoading />
            </div>
          </div>
          <div className="col-span-12 h-56 sm:h-64 lg:h-96 md:h-72 sm:col-span-8 md:col-span-8 lg:col-span-8 overflow-hidden">
            <div className="relative h-full group overflow-hidden">
              <Skeleton className="h-full rounded-none px-3" />
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="container">
      <div className="flex flex-col-reverse sm:grid sm:grid-cols-12">
        <div className="-mt-[40px] sm:mt-0 z-50 sm:z-0 col-span-12 sm:col-span-4 md:col-span-4 lg:col-span-4 ">
          <div className="w-full h-full">
            <HeroFilter destinations={response![0].results} types={response![1].results} />
          </div>
        </div>
        <ReactIdSwiper
          {...swiperParams}
          containerClass="col-span-12 h-56 sm:h-64 lg:h-96 md:h-72 sm:col-span-8 md:col-span-8 lg:col-span-8 overflow-hidden"
        >
          {config?.map((item, index) => (
            <motion.div
              key={item.uuid}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, translateY: 20 },
                visible: {
                  opacity: 1,
                  translateY: 0,
                  transition: {
                    duration: Math.max(0.5, ((index + 1) * 10) / 100),
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              <div className="relative h-full group overflow-hidden">
                <BlurImage
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.image}`}
                  alt="Hero Image"
                  quality={80}
                  fetchPriority={index == 0 ? 'high' : 'auto'}
                  loading={index == 0 ? 'eager' : 'lazy'}
                  fill
                  className="bg-overlay mx-auto max-w-full h-auto"
                />
                <figcaption
                  className="absolute p-3 bottom-10 max-w-[150px] rounded-none left-0 sm:bottom-8 sm:left-5 flex sm:max-w-xs  justify-between sm:rounded-xl border border-white
                 bg-white/75 sm:py-4 sm:px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm"
                >
                  <div>
                    <h1 className="text-base lg:text-xl xl:text-3xl text-primary ">{item.title}</h1>
                    <p className="text-xs  lg:text-lg xl:text-lg mt-2 text-primary ">{item.sub_title}</p>
                  </div>
                </figcaption>
              </div>
            </motion.div>
          ))}
        </ReactIdSwiper>
      </div>
    </div>
  )
}

export default HeroSection
