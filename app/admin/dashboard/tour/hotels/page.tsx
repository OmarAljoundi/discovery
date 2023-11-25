import { FunctionComponent } from 'react'
import { DataTable } from '@/components/table/data-table'
import { REVALIDATE_HOTEL_LIST } from '@/lib/keys'
import { Hotel, Response, TourHotels } from '@/types/custom'
import { http } from '@/service/httpService'
import { SearchQuery } from '@/types/search'
import { columns, filterOptions, selectOptions } from './columns'

interface HotelPageProps {}

const HotelPage: FunctionComponent<HotelPageProps> = async () => {
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 1000,
    Select: '*',
    Table: 'hotel',
  }
  const data = await http<Response<Hotel>>('/api/search', { revalidate: 86400, tags: [REVALIDATE_HOTEL_LIST] }).post(_SQ)
  return (
    <div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <p className="text-xl">Hotels</p>
            <p className="text-muted-foreground">Here&apos;s a list of your hotels!</p>
          </div>
        </div>
        <DataTable data={data.results ?? []} columns={columns} filters={filterOptions} selects={selectOptions} />
      </div>
    </div>
  )
}

export default HotelPage
