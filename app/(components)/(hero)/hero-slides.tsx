'use client'
import { FunctionComponent } from 'react'
import { useSetting } from '@/hooks/use-setting'
import { motion } from 'framer-motion'
import BlurImage from '@/components/common/blur-image'
import { Swiper, SwiperSlide } from 'swiper/react'
import IconTourProvider from '@/provider/icon-tour-provider'
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import { Navigation, Pagination } from 'swiper/modules'

interface HeroSlidesProps {}

const HeroSlides: FunctionComponent<HeroSlidesProps> = () => {
  const config = useSetting((x) => x.setting?.home?.sliders ?? [])

  return (
    <div className="relative col-span-12 h-36 sm:h-64 lg:h-96 md:h-72 sm:col-span-8 md:col-span-8 lg:col-span-8 overflow-hidden">
      <Swiper
        spaceBetween={30}
        className="p-3"
        initialSlide={4}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: '.js-hero-next',
          prevEl: '.js-hero-prev',
        }}
        pagination={{
          el: '.js-tour-hero-pag',
          clickable: true,
        }}
      >
        {config?.map((item, index) => (
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
              <div className="relative h-96 group overflow-hidden ">
                <div
                  className="absolute top-0 left-0 flex flex-col justify-between h-full w-full before:w-full  
                   before:absolute before:h-full before:bottom-0 before:left-0 before:bg-gradient-to-t 
                 before:from-black/50 before:z-10  
                  before:to-black/50"
                >
                  <BlurImage
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.image}`}
                    alt="Hero Image"
                    quality={80}
                    fetchPriority={index == 0 ? 'high' : 'auto'}
                    loading={index == 0 ? 'eager' : 'lazy'}
                    fill
                    className="bg-gray-300 mx-auto max-w-full rounded-none"
                  />
                  <figcaption
                    className="absolute z-20 p-3 bottom-10 max-w-[150px] rounded-none left-0 sm:bottom-8 sm:left-5 flex sm:max-w-xs text-white  justify-between sm:rounded-xl  
                    sm:py-4 sm:px-6"
                  >
                    <div>
                      <h1 className="text-base lg:text-xl xl:text-3xl text-white ">{item.title}</h1>
                      <p className="text-xs  lg:text-lg xl:text-lg mt-2 text-white ">{item.sub_title}</p>
                    </div>
                  </figcaption>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-auto absolute bottom-6 right-6 z-50">
        <div className="flex gap-x-4 items-center justify-center mt-5">
          <button
            className="disabled:opacity-50  z-10 -next flex justify-center items-center button -blue-1
              shadow-1 w-10 h-10 rounded-full sm:d-none js-hero-next bg-white "
          >
            <IconTourProvider>
              <BsArrowRightShort />
            </IconTourProvider>
          </button>
          <div className="w-auto">
            <div className="flex w-full -dots text-border js-tour-hero-pag" />
          </div>
          <button
            className="disabled:opacity-50   -prev flex justify-center items-center button -blue-1  
               shadow-1 w-10 h-10 rounded-full sm:d-none js-hero-prev bg-white"
          >
            <IconTourProvider>
              <BsArrowLeftShort />
            </IconTourProvider>
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroSlides
