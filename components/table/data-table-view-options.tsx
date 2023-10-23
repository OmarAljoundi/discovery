'use client'

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { PlusIcon, MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useState } from 'react'
import { Recycle } from 'lucide-react'
import { useModal } from '@/hooks/use-modal'
import { useSelectOptionsModal } from '@/hooks/use-select-options-modal'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
  const [loading, setLoading] = useState(false)
  const options = useSelectOptionsModal()
  const isFiltered = table.getState().columnFilters.length > 0
  const modal = useModal()
  return (
    <div className="flex gap-2 justify-start">
      {table.getFilteredSelectedRowModel().rows.length > 0 &&
        options.selectOptions.map((i) => (
          //@ts-ignore
          <Button variant="outline" size="sm" className=" h-8  border-dashed" key={i.title} onClick={() => modal[i.action]()}>
            {i.title}
          </Button>
        ))}

      {/* <Button disabled={loading} variant="outline" size="sm" className=" h-8   border-dashed" onClick={() => {}}>
        <Recycle className="mr-2 h-4 w-4" />
        Refetch
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className=" h-8   border-dashed">
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      {isFiltered && (
        <Button variant="destructive" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
          Reset All
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      )} */}
    </div>
  )
}
