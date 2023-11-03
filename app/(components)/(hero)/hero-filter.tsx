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

interface HeroFilterProps {
  types?: TourType[]
  destinations?: Location[]
}

const HeroFilter: FunctionComponent<HeroFilterProps> = ({ destinations, types }) => {
  const { filters } = useFilterCustomer()

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
    <motion.div
      className={cn('p-3 sm:p-4 lg:py-6 lg:px-8 bg-white  border  grid gap-2 sm:gap-0 h-full ')}
      variants={CONTAINER_VAR}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h1 className="text-xl text-center sm:text-base sm:text-right">أبحث عن رحلتك المفضلة</h1>

      <motion.div variants={{ ...ITEMS_VAR }}>
        <DestinationDropdown locations={destinations ?? []} />
      </motion.div>

      <motion.div variants={{ ...ITEMS_VAR }}>
        <CountryDropdown />
      </motion.div>
      <motion.div variants={{ ...ITEMS_VAR }}>
        <TypeDropdown types={types ?? []} />
      </motion.div>

      <motion.div variants={{ ...ITEMS_VAR }}>
        <DurationDropdown />
      </motion.div>

      <motion.div variants={{ ...ITEMS_VAR }}>
        <Button
          className="w-full"
          size={'sm'}
          as={Link}
          scroll={false}
          href={getUrl()}
          endContent={<SearchIcon className="text-white" />}
          color="primary"
        >
          <span className="mr-2 text-white text-lg">أبحث</span>
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default HeroFilter
