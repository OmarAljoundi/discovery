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
        slideClass="swiper-slide width-inherit"
        navigation={false}
      >
        {images.length == 0 && (
          <SwiperSlide>
            <Image
              removeWrapper={true}
              isBlurred
              as={NextImage}
              {...rest}
              width={1280}
              height={600}
              src={'/images/placeholder.svg'}
              alt=""
              loading="lazy"
              radius="none"
              quality={50}
              classNames={{ img: 'object-cover' }}
            />
          </SwiperSlide>
        )}
        {images.map((slide, i) => (
          <SwiperSlide key={i} style={{ width: 'inherit!important' }}>
            <Image
              removeWrapper={true}
              as={NextImage}
              isBlurred
              {...rest}
              width={1280}
              height={600}
              src={slide}
              quality={50}
              alt=""
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
