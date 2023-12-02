'use client'
import { FunctionComponent, useEffect } from 'react'
import { useSetting } from '@/hooks/use-setting'
import { motion } from 'framer-motion'
import BlurImage from '@/components/common/blur-image'
import { Swiper, SwiperSlide } from 'swiper/react'
import IconTourProvider from '@/provider/icon-tour-provider'
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import { Navigation, Pagination } from 'swiper/modules'
import { useContent } from '@/hooks/react-query/use-content'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { REVALIDATE_CONTENT_LIST } from '@/lib/keys'
import { getContentData } from '@/lib/operations'
import HeroFilter from './hero-filter'
import { useFilterCustomer } from '@/hooks/use-customer-filter'

interface HeroSlidesProps {}

const HeroSlides: FunctionComponent<HeroSlidesProps> = () => {
  const { data } = useQuery({
    queryKey: [REVALIDATE_CONTENT_LIST],
    queryFn: async () => await getContentData(),
  })

  const { onDestroy } = useFilterCustomer()

  useEffect(() => {
    onDestroy()
  }, [])

  return (
    <div className="relative ">
      <div className="absolute z-50 left-5  bottom-0 top-[50%] ">
        <button
          className="disabled:opacity-50   -prev flex justify-center items-center button -blue-1  
               shadow-1 w-10 h-10 rounded-full sm:d-none btn-prev-slide bg-white"
        >
          <IconTourProvider>
            <BsArrowLeftShort />
          </IconTourProvider>
        </button>
      </div>

      <div className="absolute z-50 right-5 bottom-0  top-[50%]">
        <button
          className="disabled:opacity-50  z-10 -next flex justify-center items-center button -blue-1 btn-next-slide
              shadow-1 w-10 h-10 rounded-full sm:d-none js-hero-next bg-white "
        >
          <IconTourProvider>
            <BsArrowRightShort />
          </IconTourProvider>
        </button>
      </div>
      <Swiper
        loop={true}
        slidesPerView="auto"
        navigation={{
          nextEl: '.btn-next-slide',
          prevEl: '.btn-prev-slide',
        }}
        modules={[Navigation, Pagination]}
        className="swiper !p-0"
      >
        {data?.home?.sliders?.map((item, index) => (
          <SwiperSlide key={item.uuid}>
            <motion.div
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
              <div className="relative h-full group overflow-hidden ">
                <BlurImage
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.image}`}
                  alt="Hero Image"
                  quality={100}
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: 'cover',
                  }}
                  fetchPriority={index == 0 ? 'high' : 'auto'}
                  loading={index == 0 ? 'eager' : 'lazy'}
                  className="bg-gray-400 mx-auto max-w-full object-cover object-right-top md:object-center rounded-none"
                />
                <section className="relative bg-[var(--bg-1)] border-t lg:border-t-0">
                  <div className="pt-[70px] sm:pt-[100px] md:pt-[150px] xl:pt-[180px] pb-16  px-3 bg-no-repeat bg-cover bg-black/10 relative h-[500px]">
                    <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed bg-black/60 ">
                      <div className="container grid items-center h-full">
                        <div className="text-center relative z-30">
                          <h1 className="text-4xl sm:text-6xl lg:text-7xl  font-secondary text-white">{item.title}</h1>
                          <p className=" mx-auto px-2 font-primary text-xl lg:text-3xl text-white mt-4 md:mt-7 mb-6 ">{item.sub_title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <section className="mt-8 absolute z-10 w-full max-w-7xl mx-auto right-0 left-0 -bottom-16 xl:bottom-10">
        <HeroFilter />
      </section>
    </div>
  )
}

export default HeroSlides
