import { Button, Checkbox, CheckboxGroup, Chip, Input, Tooltip, User } from '@nextui-org/react'
import { Plus, SearchIcon } from 'lucide-react'
import React, { FunctionComponent, useState } from 'react'
import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import { cn } from '@/lib/utils'
import { getHotels } from '@/lib/operations'
import { useQuery } from 'react-query'
import { FormikProps } from 'formik'
import { Tour } from '@/types/custom'

interface HotelFormProps {
  formik: FormikProps<Tour>
}

const HotelForm: FunctionComponent<HotelFormProps> = ({ formik }) => {
  const { dirty, errors, values, setValues, handleChange, handleBlur, handleReset } = formik
  const [query, setQuery] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [groupSelected, setGroupSelected] = useState<string[]>([])

  const { data: hotels, isLoading } = useQuery('Hotels', async () => await getHotels(), {
    refetchInterval: false,
  })

  const handleAddHotels = () => {
    const hotelsArray = groupSelected.map((x) => {
      return {
        hotel_id: Number(x),
      }
    })
    setValues({
      ...values,
      tour_hotels: [...(values.tour_hotels ?? []), ...hotelsArray],
    })
    setGroupSelected([])
  }

  const handleDeleteHotel = (hotelId: number) => {
    setValues({
      ...values,
      tour_hotels: [...(values.tour_hotels?.filter((x) => x.hotel_id !== hotelId) ?? [])],
    })
  }

  const getNoneSelectedHotels = () => {
    const selectedHotelIds: number[] = values.tour_hotels?.map((x) => x.hotel_id!) ?? []
    return hotels?.filter((x) => !selectedHotelIds.includes(x.id!) && x.name?.includes(query))
  }
  return (
    <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 col-span-7">
      <div className="grid grid-cols-10  divide-x-2">
        <div className="px-4 col-span-6 lg:col-span-5">
          <div className="flex gap-x-2">
            <Input
              placeholder={'Search hotel name'}
              value={query}
              size="sm"
              onChange={(event) => setQuery(event.target.value)}
              startContent={<SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />}
            />
            <Tooltip content="Click to add after selecting the hotels" isOpen={open} onOpenChange={(open) => setOpen(open)} showArrow={true}>
              <Button size="sm" isIconOnly variant="flat" onPress={() => handleAddHotels()}>
                <Plus />
              </Button>
            </Tooltip>
          </div>

          <Separator className="my-2" />
          <ScrollArea className="flex flex-col gap-1 w-full h-96 max-h-96">
            <CheckboxGroup
              value={groupSelected}
              onChange={(e) => setGroupSelected(e as string[])}
              classNames={{
                base: 'w-full',
              }}
            >
              {getNoneSelectedHotels()?.map((hotel) => (
                <Checkbox
                  key={hotel.id!}
                  classNames={{
                    base: cn(
                      'inline-flex  max-w-full bg-content1 m-0',
                      'hover:bg-content2 items-center justify-start',
                      'cursor-pointer rounded-lg  border-2 border-transparent',
                      'data-[selected=true]:border-primary',
                    ),
                    label: 'w-full',
                  }}
                  value={hotel.id?.toString()}
                >
                  <div className="w-full flex justify-between gap-2">
                    <User
                      avatarProps={{
                        size: 'sm',
                        src: `${process.env.NEXT_PUBLIC_IMAGE_URL}${hotel.images && hotel.images.length > 0 ? hotel.images[0] : ''}`,
                      }}
                      description={
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-yellow-500 mr-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">{hotel.rating}</p>
                        </div>
                      }
                      name={hotel.name}
                    />
                  </div>
                </Checkbox>
              ))}
            </CheckboxGroup>
          </ScrollArea>
        </div>
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start lg:px-2 content-start  col-span-4 lg:col-span-5">
          {hotels
            ?.filter((t) => values.tour_hotels?.map((x) => x.hotel_id!).includes(t.id!))
            ?.map((hotel, hotel_index) => (
              <Chip key={hotel_index} onClose={() => handleDeleteHotel(hotel.id!)} variant="flat" className="py-6 px-2">
                <div className="w-full flex justify-between gap-2">
                  <User
                    avatarProps={{
                      size: 'sm',
                      src: `${process.env.NEXT_PUBLIC_IMAGE_URL}${hotel.images && hotel.images.length > 0 ? hotel.images[0] : ''}`,
                    }}
                    description={
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 text-yellow-500 mr-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">{hotel.rating}</p>
                      </div>
                    }
                    name={
                      <div className="w-16 text-ellipsis overflow-hidden">
                        <span className="">{hotel.name}</span>
                      </div>
                    }
                  />
                </div>
              </Chip>
            ))}
        </div>
      </div>
    </div>
  )
}

export default HotelForm
