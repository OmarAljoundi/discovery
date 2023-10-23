import React, { ComponentProps, useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { Image, ImageProps } from '@nextui-org/react'
import NextImage from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface CarouselProps extends ImageProps {
  images: string[]
}

export default function Carousel({ images, ...rest }: CarouselProps) {
  return (
    <div className="relative">
      <Swiper
        className="mySwiper"
        modules={[Pagination, Navigation]}
        pagination={{
          clickable: true,
        }}
        navigation={false}
      >
        {images.length == 0 && (
          <SwiperSlide>
            <Image
              {...rest}
              width={1280}
              height={600}
              src={'/images/placeholder.svg'}
              alt=""
              loading="lazy"
              radius="none"
              classNames={{ img: 'object-cover' }}
            />
          </SwiperSlide>
        )}
        {images.map((slide, i) => (
          <SwiperSlide key={i}>
            <Image
              {...rest}
              width={1280}
              height={600}
              src={slide}
              alt=""
              loading="lazy"
              radius="none"
              fallbackSrc={'/images.placeholder.svg'}
              classNames={{ img: 'object-cover' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
