'use client'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/use-modal'
import { useSelectOptionsModal } from '@/hooks/use-select-options-modal'
import Link from 'next/link'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
  const options = useSelectOptionsModal()
  const modal = useModal()
  return (
    <div className="flex gap-2 justify-start">
      {options.selectOptions?.map((g) => {
        if ((table.getFilteredSelectedRowModel().rows.length > 0 && g.requireSelections) || !g.requireSelections)
          return (
            <>
              {g.action ? (
                <Button
                  variant="outline"
                  size="sm"
                  className=" h-8  border-dashed"
                  key={g.title}
                  //@ts-ignore
                  onClick={() => modal[g.action!]()}
                >
                  {g.title}
                </Button>
              ) : (
                <Button variant="outline" size="sm" className=" h-8  border-dashed" asChild key={g.title}>
                  <Link href={g.link ?? ''}>{g.title}</Link>
                </Button>
              )}
            </>
          )
      })}
    </div>
  )
}
