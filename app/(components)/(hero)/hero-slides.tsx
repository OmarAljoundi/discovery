'use client'
import { FunctionComponent } from 'react'
import { useSetting } from '@/hooks/use-setting'
import ReactIdSwiper from 'react-id-swiper'
import { motion } from 'framer-motion'
import BlurImage from '@/components/common/blur-image'

interface HeroSlidesProps {}

const HeroSlides: FunctionComponent<HeroSlidesProps> = () => {
  const config = useSetting((x) => x.setting?.home?.sliders ?? [])
  const swiperParams = {
    slidesPerView: 1,

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  }
  return (
    <ReactIdSwiper
      {...swiperParams}
      containerClass="col-span-12 h-36 sm:h-64 lg:h-96 md:h-72 sm:col-span-8 md:col-span-8 lg:col-span-8 overflow-hidden"
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
          <div className="relative h-full group overflow-hidden ">
            <BlurImage
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.image}`}
              alt="Hero Image"
              quality={80}
              fetchPriority={index == 0 ? 'high' : 'auto'}
              loading={index == 0 ? 'eager' : 'lazy'}
              fill
              className="bg-gray-300 mx-auto max-w-full"
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
  )
}

export default HeroSlides
