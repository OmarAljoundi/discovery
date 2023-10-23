import { FunctionComponent, useState } from 'react'
import FilterHeader from './filter-header'
import { MapPin, Search } from 'lucide-react'
import { Chip, Input, ScrollShadow } from '@nextui-org/react'
import { COUNTIRESLIST } from '@/lib/utils'
import { ScrollArea } from '../ui/scroll-area'
interface FilterCountryProps {}

const FilterCountry: FunctionComponent<FilterCountryProps> = () => {
  const [query, setQuery] = useState<string>('')
  const [groupSelected, setGroupSelected] = useState<string[]>([])
  return (
    <div className="flex flex-col gap-1 w-full">
      <FilterHeader title="البلد المفضل" icon={MapPin} divider />
      <Input startContent={<Search />} placeholder="أبحث عن الوجهة المفضلة" value={query} onChange={(e) => setQuery(e.target.value)} />
      <ScrollArea className="h-52 border p-2">
        <div className="flex flex-1 flex-wrap gap-1 justify-start">
          {groupSelected.map((g) => (
            <Chip color="primary" key={g} isCloseable onClose={() => setGroupSelected([...groupSelected.filter((x) => x !== g)])}>
              {g}
            </Chip>
          ))}
          {COUNTIRESLIST.filter((m) => !groupSelected.includes(m) && m.includes(query)).map((country) => (
            <Chip
              className="hover:opacity-50 transition-opacity duration-500 cursor-pointer"
              color="danger"
              key={country}
              onClick={() => {
                setGroupSelected([...groupSelected, country])
                setQuery('')
              }}
            >
              {country}
            </Chip>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default FilterCountry
