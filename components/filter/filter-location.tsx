import { FunctionComponent } from 'react'
import FilterHeader from './filter-header'
import { useQuery } from 'react-query'
import { getDestination } from '@/lib/operations'
import { Radio, RadioGroup, Skeleton } from '@nextui-org/react'
import { cn } from '@/lib/utils'

interface FilterLocationProps {}

const FilterLocation: FunctionComponent<FilterLocationProps> = () => {
  const { data, isLoading } = useQuery('Locations', async () => await getDestination(), { refetchInterval: false, refetchOnWindowFocus: false })
  return (
    <div className="flex flex-col gap-1 w-full">
      <FilterHeader title="الوجهة السياحية" divider />
      {isLoading &&
        Array.from(new Array(6)).map((o) => (
          <div className="max-w-[300px] w-full flex items-center gap-3" key={o}>
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        ))}
      <RadioGroup>
        {data?.results?.map((dest) => (
          <Radio
            value={dest.name!}
            key={dest.id}
            classNames={{
              base: cn(
                'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
                'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 px-2 py-1 border-2 border-transparent',
                'data-[selected=true]:bg-content2',
              ),
            }}
          >
            {dest.name}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterLocation
