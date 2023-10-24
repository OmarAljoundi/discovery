'use client'
import TourCard from '@/components/common/tour-card'
import { useSetting } from '@/hooks/use-setting'
import { getTours } from '@/lib/operations'
import { Button, Image } from '@nextui-org/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FunctionComponent, useRef } from 'react'
import { useQuery } from 'react-query'
import Swiper from 'react-id-swiper'
import 'swiper/css'
import { Separator } from '@/components/ui/separator'
import TourCardLoading from '@/components/common/tour-card-loading'
import { motion } from 'framer-motion'

interface BestToursProps {}

const BestTours: FunctionComponent<BestToursProps> = () => {
  const config = useSetting()
  const swiperRef = useRef<any>(null)
  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext()
    }
  }
  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev()
    }
  }
  const { data, isLoading } = useQuery('Best-Tours', async () => await getTours(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    select: (data) => {
      return data?.filter((x) => config.setting?.best_tours?.tours?.includes(x.id!))
    },
  })

  const swiperParams = {
    slidesPerView: 'auto',
    spaceBetween: 30,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      600: {
        slidesPerView: 2,
      },
      900: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
      1500: {
        slidesPerView: 4,
      },
    },
  }

  return (
    <div className="bg-[url(/images/best_seller_background.png)] bg-[#f1f6ff] bg-right-bottom bg-no-repeat bg-auto py-16">
      <div className="container">
        <div className="flex justify-between items-end">
          <h1 className="text-xl">أفضل الرحلات السياحة</h1>
          <div className="flex justify-end">
            <Button isIconOnly size="sm" className="group hover:text-primary duration-500 transition-all" variant="light" onPress={goPrev}>
              <ArrowRight className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />
            </Button>
            <Button isIconOnly size="sm" className="group hover:text-primary duration-500 transition-all" variant="light" onPress={goNext}>
              <ArrowLeft className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        {isLoading && (
          <motion.div className="grid grid-cols-4 gap-x-4">
            {[1, 2, 3, 4].map((_, index) => (
              <motion.div key={index}>
                <TourCardLoading />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!isLoading && (
          <Swiper {...swiperParams} ref={swiperRef}>
            {data?.map((item, index) => (
              <motion.div
                key={item.id}
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
                <TourCard tour={item} />
              </motion.div>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  )
}

export default BestTours
