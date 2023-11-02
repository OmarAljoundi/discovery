'use client'
import Carousel from '@/components/common/carousel'
import { Separator } from '@/components/ui/separator'
import { Tour } from '@/types/custom'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { FC } from 'react'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion } from 'framer-motion'
import IconTourProvider from '@/provider/icon-tour-provider'
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
const TourHotels: FC<{ tour: Tour }> = ({ tour }) => {
  return (
    <div className="relative shadow-medium rounded-medium p-4">
      <h4 className="mb-0 text-2xl font-semibold font-primary"> الفنادق المتوقعة</h4>
      <Separator className="my-4" />
      <div className="p-4">
        <Swiper
          dir="ltr"
          spaceBetween={30}
          className="p-3"
          scrollbar={{
            el: '.js-popular-destination-scrollbar',
            draggable: true,
          }}
          initialSlide={4}
          modules={[Scrollbar, Navigation, Pagination]}
          navigation={{
            nextEl: '.js-destination-next',
            prevEl: '.js-destination-prev',
          }}
          pagination={{
            el: '.js-tour-hotel-pag',
            clickable: true,
          }}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 22,
            },
            1024: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {tour?.tour_hotels?.map((i, index) => (
            <SwiperSlide key={index}>
              <motion.div
                key={index}
                className="rounded-medium"
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
                <div className="pt-4 " key={i.id}>
                  <div className="pt-2 px-4 flex items-center justify-between pb-2">
                    <div className="flex items-center">
                      <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">{i.hotel?.rating}</p>
                      <svg
                        className="w-4 h-4 text-yellow-300 mr-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-large text-right">{i.hotel?.name}</h4>
                  </div>
                  <div className="overflow-visible py-2 border-t pb-4">
                    <Carousel
                      uniqueKey={`customer-area-${index}`}
                      classNames={{ image: 'aspect-[3/2]' }}
                      includeArrows={true}
                      images={i.hotel?.images?.map((x) => `${process.env.NEXT_PUBLIC_IMAGE_URL}${x}`) ?? []}
                    />
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-auto">
        <div className="flex gap-x-4 items-center justify-center mt-5">
          <button
            className="disabled:opacity-50  z-10 -next flex justify-center items-center button -blue-1
            shadow-1 w-10 h-10 rounded-full sm:d-none js-destination-next bg-white "
          >
            <IconTourProvider>
              <BsArrowRightShort />
            </IconTourProvider>
          </button>
          <div className="w-auto">
            <div className="flex w-full -dots text-border js-tour-hotel-pag" />
          </div>
          <button
            className="disabled:opacity-50   -prev flex justify-center items-center button -blue-1  
             shadow-1 w-10 h-10 rounded-full sm:d-none js-destination-prev bg-white"
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

export default TourHotels
