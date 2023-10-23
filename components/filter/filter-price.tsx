'use client'
import { FunctionComponent, useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { Banknote } from 'lucide-react'
import FilterHeader from './filter-header'

interface FilterPriceProps {}

const FilterPrice: FunctionComponent<FilterPriceProps> = () => {
  const [value, setValue] = useState(900)
  return (
    <div className="flex flex-col gap-1 w-full">
      <FilterHeader title="السعر" icon={Banknote} />
      <span className="absolute top-[-14px] bg-white rounded-2xl py-1 px-5 right-4 shadow text-primary text-xs">ر.ع {value}</span>
      <Slider
        max={1800}
        styles={{
          track: { backgroundColor: 'var(--primary)' },
          handle: {
            backgroundColor: 'var(--primary)',
            borderColor: 'var(--primary)',
          },
        }}
        value={value}
        onChange={(value) => setValue(value as number)}
      />
    </div>
  )
}

export default FilterPrice
