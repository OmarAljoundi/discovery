'use client'
import { format } from 'date-fns'
import { ColumnDef, Table } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { DataTableAction } from '@/components/table/data-table-actions'
import { supabaseClient } from '@/lib/supabaseClient'
import { Filters } from '@/hooks/use-filter-modal'
import { News, Tour } from '@/types/custom'
import { Switch } from '@nextui-org/react'
import { SelectOptionsProps } from '@/hooks/use-select-options-modal'
import { DataTableSearchInput } from '@/components/table/data-table-search-input'
import { DataTableDateFilter } from '@/components/table/data-table-date-filter'
import { REVALIDATE_NEWS_LIST } from '@/lib/keys'
import { Edit, Trash } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { updateNewsStatus } from '@/lib/operations'
import { useRouter } from 'next/navigation'

export const columns: ColumnDef<News>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      return (
        <div className=" flex items-center justify-between">
          <span className="line-clamp-1" dir="rtl">
            {row.getValue('title')}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return row.original.title?.includes(value) || false
    },
  },
  {
    accessorKey: 'author',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Author" />,
    cell: ({ row }) => {
      return (
        <div className="w-32 flex items-center justify-between">
          <span className="max-w-[6rem] truncate">{row.getValue('author')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return row.original.author?.includes(value) || false
    },
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Slug" />,
    cell: ({ row }) => {
      return <span className="line-clamp-1">{row.getValue('slug')}</span>
    },
    filterFn: (row, id, value) => {
      return row.original.slug?.includes(value) || false
    },
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const route = useRouter()
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [active, setActive] = useState<boolean>(row.original.is_active ?? false)
      const handleUpdateStatus = async (e: boolean) => {
        setActive(e)
        toast.promise(updateNewsStatus(e, row.original.id!), {
          error(error) {
            setActive(!e)
            return error
          },
          loading: 'Loading update ..',
          success(data) {
            route.refresh()
            return data.message
          },
        })
      }
      return (
        <div className="w-32 flex items-center justify-between">
          <Switch defaultSelected size="sm" isSelected={active} onValueChange={(e) => handleUpdateStatus(e)} />
        </div>
      )
    },
    filterFn: (row, id, value) => {
      if (value == 'Published' && row.original.is_active == true) return true

      if (value == 'Draft' && row.original.is_active == false) return true

      return false
    },
  },

  {
    accessorKey: 'created_at',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Published At" />,
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
      return (
        <DataTableAction
          row={row}
          actions={[
            {
              label: 'Edit',
              link: `/admin/dashboard/news/edit/${row.original.id}`,
              type: 'Link',
              icon: Edit,
            },
            {
              label: 'Delete',
              type: 'Promise',
              icon: Trash,
              action: async () => {
                const { error } = await supabaseClient
                  .from('news' as any)
                  .delete()
                  .eq('id', row.original.id!)
                if (error) {
                  return {
                    success: false,
                    message: error.details,
                  }
                }
                await fetch(`/api/revalidate?tag=${REVALIDATE_NEWS_LIST}`)
                return {
                  success: true,
                  message: 'News deleted successfully',
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
      return <DataTableSearchInput column={table?.getColumn('name')} placeholder="Search by news name" title="Search news" />
    },
  },
  {
    renderFilter: (table: Table<Tour>) => {
      return <DataTableDateFilter column={table?.getColumn('created_at')} title={'Published Date'} />
    },
  },
]

export const selectOptions: SelectOptionsProps[] = [
  {
    requireSelections: false,
    title: 'Create New News',
    link: '/admin/dashboard/news/create-new',
  },
]
