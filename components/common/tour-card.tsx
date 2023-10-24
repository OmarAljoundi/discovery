'use client'
import { Tour } from '@/types/custom'
import { FunctionComponent } from 'react'
import Carousel from './carousel'
import { ArrowLeft, CalendarDays, CircleDollarSign, Clock, MapPin } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Badge, Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FADE_DOWN_ANIMATION_VARIANTS, ITEMS_VAR } from '@/lib/motions'
interface TourCardProps {
  tour: Tour
}

const TourCard: FunctionComponent<TourCardProps> = ({ tour }) => {
  return (
    <article key={tour.id} className=" rounded-lg tour-card">
      <Badge
        placement="top-left"
        content={
          <div className="px-2">
            <div className="flex gap-x-2 items-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${tour.tour_type?.image}` ?? ''}
                alt={tour.tour_type?.image ?? ''}
                width={100}
                height={100}
                className="max-w-[35px] w-full"
              />
              <span>{tour.tour_type?.name}</span>
            </div>
          </div>
        }
        className="bg-white shadow-card rounded-sm left-0 translate-x-0 rounded-bl-none rounded-tr-none border-r-0 border-b-0 translate-y-0 top-0"
      >
        <Carousel className="aspect-[3/2] rounded-t-lg" images={tour.images?.map((x) => `${process.env.NEXT_PUBLIC_IMAGE_URL}${x}`) ?? []} />
      </Badge>
      <div
        className="py-3 px-5 -mt-[16px]
       relative bg-white z-40 shadow-card after:rounded-b-none 
       after:w-full after:h-5 
       after:rounded-lg after:absolute after:bottom-full after:left-0  after:z-10 after:bg-white after:-mb-[1px]"
      >
        <div className="flex justify-start gap-x-2 h-6">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <h4 className="text-ellipsis overflow-hidden line-clamp-1 text-xs text-muted-foreground max-h-14 min-h-[56px]">
            {tour.tour_countries?.join(' ، ')}
          </h4>
        </div>
        <h1 className="text-base md:text-lg lg:text-xl mb-2 text-ellipsis overflow-hidden line-clamp-1" title={tour.name}>
          {tour.name}
        </h1>
        <div className="flex justify-start gap-x-2 items-center h-6">
          <CalendarDays className="w-4 h-4 text-muted-foreground" />
          <h4 className="text-sm text-muted-foreground">{tour.start_day?.join(' ، ')}</h4>
        </div>
        <div className="flex justify-start gap-x-2 items-center h-6">
          <CircleDollarSign className="w-4 h-4 text-muted-foreground" />
          <h4 className="text-sm text-muted-foreground">يبدأ السعر من {tour.price}</h4>
        </div>
        <Separator className="my-4" />
        <div className="flex  justify-between">
          <div className="flex gap-x-2">
            <div className="flex gap-x-1 items-center text-xs">
              <Clock className="text-primary w-4 h-4" />
              {tour.number_of_days} أيام
            </div>
            <div className="flex gap-x-1 items-center text-xs">
              <MapPin className="text-primary w-4 h-4" />
              {tour.tour_countries?.length} بلدان
            </div>
          </div>
          <div>
            <Button
              size="sm"
              className="group hover:text-primary duration-500 transition-all"
              as={Link}
              variant="light"
              endContent={<ArrowLeft className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />}
              href={`/tour/${tour.slug}`}
            >
              التفاصيل
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
export default TourCard
