import React, { FunctionComponent } from 'react'
import FilterHeader from './filter-header'
import { CalendarClock, User } from 'lucide-react'
import { DAYSFILTER, cn } from '@/lib/utils'
import { Checkbox, CheckboxGroup } from '@nextui-org/react'

interface FilterDurationProps {}

const FilterDuration: FunctionComponent<FilterDurationProps> = () => {
  const [groupSelected, setGroupSelected] = React.useState([])
  return (
    <div className="flex flex-col gap-1 w-full">
      <FilterHeader title="عدد الأيام" icon={CalendarClock} divider />
      <CheckboxGroup
        value={groupSelected}
        //@ts-ignore
        onChange={setGroupSelected}
        classNames={{
          base: 'w-full',
        }}
      >
        {DAYSFILTER.map((type) => (
          <Checkbox
            key={type.label}
            aria-label={type.label}
            classNames={{
              base: cn(
                'inline-flex max-w-md w-full bg-content1 m-0',
                'hover:bg-content2 items-center justify-start',
                'cursor-pointer rounded-lg gap-2 px-2 py-1 border-2 border-transparent',
                'data-[selected=true]:bg-content2',
              ),
              label: 'w-full',
            }}
            value={type.value}
          >
            <div className="w-full flex justify-between gap-2 ">{type.label}</div>
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  )
}

export default FilterDuration
