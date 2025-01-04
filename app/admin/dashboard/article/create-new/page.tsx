import ArticleForm from '@/components/article-form'
import { Divider } from '@nextui-org/react'
import { FunctionComponent } from 'react'

const Page = () => {
  return (
    <div className="px-8">
      <h1 className="text-3xl mt-16">Create new article</h1>

      <ArticleForm />
    </div>
  )
}

export default Page
