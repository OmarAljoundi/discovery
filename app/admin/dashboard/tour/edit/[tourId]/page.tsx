import TourForm from '@/components/tour-form'
import { getTours } from '@/lib/operations'
import { http } from '@/service/httpService'
import { Response, Tour } from '@/types/custom'
import { SearchQuery, eFilterOperator } from '@/types/search'
import { formatDistance, subDays } from 'date-fns'
import { notFound } from 'next/navigation'
import { FunctionComponent } from 'react'

interface NewTourPageProps {
  params: { tourId: string }
}
export async function generateStaticParams() {
  const response = await getTours()
  if (response && response.length > 0) {
    return response.map((tour) => ({
      tourId: `${tour.id}`,
    }))
  }
  return []
}

const NewTourPage: FunctionComponent<NewTourPageProps> = async ({ params }) => {
  var _SQ: SearchQuery = {
    FilterByOptions: [
      {
        FilterFor: params.tourId,
        FilterOperator: eFilterOperator.EqualsTo,
        MemberName: 'id',
      },
    ],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 1,
    Table: 'tour',
    Select: '*,tour_hotels(*)',
  }
  const response = await http<Response<Tour>>('/api/search', { revalidate: 0 }).post(_SQ)

  if (response.success == false) {
    return notFound()
  }
  return (
    <div className="px-8">
      <div className="flex justify-between">
        <h1 className="text-3xl mt-16"> {response?.result?.name}</h1>
        <h1 className="text-3xl mt-16"> {formatDistance(subDays(new Date(response.result!.created_at!), 0), new Date(), { addSuffix: true })}</h1>
      </div>
      <TourForm data={response.result} />
    </div>
  )
}

export default NewTourPage
