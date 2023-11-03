import { getDestination } from '@/lib/operations'
import { Button, Skeleton } from '@nextui-org/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FunctionComponent } from 'react'
import { useQuery } from 'react-query'
import FilterHeader from './filter-header'
import { cn } from '@/lib/utils'
import { Separator } from '../ui/separator'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface FilterSectionProps {
  classNames: string
}

const FilterSection: FunctionComponent<FilterSectionProps> = ({ classNames }) => {
  const params = useParams()

  const { data, isLoading } = useQuery([params.destination, params.section], async () => await getDestination(), {
    select: (data) => {
      return data.results?.find((x) => x.slug == decodeURIComponent(params.destination as string))?.location_attributes
    },
    keepPreviousData: true,
    enabled: !!params.destination || !!params.section,
  })

  if (isLoading)
    return (
      <div className={cn(classNames)}>
        <div className="flex justify-between items-center  mb-4">
          <Skeleton className="h-4 w-3/5 rounded-md" />
        </div>
        <Separator className="my-2" />
        <div className="grid grid-cols-2 gap-4 mt-4">
          {Array.from(new Array(4)).map((_, index) => (
            <div className="flex justify-between items-center py-1" key={index}>
              <Skeleton className="h-4 w-3/5 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    )

  if (!data || data.length <= 1) return null

  return (
    <div className={cn(classNames)}>
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-lg">القسم</h1>
        <Button as={Link} variant="light" endContent={<ArrowLeft />} href={'/tour-listing'} className="text-xs px-2 h-10 lg:hidden">
          جميع الوجهات
        </Button>
      </div>
      <Separator />
      <div className="grid grid-cols-2 gap-4 mt-4">
        {data.map((attr) => (
          <Button
            color="primary"
            variant="bordered"
            className={cn(decodeURIComponent(params.section as string) == attr.title?.replaceAll(' ', '-') ? 'bg-primary text-white' : 'opacity-70')}
            key={attr.id!}
            as={Link}
            href={`/tour-listing/${decodeURIComponent(params.destination as string)}/${attr.title?.replaceAll(' ', '-')}`}
          >
            {attr.title}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default FilterSection
