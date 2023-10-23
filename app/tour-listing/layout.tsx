import BreadCrumb, { BreadCrumbProps } from '@/components/common/bread-crumb'
import Filter from '@/components/filter'
import MobileSortFilterButtons from '@/components/filter/mobile-sort-filter-buttons'
import Sort from '@/components/filter/sort'
import { Separator } from '@/components/ui/separator'
import { Button } from '@nextui-org/react'
import { FilterIcon } from 'lucide-react'
import { FunctionComponent, ReactNode } from 'react'

interface TourListLayoutProps {
  children: ReactNode
}

const breads: BreadCrumbProps = {
  items: [
    {
      name: 'الرئيسية',
      href: '/',
    },
    {
      name: 'جميع الرحلات',
    },
  ],
}
const TourListLayout: FunctionComponent<TourListLayoutProps> = ({ children }) => {
  return (
    <main className="block md:flex  md:gap-x-4 p-8">
      <nav className="hidden md:block md:max-w-[240px] xl:max-w-xs w-full">
        <Filter />
      </nav>
      <div className="w-full">
        <div className="flex justify-between">
          <BreadCrumb items={breads.items} />
          <Sort />
          <MobileSortFilterButtons />
        </div>

        <Separator className="my-2" />
        {children}
      </div>
    </main>
  )
}

export default TourListLayout
