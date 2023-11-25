'use client'
import { format } from 'date-fns'
import { ColumnDef, Table } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { Filters } from '@/hooks/use-filter-modal'
import { Newsletter, Tour } from '@/types/custom'
import { SelectOptionsProps } from '@/hooks/use-select-options-modal'
import { DataTableSearchInput } from '@/components/table/data-table-search-input'
import { DataTableDateFilter } from '@/components/table/data-table-date-filter'

export const columns: ColumnDef<Newsletter>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Id" />,
    cell: ({ row }) => <div className="w-[80px]">#{row.getValue('id')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Email" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-between">
          <span className="truncate">{row.getValue('email')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return row.original.email?.includes(value) || false
    },
  },
  {
    accessorKey: 'phone_number',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Phone" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-between">
          <span className="truncate">{row.getValue('phone_number')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return row.original.phone_number?.includes(value) || false
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
]

export const filterOptions: Filters[] = [
  {
    renderFilter: (table: Table<Tour>) => {
      return <DataTableSearchInput column={table?.getColumn('email')} placeholder="Search by customer email" title="Search email" />
    },
  },
  {
    renderFilter: (table: Table<Tour>) => {
      return (
        <DataTableSearchInput column={table?.getColumn('phone_number')} placeholder="Search by customer phone number" title="Search phone number" />
      )
    },
  },

  {
    renderFilter: (table: Table<Tour>) => {
      return <DataTableDateFilter column={table?.getColumn('created_at')} title={'Created Date'} />
    },
  },
]

export const selectOptions: SelectOptionsProps[] = []
