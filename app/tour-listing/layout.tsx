'use client'
import BreadCrumb from '@/components/common/bread-crumb'
import Filter from '@/components/filter'
import MobileSortFilterButtons from '@/components/filter/mobile-sort-filter-buttons'
import Sort from '@/components/filter/sort'
import { Separator } from '@radix-ui/react-separator'
import { FunctionComponent, ReactNode } from 'react'

interface LayoutListProps {
  children: ReactNode
}

const LayoutList: FunctionComponent<LayoutListProps> = ({ children }) => {
  return (
    <main className="block md:flex  md:gap-x-4 p-8">
      <nav className="hidden md:block md:max-w-[240px] xl:max-w-xs w-full">
        <Filter />
      </nav>
      <div className="w-full">
        <div className="flex justify-between">
          <BreadCrumb items={[]} />
          <Sort />
          <MobileSortFilterButtons />
        </div>

        <Separator className="my-2" />
        {children}
      </div>
    </main>
  )
}

export default LayoutList
