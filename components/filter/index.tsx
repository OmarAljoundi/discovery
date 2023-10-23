'use client'
import { FunctionComponent } from 'react'
import FilterPrice from './filter-price'
import FilterTypes from './filter-types'
import FilterCountry from './filter-country'
import FilterDuration from './filter-duration'
import FilterLocation from './filter-location'

interface FilterProps {}

const Filter: FunctionComponent<FilterProps> = () => {
  return (
    <div className="grid gap-y-4">
      <div className="shadow-card p-4 rounded-md">
        <FilterLocation />
      </div>
      <div className="shadow-card p-4 rounded-md">
        <FilterTypes />
      </div>
      <div className="shadow-card p-4 rounded-md">
        <FilterPrice />
      </div>
      <div className="shadow-card p-4 rounded-md">
        <FilterCountry />
      </div>
      <div className="shadow-card p-4 rounded-md">
        <FilterDuration />
      </div>
    </div>
  )
}

export default Filter
