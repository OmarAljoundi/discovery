'use client'
import CountryDropdown from '@/components/hero-filter/country-dropdown'
import DestinationDropdown from '@/components/hero-filter/destination-dropdown'
import DurationDropdown from '@/components/hero-filter/duration-dropdown'
import TypeDropdown from '@/components/hero-filter/type-dropdown'
import { useFilterCustomer } from '@/hooks/use-customer-filter'
import { cn } from '@/lib/utils'
import { Button } from '@nextui-org/react'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import queryString from 'query-string'
import { FunctionComponent } from 'react'
import { motion } from 'framer-motion'
import { CONTAINER_VAR, ITEMS_VAR } from '@/lib/motions'
import { Location, TourType } from '@/types/custom'
import { useQuery } from '@tanstack/react-query'
import { REVALIDATE_LOCATION_LIST, REVALIDATE_TOUR_TYPE } from '@/lib/keys'
import { getDestination, getTourTypes } from '@/lib/operations'

interface HeroFilterProps {}

const HeroFilter: FunctionComponent<HeroFilterProps> = () => {
  const { filters } = useFilterCustomer()
  const { data: types } = useQuery({
    queryKey: [REVALIDATE_TOUR_TYPE],
    queryFn: async () => await getTourTypes(),
  })

  const getUrl = () => {
    const url = queryString.stringifyUrl(
      {
        url: '/tour-listing',
        query: filters,
      },
      {
        skipNull: true,
        skipEmptyString: true,
        arrayFormat: 'comma',
        encode: true,
      },
    )

    return url
  }

  return (
    <>
      <motion.div
        className={cn(
          'p-3 sm:p-4 lg:py-6 lg:px-8 bg-white  border  grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-x-6 sm:gap-y-2 h-full rounded-none md:rounded-medium',
        )}
        variants={CONTAINER_VAR}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="flex justify-center col-span-2 lg:col-span-4" variants={{ ...ITEMS_VAR }}>
          <h1 className="text-xl text-center mb-4 ">ابحث عن الرحلة التي تناسبك</h1>
        </motion.div>

        <motion.div variants={{ ...ITEMS_VAR }}>
          <CountryDropdown />
        </motion.div>
        <motion.div variants={{ ...ITEMS_VAR }}>
          <TypeDropdown types={types?.results ?? []} />
        </motion.div>

        <motion.div variants={{ ...ITEMS_VAR }}>
          <DurationDropdown />
        </motion.div>

        <motion.div variants={{ ...ITEMS_VAR }}>
          <Button className="w-full" size={'sm'} as={Link} href={getUrl()} endContent={<SearchIcon className="text-white" />} color="primary">
            <span className="mr-2 text-white text-lg">أبحث</span>
          </Button>
        </motion.div>
      </motion.div>
    </>
  )
}

export default HeroFilter
