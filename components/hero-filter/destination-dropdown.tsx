'use client'
import { useEffect, FC } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Check, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '../ui/separator'
import { useParams, useRouter } from 'next/navigation'
import { Location } from '@/types/custom'
import { useFilterCustomer } from '@/hooks/use-customer-filter'

const DestinationDropdown: FC<{ locations: Location[] }> = ({ locations }) => {
  const router = useRouter()
  const { onCreate, filters } = useFilterCustomer()
  const { destination } = useParams()

  const select = decodeURIComponent(destination?.toString())

  useEffect(() => {
    if (filters) {
      onCreate({
        ...filters,
        tab: '1',
      })
    }
  }, [destination])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="text-left w-full  cursor-pointer">
          <Plus className="ml-2 h-4 w-4" />
          الوجهات
          {destination && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal truncate" onClick={() => router.push('/tour-listing')}>
                {select.replaceAll('-', ' ')}
                <X className="border  rounded-lg w-4 h-4 mr-2 text-white bg-red-500/70" />
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>لاتوجد نتائج</CommandEmpty>
            <CommandGroup>
              {locations?.map((option) => {
                return (
                  <CommandItem
                    key={option.id}
                    onSelect={() => {
                      router.push(`/tour-listing/${option.name?.replaceAll(' ', '-')}`)
                    }}
                  >
                    <Check
                      className={cn(
                        'ml-2 text-green-600 flex h-4 w-4 items-center justify-center opacity-0 transition-all duration-500',
                        select.replaceAll('-', ' ') == option.name ? 'opacity-100' : 'opacity-0',
                      )}
                    />

                    <span>{option.name}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default DestinationDropdown
