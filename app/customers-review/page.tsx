import { getContentData } from '@/lib/operations'
import { FunctionComponent } from 'react'
import CallToAction from '../(components)/(fifth)/call-to-action'
import { Separator } from '@/components/ui/separator'
import { User } from 'lucide-react'
import CustomerReviewBreadCrumb from './customer-review-bread-crumb'
import { Avatar } from '@nextui-org/react'
import { Metadata } from 'next'
import RenderReviews from './render-reviews'

interface CustomerReviewPageProps {}

export async function generateMetadata(): Promise<Metadata> {
  const response = await getContentData()

  const { description, tags, title } = response?.customers_review?.seo || { title: '', description: '', tags: '' }
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      siteName: 'Discovery',
    },
    keywords: tags,
  }
}

const CustomerReviewPage: FunctionComponent<CustomerReviewPageProps> = async () => {
  const data = await getContentData()

  return (
    <>
      <div className="container mb-10">
        <CustomerReviewBreadCrumb />
        <Separator className="my-4" />

        <h1 className="text-primary text-2xl lg:text-4xl  text-center my-10">آراء العملاء</h1>

        <RenderReviews data={data} />
      </div>

      <CallToAction />
    </>
  )
}

export default CustomerReviewPage
