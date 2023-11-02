'use client'
import { useState, useEffect, FC, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import React from 'react'
import { Tour } from '@/types/custom'
import { filterTours } from '@/lib/utils'
import TourCard from './tour-card'

const TourRendering: FC<{ tours: Tour[] }> = ({ tours }) => {
  const searchParams = useSearchParams()
  const { ref, inView } = useInView()
  const [currentSize, setCurrentSize] = useState(10)

  useEffect(() => {
    console.log(inView)
    if (inView) {
      setCurrentSize(currentSize + 10)
    }
  }, [inView])

  const currentTours = useMemo(() => {
    return filterTours(
      {
        country: searchParams?.get('country') as string,
        days: searchParams?.get('days') as string,
        type: searchParams?.get('type') as string,
        sortMemebr: searchParams?.get('sortMemebr'),
        maxprice: searchParams?.get('maxprice') as any,
        minprice: searchParams?.get('minprice') as any,
        sortOrder: searchParams?.get('sortOrder') as any,
      },
      tours,
    )
  }, [
    searchParams?.get('country'),
    searchParams?.get('days'),
    searchParams?.get('tab'),
    searchParams?.get('type'),
    searchParams?.get('page'),
    searchParams?.get('maxprice'),
    searchParams?.get('minprice'),
    searchParams?.get('sortMemebr'),
    searchParams?.get('sortOrder'),
  ])

  return (
    <div className="mt-1 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:gap-y-10 2xl:grid-cols-4">
      {currentTours?.slice(0, currentSize).map((tour) => (
        <TourContent ref={ref} key={tour.id} {...tour} />
      ))}
    </div>
  )
}

export default TourRendering

// eslint-disable-next-line react/display-name
const TourContent = React.forwardRef((tour: Tour, ref) => {
  const content = ref ? (
    <article
      className="rounded-lg tour-card listing-card group/item relative inline-flex w-full flex-col"
      //@ts-ignore
      ref={ref}
    >
      <TourCard tour={tour} />
    </article>
  ) : (
    <article className="rounded-lg tour-card listing-card group/item relative inline-flex w-full flex-col">
      <TourCard tour={tour} />
    </article>
  )
  return content
})
