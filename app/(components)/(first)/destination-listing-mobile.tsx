'use client'
import BlurImage from '@/components/common/blur-image'
import { Separator } from '@/components/ui/separator'
import { Location } from '@/types/custom'
import { Button } from '@nextui-org/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { Navigation, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface DestinationListingMobileProps {
  destinations: Location[]
}

function getTotalTours(location: Location) {
  var total = 0

  location.location_attributes?.map((x) => {
    total += x.location_tours?.length ?? 0
  })
  return total
}

const DestinationListingMobile: FunctionComponent<DestinationListingMobileProps> = ({ destinations }) => {
  return (
    <div className="container mt-10 mb-10 md:hidden">
      <div className="flex justify-between items-end">
        <h1 className="text-xl">الوجهات السياحية</h1>

        <div className="flex justify-end">
          <Button isIconOnly size="sm" className="group hover:text-primary duration-500 transition-all js-destination-next" variant="light">
            <ArrowRight className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />
          </Button>
          <Button isIconOnly size="sm" className="group hover:text-primary duration-500 transition-all js-destination-prev" variant="light">
            <ArrowLeft className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />
          </Button>
        </div>
      </div>
      <Separator className="my-4" />

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
            slidesPerView: 2,
            spaceBetween: 20,
          },
          500: {
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
        {destinations?.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={`/tour-listing/${item.slug}`} className="citiesCard -type-1 d-block rounded-4 group hover:cursor-pointer" key={item.id}>
              <div className="citiesCard__image ratio aspect-[3/4] ">
                <BlurImage
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.image?.url}` || ''}
                  loading="eager"
                  alt=""
                  fill
                  className="object-cover"
                  containerClassName="w-full h-full aspect-w-1 aspect-h-1 w-full overflow-hidden  bg-gray-200 xl:aspect-w-7 xl:aspect-h-8"
                />
              </div>
              <div className="citiesCard__content flex flex-col justify-between text-center pt-8 pb-5 px-5">
                <div className="citiesCard__bg" />
                <div className="citiesCard__top">
                  <div className="text-14 text-white fw-bold" dir="rtl">
                    {getTotalTours(item)} رحلة ضمن هذا البرنامج
                  </div>
                </div>
                <div className="citiesCard__bottom translate-y-16 group-hover:translate-y-0 transition-all">
                  <figcaption
                    className="absolute p-2 bottom-0 right-0 mx-auto w-fit  left-0  mb-16  sm:left-5 flex   justify-between  border border-white
                    bg-white/75 rounded-xl shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm"
                  >
                    <h4 className="text-sm xl:text-xl md:text-xl text-black">{item.name}</h4>
                  </figcaption>

                  <Button color="primary" variant="shadow">
                    عرض الرحلات
                  </Button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-2">
        <div className="slider-scrollbar mt-2 relative  js-popular-destination-scrollbar bg-[#eaeaea]" />
      </div>
    </div>
  )
}

export default DestinationListingMobile
