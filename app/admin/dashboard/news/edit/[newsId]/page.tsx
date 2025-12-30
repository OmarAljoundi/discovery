import NewsForm from '@/components/news-form'
import { getNews } from '@/lib/operations'
import { http } from '@/service/httpService'
import { News, Response } from '@/types/custom'
import { SearchQuery, eFilterOperator } from '@/types/search'
import { formatDistance, subDays } from 'date-fns'
import { notFound } from 'next/navigation'
import { FunctionComponent } from 'react'

interface NewNewsPageProps {
  params: { newsId: string }
}
export async function generateStaticParams() {
  const response = await getNews()
  if (response && response.length > 0) {
    return response.map((newsItem) => ({
      newsId: `${newsItem.id}`,
    }))
  }
  return []
}

const NewNewsPage: FunctionComponent<NewNewsPageProps> = async ({ params }) => {
  var _SQ: SearchQuery = {
    FilterByOptions: [
      {
        FilterFor: params.newsId,
        FilterOperator: eFilterOperator.EqualsTo,
        MemberName: 'id',
      },
    ],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 1,
    Table: 'news',
    Select: '*',
  }
  const response = await http<Response<News>>('/api/search', { revalidate: 0 }).post(_SQ)

  if (response.success == false) {
    return notFound()
  }
  return (
    <div className="px-8">
      <div className="flex justify-between">
        <h1 className="text-3xl mt-16"> {response?.result?.title}</h1>
        <h1 className="text-3xl mt-16"> {formatDistance(subDays(new Date(response.result!.created_at!), 0), new Date(), { addSuffix: true })}</h1>
      </div>
      <NewsForm data={response.result} />
    </div>
  )
}

export default NewNewsPage
