import { useStatic } from '@/hooks/use-static'
import { cn } from '@/lib/utils'
import { Checkbox, CheckboxGroup, User } from '@nextui-org/react'
import { Plane } from 'lucide-react'
import React, { FunctionComponent } from 'react'
import FilterHeader from './filter-header'

interface FilterTypesProps {}

const FilterTypes: FunctionComponent<FilterTypesProps> = () => {
  const [groupSelected, setGroupSelected] = React.useState([])
  const staticData = useStatic()
  return (
    <div className="flex flex-col gap-1 w-full">
      <FilterHeader title="نوع الرحلة" icon={Plane} divider />
      <CheckboxGroup
        value={groupSelected}
        //@ts-ignore
        onChange={setGroupSelected}
        classNames={{
          base: 'w-full',
        }}
      >
        {staticData.types?.map((type) => (
          <Checkbox
            key={type.id}
            aria-label={type.name}
            classNames={{
              base: cn(
                'inline-flex max-w-md w-full bg-content1 m-0',
                'hover:bg-content2 items-center justify-start',
                'cursor-pointer rounded-lg gap-2 px-2 py-1 border-2 border-transparent',
                'data-[selected=true]:bg-content2',
              ),
              label: 'w-full',
            }}
            value={type.name}
          >
            <div className="w-full flex justify-between gap-2 ">
              <User
                avatarProps={{ size: 'md', src: `${process.env.NEXT_PUBLIC_IMAGE_URL}${type.image}`, className: 'bg-transparent' }}
                // description={
                //   <Link isExternal href={user.url} size="sm">
                //     @{user.username}
                //   </Link>
                // }
                name={type.name}
              />
            </div>
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  )
}

export default FilterTypes
