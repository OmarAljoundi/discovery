'use client'
import BlurImage from '@/components/common/blur-image'
import { Tour } from '@/types/custom'
import { FunctionComponent } from 'react'
import ReactIdSwiper, { ReactIdSwiperProps } from 'react-id-swiper'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules'
import IconTourProvider from '@/provider/icon-tour-provider'
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
interface TourImagesProps {
  tour: Tour
}

const TourImages: FunctionComponent<TourImagesProps> = ({ tour }) => {
  return (
    <div className="relative shadow-medium rounded-medium p-4">
      <Swiper
        dir="ltr"
        spaceBetween={30}
        className="overflow-visible-important"
        scrollbar={{
          el: '.js-popular-destination-scrollbar',
          draggable: true,
        }}
        initialSlide={4}
        modules={[Scrollbar, Navigation]}
        navigation={{
          nextEl: '.js-destination-next',
          prevEl: '.js-destination-prev',
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
            slidesPerView: 4,
          },
        }}
      >
        {tour.images?.map((item, index) => (
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
              <div className="relative h-full group overflow-hidden rounded-medium ">
                <BlurImage
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item}`}
                  alt="Hero Image"
                  quality={80}
                  fetchPriority={index == 0 ? 'high' : 'auto'}
                  loading={index == 0 ? 'eager' : 'lazy'}
                  fill
                  className="bg-gray-300 mx-auto max-w-full rounded-medium"
                />
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div>
        <button
          className="disabled:opacity-50 left-10 absolute top-1/2 translate-y-1/2 z-10  -prev flex justify-center items-center button -blue-1  
             shadow-1 w-10 h-10 rounded-full sm:d-none js-destination-prev bg-white "
        >
          <IconTourProvider>
            <BsArrowLeftShort />
          </IconTourProvider>
        </button>
        <button
          className="disabled:opacity-50 right-10 absolute top-1/2 translate-y-1/2 z-10 -next flex justify-center items-center button -blue-1
            shadow-1 w-10 h-10 rounded-full sm:d-none js-destination-next bg-white "
        >
          <IconTourProvider>
            <BsArrowRightShort />
          </IconTourProvider>
        </button>
        <div className="slider-scrollbar bg-light-2 mt-2  js-popular-destination-scrollbar" />
      </div>
    </div>
  )
}

export default TourImages
