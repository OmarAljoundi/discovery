'use client'
import TourCard from '@/components/common/tour-card'
import { useSetting } from '@/hooks/use-setting'
import { getTours } from '@/lib/operations'
import { Image } from '@nextui-org/react'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { useQuery } from 'react-query'
import { Navigation, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface BestToursProps {}

const BestTours: FunctionComponent<BestToursProps> = () => {
  const config = useSetting()

  const { data, isLoading } = useQuery('Best-Tours', async () => await getTours(), {
    refetchInterval: false,
    refetchOnWindowFocus: true,
    // select: (data) => {
    //   return data?.filter((x) => config.setting?.best_tours?.tours?.includes(x.id!))
    // },
  })

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[]}
        className="mySwiper"
      >
        {data?.map((item) => (
          <SwiperSlide key={item.id}>
            <TourCard tour={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div>
        <button className="section-slider-nav  -prev flex-center button -blue-1  shadow-1 size-40 rounded-full sm:d-none js-destination-prev bg-yellow text-white">
          <i className="icon icon-chevron-left text-12" />
        </button>
        <button className="section-slider-nav -next flex-center button -blue-1 shadow-1 size-40 rounded-full sm:d-none js-destination-next bg-yellow text-white">
          <i className="icon icon-chevron-right text-12" />
        </button>
        <div className="slider-scrollbar bg-light-2 mt-40  js-popular-destination-scrollbar" />
      </div>
    </>
  )
}

export default BestTours
