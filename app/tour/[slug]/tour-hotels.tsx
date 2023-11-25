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
import Stars from '@/components/common/stars'
import { CalendarDays, MapPin } from 'lucide-react'
import BlurImage from '@/components/common/blur-image'
const TourHotels: FC<{ tour: Tour }> = ({ tour }) => {
  return (
    <div className="relative shadow-medium rounded-medium p-4">
      <h4 className="mb-0 text-2xl font-semibold font-primary"> الفنادق المتوقعة</h4>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tour?.tour_hotels?.map((i, index) => (
          <motion.div
            key={index}
            className="rounded-medium shadow-medium p-4"
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
            <div className="pt-2 flex items-start justify-between pb-2 relative" key={i.id}>
              <div className="space-y-2">
                <div>
                  <h4 className="font-bold text-large text-right ">{i.hotel?.name}</h4>
                  <Stars stars={i.hotel?.rating ?? 0} />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-start ">
                    <div className="w-5 h-5">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-ellipsis  text-muted-foreground   text-xs overflow-hidden line-clamp-1">{i.hotel?.place}</span>
                  </div>
                  <div className="flex justify-start ">
                    <div className="w-5 h-5">
                      <CalendarDays className="w-4 h-4 text-muted-foreground" />
                    </div>

                    <span className="text-ellipsis  text-muted-foreground text-xs overflow-hidden line-clamp-1">{i.hotel?.period} ليالي</span>
                  </div>
                </div>
              </div>
              <BlurImage
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${i.hotel?.hotel_logo}`}
                width={1080}
                height={1080}
                alt="hotel logo"
                loading="eager"
                quality={100}
                className="max-w-[100px]"
                containerClassName="absolute left-2 top-2"
              />
            </div>
            <div className="overflow-visible py-2 border-t pb-4">
              <Carousel
                uniqueKey={`customer-area-${index}`}
                classNames={{ image: 'aspect-[3/2]' }}
                includeArrows={true}
                images={i.hotel?.images?.map((x) => `${process.env.NEXT_PUBLIC_IMAGE_URL}${x}`) ?? []}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TourHotels
