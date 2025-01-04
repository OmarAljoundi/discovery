import ArticleForm from '@/components/article-form'
import TourForm from '@/components/tour-form'
import { getArticles, getTours } from '@/lib/operations'
import { http } from '@/service/httpService'
import { Article, Response, Tour } from '@/types/custom'
import { SearchQuery, eFilterOperator } from '@/types/search'
import { formatDistance, subDays } from 'date-fns'
import { notFound } from 'next/navigation'
import { FunctionComponent } from 'react'

interface NewArticlePageProps {
  params: { articleId: string }
}
export async function generateStaticParams() {
  const response = await getArticles()
  if (response && response.length > 0) {
    return response.map((article) => ({
      articleId: `${article.id}`,
    }))
  }
  return []
}

const NewArticlePage: FunctionComponent<NewArticlePageProps> = async ({ params }) => {
  var _SQ: SearchQuery = {
    FilterByOptions: [
      {
        FilterFor: params.articleId,
        FilterOperator: eFilterOperator.EqualsTo,
        MemberName: 'id',
      },
    ],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 1,
    Table: 'article',
    Select: '*',
  }
  const response = await http<Response<Article>>('/api/search', { revalidate: 0 }).post(_SQ)

  if (response.success == false) {
    return notFound()
  }
  return (
    <div className="px-8">
      <div className="flex justify-between">
        <h1 className="text-3xl mt-16"> {response?.result?.title}</h1>
        <h1 className="text-3xl mt-16"> {formatDistance(subDays(new Date(response.result!.created_at!), 0), new Date(), { addSuffix: true })}</h1>
      </div>
      <ArticleForm data={response.result} />
    </div>
  )
}

export default NewArticlePage
