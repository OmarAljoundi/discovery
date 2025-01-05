'use client'
import { FunctionComponent, useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import Swiper from 'react-id-swiper'
import 'swiper/css'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { REVALIDATE_ARTICLE_LIST, REVALIDATE_TOUR_LIST } from '@/lib/keys'
import { getArticles } from '@/lib/operations'
import ArticleCard from './articles-card'
interface ArticlesListProps {}

const ArticlesList: FunctionComponent<ArticlesListProps> = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const { data } = useQuery({
    queryKey: [REVALIDATE_ARTICLE_LIST],
    queryFn: async () => await getArticles(),
    select: (data) => {
      return data?.filter((x) => x.is_active) ?? []
    },
  })

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
        slidesPerView: 2,
      },
      1500: {
        slidesPerView: 4,
      },
    },
  }

  if (data?.length == 0) return <></>
  return (
    <div className="py-16" ref={sectionRef}>
      <div className="container">
        <div className="flex justify-between items-end">
          <h1 className="text-xl">المدونات</h1>
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
        <Swiper {...swiperParams} ref={swiperRef}>
          {data?.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <ArticleCard item={item} />
            </motion.div>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ArticlesList
