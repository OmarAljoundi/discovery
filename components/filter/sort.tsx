'use client'
import { FunctionComponent, useState } from 'react'
import CustomSelect from '../next-ui/custom-select'
import { Button, SelectItem } from '@nextui-org/react'
import { ORDERFILTER } from '@/lib/utils'
import { ArrowDownUp, FilterIcon, SortDesc } from 'lucide-react'

interface SortProps {}

const Sort: FunctionComponent<SortProps> = () => {
  const [order, setOrder] = useState<string>('')
  return (
    <div className="flex gap-x-2">
      <div className="hidden md:block">
        <CustomSelect
          onChange={(e) => setOrder(e.target.value)}
          value={order}
          className="w-44 p-0"
          size="sm"
          placeholder="الترتيب حسب"
          classNames={{
            base: 'p-0  ',
            mainWrapper: 'p-0 h-8',
          }}
        >
          {ORDERFILTER.map((order) => (
            <SelectItem key={order.label} value={order.value}>
              {order.label}
            </SelectItem>
          ))}
        </CustomSelect>
      </div>
    </div>
  )
}

export default Sort
