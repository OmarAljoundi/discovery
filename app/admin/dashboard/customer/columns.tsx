'use client'
import { format } from 'date-fns'
import { ColumnDef, Table } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { DataTableAction } from '@/components/table/data-table-actions'
import { supabaseClient } from '@/lib/supabaseClient'
import { Filters } from '@/hooks/use-filter-modal'
import { Customer, Tour } from '@/types/custom'
import { Chip, Popover, PopoverContent, PopoverTrigger, Tooltip } from '@nextui-org/react'
import { SelectOptionsProps } from '@/hooks/use-select-options-modal'
import { DataTableSearchInput } from '@/components/table/data-table-search-input'
import { DataTableDateFilter } from '@/components/table/data-table-date-filter'
import { DataTableFacetedFilter } from '@/components/table/data-table-faceted-filter'
import { CUSTOMER_STATUS } from '@/lib/constants'
import { REVALIDATE_CUSTOMER_LIST } from '@/lib/keys'
import { Check, Cross, Trash } from 'lucide-react'
import BlurImage from '@/components/common/blur-image'
import Link from 'next/link'

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'tour',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tour" />,
    cell: ({ row }) => {
      return (
        <Link href={`/admin/dashboard/tour/edit/${row.original.tour?.id}`} target="_blank">
          <Tooltip content={'Click to view info'} showArrow placement="bottom" classNames={{ base: 'cursor-pointer' }}>
            <Chip variant="bordered" className="w-32 flex items-center justify-between truncate cursor-pointer">
              <span className="text-ellipsis overflow-hidden">{row.original.tour?.name}</span>
            </Chip>
          </Tooltip>
        </Link>
      )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Name" />,
    cell: ({ row }) => {
      return (
        <div className="w-32 flex items-center justify-between">
          <span className="max-w-[6rem] truncate">{row.getValue('name')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return row.original.name?.includes(value) || false
    },
  },
  {
    accessorKey: 'phone_number',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Phone" />,
    cell: ({ row }) => {
      return (
        <div className="w-32 flex items-center justify-between">
          <span className="max-w-[6rem] truncate">{row.getValue('phone_number')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      //@ts-ignore
      return true
    },
  },
  {
    accessorKey: 'expected_travel_date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Excepted Date" />,
    cell: ({ row }) => {
      return (
        <div className="w-32 flex items-center justify-between">
          {row.getValue('expected_travel_date') ? format(new Date(row.getValue('expected_travel_date')), 'yyyy-MM-dd') : 'Not specified'}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      var from = true
      var to = true
      if (value?.from) {
        from = new Date(value.from as string) <= new Date(row.original.created_at!)
      }
      if (value?.to) {
        to = new Date(value.to as string) >= new Date(row.original.created_at!)
      }

      return from && to
    },
  },
  {
    accessorKey: 'number_of_adults',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Number of adults" />,
    cell: ({ row }) => (
      <div className="w-32 flex items-center justify-between">
        <Chip className="max-w-[6rem] truncate">{row.getValue('number_of_adults')}</Chip>
      </div>
    ),
    filterFn: (row, id, value) => {
      return true
    },
  },
  {
    accessorKey: 'number_of_kids',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Number of kids" />,
    cell: ({ row }) => (
      <div className="w-32 flex items-center justify-between">
        <Chip className="max-w-[6rem] truncate">{row.getValue('number_of_kids')}</Chip>
      </div>
    ),
    filterFn: (row, id, value) => {
      return true
    },
  },
  {
    accessorKey: 'notes',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Notes" />,
    cell: ({ row }) => {
      return (
        <Tooltip
          content={
            <div className="px-1 py-2">
              <div className="text-small font-bold">Custom Note</div>
              <div className="text-tiny break-words" style={{ inlineSize: '150px' }}>
                {row.original.notes}
              </div>
            </div>
          }
        >
          <div className="w-32 flex items-center justify-between truncate">
            <span className="text-ellipsis overflow-hidden">{row.original.notes}</span>
          </div>
        </Tooltip>
      )
    },
    filterFn: (row, id, value) => {
      return true
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      return (
        <div className="w-32 flex items-center justify-between">
          <Chip color={CUSTOMER_STATUS.find((x) => x.condition == row.original.status)!.color}>{row.original.status}</Chip>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return (value as string[]).includes(row.original.status!)
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => <DataTableColumnHeader column={column} title="CreatedAt" />,
    cell: ({ row }) => <div className="w-[100px] truncate">{format(new Date(row.getValue('created_at')), 'yyyy-MM-dd')}</div>,
    filterFn: (row, id, value) => {
      var from = true
      var to = true
      if (value?.from) {
        from = new Date(value.from as string) <= new Date(row.original.created_at!)
      }
      if (value?.to) {
        to = new Date(value.to as string) >= new Date(row.original.created_at!)
      }

      return from && to
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const updateStatus = async (status: string) => {
        const { data, error } = await supabaseClient.from('customer').update({ status: status }).eq('id', row.original.id!)
        if (error) {
          throw new Error(error.details)
        }
        await fetch(`/api/revalidate?tag=${REVALIDATE_CUSTOMER_LIST}`)
        return {
          success: true,
          message: 'Customer updated successfully',
        }
      }

      const markAsResponded = {
        label: 'Mark As Responsed',
        type: 'Promise' as any,
        icon: Check,
        action: async () => await updateStatus('Responded'),
      }

      const markAsNoResponded = {
        label: 'Mark As No Response',
        type: 'Promise' as any,
        icon: Cross,
        action: async () => await updateStatus('No response'),
      }

      const actions = []

      if (row.original.status == 'Pending') {
        actions.push(markAsResponded)
        actions.push(markAsNoResponded)
      }

      return (
        <DataTableAction
          row={row}
          actions={[
            ...actions,
            {
              label: 'Delete',
              type: 'Promise',
              icon: Trash,
              action: async () => {
                const { data, error } = await supabaseClient.from('customer').delete().eq('id', row.original.id!)
                if (error) {
                  return {
                    success: false,
                    message: error.details,
                  }
                }
                await fetch(`/api/revalidate?tag=${REVALIDATE_CUSTOMER_LIST}`)
                return {
                  success: true,
                  message: 'Customer deleted successfully',
                }
              },
            },
          ]}
        />
      )
    },
  },
]

export const filterOptions: Filters[] = [
  {
    renderFilter: (table: Table<Tour>) => {
      return <DataTableSearchInput column={table?.getColumn('name')} placeholder="Search by customer name" title="Search customer" />
    },
  },
  {
    renderFilter: (table: Table<Tour>) => {
      return <DataTableDateFilter column={table?.getColumn('created_at')} title={'Created Date'} />
    },
  },
  {
    renderFilter: (table: Table<Tour>) => {
      return <DataTableDateFilter column={table?.getColumn('expected_travel_date')} title={'Expected travel'} />
    },
  },
  {
    renderFilter: (table: Table<Tour>) => {
      return (
        <DataTableFacetedFilter
          column={table?.getColumn('status')}
          customOptions={CUSTOMER_STATUS.map((x) => x.condition)}
          title={'Status'}
          multi={true}
        />
      )
    },
  },
]

export const selectOptions: SelectOptionsProps[] = []
