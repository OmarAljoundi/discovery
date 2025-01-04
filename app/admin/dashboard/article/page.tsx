import { DataTable } from '@/components/table/data-table'
import { columns, filterOptions, selectOptions } from './columns'
import { getArticles } from '@/lib/operations'

const ArticlePage = async () => {
  const data = await getArticles()

  return (
    <div>
      <div className=" h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <p className="text-xl">Articles!</p>
            <p className="text-muted-foreground">Here&apos;s a list of your articles!</p>
          </div>
        </div>
        <DataTable data={data ?? []} columns={columns} filters={filterOptions} selects={selectOptions} />
      </div>
    </div>
  )
}

export default ArticlePage
